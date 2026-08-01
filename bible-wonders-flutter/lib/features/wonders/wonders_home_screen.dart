import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../data/reading_paths.dart';
import '../../models/wonder.dart';
import '../../providers.dart';

/// The way in: pick a path, then a wonder.
///
/// The four paths, the sort toggle and the search box are the website's
/// CatalogBrowser, minus the dock. Which wonders they resolve to is decided by
/// visibleWondersProvider, not here.
class WondersHomeScreen extends ConsumerWidget {
  const WondersHomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final repo = ref.watch(wondersProvider);
    final state = ref.watch(pathProvider);
    final controller = ref.read(pathProvider.notifier);
    final wonders = ref.watch(visibleWondersProvider);
    final palette = ref.watch(themeProvider);

    return Scaffold(
      body: DecoratedBox(
        decoration: BoxDecoration(gradient: palette.pageGradient),
        child: CustomScrollView(
          slivers: [
            SliverAppBar.large(
              title: const Text('Wonders and Hope'),
              backgroundColor: Colors.transparent,
            ),

            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
                child: Text(
                  '${repo.count} wonders, each with the passage it happened in.',
                  style: TextStyle(color: palette.shade200),
                ),
              ),
            ),

            /* --- resume ---------------------------------------------------- */
            SliverToBoxAdapter(
              child: _ResumeCard(lastId: ref.watch(lastWonderProvider)),
            ),

            /* --- the four paths -------------------------------------------- */
            SliverToBoxAdapter(
              child: SizedBox(
                height: 48,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  children: [
                    for (final path in ReadingPath.values)
                      Padding(
                        padding: const EdgeInsets.only(right: 8),
                        child: ChoiceChip(
                          label: Text(path.label),
                          selected: state.path == path,
                          onSelected: (_) => controller.setPath(path),
                        ),
                      ),
                  ],
                ),
              ),
            ),

            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
                child: Text(
                  state.path.blurb,
                  style: TextStyle(color: palette.shade200, fontSize: 13),
                ),
              ),
            ),

            /* --- the filter picker, when the path needs one ---------------- */
            if (state.path == ReadingPath.theme && state.theme == null)
              _PickerGrid(
                labels: {
                  for (final t in WonderTheme.values) t: repo.labelFor(t),
                },
                onPick: controller.setTheme,
              )
            else if (state.path == ReadingPath.era && state.era == null)
              _PickerGrid(
                labels: {
                  for (final e in repo.populatedEras()) e: repo.labelForEra(e),
                },
                onPick: controller.setEra,
              )
            else ...[
              SliverToBoxAdapter(
                child: _Toolbar(
                  state: state,
                  controller: controller,
                  count: wonders.length,
                ),
              ),
              SliverList.builder(
                itemCount: wonders.length,
                itemBuilder: (context, index) =>
                    _WonderTile(wonder: wonders[index]),
              ),
            ],

            const SliverToBoxAdapter(child: SizedBox(height: 32)),
          ],
        ),
      ),
    );
  }
}

/// A grid of themes or eras. Generic over the filter type so the two pickers
/// are the same widget.
class _PickerGrid<T> extends StatelessWidget {
  const _PickerGrid({required this.labels, required this.onPick});

  final Map<T, String> labels;
  final ValueChanged<T> onPick;

  @override
  Widget build(BuildContext context) {
    final entries = labels.entries.toList();
    return SliverPadding(
      padding: const EdgeInsets.all(16),
      sliver: SliverGrid.builder(
        gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
          maxCrossAxisExtent: 220,
          mainAxisExtent: 64,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
        ),
        itemCount: entries.length,
        itemBuilder: (context, index) {
          final entry = entries[index];
          return Card(
            child: InkWell(
              borderRadius: BorderRadius.circular(16),
              onTap: () => onPick(entry.key),
              child: Padding(
                padding: const EdgeInsets.all(14),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text(entry.value),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

class _Toolbar extends StatelessWidget {
  const _Toolbar({
    required this.state,
    required this.controller,
    required this.count,
  });

  final PathState state;
  final PathController controller;
  final int count;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextField(
            decoration: const InputDecoration(
              prefixIcon: Icon(Icons.search),
              hintText: 'Search titles and references',
              isDense: true,
              border: OutlineInputBorder(),
            ),
            onChanged: controller.setQuery,
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Text('$count'),
              const Spacer(),
              // Start Here is already an order; offering to re-sort it would
              // undo the curation.
              if (state.path != ReadingPath.startHere)
                SegmentedButton<SortMode>(
                  segments: const [
                    ButtonSegment(
                      value: SortMode.bible,
                      label: Text('Bible order'),
                    ),
                    ButtonSegment(
                      value: SortMode.bestKnown,
                      label: Text('Best known'),
                    ),
                  ],
                  selected: {state.sort},
                  showSelectedIcon: false,
                  onSelectionChanged: (s) => controller.setSort(s.first),
                ),
            ],
          ),
        ],
      ),
    );
  }
}

class _WonderTile extends ConsumerWidget {
  const _WonderTile({required this.wonder});

  final Wonder wonder;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final palette = ref.watch(themeProvider);
    return ListTile(
      title: Text(wonder.title),
      subtitle: Text(
        wonder.passage.label,
        style: TextStyle(color: palette.shade300, fontSize: 12),
      ),
      trailing: wonder.hasParallels
          ? Icon(Icons.call_split, size: 16, color: palette.shade400)
          : null,
      onTap: () => context.go('/wonders/${wonder.id}'),
    );
  }
}

class _ResumeCard extends ConsumerWidget {
  const _ResumeCard({required this.lastId});

  final String? lastId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final id = lastId;
    if (id == null) return const SizedBox.shrink();
    final wonder = ref.watch(wondersProvider).byId(id);
    if (wonder == null) return const SizedBox.shrink();

    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 12),
      child: Card(
        child: ListTile(
          leading: const Icon(Icons.history),
          title: const Text('Continue where you left off'),
          subtitle: Text(wonder.title),
          onTap: () => context.go('/wonders/${wonder.id}'),
        ),
      ),
    );
  }
}
