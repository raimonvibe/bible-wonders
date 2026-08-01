import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'data/bible_repository.dart';
import 'data/prefs.dart';
import 'data/reading_paths.dart';
import 'data/wonders_repository.dart';
import 'models/wonder.dart';
import 'theme/app_theme.dart';
import 'theme/palette.dart';

/// The three things every screen reads. Overridden in main() with the
/// already-resolved instances so no screen has to handle a loading state for
/// data that is bundled with the app.
final prefsProvider = Provider<Prefs>((ref) {
  throw UnimplementedError('prefsProvider must be overridden in main()');
});

final wondersProvider = Provider<WondersRepository>((ref) {
  throw UnimplementedError('wondersProvider must be overridden in main()');
});

final bibleProvider = Provider<BibleRepository>((ref) {
  throw UnimplementedError('bibleProvider must be overridden in main()');
});

/* --- theme ---------------------------------------------------------------- */

/// Which testament the reader is currently in. The app wears pine while you
/// are in the Old Testament and ocean in the New, unless the palette is
/// pinned in settings.
class ThemeController extends StateNotifier<Palette> {
  ThemeController(this._prefs)
      : super(AppTheme.paletteFor(
          Testament.parse(_prefs.themeLock ?? Testament.old.id),
        ));

  final Prefs _prefs;

  bool get isLocked => _prefs.themeLock != null;

  /// Called as the reader moves through scripture. A no-op while the palette
  /// is pinned, so a deliberate choice is never overridden by navigation.
  void followTestament(Testament testament) {
    if (isLocked) return;
    final next = AppTheme.paletteFor(testament);
    if (next != state) state = next;
  }

  Future<void> lockTo(Testament? testament) async {
    await _prefs.setThemeLock(testament?.id);
    if (testament != null) state = AppTheme.paletteFor(testament);
  }
}

final themeProvider = StateNotifierProvider<ThemeController, Palette>((ref) {
  return ThemeController(ref.watch(prefsProvider));
});

/// Reading size, as its own state.
///
/// It cannot just be read off [prefsProvider]: that provider hands back the
/// same Prefs instance every time, so a screen watching it never rebuilds when
/// a value inside changes. Anything the UI has to react to needs a provider of
/// its own; Prefs stays the place it is persisted.
class FontScaleController extends StateNotifier<double> {
  FontScaleController(this._prefs) : super(_prefs.fontScale);

  final Prefs _prefs;

  void set(double value) {
    state = value;
    _save(_prefs.setFontScale(value));
  }
}

final fontScaleProvider =
    StateNotifierProvider<FontScaleController, double>((ref) {
  return FontScaleController(ref.watch(prefsProvider));
});

/// The wonder last opened, for "continue where you left off". Same reasoning
/// as [fontScaleProvider].
class LastWonderController extends StateNotifier<String?> {
  LastWonderController(this._prefs) : super(_prefs.lastWonderId);

  final Prefs _prefs;

  void set(String id) {
    state = id;
    _save(_prefs.setLastWonderId(id));
  }
}

final lastWonderProvider =
    StateNotifierProvider<LastWonderController, String?>((ref) {
  return LastWonderController(ref.watch(prefsProvider));
});

/* --- catalog browsing ----------------------------------------------------- */

class PathController extends StateNotifier<PathState> {
  PathController(this._prefs)
      : super(PathState(path: _prefs.path, sort: _prefs.sort));

  final Prefs _prefs;

  void setPath(ReadingPath path) {
    state = state.copyWith(path: path, clearTheme: true, clearEra: true);
    _save(_prefs.setPath(path));
  }

  void setSort(SortMode sort) {
    state = state.copyWith(sort: sort);
    _save(_prefs.setSort(sort));
  }

  void setTheme(WonderTheme? theme) => state = theme == null
      ? state.copyWith(clearTheme: true)
      : state.copyWith(theme: theme);

  void setEra(WonderEra? era) => state =
      era == null ? state.copyWith(clearEra: true) : state.copyWith(era: era);

  void setQuery(String query) => state = state.copyWith(query: query);
}

final pathProvider = StateNotifierProvider<PathController, PathState>((ref) {
  return PathController(ref.watch(prefsProvider));
});

/// The list the current path and filters resolve to — what every wonder list
/// screen renders, so sorting and searching are defined in exactly one place.
final visibleWondersProvider = Provider<List<Wonder>>((ref) {
  final repo = ref.watch(wondersProvider);
  final state = ref.watch(pathProvider);

  List<Wonder> list = switch (state.path) {
    ReadingPath.startHere => repo.startHere(),
    ReadingPath.theme =>
      state.theme == null ? const [] : repo.byTheme(state.theme!),
    ReadingPath.era => state.era == null ? const [] : repo.byEra(state.era!),
    ReadingPath.catalog => repo.wonders,
  };

  if (state.query.trim().isNotEmpty) {
    final matches = repo.search(state.query).map((w) => w.id).toSet();
    list = list.where((w) => matches.contains(w.id)).toList();
  }

  // Start Here defines its own order; re-sorting it would defeat the point.
  if (state.sort == SortMode.bestKnown && state.path != ReadingPath.startHere) {
    list = repo.byFamiliarity(list);
  }

  return list;
});

/// Fire-and-forget for the preference writes above: the UI has already moved
/// on, and a failed write only costs the reader their place. Named apart from
/// `dart:async`'s `unawaited`, which does not swallow the error.
void _save(Future<void> future) {
  future.catchError((Object _) {});
}
