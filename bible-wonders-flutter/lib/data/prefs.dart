import 'package:shared_preferences/shared_preferences.dart';

import 'reading_paths.dart';

/// The small amount of state that survives a restart.
///
/// The keys are the same strings the website writes to localStorage. They
/// don't sync — there is no account — but keeping them identical means the two
/// codebases describe "where the reader is" the same way, and a future sync
/// has nothing to reconcile.
class Prefs {
  Prefs(this._prefs);

  static const _pathKey = 'wonders-path';
  static const _sortKey = 'wonders-sort';
  static const _seenOverviewKey = 'wonders-seen-overview';
  static const _lastWonderKey = 'wonders-last-read';
  static const _tourStepKey = 'wonders-tour-step';

  /// App-only, no website counterpart.
  static const _lastChapterKey = 'bible-last-chapter';
  static const _themeLockKey = 'theme-lock';
  static const _fontScaleKey = 'reader-font-scale';

  final SharedPreferences _prefs;

  static Future<Prefs> load() async =>
      Prefs(await SharedPreferences.getInstance());

  ReadingPath get path => ReadingPath.parse(_prefs.getString(_pathKey));
  Future<void> setPath(ReadingPath value) =>
      _prefs.setString(_pathKey, value.id);

  SortMode get sort => SortMode.parse(_prefs.getString(_sortKey));
  Future<void> setSort(SortMode value) => _prefs.setString(_sortKey, value.id);

  /// First launch shows the overview; afterwards it goes straight to browsing.
  bool get hasSeenOverview => _prefs.getBool(_seenOverviewKey) ?? false;
  Future<void> markOverviewSeen() => _prefs.setBool(_seenOverviewKey, true);

  /// Drives "continue where you left off" on the Wonders home.
  String? get lastWonderId => _prefs.getString(_lastWonderKey);
  Future<void> setLastWonderId(String id) =>
      _prefs.setString(_lastWonderKey, id);

  int get tourStep => _prefs.getInt(_tourStepKey) ?? 0;
  Future<void> setTourStep(int step) => _prefs.setInt(_tourStepKey, step);

  String? get lastChapterId => _prefs.getString(_lastChapterKey);
  Future<void> setLastChapterId(String id) =>
      _prefs.setString(_lastChapterKey, id);

  /// Null means "follow the testament being read"; a value pins one palette.
  /// See ThemeController.
  String? get themeLock => _prefs.getString(_themeLockKey);
  Future<void> setThemeLock(String? testamentId) async {
    if (testamentId == null) {
      await _prefs.remove(_themeLockKey);
    } else {
      await _prefs.setString(_themeLockKey, testamentId);
    }
  }

  double get fontScale => _prefs.getDouble(_fontScaleKey) ?? 1.0;
  Future<void> setFontScale(double value) =>
      _prefs.setDouble(_fontScaleKey, value);
}
