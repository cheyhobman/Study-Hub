/* ============================================================================
   English 3.9 — Respond critically to significant aspects of visual and/or
   oral text(s) through close reading, supported by evidence (Internal, 3 cr)
   ========================================================================== */
export default {
  /* This standard is INTERNALLY assessed. Once it is submitted or graded there
     is no exam left to revise for — UNLESS the same content is examined
     elsewhere. Close-reading film language feeds directly into the 91473 visual-text
     essay, which uses the same technique-and-effect analysis.
     Read by js/revision-scope.js to decide whether to keep this topic in
     revision sessions after the internal is finished. */
  stillExaminedIn: ['eng-91473'],

  title: 'Close reading of visual/oral text (English 3.9)',
  tags: ['Close reading', 'Film language', 'Micro-analysis', 'Internal'],
  intro: 'Close reading is the <strong>opposite</strong> of the big essay: instead of covering a whole film, you take a <em>short extract</em> — often 2–5 minutes — and unpack it in forensic detail. Depth over breadth. Every choice in the frame is deliberate, and your job is to say what each one does to the viewer.',

  sections: [
    {
      id: 'what-it-asks', num: '1', title: 'How this differs from the 3.8 essay',
      video: 'film close reading scene analysis techniques NCEA',
      blocks: [
        { t: 'table', caption: 'Big essay vs close reading', headers: ['3.8 external essay', '3.9 close reading'], rows: [
          ['Whole text', 'One short extract (often 2–5 min)'],
          ['A handful of key moments', 'Nearly every technique in the extract'],
          ['Breadth of argument', 'Depth of detail'],
          ['“How does Nolan present obsession across the film?”', '“What is this specific sequence doing, shot by shot?”'],
        ]},
        { t: 'key', title: 'What close reading demands', items: [
          '<strong>Micro-detail</strong> — not “low-key lighting is used”, but <em>where</em> the shadow falls, on whose face, and at what moment in the line of dialogue.',
          '<strong>Layering</strong> — showing how several techniques work <em>together</em> in the same shot (framing + sound + colour + editing pace).',
          '<strong>Sequence awareness</strong> — how the extract develops from its first shot to its last, and why that order matters.',
          '<strong>Effect on the viewer</strong>, every time. A technique noted without effect earns nothing.',
        ]},
        { t: 'tip', title: 'Choosing your extract', html: 'Pick a scene that is <strong>technically dense and emotionally significant</strong> — a turning point, a reveal, a climax. A dialogue scene in a plain room gives you almost nothing to analyse. From your Nolan texts: the rotating-corridor fight or the café “folding Paris” scene in <em>Inception</em>; the docking sequence or the Miller’s-planet wave in <em>Interstellar</em>. All are technique-rich.' },
      ],
    },

    {
      id: 'toolkit', num: '2', title: 'The close-reading toolkit — what to look for, shot by shot',
      blocks: [
        { t: 'key', title: 'Work through these five layers for every key shot', items: [
          '<strong>1. Camera</strong> — shot size, angle, movement, focus (deep/shallow), lens distortion, duration of the take.',
          '<strong>2. Mise-en-scène</strong> — setting, props, costume, colour palette, blocking (who stands where), what is deliberately <em>excluded</em> from frame.',
          '<strong>3. Lighting</strong> — key/fill ratio, direction, colour temperature, shadow placement, practical vs motivated light.',
          '<strong>4. Sound</strong> — diegetic/non-diegetic, score, silence, sound bridges, volume shifts, whether sound leads or follows the cut.',
          '<strong>5. Editing</strong> — cut rate/pace, cut type (match, jump, cross-cut), what the cut juxtaposes, rhythm relative to the music.',
        ]},
        { t: 'table', caption: 'Micro-details worth naming (these read as expert)', headers: ['Detail', 'What it typically does'], rows: [
          ['Shallow focus isolating one face', 'Cuts the character off from their environment — visual loneliness'],
          ['A slow push-in during a line', 'Tightens pressure; signals the line matters'],
          ['Cutting on movement vs cutting on stillness', 'Smooth continuity vs jarring interruption'],
          ['Sound bridge over a cut', 'Links two spaces/times — often implies causation'],
          ['Sudden silence after dense score', 'Vacuum effect; forces the viewer to lean in'],
          ['Character framed off-centre / edge of frame', 'Instability, marginalisation, something missing'],
          ['Cool vs warm palette shift within a scene', 'Emotional turn made visible before it is spoken'],
          ['Handheld vs locked-off camera', 'Subjective instability vs detached observation'],
        ]},
      ],
    },

    {
      id: 'writing', num: '3', title: 'How to write it',
      blocks: [
        { t: 'key', title: 'The close-reading paragraph shape', items: [
          '<strong>Locate</strong> — “In the shot immediately after X…” (be precise; timestamps help).',
          '<strong>Describe the technique exactly</strong> — named, with detail.',
          '<strong>Explain the effect</strong> on the viewer.',
          '<strong>Layer</strong> — “simultaneously, the score…” — show techniques combining.',
          '<strong>Link outward</strong> — to the film’s wider idea, the director’s purpose, or how you are positioned.',
        ]},
        { t: 'example', tag: 'Model paragraph', title: 'Weak vs strong close reading', problem: 'The same shot, written two ways.', steps: [
          '<strong>Weak:</strong> “Nolan uses a close-up and sad music here to show the character is upset.”',
          '<strong>Strong:</strong> “As the line lands, Nolan cuts to a tight close-up that crops the top of the character’s head — a slightly claustrophobic framing that denies us any surrounding context and forces us to read the face alone. The focus is shallow enough that the background dissolves entirely, so the character appears to occupy no particular place, visually enacting the dislocation the dialogue only hints at. Zimmer’s score, which has been building beneath the scene, drops out on the cut; that sudden absence makes the viewer’s own attention feel exposed, positioning us to share the character’s isolation rather than merely observe it.”',
          '<strong>What changed:</strong> precise technique (crop, shallow focus, score dropout), effect tied to each, three techniques layered, and viewer positioning stated explicitly.',
        ], answer: 'Precision + layering + effect on the viewer = the whole standard.' },
        { t: 'mistake', title: 'Three things that cap this internal', html: '① <strong>Retelling the scene</strong> instead of analysing it. ② <strong>Feature-spotting</strong> — listing techniques with no effect. ③ <strong>Going too wide</strong> — drifting into the whole film. Stay inside your extract; depth is the point.' },
      ],
    },

    {
      id: 'grades', num: '4', title: 'Achieved → Merit → Excellence',
      blocks: [
        { t: 'table', headers: ['Grade', 'Word', 'In practice'], rows: [
          ['Achieved', 'Respond critically', 'You identify significant techniques in the extract and explain their effects with evidence.'],
          ['Merit', '…convincingly', 'Detailed, well-supported analysis where techniques are clearly tied to effects and developed.'],
          ['Excellence', '…perceptively', 'You show how techniques <em>combine</em>, how the sequence develops, what the director is doing to you as a viewer, and connect it to wider meaning — with precision and control.'],
        ]},
        { t: 'key', title: 'Excellence levers here', items: [
          'Analyse <strong>combinations</strong>, not single techniques — “the cut lands on the downbeat of the score, so the edit feels inevitable rather than imposed.”',
          'Track <strong>change across the extract</strong> — how the cut rate accelerates, how the palette cools.',
          'Name what is <strong>absent</strong> — no score, no cut, nothing in the background. Absence is a choice.',
          'Say explicitly <strong>how you are positioned</strong>, and whether the film wants you to trust what you are seeing.',
        ]},
      ],
    },
  ],

  links: [
    { label: 'NZQA — English L3 internal assessment resources', url: 'https://www.nzqa.govt.nz/ncea/subjects/english/', note: 'Find the 3.9 close-reading resource & exemplars', verify: true },
  ],

  flashcards: [
    { q: 'How does close reading (3.9) differ from the big essay (3.8)?', a: 'Depth over breadth — one short extract analysed in forensic detail, rather than the whole text', explain: 'You aim to cover nearly every technique in a 2–5 minute extract, not a few moments across a film.' },
    { q: 'The five layers to check in every shot?', a: 'Camera · mise-en-scène · lighting · sound · editing', explain: 'Working through all five systematically is what produces the density this standard rewards.' },
    { q: 'What does shallow focus on a single face usually do?', a: 'Dissolves the background, isolating the character from their environment', explain: 'Visually enacts loneliness or dislocation — the technique does the work the dialogue only implies.' },
    { q: 'What is a sound bridge and why does it matter?', a: 'Sound from one scene carrying over a cut into the next — it links the two spaces or times', explain: 'Often implies causation or continuity of thought across a cut.' },
    { q: 'Why is sudden silence after a dense score effective?', a: 'It creates a vacuum that forces the viewer to lean in and exposes their attention', explain: 'Naming ABSENCE as a deliberate choice is a strong Excellence move.' },
    { q: 'Three things that cap this internal?', a: 'Retelling the scene, feature-spotting with no effect, and drifting outside the extract', explain: 'Stay inside the extract; every technique named must be tied to an effect on the viewer.' },
    { q: 'Explain what happens to meaning when a film cut lands exactly on a musical downbeat.', a: 'The edit feels inevitable and pre-determined rather than chosen — image and sound reinforce each other, so the viewer reads the event as unavoidable.', explain: 'This is the difference between listing techniques and analysing them: neither the cut nor the score produces that effect alone. Two techniques converging on the same moment is called <em>synchresis</em>, and it is why a jump-scare cut with silence feels completely different from the same cut with a stinger chord.' },
    { q: 'How should you choose your extract?', a: 'Technically dense AND emotionally significant — a turning point or reveal', explain: 'A plain dialogue scene gives you almost nothing to analyse.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: close reading vs summarising the passage', a: '<strong>Close reading</strong> examines specific word choices, sentence structures and sound patterns and explains their effect. Summarising restates content in your own words.', explain: 'The test is whether your point could survive if the writer had used a synonym. "He feels sad" survives; "the flat monosyllables of the final line refuse the consolation the rhythm has been building toward" does not — it depends on those exact words, which is what close reading means.' },
    { q: '⚖️ TELL THEM APART: analysing diction vs analysing syntax', a: '<strong>Diction</strong> is word CHOICE — connotation, register, precision. <strong>Syntax</strong> is sentence STRUCTURE — length, order, fragmentation, repetition, where the emphasis falls.', explain: 'Syntax is the under-used one and often the more impressive. A sequence of short fragments after long flowing sentences enacts a breakdown; placing the key word at the very end of a clause gives it weight. Analysing structure as well as vocabulary widens what you can say about any passage.' },
    { q: '⚖️ TELL THEM APART: tone vs mood', a: '<strong>Tone</strong> is the writer\'s attitude toward the subject. <strong>Mood</strong> is the feeling created in the reader.', explain: 'They can differ deliberately — a detached, clinical tone describing something horrific creates a mood of unease precisely BECAUSE of the mismatch. Noticing that gap between tone and mood, and explaining what the writer gains from it, is a genuinely perceptive observation.' },
    { q: '⚖️ TELL THEM APART: what a device is called vs what it is doing here', a: 'Correct terminology earns very little on its own. The marks are in explaining what THIS instance achieves in THIS passage.', explain: 'You can score well describing an effect precisely without naming the device; you cannot score well naming devices without explaining effects. If you know the term, use it in passing and move straight to the effect — never let the label become the point.' },

    /* ---- craft depth ---- */
    { q: 'How do you approach an unseen passage under time pressure?', a: 'Read once for overall meaning and tone. Read again marking anything that stands out — an unusual word, a shift in rhythm, a repetition, a break in pattern. Those anomalies are your analysis.', explain: 'Look specifically for CHANGE: where the tone shifts, where sentence length breaks pattern, where a register suddenly drops or rises. Writers create meaning through contrast, so the point of change is almost always the richest thing in the passage.' },
    { q: 'What can you say about sound in prose or poetry?', a: 'Alliteration, assonance, sibilance, harsh plosives, and rhythm — but always tied to meaning: harsh consonants can enact violence, sibilance can create unease or whispering intimacy.', explain: 'Never say a sound device "makes it flow better" or "sounds nice" — that is empty. Connect the sound to the sense: if the consonants are difficult to say, the reader physically slows down, which is itself an effect the writer has engineered.' },
    { q: 'How should you handle a passage whose meaning is not obvious?', a: 'Anchor yourself in what you CAN observe — concrete details, patterns of imagery, tonal shifts — and build an interpretation from that evidence rather than guessing at a hidden message.', explain: 'Markers reward a well-evidenced reading even if it is not the only possible one. A confident, textually supported interpretation beats a hedged summary. Use tentative language honestly ("this suggests", "the effect is to") rather than pretending to certainty you cannot support.' },
    { q: 'What does a strong close-reading answer look like structurally?', a: 'A clear claim about effect, a short precise quotation, analysis of the specific language, and a link to the passage\'s wider purpose or tone.', explain: 'Keep the quotations very short — often a phrase or single word. Quoting a whole sentence and then analysing one word of it wastes space; quote only that word in context. Density of analysis per word quoted is what characterises strong close reading.' },
  ],

  quiz: [
    { type: 'mc', q: 'Close reading (3.9) is best described as:', choices: ['Covering the whole film briefly', 'Analysing one short extract in forensic detail', 'Comparing four texts', 'Summarising the plot'], answer: 1, explanation: 'Depth over breadth — typically a 2–5 minute extract unpacked shot by shot.' },
    { type: 'mc', q: 'Which sentence is doing close reading properly?', choices: ['Nolan uses a close-up to show sadness.', 'The tight close-up crops the head, denying context, while the score drops out on the cut — isolating the viewer alongside the character.', 'The character is upset in this scene.', 'There is music and camerawork here.'], answer: 1, explanation: 'It names precise techniques, layers them, and states the effect on the viewer.' },
    { type: 'sa', q: 'A director scores an entire film except one death scene, which plays in total silence. Name the technique being used in that scene (one word).', accept: ['absence', 'silence', 'diegetic silence', 'absent'], answer: 'absence (of score) — deliberate silence', explanation: 'Withholding an expected element is itself a choice. After a whole film of scoring, silence strips away the emotional guidance the music has been providing, forcing the viewer to sit with the event unmediated. The same logic applies to empty frames and held shots.' },

    { type: 'mc', q: 'Which observation is genuine close reading?', choices: ['"The writer describes the character as sad."', '"The flat monosyllables of the final line refuse the consolation the rhythm had been building toward."', '"This passage is about grief."', '"The writer uses adjectives."'], answer: 1, explanation: 'It depends on the exact words chosen — replace them with synonyms and the point collapses. That dependence is the test of close reading; the others restate content or name a word class without effect.' },
    { type: 'mc', q: 'A passage describes an atrocity in detached, clinical language. The most perceptive analysis notes that:', choices: ['The writer is unemotional', 'The mismatch between detached tone and horrific subject creates unease precisely because the reader must supply the feeling the prose withholds', 'The passage lacks description', 'Clinical language is always ineffective'], answer: 1, explanation: 'Distinguishing TONE (the writer\'s attitude) from MOOD (the reader\'s feeling), and explaining what the writer gains from the gap between them, is a genuinely perceptive observation rather than a description.' },
    { type: 'mc', q: 'When scanning an unseen passage for material to analyse, you should look especially for:', choices: ['The longest words', 'Points of CHANGE — tonal shifts, breaks in sentence-length pattern, register changes', 'The number of paragraphs', 'Familiar quotations'], answer: 1, explanation: 'Writers create meaning through contrast, so the moment a pattern breaks is almost always the richest thing available. Marking anomalies on a second read is the most efficient use of limited time.' },
    { type: 'mc', q: 'Saying a passage\'s alliteration "makes it flow nicely" is weak because it:', choices: ['Uses the wrong term', 'Describes an effect without connecting sound to meaning', 'Is too short', 'Should mention assonance'], answer: 1, explanation: 'Sound analysis must be tied to sense. Harsh plosives that physically slow the reader down enact difficulty; sibilance can create unease. "Flows nicely" asserts a pleasant quality without explaining what it does to meaning.' },
    { type: 'sa', q: 'Which is the writer\'s attitude to the subject: tone or mood?', accept: ['tone'], answer: 'tone', explanation: 'Mood is the feeling created in the reader. They can deliberately diverge, and noticing that gap is one of the most reliable routes to a perceptive observation.' },
  ],
};
