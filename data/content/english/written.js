/* ============================================================================
   AS 91472, Respond critically to studied written text(s), supported by
   evidence (External, 4 credits), "3.7"   [verified vs NZQA 2026]
   The written-text (novel / drama / poetry) essay.
   Criteria in plain language · literary-technique reference · frameworks
   ========================================================================== */
export default {
  title: 'Written text essay: respond critically to written texts',
  tags: ['Literary techniques', 'Excellence criteria', 'Essay structure'],
  intro: 'The written-text external: a critical essay responding to a question about your studied text(s) (novel, drama or poetry). Same skill as the visual essay, technique, effect, and wider meaning, but with literary devices. Slot in your own text and quotations.',

  flashcards: [
    { q: '“Feature-spotting” (naming a technique with no analysis) leads to…', a: 'a capped, lower grade', explain: 'You must explain the effect and link it to meaning.' },
    { q: 'Define free indirect discourse and explain what it lets a novelist do.', a: 'Third-person narration that slides into a character’s own idiom and thought without quotation marks or "he thought", so the narrator’s voice and the character’s merge.', explain: 'It gives you a character’s interiority while keeping third-person distance, which means the reader can be inside a character’s reasoning AND see past it at the same time. That is how a novel makes you sympathise with someone whose judgement it is quietly undermining.' },
    { q: 'What is a motif?', a: 'A repeated image or idea that builds a theme across the text', explain: 'Its meaning accumulates as it recurs.' },
    { q: 'Explain how a quotation should be integrated into an analytical sentence', a: 'Short, embedded quotations analysed closely', explain: 'Far stronger than long unpacked slabs.' },
    { q: 'What is dramatic irony?', a: 'The reader knows something a character does not', explain: 'Creates tension or pathos.' },
    { q: 'Define dramatic irony and explain the effect it has on a reader.', a: 'The reader knows something a character does not. It creates tension and often pity, because every line the character speaks carries a second meaning they cannot hear.', explain: 'Distinguish it from situational irony (an outcome opposite to what was expected) and verbal irony (saying the opposite of what is meant). Dramatic irony is structural. The writer has deliberately given you information out of order, and the gap it opens is where the emotion lives.' },
    { q: 'Compare first-person and third-person limited narration in terms of what each conceals from the reader.', a: 'First person conceals anything the narrator does not know OR chooses not to say, so it can be unreliable. Third-person limited conceals other characters’ interiority, but the narration itself is trustworthy.', explain: 'The practical difference is where doubt sits. In first person you may doubt the teller; in third-person limited you doubt only the character’s understanding, not the account. Writers choose between them based on whether they want the reader suspicious of the narration itself.' },

    /* ---- discrimination cards ---- */
    { q: 'TELL THEM APART: describing a technique vs analysing its EFFECT', a: '<strong>Describing</strong>: "The author uses a metaphor." <strong>Analysing</strong>: "The metaphor comparing the city to a machine strips its inhabitants of individuality, positioning the reader to feel the alienation the protagonist experiences."', explain: 'Technique-spotting alone caps you at Achieved. The move to Merit is explaining the EFFECT on the reader; the move to Excellence is connecting that effect to the text\'s wider purpose or to a perceptive idea about the world. Always ask "so what?" after naming a device.' },
    { q: 'TELL THEM APART: theme vs plot vs author\'s purpose', a: '<strong>Plot</strong> is what happens. <strong>Theme</strong> is the idea explored through it. <strong>Purpose</strong> is what the author wants the reader to think or feel about that idea.', explain: 'Retelling plot is the single biggest cause of low grades in this standard. State the theme as a full idea, not a topic word: not "the theme is power" but "the novel argues that power corrupts most completely when it is exercised in the name of protection".' },
    { q: 'TELL THEM APART: a supporting quotation vs quotation as decoration', a: 'A supporting quotation is SHORT, precisely chosen, and immediately followed by analysis of its specific language. Decoration is a long quote dropped in with no unpacking.', explain: 'Embed quotations within your own sentence and then analyse a particular word choice within it. Markers look for evidence of close engagement, and a six-word quotation you analyse closely beats a three-line block you merely gesture at.' },
    { q: 'TELL THEM APART: answering the question vs delivering a prepared essay', a: 'A prepared essay recites everything known about the text. Answering the question selects only the material relevant to the specific wording and keeps returning to it.', explain: 'This is the most common Excellence blocker: strong knowledge, imperfectly aimed. Underline the key terms of the question, and open every paragraph with a link back to them. If a sentence does not serve the question as asked, it is costing you room, not adding value.' },

    /* ---- craft depth ---- */
    { q: 'What is the structure of a strong analytical paragraph?', a: 'Point (a claim answering the question) → Evidence (a short embedded quotation) → Analysis (what the specific language does) → Link (back to the question and the text\'s wider purpose).', explain: 'The analysis step should be the LONGEST part, typically two to three sentences to one line of quotation. If your paragraph is mostly quotation and plot, the ratio is wrong. The final link is what distinguishes a Merit paragraph from an Excellence one.' },
    { q: 'How do you write about an author\'s deliberate choices rather than events?', a: 'Use the author as the grammatical subject: "Orwell places the telescreen in every room so that…" rather than "there were telescreens everywhere".', explain: 'This small grammatical habit forces analysis, because it makes you complete the sentence with a purpose. It signals that you understand the text as something CONSTRUCTED to produce an effect, which is exactly what "respond critically" means in the standard title.' },
    { q: 'Compare a symbol and a motif in terms of how each generates meaning.', a: 'A <strong>symbol</strong> stands for something beyond itself on every appearance. A <strong>motif</strong> gains meaning by ACCUMULATION. The repetition is the mechanism, so its final appearance carries every earlier one.', explain: 'A single rose can be a symbol on first sight. A rose that recurs at each of a character’s failures becomes a motif: by the last appearance you feel the weight of the pattern without the text having to explain it. Ask "does this work on its own, or because I have seen it before?"' },
    { q: 'How should you handle the wider context or "the world beyond the text"?', a: 'Connect the text\'s ideas to something genuine and specific: its historical moment, its author\'s concerns, or a comparable situation today: and show how that connection deepens the reading.', explain: 'Keep it tethered to the text. A vague gesture ("this is still relevant today") earns nothing; a specific link that changes how a passage reads earns a great deal. Two or three sentences of well-chosen context beats a paragraph of general history.' },
    { q: 'Define an unreliable narrator and explain how a reader detects one.', a: 'A narrator whose account cannot be taken at face value. You detect it through gaps between what the narrator says and what the text shows. Other characters’ reactions, contradictions, or events the narrator explains away too neatly.', explain: 'The unreliability is the point, not a flaw: it forces the reader to read actively and construct the real story underneath. Types include the naive narrator (a child who reports faithfully but misunderstands) and the self-justifying narrator (who understands perfectly and is managing you).' },
  ],

  sections: [
    {
      id: 'criteria', num: '1', title: 'What the grades actually mean',
      video: 'NCEA Level 3 English written text essay analysis techniques',
      blocks: [
        { t: 'connects', title: 'Related elsewhere', items: [
          { to: '#/topic/eng-91473', label: 'English: Visual text essay (91473)',
            why: 'Same skill, different medium. TEEL, the same A/M/E descriptors, and the same technique → effect → wider meaning move. Learn one essay structure and use it for both externals.' },
          { to: '#/command-words', label: 'Study skills: NZQA command words',
            why: 'Command words decide the depth your answer needs. In English they are the difference between describing a technique and analysing its effect.' },
        ]},
        { t: 'table', caption: 'Grade descriptors in plain language', headers: ['Grade', 'Official word', 'What it looks like'], rows: [
          ['Achieved', 'Respond critically', 'A reasoned personal response to the question, supported with specific evidence (quotations + named techniques) showing understanding of the text.'],
          ['Merit', '…and convincingly', 'A developed, coherent argument where evidence is integrated and clearly tied to your points.'],
          ['Excellence', '…and perceptively', 'Insight beyond the obvious: author’s purpose, how the reader is positioned, and connections to wider ideas/society/self: sophisticated and controlled.'],
        ]},
        { t: 'key', title: 'The three levers that lift a grade', items: [
          '<strong>Evidence:</strong> use short, embedded quotations: precise, not long slabs.',
          '<strong>Analysis:</strong> explain how the language/technique creates meaning and effect, not just that it’s there.',
          '<strong>Wider connection:</strong> link to the author’s purpose and to the reader/world for Excellence.',
        ]},
        { t: 'mistake', title: 'What caps essays at Achieved', html: 'Retelling the story and “feature-spotting” (naming a technique with no analysis). Always follow evidence with <em>why it matters</em>, the effect on the reader and its link to the text’s ideas.' },
      ],
    },
    {
      id: 'techniques', num: '2', title: 'Literary-technique reference',
      intro: 'For each device: what it is, and an Excellence-style sentence pattern. Swap in your own text’s quotations.',
      blocks: [
        { t: 'table', caption: 'Language & imagery', headers: ['Technique', 'Definition', 'Example sentence (pattern)'], rows: [
          ['Metaphor', 'Direct comparison (X is Y)', 'The metaphor of [quote] casts [idea] as [effect], positioning the reader to see [character] as…'],
          ['Simile', 'Comparison using like/as', 'Through the simile “…”, the author makes [abstract idea] vivid and tangible, so the reader feels…'],
          ['Symbolism', 'An object standing for an idea', 'The recurring symbol of [X] comes to represent [theme], reminding the reader that…'],
          ['Imagery', 'Sensory description', 'Vivid [visual/aural] imagery in “…” immerses the reader in [mood], reinforcing the idea that…'],
          ['Personification', 'Human qualities to non-human', 'By personifying [X] as “…”, the author suggests [idea], unsettling/comforting the reader.'],
        ]},
        { t: 'table', caption: 'Structure & voice', headers: ['Technique', 'Definition', 'Example sentence (pattern)'], rows: [
          ['Characterisation', 'How a character is built', 'The author characterises [name] through [action/dialogue], leading the reader to judge/sympathise…'],
          ['Motif', 'A repeated image/idea', 'The motif of [X] recurs at key moments, building the theme of [idea] across the text.'],
          ['Structure', 'Order/shape of the text', 'The non-linear structure withholds [information], positioning the reader to reassess [character] once…'],
          ['Irony', 'Gap between appearance & reality', 'Dramatic irony in [moment] lets the reader see what [character] cannot, creating [tension/pathos].'],
          ['Foreshadowing', 'Hints at what’s to come', 'The foreshadowing in “…” primes the reader for [event], making its arrival feel inevitable.'],
          ['Tone', 'The author’s attitude', 'The shift to a [bitter/elegiac] tone in [section] signals the author’s critique of [idea].'],
        ]},
      ],
    },
    {
      id: 'frameworks', num: '3', title: 'Structural frameworks & sentence starters',
      blocks: [
        { t: 'key', title: 'The T-E-E-L paragraph (Excellence version)', items: [
          '<strong>T, Topic sentence</strong> answering the question directly.',
          '<strong>E, Evidence:</strong> a short embedded quotation + named technique.',
          '<strong>E. Explain:</strong> how the language creates meaning/effect for the reader.',
          '<strong>L, Link:</strong> back to the question AND out to author purpose / reader positioning / the wider world.',
        ]},
        { t: 'table', caption: 'Sentence starters by purpose', headers: ['Purpose', 'Sentence starter'], rows: [
          ['Make a point', '“[Author] uses [technique] to reveal that…”'],
          ['Embed evidence', '“…, shown when the text states “…”,”'],
          ['Analyse effect', '“This positions the reader to feel/realise…”'],
          ['Connect techniques', '“This is reinforced by [second technique], which…”'],
          ['Author’s purpose', '“Ultimately [author] does this to challenge/expose/celebrate…”'],
          ['Wider world (Excellence)', '“Beyond the text, this speaks to the way society…”'],
        ]},
        { t: 'note', title: 'Essay shape', html: 'Intro (name text/author, state your argument in response to the question) → 3–4 technique-driven body paragraphs → conclusion linking to purpose and the wider world. Prioritise depth: analyse a few well-chosen quotations closely.' },
        { t: 'tip', title: 'Learn quotations in advance', html: 'Memorise 8–12 short, versatile quotations covering your text’s key characters, themes and turning points, each tied to a technique, so you can adapt to whatever the question asks.' },
      ],
    },
  ],

  links: [
    { label: 'NZQA, English L3 (91472) exams & exemplars', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91472&view=exams', note: 'Past exam papers, assessment schedules & exemplars', verify: true },
    { label: 'NZQA, English subject page', url: 'https://www.nzqa.govt.nz/ncea/subjects/english/', note: 'Standards, specifications & clarifications', verify: true },
  ],

  quiz: [
    { type: 'mc', q: '“Feature-spotting” (naming a technique without analysis) usually results in:', choices: ['Excellence', 'A capped, lower grade', 'Extra marks', 'Merit automatically'], answer: 1, explanation: 'Identifying a device isn’t analysis. You must explain the effect and link it to meaning to move up the grades.' },
    { type: 'mc', q: 'A novel narrated in first person repeatedly insists the narrator "had no choice", while other characters describe the same events as decisions. This gap most directly signals:', choices: ['A continuity error', 'An unreliable narrator whose self-justification the reader must read past', 'A change of setting', 'Free indirect discourse'], answer: 1, explanation: 'The discrepancy between the narrator’s account and the surrounding evidence is exactly how unreliability is constructed. Note it is not free indirect discourse. That is third-person narration adopting a character’s idiom, whereas this is first person.' },
    { type: 'sa', q: 'A repeated image or idea that builds a theme through a text is called a ______.', accept: ['motif'], answer: 'motif', explanation: 'A motif is a recurring element that develops meaning cumulatively across the text.' },
    { type: 'mc', q: 'Best practice for using quotations in the exam is:', choices: ['Long paragraph-length quotes', 'Short, embedded quotations analysed closely', 'No quotations', 'Only paraphrase'], answer: 1, explanation: 'Short embedded quotations, closely analysed, show precise control of evidence: far stronger than long unpacked slabs.' },

    { type: 'mc', q: 'Which sentence demonstrates ANALYSIS rather than description?', choices: ['"The author uses a simile in chapter three."', '"The simile comparing the soldiers to cattle strips them of agency, forcing the reader to see them as expendable rather than heroic."', '"There are many similes in this novel."', '"The simile is very effective."'], answer: 1, explanation: 'It names the technique, quotes its substance, explains the specific effect, and identifies how the reader is positioned. The others name a device, count devices, or assert effectiveness without explaining it. All of which stay at Achieved.' },
    { type: 'mc', q: 'The strongest way to phrase a theme statement is:', choices: ['"The theme is war."', '"The novel is about a soldier."', '"The novel argues that war destroys the language societies use to make sense of it, leaving survivors unable to explain themselves."', '"There are many themes."'], answer: 2, explanation: 'A theme is an IDEA the text explores, not a topic word. Expressing it as a full claim gives you something arguable to prove with evidence, which is what an analytical essay requires.' },
    { type: 'mc', q: 'Writing "Orwell places the telescreen in every room so that privacy becomes impossible" rather than "there were telescreens everywhere" is better because it:', choices: ['Is longer', 'Treats the text as constructed, forcing you to explain authorial purpose', 'Uses the author\'s name', 'Avoids the past tense'], answer: 1, explanation: 'Making the author the grammatical subject compels you to finish the sentence with a purpose, which turns retelling into analysis. It is a small habit with a large effect on grade.' },
    { type: 'mc', q: 'In a strong analytical paragraph, the longest element should be:', choices: ['The quotation', 'The plot summary', 'The analysis of the language', 'The introduction of the character'], answer: 2, explanation: 'Roughly two to three sentences of analysis per line of quotation. A paragraph dominated by quotation and plot demonstrates recall rather than critical response: the opposite of what the standard assesses.' },
    { type: 'sa', q: 'What single question should you ask yourself after naming any technique?', accept: ['so what', 'so what?', 'what is the effect', 'what effect does it have', 'why'], answer: '"So what?". What is the effect on the reader?', explanation: 'Naming a device is Achieved; explaining its effect is Merit; connecting that effect to the text\'s wider purpose or a perceptive idea is Excellence. The "so what?" test moves you up each time.' },
  ],
};
