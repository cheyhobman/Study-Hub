/* ============================================================================
   AS 91606, Trends in human evolution (External, 4 credits), "3.6"
   [verified vs NZQA]
   Primate features · bipedalism · cranial/skeletal trends · cultural evolution
   ========================================================================== */
export default {
  title: 'Trends in human evolution',
  accent: '#8A5AA8',   /* violet: Human evolution */
  tags: ['Primates', 'Bipedalism', 'Cranial trends', 'Culture'],
  intro: 'The physical and cultural trends across hominin evolution. Learn the skeletal evidence for bipedalism, the cranial/skeletal trends over time, and how biological and cultural evolution interacted, and always link a trend to its advantage.',

  flashcards: [
    { q: 'A central foramen magnum (under the skull) is evidence of…', a: 'bipedalism', explain: 'It balances the skull on top of a vertical spine.' },
    { q: 'What does the carrying (valgus) angle of the femur do?', a: 'Brings the knees and feet under the body’s midline for balance', explain: 'A key bipedal adaptation.' },
    { q: 'Describe the trend in cranial capacity over hominin evolution, with figures', a: 'Increases greatly (~400 → ~1350 cm³)', explain: 'Reflects a larger, more complex brain.' },
    { q: 'Describe the trends in teeth, jaw and brow ridges over hominin evolution', a: 'All decrease (smaller teeth/jaw, reduced brow ridges & prognathism); a chin appears', explain: 'Linked to cooking, tools and diet change.' },
    { q: 'List the tool cultures in order through hominin evolution', a: 'Oldowan flakes → Acheulean hand-axes → specialised tools', explain: 'Alongside fire, language and art.' },
    { q: 'What is a hominin?', a: 'The group including modern humans and our bipedal ancestors (after the split from chimps)', explain: 'Defined by habitual bipedalism.' },

    /* ---- discrimination cards ---- */
    { q: 'TELL THEM APART: hominin vs hominid', a: '<strong>Hominid</strong> = the great ape family (humans, chimps, gorillas, orangutans). <strong>Hominin</strong> = the narrower human branch after the split from chimpanzees.', explain: 'Every hominin is a hominid, but not the reverse. Exams use "hominin" when they mean us and our bipedal ancestors: <em>Australopithecus</em>, <em>Homo habilis</em>, <em>Homo erectus</em>, and so on. Using "hominid" where "hominin" is meant is a precision error that costs Excellence marks.' },
    { q: 'TELL THEM APART: bipedal skeletal features vs large-brain features', a: 'Bipedalism: forward foramen magnum, S-shaped spine, short broad bowl-shaped pelvis, carrying (valgus) angle, arched non-opposable big toe. Large brain: high vertical forehead, reduced brow ridge, small teeth/jaw, chin, rounded braincase.', explain: 'These are two SEPARATE trends on two different timescales, bipedalism came first (~6 mya) and brain expansion much later (~2 mya). A question showing an early fossil with a small brain but bipedal pelvis is testing exactly this: mosaic evolution, where traits evolve at different rates rather than as a package.' },
    { q: 'TELL THEM APART: Out of Africa vs Multiregional hypothesis', a: '<strong>Out of Africa</strong>: modern humans evolved once in Africa (~200 kya) and replaced other hominins. <strong>Multiregional</strong>: <em>H. erectus</em> populations evolved into modern humans in parallel across several regions, linked by gene flow.', explain: 'The genetic evidence strongly favours Out of Africa: African populations hold the greatest genetic diversity, and mitochondrial DNA coalesces on a recent African ancestor. But small amounts of Neanderthal and Denisovan DNA in non-African genomes show some interbreeding occurred, so the modern consensus is "Out of Africa with a bit of admixture", a nuance worth stating for Excellence.' },
    { q: 'TELL THEM APART: cultural evolution vs biological evolution', a: 'Biological evolution changes allele frequencies and is inherited genetically, slowly. Cultural evolution changes learned behaviour, is transmitted by teaching and imitation, and can happen within a single generation.', explain: 'They interact: this is the key Excellence point. Cooking (culture) allowed smaller guts and teeth (biology); lactose tolerance alleles (biology) spread only in populations that herded dairy animals (culture). This two-way feedback is called gene–culture coevolution.' },

    /* ---- process depth ---- */
    { q: 'Why does the position of the foramen magnum tell you about bipedalism?', a: 'In a biped it sits underneath the skull so the head balances on top of a vertical spine; in a quadruped it sits toward the back so the head projects forward.', explain: 'This is the single most reliable bipedalism indicator from a skull alone, which matters because skulls fossilise better than pelvises. If a question gives you only a cranium. This is the feature to reach for.' },
    { q: 'Give three selective advantages of bipedalism', a: 'Frees the hands for carrying food/tools/infants; raises the eyes above savannah grass to spot predators and prey; reduces surface area exposed to overhead sun and improves cooling; is more energy-efficient over long distances than knuckle-walking.', explain: 'Pick two or three and explain the survival value explicitly, that link is what separates Achieved from Merit. The energy-efficiency point is the strongest evidence-based one: human walking uses roughly a quarter of the energy of chimpanzee knuckle-walking per distance.' },
    { q: 'What trade-offs came with bipedalism?', a: 'A narrowed birth canal (making childbirth difficult, especially with large-brained infants), lower-back and knee problems, varicose veins, and slower running speed than quadrupeds.', explain: 'The obstetric dilemma, a pelvis narrow enough for efficient walking but wide enough to birth a big-brained baby, is why human infants are born relatively underdeveloped and need prolonged care. That in turn selected for stronger social bonds. Naming a trade-off shows evaluation, not just description.' },
    { q: 'How did the control of fire drive later human evolution?', a: 'Cooking made food softer and more digestible, releasing more energy per bite, which allowed smaller teeth, weaker jaw muscles and a shorter gut, and freed energy for a metabolically expensive brain.', explain: 'This is the expensive-tissue hypothesis: brain and gut are both costly, so shrinking one funds the other. Fire also extended the active day, gave warmth and predator protection, and created the hearth as a social focus, a neat example of culture feeding back into biology.' },
    { q: 'Why is genetic diversity HIGHEST in African populations?', a: 'Because modern humans originated in Africa and have had the longest time to accumulate variation; the groups that migrated out carried only a sample of that diversity (a founder effect).', explain: 'This is a serial founder effect: each migration step out of Africa took a subsample of the subsample, so genetic diversity falls steadily with distance from Africa. It is one of the strongest lines of evidence for Out of Africa, and it links directly to the drift concepts in 91605.' },
    { q: 'What does the Oldowan → Acheulean → Mousterian tool sequence show?', a: 'Increasing cognitive sophistication: simple struck flakes (Oldowan, ~2.6 mya, <em>H. habilis</em>) → symmetrical bifacial hand-axes made to a mental template (Acheulean, ~1.7 mya, <em>H. erectus</em>) → prepared-core flake tools (Mousterian, Neanderthals).', explain: 'The Acheulean step is the significant one: producing a symmetrical hand-axe requires holding a plan in mind before you start, which implies forward planning and probably teaching. Tool complexity tracks brain size closely enough that it is used as behavioural evidence for cognitive change.' },
    { q: 'Name the three main lines of evidence used to reconstruct human evolution', a: 'Fossil evidence (skeletal anatomy, dating), genetic/molecular evidence (mtDNA, Y-chromosome, whole genomes, molecular clocks), and cultural/archaeological evidence (tools, fire, art, burials).', explain: 'A strong Excellence answer triangulates: it uses at least two lines and notes where they agree or conflict. Fossils give you anatomy and timing but are patchy; genetics gives you relationships and population history but only from recent or well-preserved samples; culture tells you about behaviour that leaves no skeletal trace.' },
  ],

  sections: [
    /* ============================================ 0 DEFINITIONS */
    {
      id: 'key-definitions', num: '0', title: 'Key definitions',
      video: null,
      intro: 'Anatomical vocabulary carries the marks in this standard. Use the correct term, not a description.',
      blocks: [
        { t: 'definitions', title: '📖 Key definitions: Human evolution (91606)', intro: 'Cover the right column and recite each one.', items: [
          { term: 'Hominin', def: 'The group containing modern humans and all our extinct bipedal ancestors, after the split from the chimpanzee lineage.' },
          { term: 'Bipedalism', def: 'Habitual walking upright on two legs: the defining early hominin trait.' },
          { term: 'Foramen magnum', def: 'The hole in the base of the skull through which the spinal cord passes. A <strong>central</strong> position indicates bipedalism; a rearward position indicates quadrupedalism.' },
          { term: 'Carrying (valgus) angle', def: 'The inward angle of the femur from hip to knee, bringing the knees and feet under the body’s midline for balance when walking upright.' },
          { term: 'Prognathism', def: 'The forward projection of the jaw and face. It <strong>decreases</strong> through hominin evolution.' },
          { term: 'Cranial capacity', def: 'The internal volume of the braincase (cm³), used as a proxy for brain size. It <strong>increases</strong> markedly over hominin evolution.' },
          { term: 'Brow ridge (supraorbital torus)', def: 'The bony ridge above the eye sockets; it <strong>reduces</strong> over time in hominin evolution.' },
          { term: 'Sagittal crest', def: 'A ridge of bone along the top of the skull anchoring large chewing muscles; lost as diets softened and jaws shrank.' },
          { term: 'Opposable thumb', def: 'A thumb that can be moved to touch the other fingers, allowing a precision grip.' },
          { term: 'Stereoscopic vision', def: 'Overlapping fields of view from forward-facing eyes, giving three-dimensional depth perception.' },
          { term: 'Precision grip', def: 'Holding an object between the thumb and fingertips, enabling fine tool use.' },
          { term: 'Power grip', def: 'Holding an object firmly in the palm with the fingers wrapped around it.' },
          { term: 'Biological evolution', def: 'Genetic change in a population across generations, inherited via DNA, a slow process.' },
          { term: 'Cultural evolution', def: 'Change in learned behaviours, technology and ideas transmitted by <strong>teaching and learning</strong> rather than genes: a much faster process.' },
          { term: 'Oldowan tools', def: 'The earliest simple stone tool technology: struck flakes and choppers.' },
          { term: 'Acheulean tools', def: 'More advanced, symmetrical hand-axes requiring greater planning and skill.' },
          { term: 'Bipedal adaptation', def: 'Any skeletal feature (S-shaped spine, bowl-shaped pelvis, arched foot, in-line big toe) that supports upright walking.' },
        ]},
        { t: 'connects', title: 'Related elsewhere', items: [
          { to: '#/command-words', label: 'Study skills: NZQA command words',
            why: 'Biology grades hinge on the command word: “describe” wants what happens, “explain” wants why, and “discuss/evaluate” wants a judgement. A precise definition plus the right depth for the verb is most of the difference between Achieved and Excellence here.' },
        ]},
      ],
    },
    {
      id: 'primates', num: '1', title: 'Primate & hominin features',
      video: 'NCEA Level 3 biology trends human evolution bipedalism',
      blocks: [
        { t: 'key', title: 'Primate characteristics', items: [
          'Grasping hands and feet with an <strong>opposable thumb</strong>; nails instead of claws.',
          'Forward-facing eyes → overlapping fields → <strong>stereoscopic (3-D) vision</strong> and depth perception.',
          'Flexible, rotating limbs and shoulder joints.',
          'Large, complex brain relative to body size; long parental care.',
        ]},
        { t: 'note', title: 'Hominins', html: 'Hominins are the group including modern humans and our bipedal ancestors (after the split from chimps). The defining early hominin trait is <strong>habitual bipedalism</strong>.' },
      ],
    },
    {
      id: 'bipedalism', num: '2', title: 'Bipedalism: the skeletal evidence',
      blocks: [
        { t: 'table', caption: 'Skeletal adaptations for upright walking (vs apes)', headers: ['Feature', 'In humans (bipedal)', 'Why'], rows: [
          ['Foramen magnum', 'Central, underneath the skull', 'Skull balanced on top of a vertical spine'],
          ['Spine', 'S-shaped (double curve)', 'Centres weight over the pelvis; absorbs shock'],
          ['Pelvis', 'Short, broad, bowl-shaped', 'Supports organs; anchors walking muscles'],
          ['Femur', 'Angled inward (valgus / carrying angle)', 'Brings knees & feet under the body’s midline for balance'],
          ['Legs', 'Long relative to arms', 'Efficient striding gait'],
          ['Foot', 'Arched, non-opposable big toe (in line)', 'Rigid lever for push-off; arches absorb shock'],
        ]},
        { t: 'key', title: 'Advantages of bipedalism', items: [
          'Frees the hands → carry food/young, use and make tools.',
          'See over long grass → spot predators and prey.',
          'Energy-efficient over long distances.',
          'Less body surface exposed to midday sun → better thermoregulation.',
        ]},
      ],
    },
    {
      id: 'cranial-trends', num: '3', title: 'Cranial & skeletal trends over time',
      blocks: [
        { t: 'table', caption: 'Trends from early hominins → modern humans', headers: ['Feature', 'Trend over time'], rows: [
          ['Cranial capacity (brain)', 'Increases greatly (~400 cm³ → ~1350 cm³)'],
          ['Brow ridges', 'Reduce / disappear'],
          ['Face (prognathism)', 'Flatter: jaw & face less projecting'],
          ['Teeth & jaw', 'Smaller (softer, cooked diet)'],
          ['Sagittal crest', 'Lost (smaller chewing muscles)'],
          ['Chin', 'Appears (a defining Homo sapiens feature)'],
          ['Skull height', 'Higher, rounder cranium (more forebrain)'],
        ]},
        { t: 'tip', title: 'Explaining a trend', html: 'For each trend, state the change AND a reason/advantage: e.g. “teeth got smaller because tool use and cooking made food easier to chew, so large jaws were no longer selected for.”' },
      ],
    },
    {
      id: 'culture', num: '4', title: 'Cultural evolution',
      blocks: [
        { t: 'key', title: 'Milestones of cultural evolution', items: [
          '<strong>Tools:</strong> simple Oldowan flakes → refined Acheulean hand-axes → specialised tools.',
          '<strong>Fire:</strong> warmth, protection, and cooking (more energy from food, smaller guts/teeth).',
          '<strong>Language & social learning:</strong> ideas transmitted between individuals and generations.',
          '<strong>Art, agriculture, settlement:</strong> increasingly complex culture.',
        ]},
        { t: 'table', caption: 'Biological vs cultural evolution', headers: ['', 'Biological', 'Cultural'], rows: [
          ['Inherited via', 'Genes (DNA)', 'Learning / teaching'],
          ['Speed', 'Slow (many generations)', 'Fast (within a lifetime)'],
          ['Direction', 'Undirected (selection on variation)', 'Can be deliberate / accumulate rapidly'],
        ]},
        { t: 'note', title: 'The feedback loop', html: 'Bipedalism freed the hands → tool use → selection for dexterity and bigger brains → better tools and culture. Biological and cultural evolution reinforced each other.' },
      ],
    },
  ],

  links: [
    { label: 'NZQA, Biology L3 (91606) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91606&view=exams', note: 'Official exams + assessment schedules', verify: true },
    { label: 'NZQA, Biology subject page', url: 'https://www.nzqa.govt.nz/ncea/subjects/biology/', note: 'Specifications, clarifications & resources', verify: true },
  ],

  quiz: [
    { type: 'mc', q: 'A centrally placed foramen magnum (underneath the skull) is evidence of:', choices: ['A large brain', 'Bipedalism', 'Tool use', 'A herbivorous diet'], answer: 1, explanation: 'A central foramen magnum balances the skull on top of a vertical spine: a hallmark of upright, bipedal posture.' },
    { type: 'mc', q: 'Which is a trend across hominin evolution?', choices: ['Increasing brow ridges', 'Increasing cranial capacity', 'Larger teeth and jaws', 'Loss of the chin'], answer: 1, explanation: 'Cranial capacity increases markedly over time; brow ridges, teeth and prognathism all decrease, and a chin appears in H. sapiens.' },
    { type: 'mc', q: 'Compared with biological evolution, cultural evolution is:', choices: ['Slower and genetic', 'Faster and transmitted by learning', 'Only in apes', 'Random and undirected'], answer: 1, explanation: 'Cultural evolution spreads by learning/teaching within lifetimes, so it is much faster than gene-based biological evolution.' },
    { type: 'sa', q: 'The inward angle of the human femur that brings the knees under the body is called the ______ angle.', accept: ['carrying', 'valgus'], answer: 'carrying (valgus) angle', explanation: 'The carrying (valgus) angle brings the knees and feet toward the midline, aiding balance during bipedal walking.' },

    /* ---- application & scenario questions ---- */
    { type: 'mc', q: 'A fossil skull has a foramen magnum positioned centrally underneath, but a cranial capacity of only 450 cm³ (chimp-sized). The best interpretation is:', choices: ['The dating must be wrong', 'It was bipedal but had not yet undergone brain expansion', 'It was a quadruped with an unusually large brain', 'It is not a hominin'], answer: 1, explanation: 'This is mosaic evolution, traits evolve at different rates, not as a package. Bipedalism appeared roughly 6 mya, brain expansion only from about 2 mya, so an early bipedal hominin with a small brain is exactly what the fossil record predicts (e.g. <em>Australopithecus</em>).' },
    { type: 'mc', q: 'Which finding would most strongly SUPPORT the Out of Africa hypothesis over Multiregional?', choices: ['Fossils of H. erectus found in Asia', 'Greatest genetic diversity found in African populations', 'Stone tools of similar design on several continents', 'Modern humans in different regions look different'], answer: 1, explanation: 'The oldest population has had the longest time to accumulate variation, so highest diversity in Africa points to an African origin with a serial founder effect as people migrated out. Widespread <em>H. erectus</em> fossils and similar tools are compatible with BOTH models, and regional appearance differences are recent and superficial.' },
    { type: 'mc', q: 'Cooked food is easier to digest and yields more energy. Which anatomical change does this best explain?', choices: ['A larger foramen magnum', 'Reduced tooth and jaw size with a shorter gut', 'A wider birth canal', 'Longer arms'], answer: 1, explanation: 'This is the expensive-tissue hypothesis: cooking outsources part of digestion, so less chewing apparatus and less gut are needed, freeing metabolic energy for an enlarged brain. It is a textbook case of cultural change driving biological change.' },
    { type: 'mc', q: 'Lactose tolerance in adults is common in populations with a long history of dairy herding and rare elsewhere. This is best described as:', choices: ['Genetic drift', 'Gene–culture coevolution', 'Convergent evolution', 'A founder effect'], answer: 1, explanation: 'A cultural practice (herding) created the selection pressure that favoured a genetic variant (lactase persistence), which in turn made the cultural practice more valuable. That reciprocal loop between culture and genes is gene–culture coevolution.' },
    { type: 'mc', q: 'The "obstetric dilemma" refers to the conflict between:', choices: ['Tool use and brain size', 'A pelvis narrow enough for efficient bipedal walking and wide enough to birth a large-brained infant', 'Fire use and tooth size', 'Migration distance and genetic diversity'], answer: 1, explanation: 'Bipedalism reshaped the pelvis into a short, bowl-shaped structure, which narrowed the birth canal just as brain size was increasing. The evolutionary compromise is birthing relatively underdeveloped infants: which then selected for extended parental care and stronger social groups.' },
    { type: 'mc', q: 'An Acheulean hand-axe is symmetrical on both faces and follows a consistent design across sites and millennia. What does this most strongly imply about its makers?', choices: ['They had large teeth', 'They could hold a mental template and plan ahead, and probably taught the technique', 'They were bipedal', 'They lived in Africa only'], answer: 1, explanation: 'Producing a predetermined symmetrical shape requires imagining the finished tool before striking the first flake. The consistency of the design across huge spans of time and space implies the skill was transmitted socially, evidence of teaching, and so of cognitive and cultural sophistication.' },
    { type: 'sa', q: 'Which single skull feature is the most reliable indicator of bipedalism?', accept: ['foramen magnum', 'position of the foramen magnum', 'foramen magnum position'], answer: 'the position of the foramen magnum', explanation: 'Underneath the skull means the head balances on a vertical spine (biped); toward the rear means the head projects forward from a horizontal spine (quadruped). It is especially useful because skulls fossilise far more often than pelvises.' },
    { type: 'sa', q: 'What term describes traits evolving at different rates rather than all together as a package?', accept: ['mosaic evolution', 'mosaic'], answer: 'mosaic evolution', explanation: 'It explains why hominin fossils so often combine "primitive" and "derived" features, such as a bipedal pelvis with an ape-sized brain, and why you should never assume one advanced trait implies the others.' },
  ],
};
