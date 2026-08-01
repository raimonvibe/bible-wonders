import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../providers.dart';
import '../wonders/wonder_card_body.dart';

/// The guided tour: fourteen wonders walked in order.
///
/// SCAFFOLD. The shape is here — a step at a time, resumable — but the step
/// list is still the whole ranked shortlist rather than the curated fourteen
/// from ../../lib/miraclesTour.ts. Porting that is the next piece of work:
/// export it alongside the catalog in scripts/export-wonders.js, then read it
/// here instead of calling startHere().
///
/// Narration is not wired up yet either; that is flutter_tts plus
/// audio_service, and it belongs in its own controller so the tour and the
/// reader can share it.
class TourScreen extends ConsumerStatefulWidget {
  const TourScreen({super.key});

  @override
  ConsumerState<TourScreen> createState() => _TourScreenState();
}

class _TourScreenState extends ConsumerState<TourScreen> {
  late final PageController _pages =
      PageController(initialPage: ref.read(prefsProvider).tourStep);

  @override
  void dispose() {
    _pages.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final palette = ref.watch(themeProvider);
    final steps = ref.watch(wondersProvider).startHere(limit: 14);
    final step = ref.watch(prefsProvider).tourStep;

    return Scaffold(
      appBar: AppBar(
        title: const Text('The tour'),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(4),
          child: LinearProgressIndicator(
            value: steps.isEmpty ? 0 : (step + 1) / steps.length,
          ),
        ),
      ),
      body: DecoratedBox(
        decoration: BoxDecoration(gradient: palette.pageGradient),
        child: PageView.builder(
          controller: _pages,
          itemCount: steps.length,
          onPageChanged: (index) {
            ref.read(prefsProvider).setTourStep(index);
            ref
                .read(themeProvider.notifier)
                .followTestament(steps[index].testament);
            setState(() {});
          },
          itemBuilder: (context, index) =>
              WonderCardBody(wonder: steps[index]),
        ),
      ),
    );
  }
}
