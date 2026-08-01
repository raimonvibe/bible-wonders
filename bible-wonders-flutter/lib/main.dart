import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'app.dart';
import 'data/bible_repository.dart';
import 'data/prefs.dart';
import 'data/wonders_repository.dart';
import 'providers.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Everything the app reads is bundled, so it is all resolvable before the
  // first frame. Doing it here rather than in a FutureBuilder means no screen
  // has to render a spinner for data that was never going to be slow — the one
  // cost is the first launch, where bible.db is copied out of the asset
  // bundle. See BibleDatabase.open.
  final prefs = await Prefs.load();
  final wonders = await WondersRepository.load();
  final bible = await BibleRepository.open();

  runApp(
    ProviderScope(
      overrides: [
        prefsProvider.overrideWithValue(prefs),
        wondersProvider.overrideWithValue(wonders),
        bibleProvider.overrideWithValue(bible),
      ],
      child: const BibleWondersApp(),
    ),
  );
}
