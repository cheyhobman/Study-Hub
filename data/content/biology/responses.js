/* ============================================================================
   AS 91603 — Responses of plants and animals to their external environment
   (External, 5 credits) — "3.3"   [verified vs NZQA 2026 specs]
   Plant tropisms & nastic responses · animal orientation · behaviour patterns ·
   biological rhythms — always tie back to SURVIVAL VALUE.
   ========================================================================== */
export default {
  title: 'Responses of plants and animals to their external environment',
  accent: '#C77B29',   /* amber — Responses */
  tags: ['Tropisms', 'Orientation', 'Behaviour', 'Rhythms', 'Survival value'],
  intro: 'How plants and animals detect and respond to their environment — and crucially, the survival advantage each response gives. Excellence answers always link the response to how it improves survival and reproduction.',

  flashcards: [
    { q: 'How does auxin cause a shoot to bend toward light?', a: 'Auxin moves to the shaded side and promotes cell elongation there, so that side grows faster', explain: 'Result: the shoot bends toward the light → more photosynthesis.' },
    { q: 'What does “endogenous rhythm” mean?', a: 'Driven by an internal biological clock — it continues even without external cues', explain: 'Proves it isn’t just a direct response to the environment.' },
    { q: 'What are zeitgebers?', a: 'External cues (e.g. light, tides) that reset/entrain the biological clock', explain: 'They keep the endogenous rhythm in step with the environment.' },
    { q: 'Give two examples of a nastic (non-directional) plant response', a: 'Venus flytrap snapping shut (thigmonasty), or leaves folding at night (nyctinasty)', explain: 'The response direction is independent of the stimulus direction.' },
    { q: 'Explain the survival value of countershading in a fish (dark dorsal surface, pale ventral surface).', a: 'Viewed from above the dark back blends with the deep water below; viewed from below the pale belly blends with the bright surface. The fish is camouflaged from predators approaching from either direction.', explain: 'It also flattens the animal’s apparent shape by cancelling the shadow that overhead light would normally cast on the underside, removing the 3-D cue a predator uses to detect a solid body. Countershading fails in animals that habitually invert — which is why some upside-down-swimming catfish are reverse-countershaded.' },
    { q: 'State the approximate period of a circadian rhythm', a: '~24 hours', explain: 'e.g. sleep/wake cycles, leaf movements.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: taxis vs kinesis', a: '<strong>Taxis</strong> is a DIRECTED movement toward or away from a stimulus. <strong>Kinesis</strong> is a non-directional change in the RATE of movement or turning.', explain: 'A woodlouse in a choice chamber shows kinesis: in dry air it moves fast and turns rarely, in damp air it slows and turns often, so it accumulates in the damp end without ever "aiming" at it. A moth flying straight toward a light is phototaxis. The test question is: does the animal orient relative to the stimulus, or just change its speed?' },
    { q: '⚖️ TELL THEM APART: tropism vs nastic response', a: '<strong>Tropism</strong> — a plant growth response whose DIRECTION depends on the direction of the stimulus (phototropism, gravitropism). <strong>Nastic</strong> — a response whose direction is independent of the stimulus direction (a Venus flytrap snapping shut, <em>Mimosa</em> leaves folding).', explain: 'Tropisms are slow and involve actual growth (irreversible); nastic responses are usually fast and turgor-driven (reversible). If the answer moves back afterwards, it is almost certainly nastic.' },
    { q: '⚖️ TELL THEM APART: circadian vs circannual vs tidal rhythms', a: 'Circadian ≈ 24 hours (sleep/wake, leaf movement). Circannual ≈ 1 year (migration, hibernation, breeding seasons). Circatidal ≈ 12.4 hours (shore organisms tracking tides); circalunar ≈ 29.5 days.', explain: 'All are endogenous — they persist under constant conditions, which is exactly how you prove the clock is internal rather than a direct reaction to the environment. Free-running period drifting slightly away from exactly 24 h under constant darkness is the classic experimental evidence.' },
    { q: '⚖️ TELL THEM APART: innate vs learned behaviour', a: '<strong>Innate</strong> — genetically programmed, present without experience, performed identically by all members of a species (reflexes, fixed action patterns). <strong>Learned</strong> — modified by experience, varies between individuals (habituation, imprinting, conditioning, insight).', explain: 'The exam favour is to note the trade-off: innate behaviour is reliable and needs no learning time, so it suits short-lived animals and one-shot situations; learned behaviour is flexible and suits variable environments and long-lived social animals. Many real behaviours are both — birdsong often has an innate template refined by learning.' },
    { q: '⚖️ TELL THEM APART: endogenous rhythm vs exogenous response', a: 'An <strong>endogenous</strong> rhythm is driven by an internal biological clock and continues under constant conditions. An <strong>exogenous</strong> response is a direct reaction to an external change and stops when that change stops.', explain: 'This distinction is the whole point of constant-conditions experiments. If leaf movements continue on a ~24 h cycle in permanent darkness, the rhythm is endogenous; if they stop immediately, the plant was simply reacting to light. Zeitgebers then re-entrain the internal clock to the real day.' },

    /* ---- process depth ---- */
    { q: 'What is a zeitgeber and why is one needed if the clock is internal?', a: 'An external cue (usually light, also temperature or tides) that resets the internal clock. It is needed because the free-running period is not exactly 24 hours, so without resetting the rhythm would drift out of phase with the real day.', explain: 'German for "time-giver". In humans, morning light acting on the suprachiasmatic nucleus is the dominant zeitgeber, which is why jet lag and shift work disrupt sleep so badly — the internal clock and the external light cycle are temporarily mismatched.' },
    { q: 'Explain phototropism in terms of auxin', a: 'Auxin migrates to the shaded side of the shoot, where it promotes cell elongation; the shaded side therefore grows longer than the lit side and the shoot bends toward the light.', explain: 'Two traps: (1) auxin does not "run away from light", it is actively transported laterally; (2) in ROOTS the same auxin concentration INHIBITS elongation, which is why roots bend downward in gravitropism while shoots bend upward. Always say which tissue you mean.' },
    { q: 'What is the survival value of huddling in emperor penguins?', a: 'It reduces the surface area exposed to wind and cold per bird, cutting heat loss and so lowering the energy needed to maintain body temperature — leaving more reserves for surviving the fast and completing incubation.', explain: 'Note the structure of that answer: mechanism first, then the explicit link to survival and reproduction. Rotating position within the huddle so each bird spends time in the warm centre also shows the cooperative element, which is worth extra credit.' },
    { q: 'Why do many animals migrate, and what triggers it?', a: 'To exploit seasonal resources or avoid harsh conditions and predators, and to reach safe breeding grounds. The trigger is usually photoperiod (day length) — a reliable, weather-independent cue — often reinforced by temperature and food availability.', explain: 'Photoperiod is favoured by selection precisely because it is the ONE environmental variable that is identical every year. Temperature and food vary between years, so an animal relying on them alone would sometimes migrate at the wrong time.' },
    { q: 'What is habituation and why is it adaptive?', a: 'A decrease in response to a repeated stimulus that proves to be harmless. It is adaptive because it stops the animal wasting energy and attention on irrelevant stimuli, freeing both for genuine threats.', explain: 'It is classified as the simplest form of learning — the response is modified by experience, which is what distinguishes it from mere fatigue. Testing for fatigue is easy: present a different stimulus and see whether the animal still responds fully.' },
    { q: 'Explain imprinting and why the critical period matters', a: 'A rapid, largely irreversible attachment learned during a short critical period soon after hatching or birth, usually to the first large moving object seen.', explain: 'Its survival value is immediate: the young follow the parent, staying safe and being fed. The critical period exists because after it closes the attachment cannot form — which is why Lorenz\'s goslings imprinted on him permanently. A common exam trap is calling imprinting innate; it is learned, but with an innate predisposition and a strict timing window.' },
    { q: 'Why do social hierarchies (pecking orders) reduce total energy expenditure?', a: 'Once rank is established, most disputes are settled by threat displays rather than actual fights, so individuals avoid injury and the energy cost of repeated combat.', explain: 'The survival-value framing markers want: dominant individuals gain reliable access to food and mates, while subordinates still gain by avoiding fights they would lose and by remaining in the protective group. Both parties do better than they would in constant conflict.' },
  ],

  sections: [
    /* ============================================ 0 DEFINITIONS */
    {
      id: 'key-definitions', num: '0', title: 'Key definitions',
      video: null,
      intro: 'Learn these word-for-word. In Biology, marks are routinely lost for vague definitions — examiners want the precise term.',
      blocks: [
        { t: 'definitions', title: '📖 Key definitions — Responses (91603)', intro: 'Every bolded term below has appeared in past papers. Cover the right column and recite.', items: [
          { term: 'Stimulus', def: 'A detectable change in the environment that produces a response in an organism.' },
          { term: 'Response', def: 'The reaction of an organism to a stimulus.' },
          { term: 'Tropism', def: 'A <strong>directional</strong> growth response of a plant, where the direction is determined by the direction of the stimulus.', note: 'Positive = grows toward; negative = grows away.' },
          { term: 'Nastic response', def: 'A <strong>non-directional</strong> plant response — the direction of movement is independent of the direction of the stimulus.', note: 'e.g. thigmonasty (Venus flytrap), nyctinasty (day/night leaf folding).' },
          { term: 'Auxin', def: 'A plant hormone that promotes cell elongation; it accumulates on the shaded side of a shoot, causing it to bend toward light.' },
          { term: 'Kinesis', def: 'A <strong>non-directional</strong> animal response in which the <em>rate</em> of movement or turning changes with the intensity of a stimulus.', note: 'The animal ends up in a favourable area by chance, not by steering.' },
          { term: 'Taxis', def: 'A <strong>directional</strong> animal response — movement directly toward (positive) or away from (negative) a stimulus.' },
          { term: 'Innate behaviour', def: 'Inherited, instinctive behaviour that is present without learning and is the same across all members of a species.' },
          { term: 'Learned behaviour', def: 'Behaviour that is modified as a result of experience.' },
          { term: 'Habituation', def: 'A simple form of learning in which an animal stops responding to a repeated, harmless stimulus.', note: 'Survival value: saves energy.' },
          { term: 'Imprinting', def: 'Rapid learning that occurs during a limited critical period early in life and is generally irreversible.' },
          { term: 'Classical conditioning', def: 'Learning to associate a neutral stimulus with a significant one, producing the same response (Pavlov’s dogs).' },
          { term: 'Operant conditioning', def: 'Learning through the consequences of behaviour — reinforced (rewarded) behaviours increase, punished ones decrease.' },
          { term: 'Circadian rhythm', def: 'A biological rhythm with a cycle of approximately 24 hours.' },
          { term: 'Endogenous rhythm', def: 'A rhythm generated by an <strong>internal biological clock</strong>, which continues even in the absence of external cues.' },
          { term: 'Exogenous rhythm', def: 'A rhythm driven directly by an external environmental cue.' },
          { term: 'Zeitgeber', def: 'An external cue (e.g. light, temperature, tides) that entrains — resets — an endogenous biological clock.' },
          { term: 'Entrainment', def: 'The process by which an endogenous rhythm is synchronised to an environmental cycle by a zeitgeber.' },
          { term: 'Survival value', def: 'The way a response or behaviour increases an organism’s chance of surviving and reproducing.', note: '⚠ Every Excellence answer in this standard must state this explicitly.' },
        ]},
        { t: 'connects', title: '🔗 Related elsewhere', items: [
          { to: '#/command-words', label: 'Study skills — NZQA command words',
            why: 'Biology grades hinge on the command word: “describe” wants what happens, “explain” wants why, and “discuss/evaluate” wants a judgement. A precise definition plus the right depth for the verb is most of the difference between Achieved and Excellence here.' },
        ]},
      ],
    },
    {
      id: 'plant-responses', num: '1', title: 'Plant responses',
      video: 'NCEA Level 3 biology plant animal responses tropisms rhythms',
      blocks: [
        { t: 'p', html: `Plants respond via growth (slow, often permanent) driven by hormones such as <strong>auxin</strong>. Two categories: directional <strong>tropisms</strong> and non-directional <strong>nastic</strong> responses.` },
        { t: 'table', caption: 'Tropisms (directional growth responses)', headers: ['Tropism', 'Stimulus', 'Example / survival value'], rows: [
          ['Phototropism', 'Light', 'Shoots grow toward light (positive) → more photosynthesis'],
          ['Gravitropism', 'Gravity', 'Roots grow down (positive), shoots up (negative) → anchorage & water'],
          ['Thigmotropism', 'Touch', 'Tendrils coil around supports → climb toward light'],
          ['Hydrotropism', 'Water', 'Roots grow toward moisture → water uptake'],
        ]},
        { t: 'key', title: 'The auxin mechanism (phototropism)', items: [
          'Auxin is made at the shoot tip and moves to the shaded side.',
          'Auxin promotes cell <strong>elongation</strong>, so the shaded side grows faster.',
          'The shoot therefore bends <em>toward</em> the light — maximising light capture for photosynthesis.',
        ]},
        { t: 'key', title: 'Nastic responses (non-directional)', items: [
          'Independent of stimulus direction — e.g. the speed/opening is fixed, not toward the stimulus.',
          '<strong>Thigmonasty:</strong> Venus flytrap snapping shut, Mimosa leaves folding when touched → defence / prey capture.',
          '<strong>Nyctinasty:</strong> flowers/leaves opening by day, closing at night → protect pollen, reduce water/heat loss.',
        ]},
      ],
    },
    {
      id: 'orientation', num: '2', title: 'Animal orientation behaviour',
      blocks: [
        { t: 'table', caption: 'Orientation responses', headers: ['Behaviour', 'What it is', 'Example / survival value'], rows: [
          ['Kinesis', 'Non-directional — rate of movement/turning changes with stimulus intensity', 'Woodlice move faster in dry air, slower in damp → end up in favourable (damp) areas'],
          ['Taxis', 'Directional — moves toward (+) or away (−) from a stimulus', 'Maggots move away from light (negative phototaxis) → avoid predators / drying'],
          ['Homing', 'Return to a home site', 'Salmon return to natal river → familiar breeding ground'],
          ['Migration', 'Long-distance seasonal movement', 'Godwits migrate to feeding/breeding grounds → resources & suitable climate'],
        ]},
        { t: 'note', title: 'Kinesis vs taxis — the key distinction', html: '<strong>Taxis is directional</strong> (movement relative to the stimulus direction); <strong>kinesis is non-directional</strong> (only the <em>rate</em> of random movement changes). Both end with the animal in a more favourable place.' },
      ],
    },
    {
      id: 'behaviour', num: '3', title: 'Innate vs learned behaviour',
      blocks: [
        { t: 'key', title: 'Innate (instinctive) behaviour', items: [
          'Inherited, present without learning, same across the species — reliable in a predictable environment.',
          '<strong>Reflex</strong> (rapid, automatic), <strong>fixed action pattern</strong> (a complete stereotyped sequence triggered by a sign stimulus).',
          'Survival value: works first time (no need to learn) — vital for short-lived animals or one-shot situations.',
        ]},
        { t: 'key', title: 'Learned behaviour', items: [
          '<strong>Habituation:</strong> stop responding to a harmless repeated stimulus → save energy.',
          '<strong>Imprinting:</strong> rapid learning during a critical period (e.g. ducklings follow the first moving object) → stay with parent.',
          '<strong>Classical conditioning:</strong> associate two stimuli (Pavlov’s dogs).',
          '<strong>Operant conditioning:</strong> learn from consequences (reward/punishment) → adapt to a changing environment.',
        ]},
        { t: 'tip', title: 'Link to environment', html: 'Innate behaviour suits <em>stable</em>, predictable environments; learned behaviour suits <em>changing</em> or complex ones. Say <strong>why</strong> each is advantageous in its context.' },
      ],
    },
    {
      id: 'rhythms', num: '4', title: 'Biological rhythms',
      blocks: [
        { t: 'p', html: `Rhythmic behaviours are cyclic responses to periodic environmental changes. They can be <strong>endogenous</strong> (driven by an internal biological clock) and are reset by external cues called <strong>zeitgebers</strong> (e.g. light).` },
        { t: 'table', caption: 'Types of biological rhythm', headers: ['Rhythm', 'Cycle', 'Example / survival value'], rows: [
          ['Circadian', '~24 hours', 'Sleep/wake, leaf movements → active when conditions best (avoid predators/heat)'],
          ['Circatidal', '~12.4 hours', 'Shore crabs active at high tide → feed safely, avoid stranding'],
          ['Circalunar', '~29.5 days', 'Coral mass spawning on the full moon → synchronise reproduction'],
          ['Circannual', '~1 year', 'Hibernation, breeding seasons, migration → time events to favourable seasons'],
        ]},
        { t: 'key', title: 'Endogenous vs exogenous', items: [
          '<strong>Endogenous:</strong> the rhythm continues even without external cues (an internal clock) — proves it’s not just a direct response.',
          '<strong>Zeitgebers</strong> (e.g. light, temperature, tides) <em>entrain</em> (reset) the clock to keep it in step with the environment.',
          'Survival value: lets the organism <em>anticipate</em> predictable change and prepare in advance, rather than just reacting.',
        ]},
      ],
    },
  ],

  links: [
    { label: 'NZQA — Biology L3 (91603) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91603&view=exams', note: 'Official exams + assessment schedules', verify: true },
    { label: 'NZQA — 91603 assessment specifications (2026)', url: 'https://www.nzqa.govt.nz/ncea/subjects/biology/', note: 'Current specs & clarifications', verify: true },
  ],

  quiz: [
    { type: 'mc', q: 'Woodlice move more slowly in damp air and faster in dry air, ending up in damp areas. This is:', choices: ['A taxis', 'A kinesis', 'A tropism', 'Imprinting'], answer: 1, explanation: 'The movement is non-directional — only the rate changes with humidity — so it is a kinesis. (A taxis would be directional.)' },
    { type: 'mc', q: 'Roots bend downward while shoots bend upward in response to gravity, even though both respond to the same hormone. Why?', choices: ['Roots produce a different hormone', 'The same auxin concentration promotes elongation in shoots but inhibits it in roots', 'Gravity acts differently underground', 'Roots have no auxin receptors'], answer: 1, explanation: 'Auxin collects on the lower side of both organs. In a shoot that extra auxin drives elongation, so the lower side grows more and the shoot curves up; in a root the same concentration is inhibitory, so the lower side grows LESS and the root curves down. Always state which organ you mean.' },
    { type: 'sa', q: 'External cues (like light) that reset a biological clock are called ______.', accept: ['zeitgebers', 'zeitgeber'], answer: 'zeitgebers', explanation: 'Zeitgebers (“time-givers”) re-entrain the endogenous rhythm to the environment, keeping the internal clock in phase with the real day.' },
    { type: 'mc', q: 'Woodlice in a choice chamber move quickly and turn rarely in dry air, but slowly with frequent turns in damp air, so they end up concentrated in the damp end. This is:', choices: ['Positive hydrotaxis', 'Kinesis', 'A nastic response', 'A tropism'], answer: 1, explanation: 'They never orient toward the damp end — they simply change speed and turning rate, and accumulate where they happen to move least. Non-directional change in rate = kinesis. If they had turned and walked deliberately toward the moisture, it would be taxis.' },
    { type: 'mc', q: 'A plant kept in constant darkness continues to raise and lower its leaves on a ~25 hour cycle. This shows the rhythm is:', choices: ['Exogenous, driven directly by light', 'Endogenous, driven by an internal clock', 'A nastic response to temperature', 'Random'], answer: 1, explanation: 'Persisting under constant conditions is the definitive test for an endogenous rhythm. The period drifting to ~25 h rather than exactly 24 h is itself evidence of an internal clock free-running without zeitgebers to re-entrain it.' },
    { type: 'mc', q: 'A Venus flytrap snaps shut in under a second when trigger hairs are touched. The trap closes the same way regardless of which side was touched. This is:', choices: ['A tropism', 'A nastic response', 'Taxis', 'Gravitropism'], answer: 1, explanation: 'The direction of the response is independent of the direction of the stimulus, and it is fast and turgor-driven rather than growth-driven — the definition of a nastic response. Tropisms are slow, growth-based and directionally linked to the stimulus.' },
    { type: 'mc', q: 'Why is photoperiod a better migration trigger than temperature?', choices: ['It is easier to detect', 'It is identical every year, so it never misleads', 'It works at night', 'It affects food supply directly'], answer: 1, explanation: 'Day length for a given date is astronomically fixed, whereas temperature and food supply vary between years. Selection favours the cue that is most reliable, because an animal that migrates or breeds at the wrong time loses far more than one that ignores an unusually warm spring.' },
    { type: 'mc', q: 'A shoot bends toward light because auxin:', choices: ['Is destroyed by light on the lit side', 'Accumulates on the shaded side and promotes cell elongation there', 'Accumulates on the lit side and promotes elongation there', 'Prevents growth on the shaded side'], answer: 1, explanation: 'Lateral transport moves auxin to the shaded side, where it stimulates cell elongation, so that side grows longer and the shoot curves toward the light. Remember that the SAME auxin inhibits elongation in roots — which is why roots and shoots bend in opposite directions to gravity.' },
    { type: 'mc', q: 'Emperor penguins rotate positions within a huddle so each bird spends time in the warm centre. The best statement of survival value is:', choices: ['It keeps the group together', 'It reduces heat loss per bird, conserving the energy reserves needed to survive the fast and complete incubation', 'It shows dominance hierarchy', 'It is an innate reflex'], answer: 1, explanation: 'Full marks need the mechanism (reduced exposed surface area → less heat loss) linked explicitly to survival and reproduction (energy reserves last through the fast, so the egg is successfully incubated). Naming the behaviour without that link stays at Achieved.' },
    { type: 'mc', q: 'Lorenz\'s goslings followed him permanently after he was the first moving object they saw. This is:', choices: ['Habituation', 'Imprinting during a critical period', 'Classical conditioning', 'An innate reflex'], answer: 1, explanation: 'Imprinting is learned — but with an innate predisposition and a strict timing window, after which the attachment can no longer form. Its normal survival value is that goslings follow their actual parent, staying protected and fed.' },
    { type: 'sa', q: 'What is the approximate period of a circatidal rhythm, in hours?', accept: ['12.4', '12.4 hours', '12.4h', '124'], answer: '≈12.4 hours', explanation: 'This matches the interval between successive high tides, which is why shore organisms such as crabs and mussels time their activity to it. Circadian ≈24 h, circalunar ≈29.5 days, circannual ≈1 year.' },
    { type: 'sa', q: 'Name the plant hormone responsible for both phototropism and gravitropism.', accept: ['auxin', 'iaa', 'indole acetic acid', 'indole-3-acetic acid'], answer: 'auxin', explanation: 'The same hormone produces opposite bending in shoots and roots because the tissues respond differently to it: the concentration that promotes cell elongation in a shoot inhibits it in a root. Always state which organ you mean before describing the direction of bending.' },
    { type: 'sa', q: 'A non-directional change in an animal’s rate of movement or turning, with no orientation to the stimulus, is called ______.', accept: ['kinesis', 'a kinesis'], answer: 'kinesis', explanation: 'Contrast with taxis, which IS directed relative to the stimulus. The woodlouse choice-chamber experiment is the standard example: the animals accumulate in damp air without ever aiming for it.' },
  ],
};
