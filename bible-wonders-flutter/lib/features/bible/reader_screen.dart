import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../models/bible.dart';
import '../../providers.dart';
import 'passage_view.dart';

/// One chapter, read straight through, with the neighbours a swipe away.
///
/// The Bible tab's leaf. It renders the same [PassageView] a wonder's passage
/// page does, with no highlight — the difference between reading a chapter and
/// being sent to one is a parameter, not a second implementation.
class ReaderScreen extends ConsumerStatefulWidget {
  const ReaderScreen({super.key, required this.chapterId});

  final String chapterId;

  @override
  ConsumerState<ReaderScreen> createState() => _ReaderScreenState();
}

class _ReaderScreenState extends ConsumerState<ReaderScreen> {
  late String _chapterId = widget.chapterId;
  Chapter? _chapter;
  Chapter? _previous;
  Chapter? _next;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final repo = ref.read(bibleProvider);
    final chapter = await repo.chapter(_chapterId);
    if (chapter == null || !mounted) return;

    final previous = await repo.adjacentChapter(chapter, offset: -1);
    final next = await repo.adjacentChapter(chapter, offset: 1);
    if (!mounted) return;

    setState(() {
      _chapter = chapter;
      _previous = previous;
      _next = next;
    });

    ref.read(prefsProvider).setLastChapterId(chapter.id);
    final book = await repo.book(chapter.bookId);
    if (book != null && mounted) {
      ref.read(themeProvider.notifier).followTestament(book.testament);
    }
  }

  void _goTo(Chapter? chapter) {
    if (chapter == null) return;
    setState(() {
      _chapterId = chapter.id;
      _chapter = null;
    });
    _load();
  }

  @override
  Widget build(BuildContext context) {
    final palette = ref.watch(themeProvider);

    return Scaffold(
      appBar: AppBar(title: Text(_chapter?.reference ?? '')),
      body: DecoratedBox(
        decoration: BoxDecoration(gradient: palette.pageGradient),
        child: GestureDetector(
          // Horizontal flings move between chapters, including across book
          // boundaries — Genesis 50 swipes into Exodus 1.
          onHorizontalDragEnd: (details) {
            final velocity = details.primaryVelocity ?? 0;
            if (velocity < -200) _goTo(_next);
            if (velocity > 200) _goTo(_previous);
          },
          child: PassageView(chapterId: _chapterId),
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            TextButton.icon(
              onPressed: _previous == null ? null : () => _goTo(_previous),
              icon: const Icon(Icons.chevron_left),
              label: Text(_previous?.reference ?? ''),
            ),
            TextButton.icon(
              onPressed: _next == null ? null : () => _goTo(_next),
              icon: const Icon(Icons.chevron_right),
              iconAlignment: IconAlignment.end,
              label: Text(_next?.reference ?? ''),
            ),
          ],
        ),
      ),
    );
  }
}
