/**
 * Master index — New Testament.
 *
 * Locked scope rule: a shared event told by more than one Gospel is more than
 * one wonder here. Each account is its own row with its own passage, tied to
 * its siblings by `parallelGroupId`, so a card can say "Also in Matthew · Luke"
 * and so each account can later stress what *its* writer saw (rule (a)).
 *
 * Ids for parallel accounts are suffixed with the book: `-mat`, `-mrk`,
 * `-luk`, `-jhn`.
 */

import { ref } from '@/lib/passages'
import type { Wonder } from './types'

export const NEW_TESTAMENT_WONDERS: Wonder[] = [
  /* --- Matthew ---------------------------------------------------------- */
  {
    id: 'leper-cleansed-mat',
    quote:
      'Jesus stretched out His hand and touched him, saying, “I want to. Be made clean.”',
    quoteRef: 'Matthew 8:3',
    details: [
      'Leprosy made a person untouchable — contact was forbidden, not merely avoided.',
      "The man's question was not whether Jesus could, but whether He would want to.",
      'The answer repeats his own words back: I want to.',
    ],
    whatHappened:
      'A man with leprosy came and knelt, and said that if Jesus were willing, He could make him clean. Jesus reached out and touched him — something no one had been permitted to do for years — and said He was willing. The leprosy was gone at once.',
    hopeMeaning:
      'The man did not doubt the power. He doubted the willingness, which is a different and often heavier doubt. He was answered in his own words, and touched before he was healed.',
    reflectionQuestion:
      'Is your doubt about whether God can help, or whether God would want to?',
    distinctive:
      'Matthew tells it barest. Mark adds that Jesus was moved with compassion, and that the man then talked so freely that Jesus could no longer enter a town openly; Luke notes the man was full of leprosy. Matthew strips all of that away and leaves the exchange alone: a request about willingness, and an answer in the same words.',
    title: 'A Man with Leprosy Cleansed',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '8', 1, 4),
    theme: 'healing',
    era: 'matthew',
    parallelGroupId: 'leper-cleansed',
  },
  {
    id: 'centurions-servant-mat',
    quote:
      'Most certainly I tell you, I haven’t found so great a faith, not even in Israel.',
    quoteRef: 'Matthew 8:10',
    details: [
      'A centurion was an officer of the occupying army.',
      'He argued from his own job: he gives orders and they are carried out, without him going anywhere.',
      'The servant was healed at a distance, in that hour.',
    ],
    whatHappened:
      'An officer of the occupying army asked for help for his paralysed servant. When Jesus offered to come, the man said there was no need — he understood authority from his own work, and a word would be enough. Jesus said He had found no faith like it in Israel, and the servant was healed where he lay.',
    hopeMeaning:
      'The man reasoned from his ordinary working life to a conclusion about God, and got it right. He is also an outsider and an occupier, and he is the one held up as the example.',
    reflectionQuestion:
      'What does your ordinary work already teach you about how trust operates?',
    distinctive:
      'In Matthew the centurion comes himself and speaks for himself. Luke has him send Jewish elders first, who argue that he deserves it because he built their synagogue, and then send friends with the message. Matthew removes the intermediaries and the case for his worthiness, leaving a man who simply says he is not worthy and asks anyway.',
    title: "The Centurion's Servant",
    testament: 'new',
    passage: ref('MAT', 'Matthew', '8', 5, 13),
    theme: 'healing',
    era: 'matthew',
    parallelGroupId: 'centurions-servant',
  },
  {
    id: 'peters-mother-in-law-mat',
    quote:
      'He touched her hand, and the fever left her. So she got up and served him.',
    quoteRef: 'Matthew 8:15',
    details: [
      "This happens in Peter's own house, to Peter's own family.",
      'There is no request recorded — Jesus saw her and touched her hand.',
      'The first thing she did afterwards was get up and wait on Him.',
    ],
    whatHappened:
      "Jesus went into Peter's house and saw his wife's mother in bed with a fever. He touched her hand, the fever left, and she got up and served Him.",
    hopeMeaning:
      'Nobody asks. He comes into the house, sees someone unwell, and deals with it — and the whole account fits in two sentences. Not everything significant announces itself as significant.',
    reflectionQuestion:
      'What in your household have you stopped mentioning because it seems too ordinary to raise?',
    distinctive:
      'The three accounts differ in one small verb each. Mark has Jesus take her by the hand and raise her up; Luke has Him stand over her and rebuke the fever, as though it were a spirit. Matthew has only a touch — and where the other two say she served them, Matthew says she served Him.',
    title: "Peter's Mother-in-Law Healed",
    testament: 'new',
    passage: ref('MAT', 'Matthew', '8', 14, 15),
    theme: 'healing',
    era: 'matthew',
    parallelGroupId: 'peters-mother-in-law',
  },
  {
    id: 'calming-storm-mat',
    quote:
      'He said to them, “Why are you fearful, O you of little faith?” Then he got up, rebuked the wind and the sea, and there was a great calm.',
    quoteRef: 'Matthew 8:26',
    details: [
      'Matthew places this immediately after sayings about the cost of following Him.',
      'The disciples wake Him with a plea, not an accusation.',
      'He speaks to them first, and to the storm afterwards.',
    ],
    whatHappened:
      'A storm came down on the lake while Jesus slept. The disciples woke Him crying out to be saved. He asked why they were afraid, then stood and rebuked the wind and the sea, and it went completely calm.',
    hopeMeaning:
      'He deals with the men before He deals with the weather. The question about fear comes first, while the boat is still filling. That order is worth noticing — the storm was never the thing most in doubt.',
    reflectionQuestion:
      'If the storm you are in stayed exactly as it is, what would you want dealt with first?',
    distinctive:
      'Matthew has them cry "Save us, Lord! We are dying!" — a plea. Mark has them accuse Him of not caring, and alone notes the cushion He slept on. Luke has "Master, Master". Matthew also has Jesus question their fear before He calms anything, where Mark and Luke calm the sea first and question them after.',
    title: 'The Storm Stilled',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '8', 23, 27),
    theme: 'nature',
    era: 'matthew',
    parallelGroupId: 'calming-storm',
  },
  {
    id: 'gerasene-demoniac-mat',
    quote:
      'When he came to the other side, into the country of the Gergesenes, two people possessed by demons met him there, coming out of the tombs, exceedingly fierce, so that nobody could pass that way.',
    quoteRef: 'Matthew 8:28',
    details: [
      'They lived among the tombs, and the road past them had become impassable.',
      'The demons recognised Him and asked about timing, not mercy.',
      'The herd of pigs ran off the cliff, and the town asked Jesus to leave.',
    ],
    whatHappened:
      'On the far shore, men so violent that nobody could use the road came out of the tombs to meet Him. What was in them recognised Him at once. He sent it into a herd of pigs, which rushed over the cliff — and the townspeople came out and asked Him to go away.',
    hopeMeaning:
      'The ending is the uncomfortable part: a town looks at a man restored and at its lost livestock, and chooses the livestock. Deliverance is not always welcome, and the account does not pretend otherwise.',
    reflectionQuestion:
      'Is there a change you would find genuinely inconvenient if it happened?',
    distinctive:
      "Matthew has two men where Mark and Luke each have one. Mark gives his one man a long, harrowing history — the broken chains, the nights among the tombs, the cutting with stones, the name Legion. Matthew keeps none of it. He gives the pair no backstory and no name, and moves quickly to the town's decision to send Jesus away.",
    title: 'The Demoniacs among the Tombs',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '8', 28, 34),
    theme: 'rescue',
    era: 'matthew',
    parallelGroupId: 'gerasene-demoniac',
  },
  {
    id: 'paralytic-mat',
    quote:
      'Get up, and take up your mat, and go to your house.',
    quoteRef: 'Matthew 9:6',
    details: [
      'Jesus responded first to the faith of the men who brought him, not to anything the paralysed man said.',
      'He spoke about forgiveness before He said anything about walking.',
      'The scribes objected silently, and He answered what they had not said out loud.',
    ],
    whatHappened:
      'A paralysed man was brought to Jesus on a bed. Seeing the faith of those carrying him, Jesus told him his sins were forgiven — which scandalised the scribes watching. He answered the objection they had only thought, and then told the man to pick up his mat and go home. He did.',
    hopeMeaning:
      "The man is carried in by other people's faith and is spoken to about the thing nobody had mentioned. He came for his legs and was addressed about something deeper first, without being asked what he wanted.",
    reflectionQuestion:
      'If someone carried you in, what would you want dealt with — and what might God address first?',
    distinctive:
      'Matthew leaves out the roof. Mark has four men dig through it and lower the mat into the room; Luke has them go up and remove tiles. It is the most memorable image in the story and Matthew simply says they brought him. What he keeps instead is the silent objection of the scribes and Jesus answering a thought nobody voiced.',
    title: 'The Paralysed Man Forgiven and Healed',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '9', 1, 8),
    theme: 'healing',
    era: 'matthew',
    parallelGroupId: 'paralytic',
  },
  {
    id: 'bleeding-woman-mat',
    quote:
      'But Jesus, turning around and seeing her, said, “Daughter, cheer up! Your faith has made you well.”',
    quoteRef: 'Matthew 9:22',
    details: [
      'Twelve years of bleeding meant twelve years of being ritually unclean.',
      'She reached for the fringe of His garment rather than speaking to Him.',
      'He called her daughter — the only person He addresses that way.',
    ],
    whatHappened:
      'A woman who had been bleeding for twelve years came up behind Him in the crowd and touched the edge of His clothing, thinking that would be enough. Jesus turned, saw her, and told her that her faith had made her well.',
    hopeMeaning:
      'She tried to receive without being noticed, and was noticed anyway — and what she got was not only healing but being called daughter in public by the person she had hoped not to have to face.',
    reflectionQuestion:
      'Is there help you would rather receive without anyone knowing you needed it?',
    distinctive:
      'Matthew tells it in three verses. Mark and Luke both have Jesus stop the crowd and ask who touched Him, the disciples pointing out how absurd the question is, and the woman coming forward trembling to confess in front of everyone. Matthew has none of that search: Jesus simply turns and sees her. The moment is private in Matthew and public in the other two.',
    title: 'The Woman Who Touched His Cloak',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '9', 20, 22),
    theme: 'healing',
    era: 'matthew',
    parallelGroupId: 'bleeding-woman',
  },
  {
    id: 'jairus-daughter-mat',
    quote:
      'But when the crowd was sent out, he entered in, took her by the hand, and the girl arose.',
    quoteRef: 'Matthew 9:25',
    details: [
      'The father came and knelt while Jesus was in the middle of a conversation.',
      'The house was already full of flute players and mourners when they arrived.',
      'Jesus said she was sleeping, and was laughed at for it.',
    ],
    whatHappened:
      'A ruler came and knelt, saying his daughter had just died, and asked Jesus to come and lay a hand on her. At the house the mourners had already gathered. Jesus said the girl was only sleeping and was laughed at. He put the crowd out, took her hand, and she got up.',
    hopeMeaning:
      'The father asks for something after it is already too late, which is not how requests are supposed to work. He is not corrected for the timing. The professional mourners had already started, and they were wrong.',
    reflectionQuestion:
      'Is there something you have stopped asking about because you decided it was too late?',
    distinctive:
      "Matthew compresses hard. Mark and Luke name the father Jairus, have him ask while the girl is still alive, and then have messengers arrive mid-journey with the news that she has died — so the story turns on whether he will keep believing after that. Matthew's ruler says from the first sentence that she has already died. He removes the interval, and with it the crisis of faith the other two build the scene around.",
    title: "The Ruler's Daughter Raised",
    testament: 'new',
    passage: ref('MAT', 'Matthew', '9', 23, 26),
    theme: 'raising',
    era: 'matthew',
    parallelGroupId: 'jairus-daughter',
  },
  {
    id: 'two-blind-men-mat',
    quote:
      'Then he touched their eyes, saying, “According to your faith be it done to you.”',
    quoteRef: 'Matthew 9:29',
    details: [
      'They followed Him calling out, and He did not answer until He had gone indoors.',
      'He asked them directly whether they believed He could do it.',
      'Told to keep it quiet, they spread the news through the whole district.',
    ],
    whatHappened:
      'Two blind men followed Jesus through the street calling for mercy. He did not respond until He had reached the house, and then asked whether they believed He was able. They said yes. He touched their eyes, and told them to tell nobody — which they immediately ignored.',
    hopeMeaning:
      'They were not answered in the street. They had to keep following and calling with no reply, all the way indoors, before anything happened. The delay was not refusal, though it must have felt like one at the time.',
    reflectionQuestion:
      'How do you tell the difference between being refused and being asked to keep going?',
    title: 'Two Blind Men Follow Him',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '9', 27, 31),
    theme: 'healing',
    era: 'matthew',
  },
  {
    id: 'mute-demoniac-mat',
    quote:
      'When the demon was cast out, the mute man spoke. The multitudes marveled, saying, “Nothing like this has ever been seen in Israel!”',
    quoteRef: 'Matthew 9:33',
    details: [
      'The man was brought by others; he could not ask for himself.',
      "The crowd's reaction and the Pharisees' reaction are recorded side by side.",
      'The same event produced amazement in one group and an accusation in the other.',
    ],
    whatHappened:
      'A man who could not speak was brought to Jesus. When what held him was driven out, he spoke. The crowd said nothing like it had ever been seen in Israel — and in the same breath the account records the Pharisees saying He did it by the prince of demons.',
    hopeMeaning:
      'Matthew puts the wonder and the accusation in consecutive sentences, without comment. The same event convinced some people and hardened others. Evidence, it turns out, is not what decides the matter.',
    reflectionQuestion:
      'Have you ever assumed that if the evidence were clearer, the disagreement would end?',
    title: 'The Mute Man Speaks',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '9', 32, 34),
    theme: 'healing',
    era: 'matthew',
  },
  {
    id: 'withered-hand-mat',
    title: 'The Withered Hand Restored',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '12', 9, 13),
    theme: 'healing',
    era: 'matthew',
    parallelGroupId: 'withered-hand',
    quote:
      'Then he told the man, “Stretch out your hand.” He stretched it out; and it was restored whole, just like the other.',
    quoteRef: 'Matthew 12:13',
    details: [
      'He was being watched, so that they would have grounds to accuse Him.',
      'He argued from a sheep in a pit: nobody would leave one there on the Sabbath.',
      'The man was asked to stretch out the hand that did not work.',
    ],
    whatHappened:
      'In the synagogue on the Sabbath, with people watching for an excuse to accuse Him, Jesus asked about a sheep fallen into a pit — nobody would leave it there for a day. Then He told a man with a withered hand to stretch it out, and it was restored.',
    hopeMeaning:
      'The man was asked to do the one thing he could not do, before anything changed. Stretching out that hand was the act of faith, and it happened while it was still withered.',
    reflectionQuestion:
      'What are you waiting to be able to do, that you may be asked to attempt first?',
    distinctive:
      'Matthew alone gives the sheep-in-a-pit argument, and puts the reasoning before the healing. Mark keeps the question short and grim — is it lawful to save a life or to kill? — and alone records Jesus looking round in anger, grieved at their hardness. Luke notes it was the right hand. Matthew makes it a case argued and won before anyone is touched.',
  },
  {
    id: 'blind-mute-demoniac-mat',
    title: 'A Blind and Mute Man Healed',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '12', 22, 23),
    theme: 'healing',
    era: 'matthew',
    quote:
      'Then one possessed by a demon, blind and mute, was brought to him; and he healed him, so that the blind and mute man both spoke and saw.',
    quoteRef: 'Matthew 12:22',
    details: [
      'The man could neither see nor speak — he could not find Jesus or ask for anything.',
      'He was brought by other people.',
      "The crowd's question afterwards was about who Jesus was, not about the man.",
    ],
    whatHappened:
      'A man who was blind and could not speak was brought to Jesus. He was healed, and both spoke and saw. The crowds, watching, began asking whether this could be the son of David.',
    hopeMeaning:
      'He could not have found his way there and could not have asked once he arrived. Everything depended on other people carrying him into the room. That is not a lesser way to be helped.',
    reflectionQuestion:
      'Who would bring you, if you could not get there or ask for yourself?',
  },
  {
    id: 'feeding-5000-mat',
    title: 'Five Thousand Fed',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '14', 13, 21),
    theme: 'provision',
    era: 'matthew',
    parallelGroupId: 'feeding-5000',
    quote:
      'Those who ate were about five thousand men, in addition to women and children.',
    quoteRef: 'Matthew 14:21',
    details: [
      "Jesus had withdrawn to be alone after hearing of John the Baptist's death; the crowd followed.",
      'Five loaves and two fish, and twelve baskets left over.',
      'Matthew counts five thousand men, and then says there were women and children as well.',
    ],
    whatHappened:
      'Jesus had gone away by Himself after hearing that John the Baptist had been killed, and the crowds followed on foot. He fed them all from five loaves and two fish, and twelve baskets of scraps were gathered afterwards.',
    hopeMeaning:
      'He was grieving and had gone away deliberately to be alone. The crowd arrived anyway, and He fed them. Nothing in the account says He had recovered first.',
    reflectionQuestion:
      'Have you assumed you must be in a good state before you can be any use to anyone?',
    distinctive:
      'Matthew alone adds "in addition to women and children" — quietly multiplying the number and, in the same breath, noting who the standard count leaves out. He also alone frames the whole scene with the death of John the Baptist just beforehand, so the feeding happens in the middle of grief.',
  },
  {
    id: 'walking-on-water-mat',
    title: 'Walking on the Water',
    location: 'The Sea of Galilee, in the fourth watch of the night',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '14', 25, 31),
    theme: 'nature',
    era: 'matthew',
    parallelGroupId: 'walking-on-water',
    familiarityRank: 3,
    quote:
      'Immediately Jesus stretched out His hand, took hold of Him, and said to Him, "You of little faith, why did you doubt?"',
    quoteRef: 'Matthew 14:31',
    details: [
      'The disciples were miles from shore, fighting strong headwinds, when they saw a figure walking toward them on the sea.',
      'Peter is the only one who asked to try it himself — and he did walk, for a moment.',
      'He only began to sink once he noticed the wind and got afraid, not before.',
    ],
    whatHappened:
      'Exhausted from rowing against the wind all night, the disciples saw what they thought was a ghost walking toward their boat across the water. It was Jesus. Peter asked to come out and meet him — and for a few steps, he did — until he noticed how strong the wind was and started to sink.',
    hopeMeaning:
      "Peter didn't fail because he tried. He only faltered once his attention moved from Jesus to the size of the wind. The hand that caught him was already reaching out before he'd even finished asking for help.",
    reflectionQuestion:
      "What are you looking at right now — the wind, or the hand that's already reaching for you?",
    distinctive:
      'Only Matthew puts Peter over the side. Mark keeps the disciples in the boat and ends on hearts that still did not understand; John has the boat simply arrive at the shore. Matthew alone tells of someone who asked to come, managed it, looked at the wind, went under, and was caught — which makes this the account about faith that starts and falters rather than faith that never began.',
  },
  {
    id: 'canaanite-daughter-mat',
    title: "The Canaanite Woman's Daughter",
    testament: 'new',
    passage: ref('MAT', 'Matthew', '15', 21, 28),
    theme: 'healing',
    era: 'matthew',
    parallelGroupId: 'canaanite-daughter',
    quote:
      'Then Jesus answered her, “Woman, great is your faith! Be it done to you even as you desire.”',
    quoteRef: 'Matthew 15:28',
    details: [
      'She was a foreigner, asking for a daughter she had not brought with her.',
      'At first He said nothing at all, and the disciples asked Him to send her away.',
      'She took the hard word about dogs and turned it into an argument for crumbs.',
    ],
    whatHappened:
      'A Canaanite woman followed them calling out for her daughter. Jesus did not answer her at first, and the disciples asked Him to get rid of her. What He did say sounded like a refusal. She took His own words and reasoned with them — even dogs get the crumbs — and He told her that her faith was great, and her daughter was healed.',
    hopeMeaning:
      'This is one of the hardest exchanges in the Gospels, and it should not be smoothed over. What the account preserves is a woman who refused to be dismissed, argued back, and was praised for it.',
    reflectionQuestion:
      'Would you keep asking after a silence, or take it as your answer?',
    distinctive:
      'Matthew alone records the silence — "he answered her not a word" — and the disciples asking Him to send her away, and the line about being sent only to the lost sheep of Israel. Mark\'s shorter version begins with the exchange itself and calls her a Syrophoenician Greek. Matthew makes the reader sit through the refusal before the praise.',
  },
  {
    id: 'feeding-4000-mat',
    title: 'Four Thousand Fed',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '15', 32, 39),
    theme: 'provision',
    era: 'matthew',
    parallelGroupId: 'feeding-4000',
    quote:
      'I have compassion on the multitude, because they have continued with me now three days and have nothing to eat.',
    quoteRef: 'Matthew 15:32',
    details: [
      'This is a second, separate feeding — seven loaves this time, and seven baskets left.',
      'The disciples ask where they could possibly get bread, having already seen the first one.',
      'It was Jesus who raised the problem; nobody complained of hunger.',
    ],
    whatHappened:
      'A crowd had been with Him three days and had nothing left to eat. Jesus raised it Himself. His disciples asked where anyone would find bread in such a deserted place — though they had seen this before. Seven loaves and a few small fish fed four thousand men, besides women and children, with seven baskets left.',
    hopeMeaning:
      'The disciples had already watched Him do this, and still had no idea what to suggest. The account records their blankness without scolding them. Having seen God act once does not automatically make you able to imagine it happening again.',
    reflectionQuestion:
      'What has God already done for you that you have somehow stopped counting on?',
    distinctive:
      'Matthew and Mark both tell this second feeding, and Matthew again adds "in addition to women and children", as he did with the five thousand. He also opens with Jesus naming the compassion first — the problem is raised by Him rather than by anyone who was hungry.',
  },
  {
    id: 'transfiguration-mat',
    title: 'The Transfiguration',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '17', 1, 8),
    theme: 'sign',
    era: 'matthew',
    parallelGroupId: 'transfiguration',
    familiarityRank: 18,
    quote:
      'He was changed before them. His face shone like the sun, and His garments became as white as the light.',
    quoteRef: 'Matthew 17:2',
    details: [
      'Only Peter, James and John were taken up the mountain.',
      'Moses and Elijah appeared and talked with Him.',
      "Peter's suggestion about building three shelters was interrupted by the cloud.",
    ],
    whatHappened:
      'On a high mountain, in front of three of His disciples, Jesus was changed — His face shining, His clothes white as light — and Moses and Elijah appeared talking with Him. Peter started suggesting they build shelters. A bright cloud came over them and a voice spoke, and then there was no one there but Jesus.',
    hopeMeaning:
      "Peter's instinct was to make the moment permanent — to build something and stay. He was interrupted mid-sentence. Some things are given to be seen and then walked away from, and the walking away is not a loss of them.",
    reflectionQuestion:
      'Is there a moment you keep trying to rebuild rather than carry with you?',
    distinctive:
      "Matthew alone has the disciples fall on their faces in terror at the voice, and Jesus come over, touch them, and tell them to get up and not be afraid. Mark ends on their confusion and Peter not knowing what to say; Luke alone notes they were heavy with sleep and that Moses and Elijah spoke of His departure. Matthew's version closes with a hand on the shoulder.",
  },
  {
    id: 'boy-with-demon-mat',
    title: 'The Boy His Disciples Could Not Help',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '17', 14, 21),
    theme: 'healing',
    era: 'matthew',
    parallelGroupId: 'boy-with-demon',
    quote:
      'For most certainly I tell you, if you have faith as a grain of mustard seed, you will tell this mountain, ‘Move from here to there,’ and it will move; and nothing will be impossible for you.',
    quoteRef: 'Matthew 17:20',
    details: [
      'The father had already brought his son to the disciples, who could not help.',
      'The failure was public, in front of a crowd.',
      'The disciples asked afterwards, privately, why they had not been able to do it.',
    ],
    whatHappened:
      'A father brought his son to the disciples and they could not help him. Jesus rebuked what held the boy and he was cured from that hour. Afterwards the disciples asked privately why they had failed, and were told about faith the size of a mustard seed.',
    hopeMeaning:
      'The measure given is deliberately tiny. The problem was never that they had too little faith to be worth counting — a seed is enough. What follows a public failure here is a private conversation rather than a dismissal.',
    reflectionQuestion:
      'After something you attempted did not work, did you ask why, or just stop attempting?',
    distinctive:
      'Matthew\'s answer to the disciples is the mustard seed and the mountain. Mark spends far longer on the father — the boy convulsing on the ground, the years of it, and the father\'s famous "I believe; help my unbelief" — and gives a different answer, that this kind comes out only by prayer. Matthew turns the scene towards the disciples\' failure and what would have been enough to prevent it.',
  },
  {
    id: 'coin-in-the-fish-mat',
    title: 'The Coin in the Fish',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '17', 24, 27),
    theme: 'provision',
    era: 'matthew',
    quote:
      'But, lest we cause them to stumble, go to the sea, cast a hook, and take up the first fish that comes up. When you have opened its mouth, you will find a stater coin.',
    quoteRef: 'Matthew 17:27',
    details: [
      'The temple tax collectors asked Peter, not Jesus, whether his teacher paid.',
      'Jesus argued that the children of a king are exempt — and then paid anyway.',
      'The coin was exactly enough for two.',
    ],
    whatHappened:
      'Collectors asked Peter whether his teacher paid the temple tax. Before Peter could raise it, Jesus asked whether kings tax their own children, and concluded the children were exempt. Then, so as not to cause offence, He sent Peter to catch a fish, which had in its mouth a coin worth exactly the tax for two.',
    hopeMeaning:
      "He establishes that He does not owe it, and then pays it, so as not to put a stumbling block in anyone's way. Being right about an obligation and choosing to meet it anyway are not in conflict here.",
    reflectionQuestion:
      'Where might you be right, and still better off not insisting on it?',
  },
  {
    id: 'blind-at-jericho-mat',
    title: 'Two Blind Men at Jericho',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '20', 29, 34),
    theme: 'healing',
    era: 'matthew',
    parallelGroupId: 'blind-at-jericho',
    quote:
      'Jesus, being moved with compassion, touched their eyes; and immediately their eyes received their sight, and they followed Him.',
    quoteRef: 'Matthew 20:34',
    details: [
      'The crowd told them to be quiet, and they shouted louder.',
      'Jesus stopped walking and asked them what they wanted Him to do.',
      'Having received their sight, they followed Him down the road.',
    ],
    whatHappened:
      'Two blind men sitting by the road heard that Jesus was passing and called out. The crowd told them to be quiet; they shouted more loudly. Jesus stopped, called them over, and asked what they wanted. He touched their eyes, and they saw — and followed Him.',
    hopeMeaning:
      'The crowd around Jesus was the obstacle, not Jesus. And He asked them to say what they wanted out loud, rather than assuming. Being asked what you actually want is its own kind of dignity.',
    reflectionQuestion:
      'If you were asked plainly what you want done for you, could you answer?',
    distinctive:
      'Matthew has two blind men, as he had two demoniacs. Mark has one and gives him a name — Bartimaeus — and the detail of him throwing off his cloak and springing up; Luke has one, unnamed, before Jericho rather than after. Matthew alone says Jesus was moved with compassion and touched their eyes, where Mark and Luke have Him heal with a word about faith.',
  },
  {
    id: 'fig-tree-mat',
    title: 'The Fig Tree Withers',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '21', 18, 22),
    theme: 'sign',
    era: 'matthew',
    parallelGroupId: 'fig-tree',
    quote:
      'He said to it, “Let there be no fruit from you forever!” Immediately the fig tree withered away.',
    quoteRef: 'Matthew 21:19',
    details: [
      'The tree was in full leaf, which normally signalled fruit.',
      'This is the only destructive miracle in the Gospels.',
      "The disciples' reaction was not horror but astonishment at the speed.",
    ],
    whatHappened:
      'Hungry on the road, Jesus came to a fig tree in leaf and found nothing on it. He said it would never bear fruit again, and it withered on the spot. The disciples were astonished at how quickly it happened, and He spoke to them about faith and prayer.',
    hopeMeaning:
      'This is the one wonder that destroys rather than restores, and it is aimed at a tree advertising fruit it did not have. It is a hard image, and it is kept in the catalog because leaving it out would make the collection less honest.',
    reflectionQuestion:
      'Is there anywhere your leaves are further along than your fruit?',
    distinctive:
      "In Matthew the tree withers immediately and the disciples marvel at once. Mark spreads it over two days — the tree is cursed on the way into Jerusalem, the temple is cleared in between, and only next morning do they pass it and find it dried up from the roots. Mark's arrangement makes the tree a comment on the temple; Matthew's keeps the focus on how fast it happened, and on prayer.",
  },
  {
    id: 'resurrection-mat',
    title: 'He Is Risen',
    testament: 'new',
    passage: ref('MAT', 'Matthew', '28', 1, 10),
    theme: 'raising',
    era: 'matthew',
    parallelGroupId: 'resurrection',
    quote:
      'He is not here, for He has risen, just like He said. Come, see the place where the Lord was lying.',
    quoteRef: 'Matthew 28:6',
    details: [
      'There was an earthquake, and the stone was rolled back by an angel who then sat on it.',
      'The guards posted to prevent exactly this shook and became like dead men.',
      'The women were the first told, and the first to go and tell others.',
    ],
    whatHappened:
      'At dawn the women came to the tomb. There was an earthquake; an angel rolled the stone away and sat on it, and the soldiers guarding the tomb collapsed with fear. The women were told He had risen, shown the empty place, and sent to tell the others.',
    hopeMeaning:
      'The stone is not moved to let Him out but to let them in — He is already gone. And the people trusted with the news first are the women, in a setting where their testimony carried little formal weight.',
    reflectionQuestion:
      'Whose account of something important have you been slow to take seriously?',
    distinctive:
      "Matthew alone has the earthquake, the angel sitting on the stone, and the guards — he is the only writer who tells us anyone was posted there, and the only one who follows up with what the authorities did about it. Mark ends with the women fleeing in silence and fear; Luke has two men in dazzling clothes; John has Mary alone at the tomb weeping. Matthew's is the public, official version, with witnesses who did not want to be witnesses.",
  },

  /* --- Mark ------------------------------------------------------------- */
  {
    id: 'demoniac-in-synagogue-mrk',
    title: 'The Man in the Synagogue',
    testament: 'new',
    passage: ref('MRK', 'Mark', '1', 21, 28),
    theme: 'rescue',
    era: 'mark',
    parallelGroupId: 'demoniac-in-synagogue',
    quote:
      'Jesus rebuked him, saying, “Be quiet, and come out of him!”',
    quoteRef: 'Mark 1:25',
    details: [
      "This is the first thing Jesus does in Mark's Gospel after calling His first disciples.",
      'It happens in a synagogue, during a service.',
      'The unclean spirit knew exactly who He was before anyone else did.',
    ],
    whatHappened:
      'In the synagogue at Capernaum, a man with an unclean spirit cried out — naming Jesus correctly, which nobody else in the room had done. Jesus told it to be quiet and come out. It convulsed the man and left, and the congregation were left asking each other what they had just seen.',
    hopeMeaning:
      'The first person in Mark to say plainly who Jesus is happens to be the thing being driven out. Right belief and right standing are not the same thing here — which is oddly freeing for anyone who has assumed that understanding God correctly is the whole of it.',
    reflectionQuestion:
      'Is there something you believe to be true about God that has not yet changed how you live?',
    distinctive:
      "Mark opens his account of Jesus' work with this — it is the first miracle in his Gospel, placed before any healing, and the crowd's reaction is about authority rather than compassion. Luke tells the same scene but Mark alone makes it the opening move, so the whole Gospel begins with something being confronted rather than someone being comforted.",
  },
  {
    id: 'peters-mother-in-law-mrk',
    title: "Peter's Mother-in-Law Healed",
    testament: 'new',
    passage: ref('MRK', 'Mark', '1', 29, 31),
    theme: 'healing',
    era: 'mark',
    parallelGroupId: 'peters-mother-in-law',
    quote:
      'He came and took her by the hand and raised her up. The fever left her immediately, and she served them.',
    quoteRef: 'Mark 1:31',
    details: [
      'They told Him about her at once, as soon as they came into the house.',
      'He took her by the hand and raised her up rather than speaking.',
      'That evening the whole town gathered at the door.',
    ],
    whatHappened:
      "Coming out of the synagogue into Peter's house, they told Jesus at once that Peter's wife's mother was in bed with a fever. He took her by the hand and raised her up; the fever left, and she got up and served them.",
    hopeMeaning:
      'Someone mentioned it immediately, without waiting to see whether it was worth mentioning. The whole exchange is a few seconds long and needs no build-up.',
    reflectionQuestion:
      'What would you mention straight away, if you assumed it was worth mentioning?',
    distinctive:
      'Mark uses the language of raising — took her by the hand and raised her up — the same verb he will use for the dead. Matthew has only a touch; Luke has Jesus stand over her and rebuke the fever as though addressing a spirit. Mark also alone sets it immediately after the synagogue confrontation, so the public act and the domestic one sit side by side in one afternoon.',
  },
  {
    id: 'leper-cleansed-mrk',
    title: 'A Man with Leprosy Cleansed',
    testament: 'new',
    passage: ref('MRK', 'Mark', '1', 40, 45),
    theme: 'healing',
    era: 'mark',
    parallelGroupId: 'leper-cleansed',
    quote:
      'Being moved with compassion, He stretched out His hand, and touched him, and said to him, “I want to. Be made clean.”',
    quoteRef: 'Mark 1:41',
    details: [
      'Mark says outright what moved Him: compassion.',
      'Jesus warned him sternly to say nothing.',
      'He told everyone, and as a result Jesus could no longer enter a town openly.',
    ],
    whatHappened:
      'A man with leprosy knelt and said Jesus could make him clean if He were willing. Moved with compassion, Jesus touched him and said He was willing. Then He warned him sternly to tell nobody — and the man told everyone, until Jesus could no longer go into a town openly and stayed out in deserted places.',
    hopeMeaning:
      "The healed man's joy cost Jesus his freedom of movement, and the account records that without rebuking him for it. Some consequences of good news are inconvenient and are borne anyway.",
    reflectionQuestion:
      'Has your gratitude ever cost someone else something?',
    distinctive:
      "Mark alone names the emotion — moved with compassion — and alone follows the story past the healing to its cost: the man's talking meant Jesus could no longer enter a city openly. Matthew ends at the instruction to show himself to the priest; Luke adds that Jesus withdrew to pray. Mark is the one who tells you what it did to Jesus' movements afterwards.",
  },
  {
    id: 'paralytic-mrk',
    title: 'The Man Let Down through the Roof',
    testament: 'new',
    passage: ref('MRK', 'Mark', '2', 1, 12),
    theme: 'healing',
    era: 'mark',
    parallelGroupId: 'paralytic',
    quote:
      'When they could not come near to Him for the crowd, they removed the roof where He was. When they had broken it up, they let down the mat that the paralytic was lying on.',
    quoteRef: 'Mark 2:4',
    details: [
      'Four men carried him, and the house was too crowded to get in.',
      "They dug through someone's roof rather than wait.",
      "Jesus responded to their faith — the carriers' — not the paralysed man's.",
    ],
    whatHappened:
      'Four men carried a paralysed friend to the house where Jesus was teaching and could not get through the crowd. So they went up, broke open the roof, and lowered him through it. Jesus saw their faith and spoke first about forgiveness, then told the man to get up and walk home.',
    hopeMeaning:
      "The faith the text credits belongs to the men on the roof. Someone else's determination is what put him in front of Jesus, and that counted.",
    reflectionQuestion:
      'Whose determination has put you somewhere you could not have got to alone?',
    distinctive:
      "Mark gives the four carriers and the broken roof in full detail — the crowd, the digging, the mat lowered through the hole. Matthew leaves the roof out entirely and simply says they brought him; Luke has them go up and remove tiles. Mark is the one who makes you feel the effort and the damage done to somebody's house.",
  },
  {
    id: 'withered-hand-mrk',
    title: 'The Withered Hand Restored',
    testament: 'new',
    passage: ref('MRK', 'Mark', '3', 1, 6),
    theme: 'healing',
    era: 'mark',
    parallelGroupId: 'withered-hand',
    quote:
      'When he had looked around at them with anger, being grieved at the hardening of their hearts, he said to the man, “Stretch out your hand.”',
    quoteRef: 'Mark 3:5',
    details: [
      'He asked whether it was lawful to do good or harm on the Sabbath, and nobody answered.',
      'Mark records Jesus angry — and grieved — in the same sentence.',
      'The response to the healing was a plot to destroy Him.',
    ],
    whatHappened:
      'In the synagogue, watched by people looking for a charge, Jesus asked whether the Sabbath was for doing good or harm, for saving life or killing. Nobody answered. He looked round at them, angry and grieved, and told the man to stretch out his hand. It was restored — and the watchers went straight out to plan His death.',
    hopeMeaning:
      'Mark lets Jesus be angry, and says the anger was grief at hard hearts rather than at the men themselves. Anger and grief turn out to be the same thing here, aimed at what people had become rather than at who they were.',
    reflectionQuestion:
      'Is there anger in you that is really grief about something?',
    distinctive:
      "Mark alone records the anger and the grief on Jesus' face, and alone ends with the Pharisees conspiring with the Herodians to destroy Him — an alliance of enemies. Matthew argues the case first with the sheep in a pit; Luke notes it was the right hand. Mark makes the scene about hardness meeting silence.",
  },
  {
    id: 'calming-storm-mrk',
    title: 'The Storm Stilled',
    location: 'The Sea of Galilee, in a boat at evening',
    testament: 'new',
    passage: ref('MRK', 'Mark', '4', 37, 41),
    theme: 'nature',
    era: 'mark',
    parallelGroupId: 'calming-storm',
    familiarityRank: 11,
    quote:
      'He awoke and rebuked the wind, and said to the sea, "Peace! Be still!" The wind ceased and there was a great calm.',
    quoteRef: 'Mark 4:39',
    details: [
      'The storm was strong enough that experienced fishermen were convinced they were about to die.',
      'Jesus was asleep in the boat, seemingly unbothered by the same waves terrifying everyone else.',
      "He didn't calm the disciples first — he spoke directly to the wind and the water.",
    ],
    whatHappened:
      'Caught in a sudden, violent storm on the lake, the disciples — several of them experienced fishermen — panicked and woke Jesus, convinced the boat was going down. He stood up, spoke three words to the storm, and the wind and waves went completely still.',
    hopeMeaning:
      "What's easy to miss is that Jesus was in the boat the whole time, storm and all — just asleep. Hope doesn't always mean the danger never touches you. Sometimes it means the one who can calm it was already there before you noticed.",
    reflectionQuestion:
      'In your current storm, does it feel like you\'re facing it alone — or is it possible help has been closer than you realized?',
    distinctive:
      'Mark is the blunt one. Matthew has the disciples cry "Save us, Lord!" and Luke "Master, Master" — Mark has them accuse him: "Teacher, don\'t you care that we are dying?" Mark alone notes he was asleep on the cushion, and alone gives the words spoken to the sea: "Peace! Be still!" This is the account where the disciples are not merely frightened but convinced they have been abandoned, and say so to his face.',
  },
  {
    id: 'gerasene-demoniac-mrk',
    title: 'The Man Called Legion',
    testament: 'new',
    passage: ref('MRK', 'Mark', '5', 1, 20),
    theme: 'rescue',
    era: 'mark',
    parallelGroupId: 'gerasene-demoniac',
    quote:
      'He asked him, “What is your name?” He said to him, “My name is Legion, for we are many.”',
    quoteRef: 'Mark 5:9',
    details: [
      'He had broken every chain and fetter used on him; nobody had the strength to restrain him.',
      'He lived among the tombs, crying out night and day and cutting himself with stones.',
      'Afterwards he was found sitting, clothed, and in his right mind.',
    ],
    whatHappened:
      'A man lived among the tombs, uncontainable, howling day and night and cutting himself. He ran and knelt before Jesus. Asked its name, what held him answered Legion. It was sent into a herd of pigs, which drowned. When the townspeople came, the man was sitting there dressed and in his right mind — and they asked Jesus to leave.',
    hopeMeaning:
      'Mark spends more words on how bad it had been than on the deliverance itself, which is why the picture of him sitting and clothed lands so hard. The account also refuses a neat ending: he asks to come along and is told to go home and tell his own people instead.',
    reflectionQuestion:
      'Would you rather be sent somewhere new, or sent back to the people who knew you before?',
    distinctive:
      'Mark gives the fullest and grimmest history: the chains torn apart, the nights in the mountains, the self-harm, and the name Legion. Matthew has two men and no backstory at all; Luke keeps the name but compresses the suffering. Mark alone ends with the man begging to go with Jesus and being told to stay and tell his own household.',
  },
  {
    id: 'bleeding-woman-mrk',
    title: 'The Woman Who Touched His Cloak',
    location: 'A crowded street in Galilee, on the way to a dying girl',
    testament: 'new',
    passage: ref('MRK', 'Mark', '5', 25, 34),
    theme: 'healing',
    era: 'mark',
    parallelGroupId: 'bleeding-woman',
    familiarityRank: 12,
    quote:
      'Daughter, your faith has made you well. Go in peace, and be cured of your disease.',
    quoteRef: 'Mark 5:34',
    details: [
      'She had been ill for twelve years, and had spent everything she owned on doctors, only to get worse.',
      "She didn't ask Jesus for anything out loud — she reached through the crowd and touched the edge of his clothing.",
      'Jesus stopped and looked for her specifically, even in a crowd pressing in from every side.',
    ],
    whatHappened:
      'A woman who had suffered a chronic illness for twelve years — and spent everything she had trying to get better — pushed through a dense crowd, too afraid or ashamed to ask out loud, and just touched the edge of Jesus\'s cloak. She was healed instantly, and Jesus stopped to find her.',
    hopeMeaning:
      "Twelve years of being unseen, unheard, and overlooked ends with Jesus stopping an entire crowd just to notice her. Hope isn't only for the miracles everyone is watching. It reaches the person who was too tired, or too embarrassed, to ask for help out loud.",
    reflectionQuestion:
      "Is there a need you've been carrying quietly, too tired or embarrassed to say out loud?",
    distinctive:
      'Mark gives her the longest and least flattering medical history: she had suffered many things at the hands of many physicians, spent everything she had, and was no better but rather grew worse. Matthew tells it in three verses and has Jesus simply turn and see her; Luke keeps the doctors but not the detail that they made her worse. Mark is the account for anyone whose treatment has cost them everything and left them further back than they started.',
  },
  {
    id: 'jairus-daughter-mrk',
    title: "Jairus' Daughter Raised",
    testament: 'new',
    passage: ref('MRK', 'Mark', '5', 35, 43),
    theme: 'raising',
    era: 'mark',
    parallelGroupId: 'jairus-daughter',
    familiarityRank: 21,
    quote:
      'Taking the child by the hand, he said to her, “Talitha cumi!” Which means, being interpreted, “Girl, I tell you, get up!”',
    quoteRef: 'Mark 5:41',
    details: [
      'The father is named — Jairus — and is a synagogue official.',
      'Word came mid-journey that the girl had died, and that there was no point troubling the teacher.',
      'Mark keeps the actual Aramaic words spoken, and notes she was twelve years old.',
    ],
    whatHappened:
      "Jairus, a synagogue ruler, begged Jesus to come for his dying daughter. On the way, messengers said she had died and there was no point continuing. Jesus told him not to be afraid, only believe. At the house He put out the mourners, took the girl's hand, and said in Aramaic: little girl, get up. She did — and He told them to give her something to eat.",
    hopeMeaning:
      "The message on the road is the hardest sentence in the story: don't bother the teacher any more. Jairus is told to keep believing precisely after the reason for hope has gone. And at the end, the miracle finishes with someone remembering the child would be hungry.",
    reflectionQuestion:
      'What would it take to keep walking after the news that it is too late?',
    distinctive:
      'Mark alone preserves the Aramaic — Talitha cumi — as though remembering the exact sound of it, and alone adds that Jesus told them to give her something to eat. He names Jairus, where Matthew leaves him an unnamed ruler, and he alone gives the interval on the road where the news arrives and the father has to decide whether to keep going.',
  },
  {
    id: 'feeding-5000-mrk',
    title: 'Five Thousand Fed',
    testament: 'new',
    passage: ref('MRK', 'Mark', '6', 30, 44),
    theme: 'provision',
    era: 'mark',
    parallelGroupId: 'feeding-5000',
    quote:
      'They took up twelve baskets full of broken pieces and also of the fish.',
    quoteRef: 'Mark 6:43',
    details: [
      'Jesus had tried to take the disciples somewhere quiet to rest; the crowd got there first.',
      'Mark says He was moved because they were like sheep without a shepherd.',
      'They sat down in groups on green grass.',
    ],
    whatHappened:
      'Jesus had taken the disciples away to rest, and the crowd arrived ahead of them. Seeing them like sheep without a shepherd, He taught them, and then fed five thousand from five loaves and two fish. They sat in groups on the green grass, and twelve baskets of scraps were gathered.',
    hopeMeaning:
      "The attempt to rest failed, and He taught and fed them anyway. Mark's reason is not that they were hungry but that they had no one leading them — the meal answers a loneliness as much as an appetite.",
    reflectionQuestion:
      'Is what you are hungry for actually food, or something more like being led?',
    distinctive:
      'Mark alone explains the motive — they were like sheep without a shepherd — and alone notices the green grass and the people sitting in orderly groups of hundreds and fifties. John names the boy and the barley; Matthew counts the women and children. Mark gives you the picture of the hillside itself.',
  },
  {
    id: 'walking-on-water-mrk',
    title: 'Walking on the Water',
    testament: 'new',
    passage: ref('MRK', 'Mark', '6', 45, 52),
    theme: 'nature',
    era: 'mark',
    parallelGroupId: 'walking-on-water',
    quote:
      'For they hadn’t understood about the loaves, but their hearts were hardened.',
    quoteRef: 'Mark 6:52',
    details: [
      'He saw them straining at the oars against a headwind, from the shore, at night.',
      'Mark says He intended to pass by them.',
      'The account ends by saying they had not understood about the loaves.',
    ],
    whatHappened:
      'Late in the night, seeing the disciples struggling against the wind, Jesus came to them walking on the sea — and would have passed by. They saw Him, thought He was a ghost, and cried out. He spoke to them, got into the boat, and the wind dropped. Mark ends by noting they still had not understood about the loaves.',
    hopeMeaning:
      'He saw them straining before they saw Him. And Mark ends not on triumph but on hearts that had not caught up — the wonder happened and they still did not understand. That is recorded without embarrassment.',
    reflectionQuestion:
      'Is there something you have seen God do that you still have not really absorbed?',
    distinctive:
      "Mark alone says He meant to pass by them, and alone ends on the flat verdict that their hearts were hardened because they had not understood about the loaves. Matthew turns the same night into Peter's walk and rescue; John shortens it to the boat reaching shore. Mark's version is the one where nothing is resolved inside the men.",
  },
  {
    id: 'canaanite-daughter-mrk',
    title: "The Syrophoenician Woman's Daughter",
    testament: 'new',
    passage: ref('MRK', 'Mark', '7', 24, 30),
    theme: 'healing',
    era: 'mark',
    parallelGroupId: 'canaanite-daughter',
    quote:
      'He said to her, “For this saying, go your way. The demon has gone out of your daughter.”',
    quoteRef: 'Mark 7:29',
    details: [
      'Mark identifies her as a Greek, a Syrophoenician by race.',
      'Jesus had gone into that region wanting nobody to know He was there.',
      'She went home and found the child on the bed, well.',
    ],
    whatHappened:
      "In foreign territory, where He had gone hoping to stay unnoticed, a Greek woman found Jesus and begged for her daughter. What He said sounded like a refusal about children's bread and dogs. She answered that even the dogs under the table get the crumbs. He told her that for that saying she could go home — and she found the child well.",
    hopeMeaning:
      'He tells her it is her saying that settles it. She argued, and the argument was received rather than corrected. There is room here for people who talk back.',
    reflectionQuestion:
      'Do you think of arguing with God as faithlessness, or as a kind of faith?',
    distinctive:
      'Mark names her by nationality — a Greek, a Syrophoenician — and sets the scene with Jesus trying to go unnoticed in foreign territory. He also ends inside her house, with the mother arriving home to find the child laid on the bed and well. Matthew calls her a Canaanite, adds the disciples urging Him to send her away, and stays outside with the crowd.',
  },
  {
    id: 'deaf-and-mute-mrk',
    title: 'The Deaf Man Whose Ears Were Opened',
    testament: 'new',
    passage: ref('MRK', 'Mark', '7', 31, 37),
    theme: 'healing',
    era: 'mark',
    quote:
      'Looking up to heaven, he sighed, and said to him, “Ephphatha!” That is, “Be opened!”',
    quoteRef: 'Mark 7:34',
    details: [
      'Jesus took him away from the crowd, privately, before doing anything.',
      'He used touch — fingers in the ears, spittle on the tongue — with a man who could not hear words.',
      'Mark records that Jesus sighed.',
    ],
    whatHappened:
      'People brought a man who was deaf and could barely speak, and asked Jesus to lay a hand on him. Jesus took him away from the crowd on his own, put fingers in his ears, touched his tongue, looked up, sighed, and said: be opened. The man heard, and spoke clearly.',
    hopeMeaning:
      'Everything here is adapted to the man in front of Him. He is taken out of the crowd, and communicated with by touch rather than speech, because speech was no use to him. The method fits the person, not the occasion.',
    reflectionQuestion:
      'Where might you need to change how you communicate rather than what you are saying?',
    distinctive:
      'This healing appears only in Mark. So does the sigh, and the Aramaic word itself — Ephphatha — which he keeps and then translates, the same instinct that made him preserve Talitha cumi.',
  },
  {
    id: 'feeding-4000-mrk',
    title: 'Four Thousand Fed',
    testament: 'new',
    passage: ref('MRK', 'Mark', '8', 1, 10),
    theme: 'provision',
    era: 'mark',
    parallelGroupId: 'feeding-4000',
    quote:
      'They ate and were filled. They took up seven baskets of broken pieces that were left over.',
    quoteRef: 'Mark 8:8',
    details: [
      'The crowd had been with Him three days already.',
      'This is in Gentile territory, unlike the feeding of the five thousand.',
      'Seven loaves, a few small fish, and seven baskets left over.',
    ],
    whatHappened:
      'A crowd of about four thousand had been with Jesus three days with nothing left to eat, and He said He would not send them away hungry. From seven loaves and a few small fish they all ate and were filled, and seven baskets of pieces were gathered.',
    hopeMeaning:
      'He does this twice, and the second time is on the other side of the lake, among people not His own. The repetition is the point: it was not a one-off performance for a home crowd.',
    reflectionQuestion:
      'Do you find it harder to believe God would do something for you twice?',
    distinctive:
      "Mark and Matthew both keep this second feeding. Mark places it firmly in Gentile territory and follows it with Jesus asking the disciples, twice over, whether they remember how many baskets were left each time. In Mark the story is aimed at the disciples' memory as much as at the crowd's hunger.",
  },
  {
    id: 'blind-at-bethsaida-mrk',
    title: 'The Blind Man at Bethsaida',
    testament: 'new',
    passage: ref('MRK', 'Mark', '8', 22, 26),
    theme: 'healing',
    era: 'mark',
    quote:
      'He looked up, and said, “I see men, but I see them like walking trees.”',
    quoteRef: 'Mark 8:24',
    details: [
      'Jesus led him by the hand out of the village before doing anything.',
      'After the first touch his sight was real but not yet clear.',
      'It took a second touch before he saw everyone clearly.',
    ],
    whatHappened:
      'At Bethsaida a blind man was brought to Jesus. He took him by the hand, led him out of the village, and touched his eyes. Asked what he saw, the man said people looked like walking trees. Jesus laid hands on him again, and he saw everything clearly.',
    hopeMeaning:
      'This is the only healing in the Gospels that happens in two stages, and the man is honest at the halfway point rather than pretending it was finished. Partial progress is allowed to be named as partial.',
    reflectionQuestion:
      'Where are you partway through something, and tempted to claim it is complete?',
    distinctive:
      'Only Mark records this, and only Mark records a healing that needed a second attempt. He is also the one who has Jesus take the man by the hand and lead him out of the village first — the same private, unhurried handling as the deaf man a chapter earlier.',
  },
  {
    id: 'transfiguration-mrk',
    title: 'The Transfiguration',
    testament: 'new',
    passage: ref('MRK', 'Mark', '9', 2, 8),
    theme: 'sign',
    era: 'mark',
    parallelGroupId: 'transfiguration',
    quote:
      'His clothing became glistening, exceedingly white, like snow, such as no launderer on earth can whiten them.',
    quoteRef: 'Mark 9:3',
    details: [
      'Mark reaches for a laundry comparison to describe it.',
      'Peter spoke because he did not know what to say, not because he had something to say.',
      'Then suddenly there was nobody there but Jesus.',
    ],
    whatHappened:
      'On a high mountain, alone with three of His disciples, Jesus was changed in front of them, His clothes impossibly white. Elijah and Moses appeared and talked with Him. Peter offered to build three shelters — Mark explains he simply did not know what to say. A cloud came, a voice spoke, and then there was nobody there but Jesus.',
    hopeMeaning:
      "Mark describes glory by reaching for a laundry, which is either a failure of language or the most honest thing available. And he excuses Peter's babbling by saying plainly that the man was terrified and out of his depth.",
    reflectionQuestion:
      'When have you filled a silence because you could not bear not knowing what to say?',
    distinctive:
      "Mark's comparison is domestic and slightly awkward — whiter than any launderer on earth could get them. He also alone explains Peter's suggestion as panic: he did not know what to say, for they were very afraid. Matthew has the disciples fall on their faces and Jesus touch them; Luke notes they were heavy with sleep. Mark leaves them simply frightened and talking nonsense.",
  },
  {
    id: 'boy-with-demon-mrk',
    title: 'The Boy His Disciples Could Not Help',
    testament: 'new',
    passage: ref('MRK', 'Mark', '9', 14, 29),
    theme: 'healing',
    era: 'mark',
    parallelGroupId: 'boy-with-demon',
    quote:
      'Immediately the father of the child cried out with tears, “I believe. Help my unbelief!”',
    quoteRef: 'Mark 9:24',
    details: [
      'Jesus asked the father how long it had been happening: since childhood.',
      'The father\'s request begins "if you can do anything" — and Jesus repeats the phrase back.',
      'After it left, the boy looked dead, and Jesus took him by the hand and raised him.',
    ],
    whatHappened:
      'A father brought a son the disciples could not help. Asked how long it had gone on, he said since childhood — and asked Jesus to help if He could do anything. Jesus took up the word "if", and the father cried out that he believed and needed help with his unbelief. The boy was freed, looked dead, and was raised up by the hand.',
    hopeMeaning:
      'The most quoted sentence here is a contradiction said out loud through tears, and it is treated as sufficient. Belief and unbelief in the same breath did not disqualify him.',
    reflectionQuestion:
      'Could you say both halves of that sentence honestly today?',
    distinctive:
      'This is Mark\'s set piece. He alone gives the father\'s history — since childhood, into fire and water — and alone records the exchange over the word "if", and the tearful "I believe; help my unbelief." Matthew answers the disciples\' failure with the mustard seed instead; Luke shortens the whole encounter. The father is at the centre only in Mark.',
  },
  {
    id: 'blind-at-jericho-mrk',
    title: 'Blind Bartimaeus',
    testament: 'new',
    passage: ref('MRK', 'Mark', '10', 46, 52),
    theme: 'healing',
    era: 'mark',
    parallelGroupId: 'blind-at-jericho',
    familiarityRank: 22,
    quote:
      'He, casting away his cloak, sprang up, and came to Jesus.',
    quoteRef: 'Mark 10:50',
    details: [
      'The man is named: Bartimaeus, son of Timaeus, a beggar by the road.',
      'The crowd told him to be quiet and he shouted louder.',
      "A beggar's cloak was his livelihood — he threw it aside to get up.",
    ],
    whatHappened:
      'Blind Bartimaeus was begging by the road out of Jericho and began shouting for mercy. The crowd told him to be quiet; he shouted more. Jesus stopped and called him. He threw off his cloak, jumped up, and came. Asked what he wanted, he said he wanted to see — and afterwards followed Jesus down the road.',
    hopeMeaning:
      'The cloak was the tool of his trade, spread out to catch coins, and he threw it away before he could see well enough to find it again. Something in the calling made holding onto it unnecessary.',
    reflectionQuestion:
      'What would you have to put down in order to get up quickly?',
    distinctive:
      'Mark names him — Bartimaeus — where Matthew has two anonymous men and Luke one. Mark alone has the cloak thrown aside and the man springing up, and alone reports what the crowd said when they called him over: cheer up, get up, he is calling you. The scene is full of movement in Mark and static in the others.',
  },
  {
    id: 'fig-tree-mrk',
    title: 'The Fig Tree Withers',
    testament: 'new',
    passage: ref('MRK', 'Mark', '11', 12, 14),
    theme: 'sign',
    era: 'mark',
    parallelGroupId: 'fig-tree',
    alsoSee: [ref('MRK', 'Mark', '11', 20, 25)],
    quote:
      'Seeing a fig tree afar off having leaves, he came to see if perhaps he might find anything on it. When he came to it, he found nothing but leaves, for it was not the season for figs.',
    quoteRef: 'Mark 11:13',
    details: [
      'Mark says plainly that it was not the season for figs.',
      'The tree was cursed on the way into Jerusalem, before the temple was cleared.',
      'Only the next morning did they pass it again and find it withered from the roots.',
    ],
    whatHappened:
      'Hungry on the road into Jerusalem, Jesus saw a fig tree in leaf, went to it and found nothing — and Mark adds that it was not the season for figs anyway. He said no one would eat from it again. That day He cleared the temple. The next morning they passed the tree and found it withered from the roots, and Peter pointed it out.',
    hopeMeaning:
      'This is a hard passage and Mark makes it harder by noting it was not fig season. It is not a story about a tree failing to perform on demand. Mark wraps it around the temple to say what it is really about — something in full leaf that had no fruit on it.',
    reflectionQuestion:
      'Is there something in your life in full leaf that you know has no fruit on it?',
    distinctive:
      'Mark splits the story across two days and puts the clearing of the temple in the middle, so the tree becomes a frame for the temple rather than an incident on the road. He alone admits it was not the season for figs. Matthew joins the halves together and has it wither immediately, and keeps the focus on prayer and faith.',
  },
  {
    id: 'resurrection-mrk',
    title: 'He Is Risen',
    testament: 'new',
    passage: ref('MRK', 'Mark', '16', 1, 8),
    theme: 'raising',
    era: 'mark',
    parallelGroupId: 'resurrection',
    quote:
      'Don’t be amazed. You seek Jesus, the Nazarene, who has been crucified. He has risen! He is not here. See the place where they laid Him!',
    quoteRef: 'Mark 16:6',
    details: [
      'The women set out worrying about who would roll the stone away.',
      'They found it already rolled back, and a young man in white sitting inside.',
      'The message singled out Peter by name — the one who had denied Him.',
    ],
    whatHappened:
      'After the Sabbath the women came with spices, worrying on the way about who would move the stone. It was already rolled back. Inside, a young man in white told them He had risen, showed them the empty place, and sent them to tell the disciples — and Peter. They fled trembling, and said nothing to anyone, because they were afraid.',
    hopeMeaning:
      'The message names Peter specifically, days after he had denied knowing Jesus three times. Being singled out by name in the first announcement is the opposite of what he would have expected.',
    reflectionQuestion:
      'If a message came for you and one other person by name, would you assume it was good news?',
    distinctive:
      'Mark\'s account ends in fear and silence — they said nothing to anyone — which is a startling place to stop a Gospel. He alone has the women worrying about the stone on the way, and alone records the instruction to tell "His disciples and Peter". Matthew has an earthquake and guards; Luke two men in dazzling clothes; John has Mary weeping alone. Mark leaves it unresolved.',
  },

  /* --- Luke ------------------------------------------------------------- */
  {
    id: 'demoniac-in-synagogue-luk',
    title: 'The Man in the Synagogue',
    testament: 'new',
    passage: ref('LUK', 'Luke', '4', 31, 37),
    theme: 'rescue',
    era: 'luke',
    parallelGroupId: 'demoniac-in-synagogue',
  },
  {
    id: 'peters-mother-in-law-luk',
    title: "Peter's Mother-in-Law Healed",
    testament: 'new',
    passage: ref('LUK', 'Luke', '4', 38, 39),
    theme: 'healing',
    era: 'luke',
    parallelGroupId: 'peters-mother-in-law',
  },
  {
    id: 'catch-of-fish-luk',
    title: 'The Nets That Began to Break',
    testament: 'new',
    passage: ref('LUK', 'Luke', '5', 1, 11),
    theme: 'provision',
    era: 'luke',
  },
  {
    id: 'leper-cleansed-luk',
    title: 'A Man Full of Leprosy Cleansed',
    testament: 'new',
    passage: ref('LUK', 'Luke', '5', 12, 16),
    theme: 'healing',
    era: 'luke',
    parallelGroupId: 'leper-cleansed',
  },
  {
    id: 'paralytic-luk',
    title: 'The Man Let Down through the Tiles',
    testament: 'new',
    passage: ref('LUK', 'Luke', '5', 17, 26),
    theme: 'healing',
    era: 'luke',
    parallelGroupId: 'paralytic',
  },
  {
    id: 'withered-hand-luk',
    title: 'The Withered Hand Restored',
    testament: 'new',
    passage: ref('LUK', 'Luke', '6', 6, 11),
    theme: 'healing',
    era: 'luke',
    parallelGroupId: 'withered-hand',
  },
  {
    id: 'centurions-servant-luk',
    title: "The Centurion's Servant",
    testament: 'new',
    passage: ref('LUK', 'Luke', '7', 1, 10),
    theme: 'healing',
    era: 'luke',
    parallelGroupId: 'centurions-servant',
  },
  {
    id: 'widows-son-at-nain-luk',
    title: "The Widow's Son at Nain",
    testament: 'new',
    passage: ref('LUK', 'Luke', '7', 11, 17),
    theme: 'raising',
    era: 'luke',
  },
  {
    id: 'calming-storm-luk',
    title: 'The Storm Stilled',
    testament: 'new',
    passage: ref('LUK', 'Luke', '8', 22, 25),
    theme: 'nature',
    era: 'luke',
    parallelGroupId: 'calming-storm',
  },
  {
    id: 'gerasene-demoniac-luk',
    title: 'The Man Called Legion',
    testament: 'new',
    passage: ref('LUK', 'Luke', '8', 26, 39),
    theme: 'rescue',
    era: 'luke',
    parallelGroupId: 'gerasene-demoniac',
  },
  {
    id: 'bleeding-woman-luk',
    title: 'The Woman Who Touched His Cloak',
    testament: 'new',
    passage: ref('LUK', 'Luke', '8', 43, 48),
    theme: 'healing',
    era: 'luke',
    parallelGroupId: 'bleeding-woman',
  },
  {
    id: 'jairus-daughter-luk',
    title: "Jairus' Daughter Raised",
    testament: 'new',
    passage: ref('LUK', 'Luke', '8', 49, 56),
    theme: 'raising',
    era: 'luke',
    parallelGroupId: 'jairus-daughter',
  },
  {
    id: 'feeding-5000-luk',
    title: 'Five Thousand Fed',
    testament: 'new',
    passage: ref('LUK', 'Luke', '9', 10, 17),
    theme: 'provision',
    era: 'luke',
    parallelGroupId: 'feeding-5000',
  },
  {
    id: 'transfiguration-luk',
    title: 'The Transfiguration',
    testament: 'new',
    passage: ref('LUK', 'Luke', '9', 28, 36),
    theme: 'sign',
    era: 'luke',
    parallelGroupId: 'transfiguration',
  },
  {
    id: 'boy-with-demon-luk',
    title: 'The Boy His Disciples Could Not Help',
    testament: 'new',
    passage: ref('LUK', 'Luke', '9', 37, 43),
    theme: 'healing',
    era: 'luke',
    parallelGroupId: 'boy-with-demon',
  },
  {
    id: 'crippled-woman-luk',
    title: 'The Woman Bent Double for Eighteen Years',
    testament: 'new',
    passage: ref('LUK', 'Luke', '13', 10, 17),
    theme: 'healing',
    era: 'luke',
  },
  {
    id: 'man-with-dropsy-luk',
    title: 'The Man with Dropsy',
    testament: 'new',
    passage: ref('LUK', 'Luke', '14', 1, 6),
    theme: 'healing',
    era: 'luke',
  },
  {
    id: 'ten-lepers-luk',
    title: 'Ten Healed, One Returns',
    testament: 'new',
    passage: ref('LUK', 'Luke', '17', 11, 19),
    theme: 'healing',
    era: 'luke',
  },
  {
    id: 'blind-at-jericho-luk',
    title: 'The Blind Man near Jericho',
    testament: 'new',
    passage: ref('LUK', 'Luke', '18', 35, 43),
    theme: 'healing',
    era: 'luke',
    parallelGroupId: 'blind-at-jericho',
  },
  {
    id: 'severed-ear-luk',
    title: 'The Severed Ear Restored',
    testament: 'new',
    passage: ref('LUK', 'Luke', '22', 50, 51),
    theme: 'healing',
    era: 'luke',
  },
  {
    id: 'resurrection-luk',
    title: 'He Is Risen',
    testament: 'new',
    passage: ref('LUK', 'Luke', '24', 1, 12),
    theme: 'raising',
    era: 'luke',
    parallelGroupId: 'resurrection',
  },

  /* --- John ------------------------------------------------------------- */
  {
    id: 'cana',
    title: 'Water into Wine at Cana',
    location: 'A wedding in Cana of Galilee',
    testament: 'new',
    passage: ref('JHN', 'John', '2', 1, 11),
    theme: 'provision',
    era: 'john',
    familiarityRank: 5,
    quote:
      'Everyone serves the good wine first, and when the guests have drunk freely, then that which is worse. You have kept the good wine until now!',
    quoteRef: 'John 2:10',
    details: [
      'Running out of wine mid-celebration was a real social embarrassment for the family hosting.',
      'Jesus\'s mother didn\'t ask for a miracle — she just told the servants, "Whatever he says to you, do it."',
      'Six large stone jars — roughly 120 to 180 gallons in total — were filled with water, and it came out as wine.',
    ],
    whatHappened:
      'At a wedding, the wine ran out — a small disaster by any measure, but an embarrassing one for the family hosting it. Jesus told the servants to fill enormous stone water jars, and when they poured a cup out to serve, it had become wine — and remarkably good wine at that.',
    hopeMeaning:
      "Not every miracle in this tour starts with someone in mortal danger. This one starts with an ordinary problem on an ordinary day. It shows something worth remembering: the same power that can split a sea is also willing to show up for a wedding that's about to be quietly ruined.",
    reflectionQuestion:
      "Do you only bring the big crises to God, or is there a small, ordinary worry you've been carrying alone?",
  },
  {
    id: 'nobleman-son-jhn',
    title: "The Nobleman's Son Healed from Afar",
    testament: 'new',
    passage: ref('JHN', 'John', '4', 46, 54),
    theme: 'healing',
    era: 'john',
  },
  {
    id: 'bethesda-jhn',
    title: 'The Man at the Pool of Bethesda',
    testament: 'new',
    passage: ref('JHN', 'John', '5', 1, 15),
    theme: 'healing',
    era: 'john',
  },
  {
    id: 'feeding-5000-jhn',
    title: 'Five Thousand Fed',
    location: 'A hillside on the far side of the Sea of Galilee',
    testament: 'new',
    passage: ref('JHN', 'John', '6', 9, 13),
    theme: 'provision',
    era: 'john',
    parallelGroupId: 'feeding-5000',
    familiarityRank: 2,
    quote:
      'Jesus took the loaves, and having given thanks, He distributed to the disciples, and the disciples to those who were sitting down, likewise also of the fish as much as they desired.',
    quoteRef: 'John 6:11',
    details: [
      "The only food anyone could find was a boy's small lunch — five barley loaves and two fish.",
      'More than five thousand people ate until they were full.',
      "Afterward, the leftovers filled twelve baskets — more than they'd started with.",
    ],
    whatHappened:
      'A crowd of thousands had followed Jesus out to a remote hillside with no food and no way to buy any. A boy offered up his small lunch — five loaves, two fish — and Jesus used it to feed the entire crowd, with baskets of food left over.',
    hopeMeaning:
      "The miracle didn't start with abundance. It started with one child's small lunch, offered without knowing what it would become. Hope often begins the same way — not with enough, but with whatever little you actually have, handed over.",
    reflectionQuestion:
      "What's the \"five loaves and two fish\" in your own hands right now — the small thing that doesn't feel like nearly enough?",
    distinctive:
      'John alone tells you where the food came from: a boy, and barley loaves — the cheapest bread there was. The other three accounts simply record five loaves and two fish appearing. John also alone keeps the instruction afterwards, to gather the broken pieces so that nothing would be lost. In his telling the miracle begins with a child\'s lunch and ends with someone being told to pick up the scraps.',
  },
  {
    id: 'walking-on-water-jhn',
    title: 'Walking on the Water',
    testament: 'new',
    passage: ref('JHN', 'John', '6', 16, 21),
    theme: 'nature',
    era: 'john',
    parallelGroupId: 'walking-on-water',
  },
  {
    id: 'man-born-blind-jhn',
    title: 'The Man Born Blind',
    testament: 'new',
    passage: ref('JHN', 'John', '9', 1, 12),
    theme: 'healing',
    era: 'john',
    familiarityRank: 23,
  },
  {
    id: 'lazarus',
    title: 'Lazarus Called out of the Tomb',
    location: 'Bethany, four days after the funeral',
    testament: 'new',
    passage: ref('JHN', 'John', '11', 39, 44),
    theme: 'raising',
    era: 'john',
    familiarityRank: 4,
    quote: '"Lazarus, come out!"',
    quoteRef: 'John 11:43',
    details: [
      'Jesus arrived four days after Lazarus had died — deliberately, and after his sisters had already sent for him.',
      'Martha\'s first words to Jesus were part grief, part accusation: "if you had been here, my brother wouldn\'t have died."',
      'Lazarus came out still bound hand and foot in his grave wrappings, his face wrapped in a cloth — Jesus had to tell the crowd to untie him.',
    ],
    whatHappened:
      'By the time Jesus reached Bethany, his close friend Lazarus had already been dead and buried for four days — long past any hope of recovery, by every normal measure. Jesus asked for the tomb to be opened, called Lazarus by name, and he walked out alive.',
    hopeMeaning:
      "Jesus didn't arrive in time to prevent the death — he arrived after it, on purpose, and grieved it fully before doing anything about it. Hope here isn't the absence of loss. It's what's still possible even after the moment everyone else has already called \"too late.\"",
    reflectionQuestion:
      "Is there something in your life you've already decided is too late to hope for?",
  },
  {
    id: 'resurrection-jhn',
    title: 'He Is Risen',
    testament: 'new',
    passage: ref('JHN', 'John', '20', 1, 18),
    theme: 'raising',
    era: 'john',
    parallelGroupId: 'resurrection',
    familiarityRank: 25,
  },
  {
    id: 'catch-of-153-jhn',
    title: 'Breakfast on the Shore',
    testament: 'new',
    passage: ref('JHN', 'John', '21', 1, 14),
    theme: 'provision',
    era: 'john',
  },

  /* --- Acts and the early church ---------------------------------------- */
  {
    id: 'pentecost',
    title: 'The Day of Pentecost',
    testament: 'new',
    passage: ref('ACT', 'Acts', '2', 1, 4),
    theme: 'sign',
    era: 'acts',
    familiarityRank: 19,
  },
  {
    id: 'lame-man-beautiful-gate',
    title: 'The Lame Man at the Beautiful Gate',
    testament: 'new',
    passage: ref('ACT', 'Acts', '3', 1, 10),
    theme: 'healing',
    era: 'acts',
  },
  {
    id: 'ananias-and-sapphira',
    title: 'Ananias and Sapphira',
    testament: 'new',
    passage: ref('ACT', 'Acts', '5', 1, 11),
    theme: 'judgment',
    era: 'acts',
  },
  {
    id: 'apostles-freed',
    title: 'The Apostles Let out of Prison',
    testament: 'new',
    passage: ref('ACT', 'Acts', '5', 17, 21),
    theme: 'rescue',
    era: 'acts',
  },
  {
    id: 'philip-caught-away',
    title: 'Philip Caught Away',
    testament: 'new',
    passage: ref('ACT', 'Acts', '8', 38, 40),
    theme: 'sign',
    era: 'acts',
  },
  {
    id: 'saul-blinded',
    title: 'The Light on the Damascus Road',
    testament: 'new',
    passage: ref('ACT', 'Acts', '9', 1, 9),
    theme: 'sign',
    era: 'acts',
  },
  {
    id: 'saul-sight-restored',
    title: "Saul's Sight Restored",
    testament: 'new',
    passage: ref('ACT', 'Acts', '9', 17, 19),
    theme: 'healing',
    era: 'acts',
  },
  {
    id: 'aeneas-healed',
    title: 'Aeneas Gets up from His Bed',
    testament: 'new',
    passage: ref('ACT', 'Acts', '9', 32, 35),
    theme: 'healing',
    era: 'acts',
  },
  {
    id: 'tabitha-raised',
    title: 'Tabitha Raised',
    testament: 'new',
    passage: ref('ACT', 'Acts', '9', 36, 42),
    theme: 'raising',
    era: 'acts',
  },
  {
    id: 'peters-rescue',
    title: "Peter's Prison Doors Open",
    location: 'A prison in Jerusalem, the night before his trial',
    testament: 'new',
    passage: ref('ACT', 'Acts', '12', 6, 10),
    theme: 'rescue',
    era: 'acts',
    familiarityRank: 24,
    quote:
      'an angel of the Lord stood by Him, and a light shone in the cell. He struck Peter on the side and woke Him up, saying, "Stand up quickly!" His chains fell off His hands.',
    quoteRef: 'Acts 12:7',
    details: [
      'Peter was guarded by sixteen soldiers and chained between two of them, the night before he was due to be executed.',
      'He was asleep when the angel arrived — not awake and anxiously waiting for rescue.',
      "The prison's iron gate to the city opened on its own, with no one touching it.",
    ],
    whatHappened:
      'The night before Peter was due to be publicly executed, chained between two guards inside a heavily secured prison, an angel appeared, woke him up, and simply told him to get dressed and follow. His chains fell off, the guarded doors opened by themselves, and he walked out into the street.',
    hopeMeaning:
      'This story happens after Jesus had already died and risen — proof the pattern didn\'t stop with him. The same kind of rescue that split a sea and calmed a storm kept showing up for ordinary people in impossible, locked situations, long after the Gospels ended.',
    reflectionQuestion:
      'What locked door in your life feels the most impossible to open right now?',
  },
  {
    id: 'herod-struck',
    title: 'Herod Struck Down',
    testament: 'new',
    passage: ref('ACT', 'Acts', '12', 21, 23),
    theme: 'judgment',
    era: 'acts',
  },
  {
    id: 'elymas-blinded',
    title: 'Elymas Blinded',
    testament: 'new',
    passage: ref('ACT', 'Acts', '13', 6, 12),
    theme: 'judgment',
    era: 'acts',
  },
  {
    id: 'lame-man-at-lystra',
    title: 'The Lame Man at Lystra',
    testament: 'new',
    passage: ref('ACT', 'Acts', '14', 8, 10),
    theme: 'healing',
    era: 'acts',
  },
  {
    id: 'slave-girl-freed',
    title: 'The Slave Girl Who Followed Paul',
    testament: 'new',
    passage: ref('ACT', 'Acts', '16', 16, 18),
    theme: 'rescue',
    era: 'acts',
  },
  {
    id: 'philippi-earthquake',
    title: 'The Earthquake at Philippi',
    testament: 'new',
    passage: ref('ACT', 'Acts', '16', 25, 26),
    theme: 'rescue',
    era: 'acts',
  },
  {
    id: 'pauls-handkerchiefs',
    title: 'Healing at a Distance in Ephesus',
    testament: 'new',
    passage: ref('ACT', 'Acts', '19', 11, 12),
    theme: 'healing',
    era: 'acts',
  },
  {
    id: 'eutychus-raised',
    title: 'Eutychus Raised',
    testament: 'new',
    passage: ref('ACT', 'Acts', '20', 9, 12),
    theme: 'raising',
    era: 'acts',
  },
  {
    id: 'viper-on-malta',
    title: 'The Viper on Malta',
    testament: 'new',
    passage: ref('ACT', 'Acts', '28', 3, 6),
    theme: 'rescue',
    era: 'acts',
  },
  {
    id: 'publius-father-healed',
    title: "Publius' Father Healed",
    testament: 'new',
    passage: ref('ACT', 'Acts', '28', 7, 9),
    theme: 'healing',
    era: 'acts',
  },
]
