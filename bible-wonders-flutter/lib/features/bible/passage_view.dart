import 'dart:ui' show FontFeature;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../models/bible.dart';
import '../../models/passage_ref.dart';
import '../../providers.dart';
import '../../theme/app_theme.dart';
import '../../theme/palette.dart';

/// One chapter of scripture, optionally with a verse range picked out.
///
/// This is the piece that makes "separate screens" survivable. The Bible tab
/// renders it with [highlight] null; a wonder's passage page renders the same
/// widget with the card's range — same typography, same behaviour, hosted in
/// whichever tab the reader came from. There is exactly one reader in this app.
class PassageView extends ConsumerStatefulWidget {
  const PassageView({
    super.key,
    required this.chapterId,
    this.highlight,
    this.autoScrollToHighlight = true,
    this.padding = const EdgeInsets.fromLTRB(20, 8, 20, 40),
  });

  final String chapterId;

  /// Verses to mark, when the reader arrived from a wonder card.
  final PassageRef? highlight;

  /// Scroll the first highlighted verse into view once the text is laid out.
  final bool autoScrollToHighlight;

  final EdgeInsets padding;

  @override
  ConsumerState<PassageView> createState() => _PassageViewState();
}

class _PassageViewState extends ConsumerState<PassageView> {
  late Future<List<Verse>> _verses;
  final _controller = ScrollController();
  final _highlightKey = GlobalKey();

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void didUpdateWidget(PassageView oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.chapterId != widget.chapterId) _load();
  }

  void _load() {
    _verses = ref.read(bibleProvider).versesIn(widget.chapterId);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  /// Runs after the first paint: the highlighted verse is usually below the
  /// fold, and landing above it makes the card's link look like it did nothing.
  void _scrollToHighlight() {
    if (!widget.autoScrollToHighlight || widget.highlight == null) return;
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final context = _highlightKey.currentContext;
      if (context == null) return;
      Scrollable.ensureVisible(
        context,
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeOut,
        alignment: 0.15,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    final palette = ref.watch(themeProvider);
    final scale = ref.watch(fontScaleProvider);

    return FutureBuilder<List<Verse>>(
      future: _verses,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return _Message('That chapter could not be opened.\n${snapshot.error}');
        }
        final verses = snapshot.data;
        if (verses == null) {
          return const Center(child: CircularProgressIndicator());
        }
        if (verses.isEmpty) {
          return const _Message('That chapter is empty.');
        }

        _scrollToHighlight();
        final highlight = widget.highlight;
        var markedFirst = false;

        return ListView.builder(
          controller: _controller,
          padding: widget.padding,
          itemCount: verses.length,
          itemBuilder: (context, index) {
            final verse = verses[index];
            final isMarked = highlight?.highlights(verse.number) ?? false;

            // Anchor the scroll on the first verse of the range, not the last.
            Key? key;
            if (isMarked && !markedFirst) {
              markedFirst = true;
              key = _highlightKey;
            }

            return Container(
              key: key,
              margin: const EdgeInsets.only(bottom: 10),
              padding: isMarked
                  ? const EdgeInsets.fromLTRB(12, 8, 12, 8)
                  : EdgeInsets.zero,
              decoration: isMarked
                  ? BoxDecoration(
                      color: palette.shade700.withValues(alpha: 0.55),
                      borderRadius: BorderRadius.circular(8),
                      border: Border(
                        left: BorderSide(color: Palette.accent, width: 3),
                      ),
                    )
                  : null,
              child: Text.rich(
                TextSpan(
                  children: [
                    TextSpan(
                      text: '${verse.number} ',
                      style: TextStyle(
                        color: palette.shade400,
                        fontSize: 12 * scale,
                        fontFeatures: const [FontFeature.superscripts()],
                      ),
                    ),
                    TextSpan(text: verse.text),
                  ],
                ),
                style: AppTheme.verseStyle(palette, fontSize: 18 * scale),
              ),
            );
          },
        );
      },
    );
  }
}

class _Message extends StatelessWidget {
  const _Message(this.text);
  final String text;

  @override
  Widget build(BuildContext context) => Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Text(text, textAlign: TextAlign.center),
        ),
      );
}
