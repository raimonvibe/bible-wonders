import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../models/wonder.dart';
import '../../providers.dart';

/// Theme, reading size, and what the text is.
class SettingsScreen extends ConsumerStatefulWidget {
  const SettingsScreen({super.key});

  @override
  ConsumerState<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends ConsumerState<SettingsScreen> {
  @override
  Widget build(BuildContext context) {
    final palette = ref.watch(themeProvider);
    final theme = ref.read(themeProvider.notifier);
    final scale = ref.watch(fontScaleProvider);
    final lock = ref.watch(prefsProvider).themeLock;

    return Scaffold(
      appBar: AppBar(title: const Text('More')),
      body: DecoratedBox(
        decoration: BoxDecoration(gradient: palette.pageGradient),
        child: ListView(
          children: [
            const _Heading('Theme'),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: SegmentedButton<String>(
                segments: const [
                  ButtonSegment(value: 'follow', label: Text('Follow')),
                  ButtonSegment(value: 'old', label: Text('Green')),
                  ButtonSegment(value: 'new', label: Text('Blue')),
                ],
                selected: {lock ?? 'follow'},
                showSelectedIcon: false,
                onSelectionChanged: (selection) async {
                  final choice = selection.first;
                  await theme.lockTo(
                    choice == 'follow' ? null : Testament.parse(choice),
                  );
                  if (mounted) setState(() {});
                },
              ),
            ),
            const ListTile(
              dense: true,
              subtitle: Text(
                'Follow means green in the Old Testament, blue in the New.',
              ),
            ),

            const Divider(),
            const _Heading('Reading size'),
            Slider(
              value: scale,
              min: 0.85,
              max: 1.6,
              divisions: 15,
              label: '${(scale * 100).round()}%',
              onChanged: ref.read(fontScaleProvider.notifier).set,
            ),

            const Divider(),
            const _Heading('About'),
            const ListTile(
              title: Text('World English Bible'),
              subtitle: Text(
                'Public domain. The whole text ships with the app, so nothing '
                'here needs a connection.',
              ),
            ),
            ListTile(
              title: const Text('Wonders'),
              subtitle: Text(
                '${ref.watch(wondersProvider).count} cards, each checked '
                'against the passage it cites.',
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Heading extends StatelessWidget {
  const _Heading(this.text);
  final String text;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.fromLTRB(16, 20, 16, 8),
        child: Text(text, style: Theme.of(context).textTheme.titleLarge),
      );
}
