/**
 * Master index — Old Testament.
 *
 * Every divine wonder involving people, in Bible order. Card prose is written
 * in batches during Phase 7; these rows carry identity, passage and tags.
 *
 * Locked scope rules (PLAN.md):
 *  - miracles only; vision-only scenes and quiet providence are not here
 *  - the plagues of Egypt are ONE grouped wonder
 *  - borderline signs (burning bush, handwriting on the wall) are included
 *
 * Every reference here is checked against the shipped WEB text by
 * `node scripts/validate-wonders.js`.
 */

import { ref } from '@/lib/passages'
import type { Wonder } from './types'

export const OLD_TESTAMENT_WONDERS: Wonder[] = [
  /* --- Torah ------------------------------------------------------------ */
  {
    id: 'enoch-taken',
    title: 'Enoch Taken by God',
    testament: 'old',
    passage: ref('GEN', 'Genesis', '5', 21, 24),
    theme: 'sign',
    era: 'torah',
    quote:
      'Enoch walked with God, and he was not found, for God took him.',
    quoteRef: 'Genesis 5:24',
    details: [
      'Genesis 5 is a chapter of repetitions: every other man in the list lives, has children, and dies.',
      'Enoch is the one break in the pattern — the sentence that should end "and he died" ends differently.',
      'He is given no dramatic scene, no last words, and no grave.',
    ],
    whatHappened:
      'Genesis 5 reads like a register of deaths: a name, a number of years, and then "he died", over and over. Enoch is the exception. The record simply says he walked with God, and then that God took him — and the sentence everyone else gets never arrives.',
    hopeMeaning:
      'It is the quietest wonder in the Bible, and it interrupts the one pattern that looks most unbreakable. Long before anything is explained about what lies beyond death, the text lets one man walk straight past it, as if the ending we all assume is not the only ending there is.',
    reflectionQuestion:
      'What would change about today if the ending you assume is coming turned out not to be the whole story?',
  },
  {
    id: 'the-flood',
    title: 'The Flood',
    testament: 'old',
    passage: ref('GEN', 'Genesis', '7', 17, 24),
    theme: 'judgment',
    era: 'torah',
    quote:
      'Only Noah was left, and those who were with him in the ship.',
    quoteRef: 'Genesis 7:23',
    details: [
      'The water rose for forty days and stayed high for a hundred and fifty more.',
      'The account does not soften what was lost: everything on dry land that breathed.',
      'The ship had been built long before there was any visible reason to build it.',
    ],
    whatHappened:
      'The waters rose until the mountains were covered, and what had been a world became water. The account is unflinching about the scale of it. And in the middle of that page there is one small clause: a ship, a family, and the animals with them, still afloat.',
    hopeMeaning:
      'This is a hard story, and it should not be made comfortable. The hope in it is narrow and stubborn rather than cheerful: even here, the record keeps one thread intact. Judgment is not the last word in the chapter, because the chapter also has a boat in it.',
    reflectionQuestion:
      'When you read something in the Bible that unsettles you, what would it look like to sit with it honestly rather than resolve it quickly?',
  },
  {
    id: 'babel',
    title: 'The Languages Confused at Babel',
    testament: 'old',
    passage: ref('GEN', 'Genesis', '11', 1, 9),
    theme: 'judgment',
    era: 'torah',
    quote:
      'Therefore its name was called Babel, because there Yahweh confused the language of all the earth.',
    quoteRef: 'Genesis 11:9',
    details: [
      'The builders wanted a tower and a name that would keep them from being scattered.',
      'Nothing is knocked down in the story — only the ability to understand each other is taken away.',
      'The scattering they were trying to prevent is exactly what happens.',
    ],
    whatHappened:
      'A united people set out to build a tower tall enough to make a name for themselves and keep themselves together. The tower is never destroyed. What changes is that they can no longer understand one another, and the city they were building simply stops.',
    hopeMeaning:
      'There is mercy hidden in this interruption. A humanity that can do absolutely anything it agrees to do is not obviously a safe thing. Being slowed down, divided, made to need translation — it reads like loss, and it may also be protection from what we would otherwise have built.',
    reflectionQuestion:
      'Is there something you are pushing hard to build that might be better for being slowed down?',
  },
  {
    id: 'sodom-blindness',
    title: 'The Men of Sodom Struck Blind',
    testament: 'old',
    passage: ref('GEN', 'Genesis', '19', 9, 11),
    theme: 'rescue',
    era: 'torah',
    quote:
      'They struck the men who were at the door of the house with blindness, both small and great, so that they wearied themselves to find the door.',
    quoteRef: 'Genesis 19:11',
    details: [
      'A crowd had surrounded the house demanding Lot hand over his guests.',
      'The visitors pull Lot inside to safety before doing anything else.',
      'The blindness is temporary and targeted — it stops an assault without a single blow.',
    ],
    whatHappened:
      'A mob gathered at Lot’s door, and there was no way the household could hold them off. The visitors inside reached out, pulled Lot back in, and struck the crowd blind — so that the men outside wore themselves out groping for a door they could no longer find.',
    hopeMeaning:
      'The rescue here is almost anticlimactic, and that is the point. No one is struck down; the threat is simply disabled. Sometimes help does not look like winning a confrontation. It looks like the danger quietly losing its ability to reach you.',
    reflectionQuestion:
      'Where are you bracing for a confrontation that might not be yours to win by force?',
  },
  {
    id: 'sodom-fire',
    title: 'Fire on Sodom and Gomorrah',
    testament: 'old',
    passage: ref('GEN', 'Genesis', '19', 23, 25),
    theme: 'judgment',
    era: 'torah',
    quote:
      'Then Yahweh rained on Sodom and on Gomorrah sulfur and fire from Yahweh out of the sky.',
    quoteRef: 'Genesis 19:24',
    details: [
      'Abraham had already argued God down to sparing the city for ten righteous people.',
      'The visitors take Lot and his family by the hand and lead them out first.',
      'The sun had fully risen before anything fell.',
    ],
    whatHappened:
      'After a long night, Lot and his family were taken by the hand and walked out of the city. Only once they were clear did the judgment fall on Sodom and Gomorrah, and the plain that had been full of cities was left empty.',
    hopeMeaning:
      'This is judgment, and the text does not apologise for it. What the account keeps insisting on, though, is the delay: the arguing beforehand, the hand on the arm, the waiting until the family is out. Even a story this severe is built around getting particular people to safety first.',
    reflectionQuestion:
      'Is there a hard truth in your life you have been avoiding, that might be safer to face than to keep outrunning?',
  },
  {
    id: 'lots-wife',
    title: "Lot's Wife Becomes a Pillar of Salt",
    testament: 'old',
    passage: ref('GEN', 'Genesis', '19', 26, 26),
    theme: 'judgment',
    era: 'torah',
    quote:
      'But Lot’s wife looked back from behind him, and she became a pillar of salt.',
    quoteRef: 'Genesis 19:26',
    details: [
      'The single instruction given to the family as they left was not to look back.',
      'She is the only one in the household who does.',
      'The whole event is recorded in one sentence, with no explanation offered.',
    ],
    whatHappened:
      'One instruction had been given to the family as they were led out: keep going, and do not look back. In a single verse, without commentary, the account says that Lot’s wife looked back — and stopped there permanently.',
    hopeMeaning:
      'This is the shortest and bleakest wonder in the catalog, and forcing brightness onto it would be dishonest. What it does say plainly is that rescue can be real and still require you to keep walking. Being brought out of something is not the same as being finished with it.',
    reflectionQuestion:
      'What are you still turning around to look at, that you have already been carried out of?',
  },
  {
    id: 'abimelech-healed',
    title: "Abimelech's Household Healed",
    testament: 'old',
    passage: ref('GEN', 'Genesis', '20', 17, 18),
    theme: 'healing',
    era: 'torah',
    quote:
      'Abraham prayed to God. So God healed Abimelech, his wife, and his female servants, and they bore children.',
    quoteRef: 'Genesis 20:17',
    details: [
      'Abraham had lied about Sarah being his wife, and Abimelech had acted on that lie in good faith.',
      'The one who caused the trouble is the one asked to pray about it.',
      'A whole household is healed, not only the man at the centre of the story.',
    ],
    whatHappened:
      'Abraham had passed Sarah off as his sister, and Abimelech, believing him, had taken her into his household. When the truth came out, it was Abraham — the one whose lie caused all of it — who prayed, and Abimelech’s entire household was healed.',
    hopeMeaning:
      'The person God works through here is not the wronged party or the innocent one. It is the man who created the mess. Being the cause of a problem apparently does not disqualify you from being part of how it gets mended.',
    reflectionQuestion:
      'Is there a situation you have stayed out of because you were the one who caused it?',
  },
  {
    id: 'isaac-born',
    title: 'Isaac Born to Sarah',
    testament: 'old',
    passage: ref('GEN', 'Genesis', '21', 1, 3),
    theme: 'provision',
    era: 'torah',
    quote:
      'Yahweh visited Sarah as He had said, and Yahweh did to Sarah as He had spoken.',
    quoteRef: 'Genesis 21:1',
    details: [
      'Sarah was long past childbearing years, and had laughed when she first heard the promise.',
      'The promise had been made and repeated for decades before this.',
      'The verse says twice, in two different ways, that what was said is what happened.',
    ],
    whatHappened:
      'Sarah had been promised a son for so long that she had laughed at the idea, and the years since had done nothing to make it more plausible. Then, at the time that had been named, she conceived and bore a son, and they called him Isaac.',
    hopeMeaning:
      'What is striking is not speed but keeping. The wait had been long enough that laughing at it was a reasonable response. Hope here is not the feeling that something will happen soon — it is that a promise can still be alive after the point where you have stopped expecting anything from it.',
    reflectionQuestion:
      'Is there something you have quietly stopped expecting, that you have not actually been told is over?',
  },
  {
    id: 'hagar-well',
    title: 'A Well Opened for Hagar',
    testament: 'old',
    passage: ref('GEN', 'Genesis', '21', 15, 19),
    theme: 'provision',
    era: 'torah',
    quote:
      'God opened her eyes, and she saw a well of water.',
    quoteRef: 'Genesis 21:19',
    details: [
      'Hagar and her son had been sent away with bread and one container of water.',
      'When the water ran out she put the boy under a bush and sat far enough away not to watch him die.',
      'The well is not created in the story — it was already there, and she is given the ability to see it.',
    ],
    whatHappened:
      'Sent out into the desert with a child and a single container of water, Hagar ran out. She left her son in what shade she could find, sat down out of sight of him, and wept. Then God opened her eyes and she saw a well — and went and filled the container.',
    hopeMeaning:
      'The wording matters. The well is not made; her eyes are opened. Sometimes what has run out is not the provision but the ability to perceive it, and help arrives as sight rather than supply.',
    reflectionQuestion:
      'Is it possible that something you need is nearer than it feels, and what you are short of is the ability to see it?',
  },
  {
    id: 'rachel-remembered',
    title: 'Rachel Remembered',
    testament: 'old',
    passage: ref('GEN', 'Genesis', '30', 22, 24),
    theme: 'provision',
    era: 'torah',
    quote:
      'God remembered Rachel, and God listened to her, and opened her womb.',
    quoteRef: 'Genesis 30:22',
    details: [
      'Rachel had watched her sister bear son after son while she had none.',
      'The chapter is full of rivalry, bargaining and bitterness before this verse arrives.',
      'The word used is "remembered", as though she had not been out of mind at all.',
    ],
    whatHappened:
      'Rachel had spent years watching her sister have children while she had none, and the household had grown bitter with the competing. Then, in the middle of a chapter full of that rivalry, one sentence turns: God remembered her, and listened, and she conceived.',
    hopeMeaning:
      'To "remember" someone in these accounts is not to suddenly recall a forgotten name. It means to act on their behalf at last. In a story where Rachel had every reason to believe she had been passed over, the text says she had been heard the whole time.',
    reflectionQuestion:
      'Where do you feel passed over while watching someone else receive what you wanted?',
  },
  {
    id: 'jacob-wrestles',
    title: 'Jacob Wrestles until Daybreak',
    testament: 'old',
    passage: ref('GEN', 'Genesis', '32', 24, 32),
    theme: 'sign',
    era: 'torah',
    quote:
      'I have seen God face to face, and my life is preserved.',
    quoteRef: 'Genesis 32:30',
    details: [
      'Jacob was alone at night, the day before meeting the brother he had cheated and fled from.',
      'The struggle lasts until daybreak, and Jacob refuses to let go without a blessing.',
      'He leaves with a new name and a permanent limp.',
    ],
    whatHappened:
      'Alone the night before facing the brother he had cheated years earlier, Jacob wrestled with a man until dawn. He would not let go without a blessing, and he got one — along with a new name and a hip that never worked properly again.',
    hopeMeaning:
      'This is a strange kind of hope: Jacob wins, and is injured in the winning. He is renamed for having struggled rather than for having behaved well. The account does not treat the wrestling as a failure of faith. It treats it as the night his life turned.',
    reflectionQuestion:
      'What are you wrestling with that you have been treating as a failure, rather than as the place something is turning?',
  },
  {
    id: 'burning-bush',
    title: 'The Burning Bush',
    testament: 'old',
    passage: ref('EXO', 'Exodus', '3', 1, 6),
    theme: 'sign',
    era: 'torah',
    familiarityRank: 14,
    quote:
      'He looked, and behold, the bush burned with fire, and the bush was not consumed.',
    quoteRef: 'Exodus 3:2',
    details: [
      'Moses was eighty, working as a shepherd, forty years after fleeing Egypt for killing a man.',
      'What stops him is not the fire but the fact that the bush is still there.',
      'He is told to take off his sandals before he is told what the job is.',
    ],
    whatHappened:
      'Moses had been out of Egypt for forty years, keeping someone else’s sheep, when he noticed a bush on fire that was not burning up. He turned aside to look — and was spoken to from the middle of it, and sent back to the country he had run away from.',
    hopeMeaning:
      'A fire that consumes nothing is a strange thing to build a calling on, but it fits. What interrupts Moses is not destruction but something that burns and does not use itself up. He is eighty, disqualified, and out of the story — and that turns out not to be the end of his usefulness.',
    reflectionQuestion:
      'Is there a part of your life you have written off as finished, that might not be finished at all?',
  },
  {
    id: 'staff-to-serpent',
    title: "Moses' Staff Becomes a Snake",
    testament: 'old',
    passage: ref('EXO', 'Exodus', '4', 1, 5),
    theme: 'sign',
    era: 'torah',
    quote:
      'He threw it on the ground, and it became a snake; and Moses ran away from it.',
    quoteRef: 'Exodus 4:3',
    details: [
      'Moses had just argued that no one would believe him.',
      'The sign uses the ordinary shepherd’s rod already in his hand.',
      'He is told to pick the snake up by the tail — the least safe way to hold one.',
    ],
    whatHappened:
      'Told to go and speak for a whole nation, Moses objected that nobody would believe him. He was asked what was in his hand — a shepherd’s rod — and told to throw it down. It became a snake, and he ran. Then he was told to pick it up, and it was a rod again.',
    hopeMeaning:
      'Nothing new is handed to Moses. The thing that becomes the sign is the tool he was already carrying to work every day. What he needs is not equipment he lacks but a different relationship with what is already in his hand.',
    reflectionQuestion:
      'What is already in your hand that you have never thought of as useful for anything larger?',
  },
  {
    id: 'moses-hand-leprous',
    title: "Moses' Hand Made Leprous and Restored",
    testament: 'old',
    passage: ref('EXO', 'Exodus', '4', 6, 7),
    theme: 'sign',
    era: 'torah',
    quote:
      'He put his hand inside his cloak again, and when he took it out of his cloak, behold, it had turned again as his other flesh.',
    quoteRef: 'Exodus 4:7',
    details: [
      'This is the second of three signs given to a man who kept saying no.',
      'Leprosy was the most isolating condition a person could have.',
      'The same gesture that caused it undoes it.',
    ],
    whatHappened:
      'Still arguing that he was the wrong man, Moses was told to put his hand inside his cloak. He took it out white with disease. He put it back, took it out again — and it was ordinary skin.',
    hopeMeaning:
      'The sign runs in both directions, and quickly. The condition that put people outside the camp for life is shown to be reversible in the space of one gesture. Whatever else Moses doubted, he was being shown that nothing here was permanent unless it was allowed to be.',
    reflectionQuestion:
      'What have you assumed about yourself is permanent, and how long has it been since you tested that?',
  },
  {
    // One wonder by design: the ten plagues are a single sustained act. The
    // anchor opens at the first plague; alsoSee walks the rest in order.
    id: 'plagues-of-egypt',
    title: 'The Ten Plagues of Egypt',
    testament: 'old',
    passage: ref('EXO', 'Exodus', '7', 14, 25),
    theme: 'judgment',
    era: 'torah',
    familiarityRank: 15,
    alsoSee: [
      ref('EXO', 'Exodus', '8', 1, 15),
      ref('EXO', 'Exodus', '8', 16, 19),
      ref('EXO', 'Exodus', '8', 20, 32),
      ref('EXO', 'Exodus', '9', 1, 7),
      ref('EXO', 'Exodus', '9', 8, 12),
      ref('EXO', 'Exodus', '9', 13, 35),
      ref('EXO', 'Exodus', '10', 1, 20),
      ref('EXO', 'Exodus', '10', 21, 29),
      ref('EXO', 'Exodus', '12', 29, 32),
    ],
    quote:
      "The Egyptians couldn’t drink water from the river. The blood was throughout all the land of Egypt.",
    quoteRef: 'Exodus 7:21',
    details: [
      'Ten plagues in all, escalating from the river to the livestock to the sky to the firstborn.',
      'Each one lands on something Egypt regarded as reliable or divine.',
      'Pharaoh agrees to let the people go several times, then changes his mind.',
    ],
    whatHappened:
      'The confrontation with Pharaoh ran through ten escalating disasters, beginning with the Nile itself turning to blood and ending with a loss so severe that Egypt urged Israel out. In between, Pharaoh agreed and then reneged, again and again.',
    hopeMeaning:
      'It is a long, grinding sequence, and its length is the point: the same request refused ten times over. For people who have been told no repeatedly by something far more powerful than them, this account insists that a hardened no is not the same as a final one.',
    reflectionQuestion:
      'Where have you accepted a "no" as final that may simply have been the latest one?',
  },
  {
    id: 'pillar-cloud-fire',
    title: 'The Pillar of Cloud and Fire',
    testament: 'old',
    passage: ref('EXO', 'Exodus', '13', 20, 22),
    theme: 'sign',
    era: 'torah',
    quote:
      'The pillar of cloud by day, and the pillar of fire by night, didn’t depart from before the people.',
    quoteRef: 'Exodus 13:22',
    details: [
      'The people had never travelled this route and had no map for it.',
      'The cloud shaded the desert by day; the fire lit the way by night.',
      'It moved with them, day after day, for forty years.',
    ],
    whatHappened:
      'Newly out of Egypt and heading into desert they did not know, the people were given something to follow: a column of cloud through the day and of fire through the night. It went ahead of them, and it did not leave.',
    hopeMeaning:
      'This is guidance as presence rather than instruction. Nobody is handed a route. They are given something to keep following, one day at a time — and the promise attached to it is not that the way will be short, but that the guide will not go away.',
    reflectionQuestion:
      'Would it be enough, today, to know the next step rather than the whole route?',
  },
  {
    id: 'red-sea',
    title: 'Parting of the Red Sea',
    location: 'The shore of the Red Sea, at the edge of Egypt',
    testament: 'old',
    passage: ref('EXO', 'Exodus', '14', 21, 31),
    theme: 'rescue',
    era: 'torah',
    familiarityRank: 1,
    quote:
      'The children of Israel went into the middle of the sea on the dry ground; and the waters were a wall to them on their right hand and on their left.',
    quoteRef: 'Exodus 14:22',
    details: [
      "Pharaoh's entire army — chariots, horses, soldiers — was closing in from behind, with the sea blocking every other way out.",
      'Moses simply raised his hand, and a strong wind blew all night until the sea floor was dry enough to walk on.',
      'The same waters that opened for Israel closed again over the army chasing them.',
    ],
    whatHappened:
      "The people of Israel had just escaped slavery in Egypt, and now they were trapped — the sea in front of them, Pharaoh's army closing in behind. There was nowhere to run. Then the sea itself opened a path, and an entire nation walked across on dry ground.",
    hopeMeaning:
      "This is the miracle so many other Bible writers point back to, because it says something so simple: the situation that looked completely sealed shut wasn't. When every visible option is gone, that isn't the same as being out of options.",
    reflectionQuestion:
      "Is there a place in your life right now that feels sealed shut on every side — where you can't see a way through?",
  },
  {
    id: 'marah-water',
    title: 'Bitter Water Made Sweet at Marah',
    testament: 'old',
    passage: ref('EXO', 'Exodus', '15', 22, 25),
    theme: 'provision',
    era: 'torah',
    quote:
      'Yahweh showed him a tree, and He threw it into the waters, and the waters were made sweet.',
    quoteRef: 'Exodus 15:25',
    details: [
      'This happens three days after the sea opened and they walked out of Egypt.',
      'The problem is not that there is no water — it is that the water is undrinkable.',
      'The remedy is a tree thrown into the pool, not a new spring.',
    ],
    whatHappened:
      'Three days past the greatest rescue of their lives, the people found water they could not drink. Bitter, and everywhere. Moses cried out, was shown a tree, threw it in — and the same pool became drinkable.',
    hopeMeaning:
      'Nothing is replaced. The bitter water is what they end up drinking; it is changed rather than swapped. And the timing is honest about faith: three days after a miracle, they were thirsty and complaining, and were helped anyway.',
    reflectionQuestion:
      'Is there something in your life you keep waiting to be replaced, that might instead be changed?',
  },
  {
    id: 'manna',
    title: 'Manna from Heaven',
    location: 'The wilderness of Sin, on the way to Sinai',
    testament: 'old',
    passage: ref('EXO', 'Exodus', '16', 4, 15),
    theme: 'provision',
    era: 'torah',
    familiarityRank: 10,
    quote: 'It is the bread which Yahweh has given you to eat.',
    quoteRef: 'Exodus 16:15',
    details: [
      "The people had just complained they'd rather have stayed slaves in Egypt than starve in the desert.",
      'Every morning, a thin flaky substance appeared on the ground with the dew — enough for that day, no more.',
      'It kept appearing every single day for the next forty years, until they no longer needed it.',
    ],
    whatHappened:
      'Free, but hungry, with no fields to farm in the desert, the people ran out of food within weeks of their escape. So a strange bread began appearing on the ground each morning — as much as each family needed for that one day, and no more.',
    hopeMeaning:
      "This isn't a one-time rescue; it's daily provision, repeated for forty years. Hope here doesn't look like one dramatic moment — it looks like showing up again and again, exactly enough, exactly on time.",
    reflectionQuestion:
      'What would it look like to trust for just today, instead of trying to secure your whole future at once?',
  },
  {
    id: 'water-from-rock-horeb',
    title: 'Water from the Rock at Horeb',
    testament: 'old',
    passage: ref('EXO', 'Exodus', '17', 1, 7),
    theme: 'provision',
    era: 'torah',
    quote:
      'You shall strike the rock, and water will come out of it, that the people may drink.',
    quoteRef: 'Exodus 17:6',
    details: [
      'The people were close to rioting; Moses says they were nearly ready to stone him.',
      'The question underneath the complaint was whether God was with them at all.',
      'Moses is told to take the elders — witnesses — with him.',
    ],
    whatHappened:
      'Camped with no water and an angry crowd, Moses was told to take the elders, walk ahead, and strike a rock at Horeb. Water came out of it, and the people drank. He named the place after the quarrel.',
    hopeMeaning:
      'The place keeps the name of the argument, not the miracle. That honesty is worth noticing: the record does not tidy up the fact that this provision arrived in the middle of a bitter, faithless row about whether God was there at all.',
    reflectionQuestion:
      'Does doubting out loud feel to you like something that disqualifies you from being helped?',
  },
  {
    id: 'amalek-defeated',
    title: "Amalek Defeated while Moses' Hands Are Held Up",
    testament: 'old',
    passage: ref('EXO', 'Exodus', '17', 8, 13),
    theme: 'rescue',
    era: 'torah',
    quote:
      'Aaron and Hur held up his hands, the one on the one side, and the other on the other side.',
    quoteRef: 'Exodus 17:12',
    details: [
      'Israel prevailed while Moses’ hands were up, and lost ground when they dropped.',
      'Moses could not keep them up on his own — his arms simply gave out.',
      'Two men sat him on a stone and held his arms up until sunset.',
    ],
    whatHappened:
      'While Moses held his hands up, the battle went Israel’s way; when they sagged, it turned. His arms gave out, so Aaron and Hur put a stone under him and held his hands up on either side until the sun went down.',
    hopeMeaning:
      'The wonder here needed three people, and two of them were only holding up someone else’s arms. It is a plain picture of how help usually arrives: not as new strength inside you, but as somebody sitting down beside you and taking the weight.',
    reflectionQuestion:
      'Who could take one arm, if you told them you were not managing on your own?',
  },
  {
    id: 'sinai-descent',
    title: 'Yahweh Descends on Mount Sinai',
    testament: 'old',
    passage: ref('EXO', 'Exodus', '19', 16, 20),
    theme: 'sign',
    era: 'torah',
    quote:
      'All of Mount Sinai smoked, because Yahweh descended on it in fire; and its smoke ascended like the smoke of a furnace, and the whole mountain quaked greatly.',
    quoteRef: 'Exodus 19:18',
    details: [
      'The people had spent three days preparing and were kept back from the mountain.',
      'Smoke, fire, a trembling mountain and a trumpet growing steadily louder.',
      'When Moses spoke, he was answered aloud.',
    ],
    whatHappened:
      'After three days of preparation, the mountain went dark with smoke and shook, fire came down on it, and a trumpet sounded louder and louder. Moses spoke into that, and was answered — and was called up the mountain.',
    hopeMeaning:
      'This is not a comforting scene, and it is not meant to be. Something enormous comes near enough to shake the ground. Its hope is of a heavier kind: whatever is behind all this is not remote or indifferent, and it came down.',
    reflectionQuestion:
      'What would change if the God you think of as distant turned out to be nearer than that?',
  },
  {
    id: 'moses-face-shines',
    title: "Moses' Face Shines",
    testament: 'old',
    passage: ref('EXO', 'Exodus', '34', 29, 35),
    theme: 'sign',
    era: 'torah',
    quote:
      'Moses didn’t know that the skin of his face shone by reason of his speaking with him.',
    quoteRef: 'Exodus 34:29',
    details: [
      'Moses had been on the mountain forty days.',
      'He is the only person in the account who cannot see the change.',
      'The others were afraid to come near him until he called them.',
    ],
    whatHappened:
      'Moses came down the mountain carrying the tablets, and his face was shining. Everyone could see it except him — he had no idea — and the people were afraid to come close until he called them over.',
    hopeMeaning:
      'The change is real, visible to everyone else, and completely invisible to the person it happened to. That is worth holding onto if you have ever felt that nothing in you is different: you are the last person positioned to notice.',
    reflectionQuestion:
      'What might other people be able to see in you that you cannot see in yourself?',
  },
  {
    id: 'fire-consumes-offering',
    title: 'Fire Consumes the Offering',
    testament: 'old',
    passage: ref('LEV', 'Leviticus', '9', 22, 24),
    theme: 'sign',
    era: 'torah',
    quote:
      'Fire came out from before Yahweh, and consumed the burnt offering and the fat upon the altar.',
    quoteRef: 'Leviticus 9:24',
    details: [
      'This was the first service after the tabernacle was set up.',
      'Aaron and Moses blessed the people before anything happened.',
      'The people shouted and fell on their faces.',
    ],
    whatHappened:
      'At the first service in the newly built tabernacle, Moses and Aaron came out and blessed the people. Fire came out and consumed what was on the altar, and the whole crowd shouted and fell on their faces.',
    hopeMeaning:
      'A great deal of careful, unglamorous work had gone into building and preparing this — and then something arrived that no amount of preparation could have manufactured. Faithful ordinary work and unmistakable answer are not opposites here; one made room for the other.',
    reflectionQuestion:
      'What ordinary, unglamorous preparation are you in the middle of right now?',
  },
  {
    id: 'nadab-abihu',
    title: 'Nadab and Abihu Consumed',
    testament: 'old',
    passage: ref('LEV', 'Leviticus', '10', 1, 3),
    theme: 'judgment',
    era: 'torah',
    quote:
      'Fire came out from before Yahweh, and devoured them, and they died before Yahweh.',
    quoteRef: 'Leviticus 10:2',
    details: [
      'Nadab and Abihu were Aaron’s own sons, newly made priests.',
      'They offered fire that had not been commanded.',
      'The account gives Aaron no speech: it says only that he held his peace.',
    ],
    whatHappened:
      'Immediately after the first service, two of Aaron’s sons offered fire that had not been asked for. Fire came out and they died. Moses spoke a few words to their father about holiness, and the account records that Aaron said nothing at all.',
    hopeMeaning:
      'There is no comfort offered inside this story and it would be wrong to invent some. What the text does is refuse to look away, and then it sits with a father’s silence rather than explaining it. Sometimes the honest response to God is no words, and scripture makes room for that.',
    reflectionQuestion:
      'Is there a grief or a question you have felt you were supposed to have words for?',
  },
  {
    id: 'fire-at-taberah',
    title: 'Fire at Taberah',
    testament: 'old',
    passage: ref('NUM', 'Numbers', '11', 1, 3),
    theme: 'judgment',
    era: 'torah',
    quote:
      'The people cried to Moses; and Moses prayed to Yahweh, and the fire abated.',
    quoteRef: 'Numbers 11:2',
    details: [
      'The complaining is not quoted — the account does not even tell us what it was about.',
      'The fire burns at the edges of the camp, not through it.',
      'The place is named after the fire, so the memory is kept rather than buried.',
    ],
    whatHappened:
      'The people were complaining, and fire broke out at the edges of the camp. They cried out to Moses, Moses prayed, and the fire died down. They named the place after it.',
    hopeMeaning:
      'The sequence is very short: trouble, a cry, a prayer, and it stops. Nobody is required to fix themselves first or explain themselves well. The turning point in the story is simply that somebody asked.',
    reflectionQuestion:
      'What would it cost you to ask for help before you have worked out how to explain yourself?',
  },
  {
    id: 'quail-kibroth',
    title: 'Quail and the Plague at Kibroth Hattaavah',
    testament: 'old',
    passage: ref('NUM', 'Numbers', '11', 31, 34),
    theme: 'provision',
    era: 'torah',
    quote:
      'While the meat was still between their teeth, before it was chewed, Yahweh’s anger burned against the people, and Yahweh struck the people with a very great plague.',
    quoteRef: 'Numbers 11:33',
    details: [
      'The people had been sick of manna and demanded meat.',
      'The quail arrived in such quantity that gathering took a day, a night and another day.',
      'The account is blunt that getting exactly what they demanded did not go well for them.',
    ],
    whatHappened:
      'Tired of manna, the people demanded meat. A wind brought quail in astonishing numbers, and they gathered for a day and a night and another day. The account then says plainly that the craving satisfied so completely turned into a plague among them.',
    hopeMeaning:
      'This is the uncomfortable one: they asked, and they received, and receiving was the problem. It is a sober note in a catalog of rescues — that getting precisely what we insist on is not always the kindest possible answer.',
    reflectionQuestion:
      'Is there something you have been demanding that you would not actually want handed to you in full?',
  },
  {
    id: 'miriam-leprosy',
    title: "Miriam's Leprosy and Healing",
    testament: 'old',
    passage: ref('NUM', 'Numbers', '12', 9, 15),
    theme: 'healing',
    era: 'torah',
    quote:
      'Moses cried to Yahweh, saying, “Heal her, God, I beg you!”',
    quoteRef: 'Numbers 12:13',
    details: [
      'Miriam had spoken against Moses; the consequence fell on her.',
      'Moses, the one she had criticised, is the one who prays for her.',
      'The entire nation stayed camped where it was for seven days until she could come back.',
    ],
    whatHappened:
      'Miriam spoke against her brother Moses and was struck with leprosy. Aaron begged Moses not to hold it against them, and Moses — the one she had criticised — cried out for her healing in seven words. She was shut outside the camp seven days, and the whole nation waited, not moving on until she was brought back in.',
    hopeMeaning:
      'Two things sit side by side here. The shortest prayer in the story is prayed by the wronged party for the person who wronged him. And a nation of thousands simply stops for a week rather than travel on without one woman.',
    reflectionQuestion:
      'Is there someone you would find it hard to pray for, because of what they said about you?',
  },
  {
    id: 'korah-swallowed',
    title: "The Earth Swallows Korah's Company",
    testament: 'old',
    passage: ref('NUM', 'Numbers', '16', 28, 35),
    theme: 'judgment',
    era: 'torah',
    quote:
      'The earth opened its mouth and swallowed them up with their households, all of Korah’s men, and all their goods.',
    quoteRef: 'Numbers 16:32',
    details: [
      'Korah led a rebellion against Moses and Aaron’s leadership.',
      'The ground itself is what answers, splitting apart under those who had gathered.',
      'Everyone standing nearby ran, afraid the same thing would happen to them.',
    ],
    whatHappened:
      'Korah gathered a rebellion against Moses and Aaron. As Moses finished speaking, the ground under them split and closed over them, and fire consumed the two hundred and fifty men who had brought incense. Everyone else fled.',
    hopeMeaning:
      'This is a story about judgment, and softening it would be dishonest. What it says, uncomfortably, is that the ordinary ground can stop being neutral. It is a warning rather than a comfort — and a catalog that only kept the comforting parts would not be telling the truth about the book.',
    reflectionQuestion:
      'What do you do with the parts of scripture that frighten you rather than reassure you?',
  },
  {
    id: 'aarons-rod-buds',
    title: "Aaron's Rod Buds",
    testament: 'old',
    passage: ref('NUM', 'Numbers', '17', 1, 9),
    theme: 'sign',
    era: 'torah',
    quote:
      'Aaron’s rod for the house of Levi had sprouted, budded, produced blossoms, and bore ripe almonds.',
    quoteRef: 'Numbers 17:8',
    details: [
      'Twelve dead staffs were laid up overnight to settle who had been chosen.',
      'Only one changed — and it did not merely sprout, it went all the way to ripe fruit.',
      'A dispute that had cost lives was ended by something growing quietly overnight.',
    ],
    whatHappened:
      'To settle a bitter argument about who had been chosen, twelve staffs were laid up overnight. In the morning eleven were still dead wood. Aaron’s had sprouted, budded, blossomed and borne ripe almonds — every stage at once.',
    hopeMeaning:
      'A cut staff is about as final as dead things get. This one skipped past every stage of growth in a night. Where an argument had been settled by force before, it is settled this time by something quietly coming back to life.',
    reflectionQuestion:
      'What in your life looks like cut wood — finished, past growing — that you have stopped watching?',
  },
  {
    id: 'water-from-rock-meribah',
    title: 'Water from the Rock at Meribah',
    testament: 'old',
    passage: ref('NUM', 'Numbers', '20', 7, 13),
    theme: 'provision',
    era: 'torah',
    quote:
      'Moses lifted up his hand, and struck the rock with his rod twice, and water came out abundantly.',
    quoteRef: 'Numbers 20:11',
    details: [
      'This is the second time water comes from a rock, decades after the first.',
      'Moses was told to speak to the rock; he struck it twice and spoke angrily to the people.',
      'The water still came, in abundance — and Moses was still told he would not enter the land.',
    ],
    whatHappened:
      'Out of water again, Moses gathered the people, called them rebels, and struck the rock twice instead of speaking to it as he had been told. Water poured out anyway, enough for the people and their livestock — and Moses was told that he would not lead them into the land.',
    hopeMeaning:
      'This is a strange, painful mercy. The people were not made to go thirsty because their leader got it wrong; the water came abundantly regardless. The consequence fell on Moses, not on the crowd depending on him.',
    reflectionQuestion:
      'Have you assumed that your worst moment must have cost the people depending on you?',
  },
  {
    id: 'bronze-serpent',
    title: 'The Bronze Serpent',
    testament: 'old',
    passage: ref('NUM', 'Numbers', '21', 4, 9),
    theme: 'healing',
    era: 'torah',
    familiarityRank: 16,
    quote:
      'Moses made a serpent of bronze, and set it on the pole. If a serpent had bitten any man, when he looked at the serpent of bronze, he lived.',
    quoteRef: 'Numbers 21:9',
    details: [
      'The people had spoken against God and against Moses, and snakes came among the camp.',
      'The snakes are not removed — the remedy works while the danger is still present.',
      'All that is asked of the bitten is that they look.',
    ],
    whatHappened:
      'Venomous snakes came through the camp and many died. The people admitted they had been wrong and asked for the snakes to be taken away. Instead, Moses was told to make a bronze snake and lift it on a pole: anyone bitten who looked at it, lived.',
    hopeMeaning:
      'They asked for the danger to be removed and it was not. What they got instead was a way to survive inside it. And the required action is almost nothing — not a journey or a payment, just turning your head and looking.',
    reflectionQuestion:
      'If help came as a way through rather than a way out, would you recognise it as help?',
  },
  {
    id: 'balaams-donkey',
    title: "Balaam's Donkey Speaks",
    testament: 'old',
    passage: ref('NUM', 'Numbers', '22', 21, 35),
    theme: 'sign',
    era: 'torah',
    quote:
      'Yahweh opened the mouth of the donkey, and she said to Balaam, “What have I done to you, that you have struck me these three times?”',
    quoteRef: 'Numbers 22:28',
    details: [
      'The donkey had seen the angel in the road three times and turned aside each time.',
      'Balaam, the professional seer, could see nothing at all.',
      'The donkey’s protest is not a sermon — it is a complaint about being hit.',
    ],
    whatHappened:
      'A donkey kept refusing to go forward, and was beaten three times for it. She had been seeing an armed angel standing in the road that her rider, a professional seer, could not see. Then she spoke, and asked why she was being struck. Only afterwards were Balaam’s own eyes opened.',
    hopeMeaning:
      'There is something disarming about who sees clearly here. The expert is blind and the animal he is beating has been protecting him the whole time. Correction arrives from the least prestigious possible direction — and it still counts.',
    reflectionQuestion:
      'Where might a correction be coming to you from someone you have not been inclined to take seriously?',
  },

  /* --- Conquest and Judges ---------------------------------------------- */
  {
    id: 'jordan-stopped',
    title: 'The Jordan Stops for Israel',
    testament: 'old',
    passage: ref('JOS', 'Joshua', '3', 14, 17),
    theme: 'rescue',
    era: 'conquest',
    quote:
      'The priests who bore the ark of Yahweh’s covenant stood firm on dry ground in the middle of the Jordan; and all Israel crossed over on dry ground, until all the nation had passed completely over the Jordan.',
    quoteRef: 'Joshua 3:17',
    details: [
      'The Jordan was at its fullest — the account notes it overflows its banks all through harvest.',
      'The water did not stop until the priests’ feet were already in it.',
      'The priests then stood in the riverbed while the entire nation walked past them.',
    ],
    whatHappened:
      'The river was in full flood when Israel came to cross it. The water only stopped once the priests carrying the ark had stepped into the edge of it — and then it piled up far upstream, and the whole nation walked across on dry ground while the priests stood in the middle.',
    hopeMeaning:
      'The order of events is the hard part. The river did not part and then invite them in; they had to put their feet in a flooded river first. Some things do not open until you are already committed to them.',
    reflectionQuestion:
      'What are you waiting to see open before you step towards it?',
  },
  {
    id: 'jericho',
    title: 'The Walls of Jericho',
    location: 'Jericho, the first fortified city inside the promised land',
    testament: 'old',
    passage: ref('JOS', 'Joshua', '6', 15, 20),
    theme: 'rescue',
    era: 'conquest',
    familiarityRank: 8,
    quote:
      'When the people heard the sound of the trumpet, the people shouted with a great shout, and the wall fell down flat, so that the people went up into the city, every man straight in front of him, and they took the city.',
    quoteRef: 'Joshua 6:20',
    details: [
      "Jericho's walls were high, thick, and built to withstand a siege — there was no obvious way in.",
      'Instead of attacking, Israel was told to march silently around the city once a day for six days, then seven times on the seventh.',
      'There was no battering ram and no ladder. The walls simply fell, all at once, on cue.',
    ],
    whatHappened:
      "Jericho stood in the way of Israel entering the land they'd been promised — a walled city built to keep armies out. Rather than fighting their way in, Israel was told to walk, in silence, for a week, and then shout. That's it. And the wall came down.",
    hopeMeaning:
      "There's no strategy here a general would recommend. The instructions look pointless right up until the moment they work. Sometimes faith looks exactly like that — doing the small, unimpressive thing you've been asked to do, long before you can see why.",
    reflectionQuestion:
      "Is there something small and unimpressive you keep putting off, because it doesn't look like it could possibly be enough?",
  },
  {
    id: 'hailstones-amorites',
    title: 'Great Stones Fall on the Amorites',
    testament: 'old',
    passage: ref('JOS', 'Joshua', '10', 9, 11),
    theme: 'judgment',
    era: 'conquest',
    quote:
      'There were more who died from the hailstones than those whom the children of Israel killed with the sword.',
    quoteRef: 'Joshua 10:11',
    details: [
      'Israel had marched all night to reach the battle.',
      'The stones fell on the fleeing army as it ran down the pass at Beth Horon.',
      'The account is explicit that the sky did more damage than the army did.',
    ],
    whatHappened:
      'After an all-night march, Israel routed the Amorite kings. As the enemy fled down the descent of Beth Horon, great stones fell out of the sky on them — and the record notes plainly that more died from the hail than from Israel’s swords.',
    hopeMeaning:
      'Israel had done the hard part: the night march, the fight. And the account still insists that the larger share of the outcome was not theirs. Effort and outcome are related here, but they are not the same thing, and the text is careful to say so.',
    reflectionQuestion:
      'Where might you be quietly taking credit for an outcome that was not all your doing?',
  },
  {
    id: 'sun-stands-still',
    title: 'The Sun Stands Still over Gibeon',
    testament: 'old',
    passage: ref('JOS', 'Joshua', '10', 12, 14),
    theme: 'nature',
    era: 'conquest',
    quote:
      'There was no day like that before it or after it, that Yahweh listened to the voice of a man; for Yahweh fought for Israel.',
    quoteRef: 'Joshua 10:14',
    details: [
      'Joshua spoke it out loud, in front of everyone, rather than praying quietly.',
      'The account cites an older book, Jashar, as its source.',
      'What the writer finds remarkable is not the sun, but that a man was listened to.',
    ],
    whatHappened:
      'In the middle of a battle that was running out of daylight, Joshua said out loud, in front of Israel, that the sun should stand still — and the day held. The account quotes an older book for it, and then adds its own astonishment.',
    hopeMeaning:
      'Notice where the writer puts the wonder. Not on the sky: on the fact that God listened to the voice of a man. The largest thing in the story, to the person telling it, is that somebody asked and was heard.',
    reflectionQuestion:
      'Do you find it easier to believe that God can act, or that God would listen to you specifically?',
  },
  {
    id: 'gideon-fire-rock',
    title: 'Fire out of the Rock for Gideon',
    testament: 'old',
    passage: ref('JDG', 'Judges', '6', 19, 24),
    theme: 'sign',
    era: 'conquest',
    quote:
      'Then Yahweh’s angel stretched out the end of the staff that was in His hand, and touched the meat and the unleavened cakes; and fire went up out of the rock and consumed the meat and the unleavened cakes.',
    quoteRef: 'Judges 6:21',
    details: [
      'Gideon had been threshing wheat in a winepress to hide it from raiders.',
      'He prepared a meal for his visitor, not an offering.',
      'The moment the food was consumed, the angel was gone.',
    ],
    whatHappened:
      'Gideon, hiding his grain from raiders, was told he would save Israel — and asked for something to confirm it. He brought out a meal. His visitor touched it with the end of a staff, fire came up out of the rock and consumed it, and the angel vanished.',
    hopeMeaning:
      'What Gideon brought was hospitality, not sacrifice: a meal for a guest. It was accepted anyway, and turned into the sign he had asked for. The ordinary thing he had to offer was enough to work with.',
    reflectionQuestion:
      'What ordinary thing could you offer, if you stopped waiting until you had something more impressive?',
  },
  {
    id: 'gideon-fleece',
    title: "Gideon's Fleece",
    testament: 'old',
    passage: ref('JDG', 'Judges', '6', 36, 40),
    theme: 'sign',
    era: 'conquest',
    quote:
      'God did so that night; for it was dry on the fleece only, and there was dew on all the ground.',
    quoteRef: 'Judges 6:40',
    details: [
      'Gideon had already been given a sign, and asked for another.',
      'Then he asked for the same test again, reversed, apologising as he asked.',
      'Both times, he got exactly what he asked for.',
    ],
    whatHappened:
      'Having already been given one sign, Gideon asked for another: dew on a fleece and dry ground around it. He got it. Then he asked for the reverse — dry fleece, wet ground — apologising for asking twice. He got that too.',
    hopeMeaning:
      'Gideon is not rebuked for double-checking. He asks, gets an answer, doubts the answer, asks again in the opposite direction, and is answered again. Whatever faith is in this story, it evidently has room for someone who needs to be sure.',
    reflectionQuestion:
      'Have you been treating your need for reassurance as a failure of faith?',
  },
  {
    id: 'gideon-three-hundred',
    title: "Gideon's Three Hundred",
    testament: 'old',
    passage: ref('JDG', 'Judges', '7', 19, 22),
    theme: 'rescue',
    era: 'conquest',
    quote:
      'They each stood in his place around the camp, and all the army ran; and they shouted, and put them to flight.',
    quoteRef: 'Judges 7:21',
    details: [
      'Gideon’s army had been cut from twenty-two thousand to three hundred on purpose.',
      'Their weapons were trumpets, clay jars and torches — no swords are mentioned.',
      'The enemy camp defeated itself in the dark.',
    ],
    whatHappened:
      'Gideon’s force had been deliberately reduced from twenty-two thousand men to three hundred. At night they surrounded the camp, broke jars, held up torches and blew trumpets — and the army inside turned on itself in the confusion and fled.',
    hopeMeaning:
      'The army was made smaller on purpose, so that nobody could mistake where the outcome came from. Being reduced is not always being weakened; here it is the whole point of how the story works.',
    reflectionQuestion:
      'Is there something you have lost that you have assumed leaves you less able, rather than differently placed?',
  },
  {
    id: 'manoah-flame',
    title: 'The Angel Ascends in the Flame',
    testament: 'old',
    passage: ref('JDG', 'Judges', '13', 15, 21),
    theme: 'sign',
    era: 'conquest',
    quote:
      'For when the flame went up toward the sky from off the altar, Yahweh’s angel ascended in the flame of the altar.',
    quoteRef: 'Judges 13:20',
    details: [
      'Manoah and his wife had asked their visitor’s name and been refused.',
      'They were watching the fire when the visitor went up in it.',
      'Only then did Manoah understand who had been talking to them.',
    ],
    whatHappened:
      'Manoah made an offering on a rock while he and his wife watched. As the flame rose, their visitor ascended in it — and the two of them fell on their faces. Only afterwards did Manoah realise who they had been speaking with.',
    hopeMeaning:
      'They worked out what had happened after it had finished, not during. That is often how it goes. The understanding arrives late, looking backwards, and it is no less real for arriving that way.',
    reflectionQuestion:
      'Looking back, is there a moment you only understood much later?',
  },
  {
    id: 'samson-lion',
    title: 'Samson Tears the Lion',
    testament: 'old',
    passage: ref('JDG', 'Judges', '14', 5, 6),
    theme: 'sign',
    era: 'conquest',
    quote:
      'Yahweh’s Spirit came mightily on him, and He tore him as He would have torn a young goat with His bare hands, but He didn’t tell His father or His mother what He had done.',
    quoteRef: 'Judges 14:6',
    details: [
      'Samson was walking to Timnah with his parents when the lion came at him.',
      'He had nothing in his hands.',
      'He told nobody about it — not even his father or mother.',
    ],
    whatHappened:
      'Walking through the vineyards of Timnah, a young lion came roaring at Samson. He tore it apart with nothing in his hands, and then said nothing about it to anyone, including his parents.',
    hopeMeaning:
      'The strangest detail is the silence afterwards. Something extraordinary happened and he did not tell a soul. Not everything that God does in a life is for an audience, and some of it is never explained to anyone.',
    reflectionQuestion:
      'Is there something in your life you have never told anyone, that mattered more than you let on?',
  },
  {
    id: 'samson-jawbone',
    title: 'A Thousand Struck with a Jawbone',
    testament: 'old',
    passage: ref('JDG', 'Judges', '15', 14, 17),
    theme: 'rescue',
    era: 'conquest',
    quote:
      'Then Yahweh’s Spirit came mightily on him, and the ropes that were on His arms became as flax that was burned with fire; and His bands dropped from off His hands.',
    quoteRef: 'Judges 15:14',
    details: [
      'Samson had been handed over to the Philistines, tied with new ropes.',
      'The ropes fell apart as though burnt.',
      'The weapon he picked up was a jawbone lying on the ground.',
    ],
    whatHappened:
      'Bound with new ropes and handed over to the Philistines, Samson felt the ropes come apart on his arms like burnt threads. He picked up a jawbone from the ground and fought off a thousand men with it.',
    hopeMeaning:
      'He had no weapon and no plan, and what he ended up with was whatever was lying nearby. It is not a dignified picture. It is a reminder that being unequipped and being finished are not the same condition.',
    reflectionQuestion:
      'What would you attempt if you stopped waiting to feel properly equipped for it?',
  },
  {
    id: 'samson-water',
    title: 'Water from the Hollow Place',
    testament: 'old',
    passage: ref('JDG', 'Judges', '15', 18, 19),
    theme: 'provision',
    era: 'conquest',
    quote:
      'But God split the hollow place that is in Lehi, and water came out of it. When he had drunk, his spirit came again, and he revived.',
    quoteRef: 'Judges 15:19',
    details: [
      'This happens immediately after his greatest victory, not after a defeat.',
      'His complaint is blunt: am I going to win like that and then die of thirst?',
      'The place is renamed after the man who called out there.',
    ],
    whatHappened:
      'Straight after the fight, Samson was desperately thirsty, and said so bluntly — was he really going to be given a victory like that and then die of thirst? God split open the ground at Lehi, water came out, he drank, and he revived.',
    hopeMeaning:
      'The crash comes right after the triumph, which is exactly when people assume they have no right to ask for anything. He asked anyway, without dressing it up, and was answered.',
    reflectionQuestion:
      'Do you find it harder to ask for help after something has gone well than after it has gone badly?',
  },
  {
    id: 'samson-pillars',
    title: "Samson's Last Strength",
    testament: 'old',
    passage: ref('JDG', 'Judges', '16', 28, 30),
    theme: 'rescue',
    era: 'conquest',
    quote:
      'Samson called to Yahweh, and said, “Lord Yahweh, remember me, please, and strengthen me, please, only this once, God, that I may be at once avenged of the Philistines for my two eyes.”',
    quoteRef: 'Judges 16:28',
    details: [
      'He was blinded, shackled, and being displayed for entertainment.',
      'His prayer asks for one thing, once — and says "please" twice.',
      'The account does not tidy up his motive: he asks to be avenged for his eyes.',
    ],
    whatHappened:
      'Blinded and put on display for a crowd, Samson asked to be remembered and strengthened one last time. He braced against the two central pillars and brought the building down on himself and everyone in it.',
    hopeMeaning:
      'This is not a clean ending, and the text does not pretend otherwise — his stated motive is revenge for his own eyes. What it does record is that a man at the very bottom of his life prayed a short, undignified prayer, and was heard.',
    reflectionQuestion:
      'Would you still pray if the only prayer you had left was not a noble one?',
  },

  /* --- Kingdoms --------------------------------------------------------- */
  {
    id: 'hannah-answered',
    quote:
      'When the time had come, Hannah conceived, and bore a son; and she named him Samuel, saying, “Because I have asked him of Yahweh.”',
    quoteRef: '1 Samuel 1:20',
    details: [
      'Hannah had been childless for years and taunted for it at home.',
      'She prayed so intently at the sanctuary that the priest assumed she was drunk.',
      'The name she gave her son is a permanent reminder of the asking, not of the answer.',
    ],
    whatHappened:
      'Hannah had been childless for years, and mocked for it. She prayed at the sanctuary so intensely and so silently that the priest took her for a drunk woman. She conceived, bore a son, and named him for the fact that she had asked.',
    hopeMeaning:
      "She named the child after the request rather than the gift. Whatever else that says, it means the years of asking were not something to be forgotten once the answer arrived — they became part of the answer's name.",
    reflectionQuestion:
      'If something you have been asking for arrived, would you want to remember the waiting, or forget it?',
    title: "Hannah's Prayer Answered",
    testament: 'old',
    passage: ref('1SA', '1 Samuel', '1', 19, 20),
    theme: 'provision',
    era: 'kingdoms',
  },
  {
    id: 'dagon-falls',
    quote:
      'When they arose early on the following morning, behold, Dagon had fallen on his face to the ground before Yahweh’s ark; and the head of Dagon and both the palms of His hands were cut off on the threshold.',
    quoteRef: '1 Samuel 5:4',
    details: [
      'The Philistines had captured the ark and set it up as a trophy beside their own god.',
      'They found Dagon face down, stood him back up, and found him face down again the next morning.',
      "The second time, the statue's head and hands were broken off.",
    ],
    whatHappened:
      'The Philistines captured the ark and stood it in the temple of Dagon as a trophy. The next morning Dagon was face down in front of it. They set the statue upright again. The following morning he was face down once more, this time with his head and hands broken off.',
    hopeMeaning:
      "Israel had lost the battle and lost the ark, and from the outside it looked like their God had lost too. The story is told from inside the enemy's temple, at night, where nobody from Israel could see it. Defeat in public is not always defeat.",
    reflectionQuestion:
      'Is there a situation you have written off as lost, where you may simply not be able to see what is happening?',
    title: 'Dagon Falls before the Ark',
    testament: 'old',
    passage: ref('1SA', '1 Samuel', '5', 1, 5),
    theme: 'sign',
    era: 'kingdoms',
  },
  {
    id: 'philistine-tumors',
    quote:
      'But Yahweh’s hand was heavy on the people of Ashdod, and He destroyed them and struck them with tumors, even Ashdod and its borders.',
    quoteRef: '1 Samuel 5:6',
    details: [
      'The affliction followed the ark from city to city as the Philistines moved it around.',
      'Each city in turn begged to have it sent somewhere else.',
      'In the end they sent it back to Israel with a guilt offering.',
    ],
    whatHappened:
      'Wherever the captured ark was taken, the people of that city were struck with tumors. City after city passed it on, until the Philistines decided to send it back to Israel altogether, with an offering.',
    hopeMeaning:
      'This is a grim story, and its point is uncomfortable: what looked like a prize turned into something nobody could hold onto. Some things we win are not worth keeping, and being unable to keep them can be a mercy in disguise.',
    reflectionQuestion:
      'Is there something you fought to get that you would now be relieved to be rid of?',
    title: 'Tumors on the Philistines',
    testament: 'old',
    passage: ref('1SA', '1 Samuel', '5', 6, 12),
    theme: 'judgment',
    era: 'kingdoms',
  },
  {
    id: 'thunder-at-mizpah',
    quote:
      'Yahweh thundered with a great thunder on that day on the Philistines and confused them; and they were struck down before Israel.',
    quoteRef: '1 Samuel 7:10',
    details: [
      'Israel was gathered to confess and pray, not to fight.',
      'The Philistines attacked precisely because Israel had gathered.',
      'The rescue arrives while Samuel is still in the middle of the offering.',
    ],
    whatHappened:
      'Israel had gathered at Mizpah to confess and pray, and the Philistines took the gathering as an opportunity to attack. While Samuel was still making the offering, thunder broke over the attacking army, and they were routed.',
    hopeMeaning:
      'The attack came because they had stopped to pray — doing the right thing made them vulnerable. And the answer came before the prayer was even finished. Both halves of that are worth holding: obedience can expose you, and help can be already on its way.',
    reflectionQuestion:
      'Has doing the right thing ever left you more exposed rather than less?',
    title: 'Thunder at Mizpah',
    testament: 'old',
    passage: ref('1SA', '1 Samuel', '7', 7, 11),
    theme: 'rescue',
    era: 'kingdoms',
  },
  {
    id: 'thunder-in-harvest',
    quote:
      'So Samuel called to Yahweh, and Yahweh sent thunder and rain that day. Then all the people greatly feared Yahweh and Samuel.',
    quoteRef: '1 Samuel 12:18',
    details: [
      'Thunder and rain during the wheat harvest were close to unheard of.',
      'The sign was given to a people who had just insisted on having a king.',
      'It frightened them — and Samuel immediately told them not to be afraid.',
    ],
    whatHappened:
      "Israel had insisted on a king, against Samuel's warning. At harvest time, when rain was almost unknown, Samuel called out and thunder and rain came. The people were badly frightened, and Samuel's next words were to tell them not to be.",
    hopeMeaning:
      'The sign confirms they had chosen badly — and then the immediate message is "don\'t be afraid". Being shown you were wrong and being told not to fear arrive in the same breath here.',
    reflectionQuestion:
      'When you realise you have chosen badly, what do you usually expect to hear next?',
    title: 'Thunder and Rain in Wheat Harvest',
    testament: 'old',
    passage: ref('1SA', '1 Samuel', '12', 16, 18),
    theme: 'sign',
    era: 'kingdoms',
  },
  {
    id: 'uzzah-and-the-ark',
    quote:
      'Yahweh’s anger burned against Uzzah, and God struck him there for His error; and He died there by God’s ark.',
    quoteRef: '2 Samuel 6:7',
    details: [
      'The ark was being moved on a cart, which was not how it was meant to be carried.',
      'The cattle stumbled and Uzzah reached out to steady it.',
      'David was angry, and then afraid, and left the ark where it was for three months.',
    ],
    whatHappened:
      'The ark was being carried to Jerusalem on a new cart. The cattle stumbled, Uzzah put out his hand to steady it, and he died there beside it. David was first angry and then frightened, and abandoned the journey for three months.',
    hopeMeaning:
      "There is no comfortable reading of this and it would be dishonest to manufacture one. What the account does preserve is David's reaction — anger first, then fear — without correcting him for it. Scripture keeps the record of a man furious at God, and does not tidy it away.",
    reflectionQuestion:
      'Is there anger at God you have felt you were not allowed to admit to?',
    title: 'Uzzah and the Ark',
    testament: 'old',
    passage: ref('2SA', '2 Samuel', '6', 6, 8),
    theme: 'judgment',
    era: 'kingdoms',
  },
  {
    id: 'census-plague',
    quote:
      'Yahweh relented of the disaster, and said to the angel who destroyed the people, “It is enough. Now withdraw your hand.”',
    quoteRef: '2 Samuel 24:16',
    details: [
      'David had ordered a census against advice, and admitted afterwards that it was his own doing.',
      'The consequence fell on the people rather than on the king who ordered it.',
      'The stopping point is not reached by argument — it is simply declared.',
    ],
    whatHappened:
      'David ordered a census he had been warned against, and a plague followed. As the destroying angel reached Jerusalem, it was stopped mid-motion, with two words: it is enough.',
    hopeMeaning:
      "The account is honest that the wrong was the king's and the cost fell on others; it does not pretend that is fair. What it puts at the centre is the moment something stops. The disaster has a limit, and the limit is set from above rather than reached by exhaustion.",
    reflectionQuestion:
      'Do you believe the hard thing you are in has a limit, or does it feel open-ended?',
    title: "The Plague after David's Census",
    testament: 'old',
    passage: ref('2SA', '2 Samuel', '24', 15, 17),
    theme: 'judgment',
    era: 'kingdoms',
  },
  {
    id: 'jeroboam-hand',
    quote:
      'The man of God interceded with Yahweh, and the king’s hand was restored to him again, and became as it was before.',
    quoteRef: '1 Kings 13:6',
    details: [
      'Jeroboam stretched out his hand to have the prophet seized, and it dried up mid-gesture.',
      'The king asked the very prophet he had tried to arrest to pray for him.',
      'The hand was restored completely — as it was before.',
    ],
    whatHappened:
      'King Jeroboam pointed at a prophet and ordered him seized, and his hand withered where it was, stuck out in front of him. He asked that same prophet to pray for him. The prophet did, and the hand was restored exactly as it had been.',
    hopeMeaning:
      'The king is not required to repent, apologise, or change his religious policy first. He asks, and the prophet he had just tried to arrest prays for him, and he is restored completely. The help arrives well before the character does.',
    reflectionQuestion:
      'Do you assume you have to become better before you can ask for help?',
    title: "Jeroboam's Withered Hand Restored",
    testament: 'old',
    passage: ref('1KI', '1 Kings', '13', 1, 6),
    theme: 'healing',
    era: 'kingdoms',
  },
  {
    id: 'ravens-feed-elijah',
    quote:
      'The ravens brought him bread and meat in the morning, and bread and meat in the evening; and he drank from the brook.',
    quoteRef: '1 Kings 17:6',
    details: [
      'Elijah was in hiding during a drought he himself had announced.',
      'Ravens were birds Israel counted as unclean.',
      'The food came twice a day, and the brook eventually dried up anyway.',
    ],
    whatHappened:
      'Hiding by a brook during the drought he had announced, Elijah was fed by ravens — bread and meat morning and evening — and drank from the stream, until the stream dried up and he was sent elsewhere.',
    hopeMeaning:
      'The delivery service is a bird Israel classed as unclean, and the arrangement was always temporary. Provision here is neither dignified nor permanent, and it is still provision.',
    reflectionQuestion:
      'Would you recognise help if it arrived through something you had already dismissed?',
    title: 'Ravens Feed Elijah',
    testament: 'old',
    passage: ref('1KI', '1 Kings', '17', 2, 6),
    theme: 'provision',
    era: 'kingdoms',
  },
  {
    id: 'zarephath-flour-and-oil',
    quote:
      'The jar of meal didn’t run out and the jar of oil didn’t fail, according to Yahweh’s word, which He spoke by Elijah.',
    quoteRef: '1 Kings 17:16',
    details: [
      'The widow was gathering sticks to cook a last meal for herself and her son before dying.',
      'Elijah asked her to feed him first, out of the little she had.',
      'The jars never emptied — but they never overflowed either.',
    ],
    whatHappened:
      'Elijah met a widow collecting firewood to cook the last of her flour and oil, after which she expected she and her son would starve. He asked her to make him something first. She did — and from then on the jar of meal and the jar of oil simply never ran out.',
    hopeMeaning:
      'She was never given a full storehouse. The jars stayed almost empty and never quite emptied, day after day. That is a different promise from abundance, and for a lot of people it is the more recognisable one.',
    reflectionQuestion:
      'Could you live with enough for today, if it kept arriving?',
    title: "The Widow's Flour and Oil Do Not Run Out",
    testament: 'old',
    passage: ref('1KI', '1 Kings', '17', 8, 16),
    theme: 'provision',
    era: 'kingdoms',
  },
  {
    id: 'zarephath-son-raised',
    quote:
      'Yahweh listened to the voice of Elijah; and the soul of the child came into him again, and he revived.',
    quoteRef: '1 Kings 17:22',
    details: [
      'The boy died after his mother had already been saved from starvation.',
      'She blamed Elijah, and Elijah put the same complaint to God.',
      'It is the first raising of the dead recorded in the Bible.',
    ],
    whatHappened:
      "The widow's son fell ill and died — after she had already been rescued from starvation. She accused Elijah of bringing it on her, and Elijah took the same accusation straight to God. Then he stretched himself over the boy, and the child revived.",
    hopeMeaning:
      'Elijah does not defend God to the grieving mother. He takes her complaint and repeats it upward as his own. Prayer here looks like arguing on behalf of someone who is furious.',
    reflectionQuestion:
      "Could you pray someone else's anger for them, instead of correcting it?",
    title: "The Widow's Son Raised at Zarephath",
    testament: 'old',
    passage: ref('1KI', '1 Kings', '17', 17, 24),
    theme: 'raising',
    era: 'kingdoms',
  },
  {
    id: 'elijah-fire',
    title: 'Fire from Heaven at Mount Carmel',
    location: 'Mount Carmel, before all Israel',
    testament: 'old',
    passage: ref('1KI', '1 Kings', '18', 36, 39),
    theme: 'sign',
    era: 'kingdoms',
    familiarityRank: 13,
    quote:
      "Then Yahweh's fire fell and consumed the burnt offering, the wood, the stones, and the dust; and it licked up the water that was in the trench.",
    quoteRef: '1 Kings 18:38',
    details: [
      'Elijah stood alone against 450 prophets of a rival god, in front of a watching crowd.',
      'He soaked his altar in water three times first, to remove any doubt about how it caught fire.',
      'When the fire fell, it consumed rock and water along with the sacrifice.',
    ],
    whatHappened:
      "For years, the nation had been worshiping a foreign god alongside — or instead of — the God of Israel. Elijah, one man against hundreds of the other god's prophets, built an altar, soaked it in water, and prayed a short prayer out loud. Fire fell from the sky and burned it all up — wood, stone, water and all.",
    hopeMeaning:
      "Elijah wasn't hoping for a miracle out of desperation for himself — he was standing alone for something he believed was true, in front of people who thought he was finished. Sometimes hope means being willing to be the only one standing, and trusting that being right doesn't require being popular.",
    reflectionQuestion:
      'When was the last time you held onto what you believed, even though you felt like the only one who did?',
  },
  {
    id: 'elijah-rain',
    quote:
      'In a little while, the sky grew black with clouds and wind, and there was a great rain.',
    quoteRef: '1 Kings 18:45',
    details: [
      'Elijah sent his servant to look at the sea seven times.',
      'Six times there was nothing at all.',
      "The seventh time it was a cloud the size of a man's hand.",
    ],
    whatHappened:
      'After three years of drought, Elijah bowed down and sent his servant to look toward the sea. Six times the servant came back with nothing. The seventh time he reported a cloud the size of a hand — and shortly after, the sky went black and the rain came.',
    hopeMeaning:
      'Six empty reports, then something almost too small to count, then everything. The account keeps all seven trips rather than skipping to the rain. Most of the story is the part where nothing is visible yet.',
    reflectionQuestion:
      'How many times have you looked before deciding there was nothing there?',
    title: 'Rain after Three Years of Drought',
    testament: 'old',
    passage: ref('1KI', '1 Kings', '18', 41, 45),
    theme: 'nature',
    era: 'kingdoms',
  },
  {
    id: 'angel-feeds-elijah',
    quote:
      'Yahweh’s angel came again the second time, and touched him, and said, “Arise and eat, because the journey is too great for you.”',
    quoteRef: '1 Kings 19:7',
    details: [
      'Elijah had just asked to die, days after his greatest public victory.',
      'The first thing he is given is not a rebuke or a task — it is food and sleep.',
      'He is fed twice, and allowed to sleep in between.',
    ],
    whatHappened:
      'Days after Mount Carmel, Elijah ran into the wilderness and asked to die. He fell asleep under a tree. An angel woke him with fresh bread and water, let him sleep again, then woke him a second time to eat more — because the journey ahead was too much for him.',
    hopeMeaning:
      'A prophet at the end of himself is given a meal and a nap, twice, before anyone says anything about what comes next. Sometimes the most spiritual thing available is food and rest, and this account treats that as obvious.',
    reflectionQuestion:
      'Are you trying to pray your way through something that might partly be exhaustion?',
    title: 'An Angel Feeds Elijah',
    testament: 'old',
    passage: ref('1KI', '1 Kings', '19', 5, 8),
    theme: 'provision',
    era: 'kingdoms',
  },
  {
    id: 'elijah-parts-jordan',
    quote:
      'Elijah took his mantle, and rolled it up, and struck the waters; and they were divided here and there, so that they both went over on dry ground.',
    quoteRef: '2 Kings 2:8',
    details: [
      'Elijah knew he was about to be taken, and had tried three times to send Elisha back.',
      'Elisha refused to leave him each time.',
      "They crossed together, on dry ground, on the last day of Elijah's life.",
    ],
    whatHappened:
      'On his last day, Elijah tried three times to send Elisha away, and three times Elisha refused. At the Jordan, Elijah rolled up his cloak, struck the water, and the two of them walked across on dry ground.',
    hopeMeaning:
      "The wonder is a crossing made by two people who would not be separated. Elisha's stubbornness about staying is what puts him there to see it at all.",
    reflectionQuestion:
      'Is there someone you should refuse to leave, even when they tell you to go?',
    title: 'Elijah Parts the Jordan',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '2', 7, 8),
    theme: 'nature',
    era: 'kingdoms',
  },
  {
    id: 'elijah-whirlwind',
    quote:
      'As they continued on and talked, behold, a chariot of fire and horses of fire separated them; and Elijah went up by a whirlwind into heaven.',
    quoteRef: '2 Kings 2:11',
    details: [
      'The two of them were in the middle of a conversation when it happened.',
      "Elisha had asked for a double share of Elijah's spirit.",
      'Elijah is one of only two people in scripture who do not die.',
    ],
    whatHappened:
      'Walking and talking together, the two men were suddenly separated by fire, and Elijah was taken up in a whirlwind. Elisha was left holding the cloak that fell from him.',
    hopeMeaning:
      'It happens mid-sentence, in the middle of an ordinary conversation on an ordinary walk. Whatever this is, it is not staged. The extraordinary arrives into the middle of the ordinary and does not wait for it to finish.',
    reflectionQuestion:
      'What would it mean to expect God in the middle of an ordinary conversation?',
    title: 'Elijah Taken up in a Whirlwind',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '2', 9, 12),
    theme: 'sign',
    era: 'kingdoms',
  },
  {
    id: 'elisha-parts-jordan',
    quote:
      'He took Elijah’s mantle that fell from him, and struck the waters, and said, “Where is Yahweh, the God of Elijah?”',
    quoteRef: '2 Kings 2:14',
    details: [
      'Elisha was alone for the first time, on the far side of the river.',
      'He struck the water with a question, not a declaration.',
      'The water divided, and he crossed back.',
    ],
    whatHappened:
      'Left alone on the wrong side of the Jordan, Elisha picked up the cloak that had fallen from Elijah, struck the water, and asked out loud where the God of Elijah was. The water divided and he walked back across.',
    hopeMeaning:
      'His first act of faith is phrased as a question — and it works. There is no requirement here to feel certain before acting. He asks where God is while doing the thing that assumes God is there.',
    reflectionQuestion:
      'Could you act on something you are not yet sure of, and ask your question while you do it?',
    title: 'Elisha Parts the Jordan',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '2', 13, 14),
    theme: 'nature',
    era: 'kingdoms',
  },
  {
    id: 'jericho-waters-healed',
    quote:
      'So the waters were healed to this day, according to Elisha’s word which he spoke.',
    quoteRef: '2 Kings 2:22',
    details: [
      'The city was pleasant to live in but its water was killing the land.',
      'The remedy was salt — which would normally ruin water, not heal it.',
      'The writer notes the spring was still good in his own day.',
    ],
    whatHappened:
      'The men of Jericho told Elisha their city was well placed but the water was bad and the land unproductive. He asked for a bowl of salt, threw it into the spring, and the water was healed — and the writer adds that it was still good when he was writing.',
    hopeMeaning:
      'Salt in a spring is what you would do to poison it. The remedy looks like the opposite of a remedy, and the result outlasted everyone involved.',
    reflectionQuestion:
      'Is there a repair in your life that would look, from outside, like making it worse?',
    title: 'The Waters of Jericho Healed',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '2', 19, 22),
    theme: 'healing',
    era: 'kingdoms',
  },
  {
    id: 'water-for-the-armies',
    quote:
      'In the morning, about the time of offering the sacrifice, behold, water came by the way of Edom, and the country was filled with water.',
    quoteRef: '2 Kings 3:20',
    details: [
      'Three armies were stranded in the desert with no water for the men or the animals.',
      'They were told to dig ditches in a dry valley before there was any sign of water.',
      'There was no wind and no rain — the water simply arrived.',
    ],
    whatHappened:
      'Three armies were stranded without water. Elisha told them to fill the valley with ditches, and promised they would see neither wind nor rain. In the morning water came from the direction of Edom and filled the country.',
    hopeMeaning:
      'They had to dig the ditches first, in dry ground, with no cloud in the sky. Preparation was required before there was any evidence that preparation was worth making.',
    reflectionQuestion:
      'What would you need to prepare for, before you had any evidence it was coming?',
    title: 'Water for the Armies in the Desert',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '3', 14, 20),
    theme: 'provision',
    era: 'kingdoms',
  },
  {
    id: 'widows-oil',
    quote:
      'When the containers were full, she said to her son, “Bring me another container.” He said to her, “There isn’t another container.” Then the oil stopped flowing.',
    quoteRef: '2 Kings 4:6',
    details: [
      "Her husband's creditor was coming to take her two sons as slaves.",
      'All she had left in the house was one small jar of oil.',
      'The oil kept flowing until the borrowed containers ran out — not until the need was met.',
    ],
    whatHappened:
      'A widow was about to lose her two sons to a creditor. All she had was one jar of oil. Told to borrow as many empty containers as she could and start pouring, she filled every one — and the oil stopped only when there was nothing left to fill.',
    hopeMeaning:
      'The limit was not the oil. The limit was how many containers she had gone out and borrowed. That detail is left in the account deliberately, and it is worth sitting with rather than rushing past.',
    reflectionQuestion:
      'Where might the limit be your preparation rather than the supply?',
    title: "The Widow's Oil Multiplied",
    testament: 'old',
    passage: ref('2KI', '2 Kings', '4', 1, 7),
    theme: 'provision',
    era: 'kingdoms',
  },
  {
    id: 'shunammite-son-promised',
    quote:
      'The woman conceived, and bore a son at that season when the time came around, as Elisha had said to her.',
    quoteRef: '2 Kings 4:17',
    details: [
      'She had built a small room on her roof so a travelling prophet had somewhere to stay.',
      'Asked what she wanted in return, she said she needed nothing.',
      'Told she would have a son, her response was to beg him not to lie to her.',
    ],
    whatHappened:
      'A woman had built a spare room for Elisha to stay in whenever he passed through. Asked what she wanted in return, she said she was fine. When he told her she would have a son within the year, she asked him not to raise her hopes falsely. The child was born as he had said.',
    hopeMeaning:
      'Her reaction to good news is to flinch. She had clearly wanted this and had put the wanting away somewhere safe. Being offered the thing you stopped letting yourself hope for is not automatically a comfort, and the text lets her say so.',
    reflectionQuestion:
      'What have you stopped letting yourself want, because hoping for it hurt too much?',
    title: 'A Son Promised to the Shunammite',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '4', 11, 17),
    theme: 'provision',
    era: 'kingdoms',
  },
  {
    id: 'shunammite-son-raised',
    quote:
      'Then the child sneezed seven times, and the child opened his eyes.',
    quoteRef: '2 Kings 4:35',
    details: [
      "The boy died on his mother's lap after complaining of his head in the field.",
      'She told nobody, saddled a donkey, and rode straight to Elisha.',
      'When asked if all was well she answered, twice, that it was well.',
    ],
    whatHappened:
      "The son died on his mother's lap. She laid him on the prophet's bed, told her husband nothing was wrong, rode to find Elisha and refused to leave without him. Elisha stretched himself over the boy twice — and the child sneezed seven times and opened his eyes.",
    hopeMeaning:
      "The mother's insistence drives the whole story. She will not be reassured, will not be sent home, and will not accept the servant being sent in the prophet's place. Her refusal to settle is treated as faith, not rudeness.",
    reflectionQuestion:
      'Where have you accepted less than you actually needed, out of politeness?',
    title: "The Shunammite's Son Raised",
    testament: 'old',
    passage: ref('2KI', '2 Kings', '4', 32, 37),
    theme: 'raising',
    era: 'kingdoms',
  },
  {
    id: 'death-in-the-pot',
    quote:
      'He threw it into the pot; and he said, “Serve it to the people, that they may eat.” And there was nothing harmful in the pot.',
    quoteRef: '2 Kings 4:41',
    details: [
      'There was a famine, and someone had gathered wild gourds to stretch the stew.',
      'The men tasted it and cried out that there was death in the pot.',
      'Nobody threw the food away — the same pot was served.',
    ],
    whatHappened:
      'During a famine, someone gathered unfamiliar wild gourds into the communal stew. The first taste told them it was poisonous. Elisha called for meal, threw it in, and told them to serve the same pot — and there was nothing harmful in it.',
    hopeMeaning:
      'In a famine you cannot afford to throw out a pot of food, and they did not have to. What was poisonous was made safe rather than discarded. Not everything spoiled has to be lost.',
    reflectionQuestion:
      'What have you thrown away as ruined that might have been recoverable?',
    title: 'Death in the Pot Made Harmless',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '4', 38, 41),
    theme: 'provision',
    era: 'kingdoms',
  },
  {
    id: 'feeding-a-hundred',
    quote:
      'So he set it before them and they ate and had some left over, according to Yahweh’s word.',
    quoteRef: '2 Kings 4:44',
    details: [
      'Twenty loaves of barley, brought as first-fruits, for a hundred men.',
      'The servant said out loud that it was obviously not enough.',
      'Not only was it enough — there was food left.',
    ],
    whatHappened:
      'A man brought twenty barley loaves as an offering during a famine. Elisha told his servant to feed a hundred men with them. The servant objected that it was nowhere near enough. They ate, and there was food left over.',
    hopeMeaning:
      "The servant's arithmetic was correct and the objection was reasonable. It simply was not the whole picture. Being right about the shortfall and wrong about the outcome are not contradictory here.",
    reflectionQuestion:
      'Is there a calculation you are sure of, that might not be the whole picture?',
    title: 'A Hundred Fed with Twenty Loaves',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '4', 42, 44),
    theme: 'provision',
    era: 'kingdoms',
  },
  {
    id: 'naaman-healed',
    quote:
      'Then went he down and dipped himself seven times in the Jordan, according to the saying of the man of God; and his flesh was restored like the flesh of a little child, and he was clean.',
    quoteRef: '2 Kings 5:14',
    details: [
      'Naaman was a foreign commander — an enemy general, not an Israelite.',
      'The prophet did not come out to meet him; he sent a messenger with instructions.',
      'Naaman nearly went home furious, and it was his servants who talked him into trying.',
    ],
    whatHappened:
      "Naaman, a commander of Israel's enemy, came with horses and gifts to be cured of leprosy. Elisha did not even come to the door — he sent word to go and wash seven times in the Jordan. Naaman was insulted and started to leave. His servants persuaded him to try it, and he came up clean.",
    hopeMeaning:
      'Almost everything about this offends him: the river is unimpressive, the instruction is menial, and the prophet does not come out to greet him. The healing was never withheld — what nearly cost him was his sense of how it ought to arrive.',
    reflectionQuestion:
      'Is there help you have refused because of the form it came in?',
    title: 'Naaman Healed of Leprosy',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '5', 1, 14),
    theme: 'healing',
    era: 'kingdoms',
    familiarityRank: 17,
  },
  {
    id: 'gehazi-leprosy',
    quote:
      'He went out from his presence a leper, as white as snow.',
    quoteRef: '2 Kings 5:27',
    details: [
      'Elisha had deliberately refused any payment from Naaman.',
      "His servant Gehazi ran after Naaman and asked for silver and clothing in his master's name.",
      'He then lied to Elisha about where he had been.',
    ],
    whatHappened:
      "Elisha had refused Naaman's gifts outright. His servant Gehazi chased after the departing commander, invented a request in his master's name, took silver and clothing, hid them, and denied it. He left Elisha's presence with the disease Naaman had just been cured of.",
    hopeMeaning:
      'This is a hard ending placed immediately after a story of undeserved grace, and the placement is deliberate. What Naaman received freely, Gehazi tried to sell. The account does not soften what that cost him.',
    reflectionQuestion:
      'Is there something freely given to you that you have been tempted to trade on?',
    title: 'Gehazi Struck with Leprosy',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '5', 20, 27),
    theme: 'judgment',
    era: 'kingdoms',
  },
  {
    id: 'axe-head-floats',
    quote:
      'He cut down a stick, threw it in there, and made the iron float.',
    quoteRef: '2 Kings 6:6',
    details: [
      'The axe head was borrowed, and the man who lost it cried out about that first.',
      'An iron tool was expensive enough that losing one was a real debt.',
      'Elisha asked only where it fell.',
    ],
    whatHappened:
      "A borrowed axe head flew off its handle into the Jordan while men were cutting timber. The man's distress was about the borrowing. Elisha asked where it fell, cut a stick, threw it in — and the iron floated up.",
    hopeMeaning:
      'This is the smallest wonder in the Old Testament: one man, one borrowed tool, one embarrassing accident. Nothing national is at stake. It is here because apparently the size of the trouble is not what determines whether it gets attention.',
    reflectionQuestion:
      'What have you decided is too small to bring to God?',
    title: 'The Axe Head Floats',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '6', 1, 7),
    theme: 'provision',
    era: 'kingdoms',
  },
  {
    id: 'chariots-of-fire',
    quote:
      'Yahweh opened the young man’s eyes, and he saw; and behold, the mountain was full of horses and chariots of fire around Elisha.',
    quoteRef: '2 Kings 6:17',
    details: [
      'An army had surrounded the city overnight to capture one man.',
      "Elisha's servant saw the encirclement and panicked.",
      "Elisha prayed for the servant's eyes, not for rescue.",
    ],
    whatHappened:
      "An army surrounded the city in the night. Elisha's servant went out in the morning, saw the horses and chariots, and panicked. Elisha prayed — not for escape, but that the young man's eyes would be opened. He looked again and saw the hills full of fire.",
    hopeMeaning:
      'Nothing about the situation changed. The enemy army was exactly where it had been. The prayer was for sight, and the answer was sight. What the servant needed was not a different circumstance but a fuller view of the one he was in.',
    reflectionQuestion:
      'If your situation stayed exactly as it is, what would you want to be able to see about it?',
    title: 'Chariots of Fire around Elisha',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '6', 15, 17),
    theme: 'rescue',
    era: 'kingdoms',
  },
  {
    id: 'aramean-army-blinded',
    quote:
      'Yahweh opened their eyes, and they saw; and behold, they were in the middle of Samaria.',
    quoteRef: '2 Kings 6:20',
    details: [
      'Elisha prayed for blindness, then walked the whole army to the wrong city.',
      'The king of Israel asked whether he should kill them.',
      'He was told to feed them and send them home.',
    ],
    whatHappened:
      'Elisha prayed that the army hunting him would be struck blind, then walked at their head and led them straight into the Israelite capital. When their eyes were opened they were surrounded. The king asked if he should kill them. Elisha said to give them a meal and send them home.',
    hopeMeaning:
      'He had them completely, and he fed them. The raids stopped after that — not because the enemy was destroyed, but because of a dinner. The account offers that as the more effective ending.',
    reflectionQuestion:
      'Is there someone you have the advantage over, that you could feed instead?',
    title: 'The Aramean Army Blinded',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '6', 18, 20),
    theme: 'rescue',
    era: 'kingdoms',
  },
  {
    id: 'elisha-bones',
    quote:
      'As soon as the man touched Elisha’s bones, he revived, and stood up on his feet.',
    quoteRef: '2 Kings 13:21',
    details: [
      'Elisha had been dead and buried for some time.',
      'The burial party was interrupted by raiders and threw the body into the nearest tomb.',
      'Nobody intended a miracle — they were in a hurry.',
    ],
    whatHappened:
      "A funeral party, surprised by raiders, threw the body they were carrying into the nearest available tomb, which happened to be Elisha's. The dead man touched the prophet's bones and stood up.",
    hopeMeaning:
      "Nobody in this story is praying, or believing, or even paying attention. It is an accident during a panic. It is a strange, almost comic note to end a prophet's life on — and it suggests that what God is doing does not entirely depend on anyone noticing.",
    reflectionQuestion:
      'Does it change anything to think God might be at work in something you were not paying attention to?',
    title: "A Man Revived on Elisha's Bones",
    testament: 'old',
    passage: ref('2KI', '2 Kings', '13', 20, 21),
    theme: 'raising',
    era: 'kingdoms',
  },
  {
    id: 'assyrian-army-struck',
    quote:
      'That night, Yahweh’s angel went out and struck one hundred eighty-five thousand in the camp of the Assyrians.',
    quoteRef: '2 Kings 19:35',
    details: [
      'The Assyrian commander had taunted Jerusalem publicly, in their own language, from outside the wall.',
      "Hezekiah's response was to take the threatening letter into the temple and spread it out.",
      'The city was never attacked.',
    ],
    whatHappened:
      'Assyria had taken every other fortified city and stood outside Jerusalem taunting it. Hezekiah took the threatening letter into the temple, spread it open, and prayed. That night the besieging camp was struck, and in the morning the army was gone.',
    hopeMeaning:
      "Hezekiah's action was to physically lay the threat out in front of God rather than answer it himself. He had no military reply available and did not attempt one.",
    reflectionQuestion:
      'What would it look like to lay out the thing threatening you, rather than trying to answer it?',
    title: 'The Assyrian Army Struck by Night',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '19', 32, 36),
    theme: 'rescue',
    era: 'kingdoms',
  },
  {
    id: 'hezekiah-healed',
    quote:
      'I have heard your prayer. I have seen your tears. Behold, I will heal you.',
    quoteRef: '2 Kings 20:5',
    details: [
      'Hezekiah had been told plainly to put his house in order because he would die.',
      'He turned his face to the wall and wept.',
      'Isaiah had not even left the middle court before he was sent back with a different message.',
    ],
    whatHappened:
      'Told by the prophet that his illness was terminal, Hezekiah turned to the wall and wept and prayed. Isaiah had not yet left the palace grounds when he was sent back: the prayer had been heard, fifteen years were added, and a cake of figs was laid on the boil.',
    hopeMeaning:
      'The message that came back names the tears specifically, not only the prayer. And the turnaround happens before the prophet is out of the building. Neither the weeping nor the speed is treated as remarkable by the text — they are simply recorded.',
    reflectionQuestion:
      'Do you think of tears as part of prayer, or as what happens when prayer has failed?',
    title: 'Hezekiah Healed and the Shadow Turned Back',
    testament: 'old',
    passage: ref('2KI', '2 Kings', '20', 1, 11),
    theme: 'healing',
    era: 'kingdoms',
    alsoSee: [ref('ISA', 'Isaiah', '38', 1, 8)],
  },
  {
    id: 'temple-fire',
    quote:
      'Now when Solomon had finished praying, fire came down from heaven and consumed the burnt offering and the sacrifices; and Yahweh’s glory filled the house.',
    quoteRef: '2 Chronicles 7:1',
    details: [
      'The temple had taken seven years to build.',
      "Solomon's dedication prayer was mostly about what to do when people fail.",
      'The priests could not enter the building afterwards.',
    ],
    whatHappened:
      'At the dedication of the temple, Solomon prayed a long prayer largely concerned with what should happen when the people got things wrong. As he finished, fire fell and consumed the offering, and the building filled with glory so completely that the priests could not go in.',
    hopeMeaning:
      'The prayer that gets this answer is not triumphant. It is a careful, realistic list of the ways the nation would fail and what should happen then. That was the prayer God filled the house over.',
    reflectionQuestion:
      'Would you dare to plan for your own failure out loud, in prayer?',
    title: 'Fire at the Dedication of the Temple',
    testament: 'old',
    passage: ref('2CH', '2 Chronicles', '7', 1, 3),
    theme: 'sign',
    era: 'kingdoms',
  },
  {
    id: 'judahs-enemies-turn',
    quote:
      'When they began to sing and to praise, Yahweh set ambushers against the children of Ammon, Moab, and Mount Seir, who had come against Judah; and they were struck.',
    quoteRef: '2 Chronicles 20:22',
    details: [
      'Three armies were coming at once and Judah had no answer to them.',
      'Jehoshaphat put singers in front of the army instead of soldiers.',
      'By the time Judah arrived, the battle was over and the enemy had destroyed itself.',
    ],
    whatHappened:
      'Facing three converging armies, Jehoshaphat gathered the nation, admitted they had no idea what to do, and sent singers out ahead of the troops. As the singing began, the invading armies turned on one another. Judah arrived to find the work already done.',
    hopeMeaning:
      'The prayer that opens this is an admission of complete helplessness — we do not know what to do. That is not treated as a failure of leadership. It is the hinge the whole account turns on.',
    reflectionQuestion:
      'Could you say out loud, without shame, that you do not know what to do?',
    title: "Judah's Enemies Destroy One Another",
    testament: 'old',
    passage: ref('2CH', '2 Chronicles', '20', 20, 24),
    theme: 'rescue',
    era: 'kingdoms',
  },
  {
    id: 'uzziah-leprosy',
    quote:
      'Then Uzziah was angry. He had a censer in his hand to burn incense, and while he was angry with the priests, the leprosy broke out on his forehead before the priests in Yahweh’s house, beside the altar of incense.',
    quoteRef: '2 Chronicles 26:19',
    details: [
      'Uzziah had reigned well for decades and become very powerful.',
      'Eighty priests confronted him and told him to leave.',
      'He spent the rest of his life isolated, and his son governed in his place.',
    ],
    whatHappened:
      'Uzziah had reigned successfully for a long time. Strong and established, he went into the temple to burn incense himself. Eighty priests confronted him; he became angry, and the disease broke out on his forehead while he stood there arguing. He lived the rest of his life apart.',
    hopeMeaning:
      'The account is explicit that his downfall followed his success — he was strong, and that was when it happened. It is a sober warning rather than a comfort, and it belongs in a catalog that is trying to tell the truth about the book.',
    reflectionQuestion:
      'Where are you strongest, and least likely to think you need correcting?',
    title: 'Uzziah Struck with Leprosy',
    testament: 'old',
    passage: ref('2CH', '2 Chronicles', '26', 16, 21),
    theme: 'judgment',
    era: 'kingdoms',
  },

  /* --- Prophets and exile ------------------------------------------------ */
  {
    id: 'jonah-storm',
    quote:
      'But Yahweh sent out a great wind on the sea, and there was a mighty storm on the sea, so that the ship was likely to break up.',
    quoteRef: 'Jonah 1:4',
    details: [
      'Jonah had paid the fare and boarded a ship going the opposite way.',
      'He slept through the beginning of the storm.',
      'The pagan sailors prayed and tried everything before agreeing to throw him overboard.',
    ],
    whatHappened:
      'Running from what he had been asked to do, Jonah paid for passage in the opposite direction and fell asleep below deck. A storm broke that nearly tore the ship apart. The sailors cast lots, found it was about him, and only threw him overboard after trying everything else.',
    hopeMeaning:
      'The sailors, who worship other gods, come out of this story looking better than the prophet. They pray, they row, they try to avoid harming him. Being outside the faith and behaving well is something the account notices without embarrassment.',
    reflectionQuestion:
      'Have you learned something about decency from someone you did not expect to?',
    title: 'The Storm Sent after Jonah',
    testament: 'old',
    passage: ref('JON', 'Jonah', '1', 4, 16),
    theme: 'nature',
    era: 'prophets',
  },
  {
    id: 'jonah',
    title: 'Jonah and the Great Fish',
    location: 'A ship bound for Tarshish, and the open sea',
    testament: 'old',
    passage: ref('JON', 'Jonah', '1', 15, 17),
    theme: 'rescue',
    era: 'prophets',
    familiarityRank: 9,
    alsoSee: [ref('JON', 'Jonah', '2', 1, 10)],
    quote:
      'Yahweh prepared a huge fish to swallow up Jonah, and Jonah was in the belly of the fish three days and three nights.',
    quoteRef: 'Jonah 1:17',
    details: [
      "Jonah wasn't running toward a disaster — he was running away from a job God had given him.",
      'He was thrown overboard by the sailors as a last resort, expecting to drown.',
      "Three days later, the fish brought him back to dry land, and he finally went where he'd been asked to go.",
    ],
    whatHappened:
      "Told to warn a hostile foreign city, Jonah sailed the opposite direction instead. A storm nearly sank the ship, and Jonah — realizing it was his fault — had the sailors throw him overboard. Rather than letting him drown, God sent a great fish to swallow him, and three days later it left him safely on shore.",
    hopeMeaning:
      "This is the one Old Testament wonder aimed at someone actively running away. It's easy to assume hope is only for people doing everything right. Jonah's story says otherwise: even a second chance, handed to someone mid-flight from their calling, still counts as rescue.",
    reflectionQuestion:
      "Is there something you know you're supposed to be doing, but have been quietly running from?",
  },
  {
    id: 'jonah-plant',
    quote:
      'Yahweh God prepared a vine and made it to come up over Jonah, that it might be a shade over his head to deliver him from his discomfort.',
    quoteRef: 'Jonah 4:6',
    details: [
      'Jonah was sulking outside the city because his warning had worked and it had been spared.',
      'A plant grew to shade him, and he was delighted with it.',
      'A worm killed it the next day, and he asked to die.',
    ],
    whatHappened:
      'Furious that Nineveh had repented and been spared, Jonah sat outside the city to watch. A plant grew up and shaded him, and he was very glad. The next day a worm killed it, a hot wind came, and Jonah asked to die.',
    hopeMeaning:
      'The book ends with God pointing out that Jonah cared more about a plant than about a city. It is a gentle, slightly absurd argument rather than a punishment — and the book stops on the question, without recording whether Jonah ever answered it.',
    reflectionQuestion:
      'Is there a small comfort you are more upset about losing than you would like to admit?',
    title: 'The Plant, the Worm and the Wind',
    testament: 'old',
    passage: ref('JON', 'Jonah', '4', 5, 8),
    theme: 'sign',
    era: 'prophets',
  },
  {
    id: 'fiery-furnace',
    title: 'The Fiery Furnace',
    location: 'The plain of Dura, in the province of Babylon',
    testament: 'old',
    passage: ref('DAN', 'Daniel', '3', 16, 27),
    theme: 'rescue',
    era: 'exile',
    familiarityRank: 7,
    quote:
      'Look, I see four men loose, walking in the middle of the fire, and they are unharmed. The appearance of the fourth is like a son of the gods.',
    quoteRef: 'Daniel 3:25',
    details: [
      'Shadrach, Meshach, and Abednego refused to bow to a golden statue, on pain of death.',
      '"If it happens, our God is able to deliver us... but if not, we still won\'t bow" — their answer didn\'t wait for a guaranteed rescue.',
      'The furnace was so hot it killed the guards who threw them in, yet the three men walked around inside it, untouched, with a fourth figure beside them.',
    ],
    whatHappened:
      "Three men refused to worship a statue they didn't believe in, even under threat of being burned alive. The king had them thrown into a furnace heated seven times hotter than normal. When he looked in, expecting to see nothing left, he saw four men walking around, completely unharmed.",
    hopeMeaning:
      '"But if not" is the most remarkable line in this story, and it comes before the miracle. They committed to their faith without knowing whether the rescue was coming. Hope here is not a guarantee that the fire won\'t happen — it\'s the confidence that you won\'t be facing it alone if it does.',
    reflectionQuestion:
      "Could you say \"but if not\" about the thing you're currently hoping for — and still hold on to your faith either way?",
  },
  {
    id: 'nebuchadnezzar-restored',
    quote:
      'At the end of the days I, Nebuchadnezzar, lifted up my eyes to heaven, and my understanding returned to me; and I blessed the Most High, and I praised and honored him who lives forever, for his dominion is an everlasting dominion, and his kingdom from generation to generation.',
    quoteRef: 'Daniel 4:34',
    details: [
      'The most powerful man alive lost his mind and lived outdoors like an animal.',
      'He had been warned a year in advance and had done nothing about it.',
      'The account is written in his own voice, as a public letter.',
    ],
    whatHappened:
      'At the height of his power, Nebuchadnezzar lost his reason and lived in the open for a long period. When it passed, his understanding returned — and he wrote the account himself, as a public letter, admitting the whole thing.',
    hopeMeaning:
      'The most striking part is who is telling it. An emperor published his own humiliation rather than burying it. Recovery here includes being willing to say what happened.',
    reflectionQuestion:
      'Is there something you have recovered from that you have never told anyone about?',
    title: "Nebuchadnezzar's Madness and Restoration",
    testament: 'old',
    passage: ref('DAN', 'Daniel', '4', 28, 37),
    theme: 'judgment',
    era: 'exile',
  },
  {
    id: 'handwriting-on-the-wall',
    quote:
      'In the same hour, the fingers of a man’s hand came out and wrote near the lamp stand on the plaster of the wall of the king’s palace.',
    quoteRef: 'Daniel 5:5',
    details: [
      'Belshazzar was holding a feast using vessels looted from the temple in Jerusalem.',
      'Only a hand appeared, writing — no figure, no voice.',
      'None of his advisers could read it; an old man from a previous reign was sent for.',
    ],
    whatHappened:
      'In the middle of a feast held with vessels looted from the temple, a hand appeared and wrote on the plaster wall. The king went pale and his knees shook. No adviser could read it. Daniel, long out of favour, was brought in to interpret it, and the kingdom fell that night.',
    hopeMeaning:
      'The warning is unmistakable and it is also unreadable — it needs someone who has kept faith through several reigns to make sense of it. Being able to see that something is wrong is not the same as understanding it, and this account says you may need to go and find someone who does.',
    reflectionQuestion:
      'Who would you go to, if you knew something was wrong but not what?',
    title: 'The Writing on the Wall',
    testament: 'old',
    passage: ref('DAN', 'Daniel', '5', 5, 9),
    theme: 'sign',
    era: 'exile',
    familiarityRank: 20,
  },
  {
    id: 'lions-den',
    title: "Daniel in the Lions' Den",
    location: 'Babylon, under Darius the Mede',
    testament: 'old',
    passage: ref('DAN', 'Daniel', '6', 16, 23),
    theme: 'rescue',
    era: 'exile',
    familiarityRank: 6,
    quote:
      "My God has sent his angel, and has shut the lions' mouths, and they have not hurt me, because innocence was found in me before him; and also before you, O king, I have done no harm.",
    quoteRef: 'Daniel 6:22',
    details: [
      'Daniel kept praying openly, three times a day, even after a law was passed making it a capital offense.',
      'The king who sentenced him spent the whole night fasting, unable to sleep, hoping Daniel would somehow survive.',
      "In the morning, Daniel wasn't just alive — there wasn't a single mark on him.",
    ],
    whatHappened:
      'A group of officials, jealous of Daniel, tricked the king into signing a law that made praying to anyone but the king illegal. Daniel kept praying anyway, exactly as he always had, and was thrown into a den of lions overnight as the penalty. He walked out the next morning completely unharmed.',
    hopeMeaning:
      "Daniel didn't stop an ordinary habit — daily prayer — just because it became dangerous. The miracle wasn't a reward for something dramatic; it was protection over something quietly faithful, repeated for years before anyone was watching that closely.",
    reflectionQuestion:
      'Is there something quietly faithful you keep doing, even when it costs you something to keep doing it?',
  },
]
