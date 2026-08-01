import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../models/bible.dart';
import '../../models/wonder.dart' show Testament;
import '../../providers.dart';

/// All 66 books, Old Testament then New.
///
/// The website sizes this grid with container queries so it works in the
/// docked pane; on a phone there is only one pane, so a plain responsive grid
/// is the honest translation.
class BookListScreen extends ConsumerStatefulWidget {
  const BookListScreen({super.key});

  @override
  ConsumerState<BookListScreen> createState() => _BookListScreenState();
}

class _BookListScreenState extends ConsumerState<BookListScreen> {
  late final Future<List<Book>> _books = ref.read(bibleProvider).books();

  @override
  Widget build(BuildContext context) {
    final palette = ref.watch(themeProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('The Bible'),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            tooltip: 'Search the text',
            onPressed: () => showSearch(
              context: context,
              delegate: _BibleSearchDelegate(ref),
            ),
          ),
        ],
      ),
      body: DecoratedBox(
        decoration: BoxDecoration(gradient: palette.pageGradient),
        child: FutureBuilder<List<Book>>(
          future: _books,
          builder: (context, snapshot) {
            final books = snapshot.data;
            if (books == null) {
              return const Center(child: CircularProgressIndicator());
            }
            final old = books.where((b) => b.testament == Testament.old);
            final current = books.where((b) => b.testament == Testament.aNew);

            return ListView(
              padding: const EdgeInsets.all(16),
              children: [
                _Heading('Old Testament', count: old.length),
                _BookGrid(books: old.toList()),
                const SizedBox(height: 28),
                _Heading('New Testament', count: current.length),
                _BookGrid(books: current.toList()),
                const SizedBox(height: 32),
              ],
            );
          },
        ),
      ),
    );
  }
}

class _Heading extends StatelessWidget {
  const _Heading(this.title, {required this.count});

  final String title;
  final int count;

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.only(bottom: 12),
        child: Text(
          '$title · $count books',
          style: Theme.of(context).textTheme.titleLarge,
        ),
      );
}

class _BookGrid extends StatelessWidget {
  const _BookGrid({required this.books});

  final List<Book> books;

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 190,
        mainAxisExtent: 56,
        crossAxisSpacing: 8,
        mainAxisSpacing: 8,
      ),
      itemCount: books.length,
      itemBuilder: (context, index) {
        final book = books[index];
        return Card(
          margin: EdgeInsets.zero,
          child: InkWell(
            borderRadius: BorderRadius.circular(16),
            onTap: () => context.go('/bible/${book.id}'),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Row(
                children: [
                  Expanded(
                    child: Text(book.name, overflow: TextOverflow.ellipsis),
                  ),
                  Text(
                    '${book.chapterCount}',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

/// Full-text search over the shipped WEB text, offline, via FTS5.
class _BibleSearchDelegate extends SearchDelegate<void> {
  _BibleSearchDelegate(this.ref);

  final WidgetRef ref;

  @override
  List<Widget> buildActions(BuildContext context) => [
        IconButton(
          icon: const Icon(Icons.clear),
          onPressed: () => query = '',
        ),
      ];

  @override
  Widget buildLeading(BuildContext context) => IconButton(
        icon: const Icon(Icons.arrow_back),
        onPressed: () => close(context, null),
      );

  @override
  Widget buildSuggestions(BuildContext context) => buildResults(context);

  @override
  Widget buildResults(BuildContext context) {
    if (query.trim().length < 2) {
      return const Center(child: Text('Type at least two characters.'));
    }
    return FutureBuilder<List<VerseHit>>(
      future: ref.read(bibleProvider).search(query),
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return Center(child: Text('Search failed: ${snapshot.error}'));
        }
        final hits = snapshot.data;
        if (hits == null) {
          return const Center(child: CircularProgressIndicator());
        }
        if (hits.isEmpty) {
          return const Center(child: Text('Nothing found.'));
        }
        return ListView.builder(
          itemCount: hits.length,
          itemBuilder: (context, index) {
            final hit = hits[index];
            return ListTile(
              title: Text(hit.reference),
              subtitle: Text(
                // snippet() wraps matches in braces; rendering them bold is a
                // later refinement, showing them plainly is already useful.
                hit.snippet.replaceAll(RegExp(r'[{}]'), ''),
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
              ),
              onTap: () {
                close(context, null);
                context.go(
                  '/bible/${hit.verse.bookId}'
                  '/${hit.verse.chapterId.split('.').last}',
                );
              },
            );
          },
        );
      },
    );
  }
}
