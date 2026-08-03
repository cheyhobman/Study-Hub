/* ============================================================================
   English 3.7. Respond critically to significant connections across texts,
   supported by evidence (Internal, 4 credits)
   ========================================================================== */
export default {
  /* This standard is INTERNALLY assessed. Once it is submitted or graded there
     is no exam left to revise for, UNLESS the same content is examined
     elsewhere. The analytical moves (technique -> effect -> purpose, close use of
     evidence) are exactly what the 91472 written-text essay is marked on.
     Read by js/revision-scope.js to decide whether to keep this topic in
     revision sessions after the internal is finished. */
  stillExaminedIn: ['eng-91472'],

  title: 'Connections across texts (English 3.7)',
  tags: ['Connections', 'Multiple texts', 'Evidence', 'Internal'],
  intro: 'The connections internal: choose <strong>four or more texts</strong> linked by one significant idea, and write about what the connection <em>reveals</em>. The trap is writing four mini-essays; the standard is about the <strong>link between</strong> them, not the texts individually.',

  sections: [
    {
      id: 'what-it-asks', num: '1', title: 'What this standard actually asks',
      video: 'NCEA Level 3 English connections across texts internal',
      blocks: [
        { t: 'key', title: 'The core requirements', items: [
          'Usually <strong>four or more texts</strong>, and they should be varied (novel, film, poem, article, play, short story…). Check the exact number with your teacher.',
          'One <strong>significant connection</strong>. A single idea, theme, technique or purpose that genuinely runs through all of them.',
          'A <strong>critical response</strong>: not just “these all show X”, but what the pattern <em>means</em> and why it matters.',
          '<strong>Specific evidence</strong> from every text: quotations for written, precise moments for visual.',
        ]},
        { t: 'mistake', title: 'The classic failure mode', html: 'Writing “Text 1 shows loneliness… Text 2 also shows loneliness… Text 3 also shows loneliness…” That is <strong>four descriptions stapled together</strong>, not a connection. The standard wants you writing about the <em>relationship</em>: how the texts agree, differ, complicate or build on each other.' },
      ],
    },

    {
      id: 'choosing', num: '2', title: 'Choosing a connection that has somewhere to go',
      blocks: [
        { t: 'table', caption: 'Weak vs strong connections', headers: ['Weak (too flat)', 'Strong (has tension)'], rows: [
          ['“All four texts are about death.”', '“All four use death as the moment a character finally tells the truth.”'],
          ['“All four have a hero.”', '“All four present the hero’s greatest strength as the thing that destroys them.”'],
          ['“All four are about family.”', '“All four show family loyalty being weaponised to keep someone silent.”'],
          ['“All four use symbolism.”', '“All four use a confined physical space to externalise a character’s psychological trap.”'],
        ]},
        { t: 'key', title: 'The test for a strong connection', items: [
          'Can you state it in <strong>one sentence with a verb</strong>? (“X <em>does</em> Y to Z.”) Topic-only connections (“family”, “war”) are too flat.',
          'Does it let texts <strong>disagree</strong> with each other? The best connections have at least one text that complicates the pattern.',
          'Does it point at <strong>purpose</strong>? Can you say why writers keep returning to this?',
          'Can you find <strong>real evidence</strong> in every text, not one strong text and three stretches?',
        ]},
        { t: 'tip', title: 'Nolan is on the table here', html: 'If you’re already studying <em>Inception</em> and <em>Interstellar</em> for 3.8, they can anchor this internal too: e.g. “both use a distorted experience of time to dramatise grief and the cost of obsession.” Reusing texts you know deeply is efficient, provided the connection is genuinely significant.' },
      ],
    },

    {
      id: 'structure', num: '3', title: 'How to structure it',
      blocks: [
        { t: 'key', title: 'Structure by IDEA, not by text', items: [
          '<strong>Introduction</strong>, name the texts and state the connection precisely, in one clear sentence.',
          '<strong>Body paragraphs = aspects of the connection</strong>, each drawing on 2+ texts. e.g. “How the connection is established”, “How it develops”, “Where a text complicates it”.',
          '<strong>Comparative sentences inside every paragraph</strong>, “Where Nolan externalises this through…, the novel instead interiorises it by…”.',
          '<strong>Conclusion</strong>: what the pattern reveals about people/society, and why writers keep returning to it.',
        ]},
        { t: 'mistake', title: 'One paragraph per text = capped', html: 'If your body paragraphs are “Text 1”, “Text 2”, “Text 3”, “Text 4”, you have structured by text and will struggle to get past Achieved. Restructure so each paragraph is an <em>aspect of the connection</em> handled across several texts.' },
        { t: 'table', caption: 'Sentence starters that force comparison', headers: ['Purpose', 'Starter'], rows: [
          ['Establish the link', '“Across all four texts, … is presented as …”'],
          ['Compare directly', '“Where [Text A] does …, [Text B] instead …”'],
          ['Build/extend', '“[Text C] takes this further by …”'],
          ['Complicate (Excellence)', '“[Text D] resists this pattern, however, because …”'],
          ['Purpose', '“Taken together, these texts suggest that …”'],
          ['Wider world', '“This recurring treatment reflects a wider anxiety about …”'],
        ]},
      ],
    },

    {
      id: 'grades', num: '4', title: 'Achieved → Merit → Excellence',
      blocks: [
        { t: 'table', caption: 'What each grade looks like', headers: ['Grade', 'Word', 'In practice'], rows: [
          ['Achieved', 'Respond critically', 'You identify a real connection and support it with evidence from each text.'],
          ['Merit', '…convincingly', 'The connection is developed and sustained, with evidence integrated and genuinely comparative discussion.'],
          ['Excellence', '…perceptively', 'You show insight: how the texts differ as well as align, what the pattern reveals about purpose and audience, and a link to self/society, with control and precision.'],
        ]},
        { t: 'key', title: 'The Excellence lever for this standard specifically', items: [
          'Find the text that <strong>doesn’t quite fit</strong> and use it. “Three of these texts present X as inevitable; the fourth refuses that, which throws the others into relief.”',
          'Talk about <strong>form</strong>, not just content. A film and a poem create the same idea by completely different means, and saying how is high-level.',
          'Connect to <strong>context</strong>: why might writers in different times/places converge on this idea?',
          'End on <strong>significance</strong>: what this says about people, not just about the texts.',
        ]},
      ],
    },
  ],

  links: [
    { label: 'NZQA, English L3 internal assessment resources', url: 'https://www.nzqa.govt.nz/ncea/subjects/english/', note: 'Find the 3.7 internal resource & exemplars', verify: true },
  ],

  flashcards: [
    { q: 'How many texts does the connections internal usually need?', a: 'Four or more, and varied in form', explain: 'Confirm the exact number with your teacher: but variety (novel, film, poem, article) strengthens the response.' },
    { q: 'What is the classic failure mode for this standard?', a: 'Writing four separate mini-essays instead of writing about the connection between the texts', explain: 'Structure by ASPECT OF THE CONNECTION, not one paragraph per text.' },
    { q: 'What makes a connection "strong" rather than flat?', a: 'It has a verb and a claim, “X does Y to Z”, not just a topic like “family”', explain: '“All four are about death” is flat. “All four use death as the moment a character tells the truth” has somewhere to go.' },
    { q: 'Explain why a text that does NOT fit a pattern is more analytically useful than a third text that does.', a: 'An outlier defines the boundary of the pattern. It shows what conditions the pattern depends on, whereas another matching text only repeats evidence you already have.', explain: 'If three texts treat power as corrupting and a fourth treats it as clarifying, the fourth tells you the first three share an assumption they never state. Confirming cases add volume; the exception adds information.' },
    { q: 'How should body paragraphs be organised?', a: 'By aspect of the connection, each drawing on two or more texts', explain: 'Paragraphs titled “Text 1, Text 2, Text 3” signal a descriptive, capped response.' },
    { q: 'Define an allusion and explain what it lets a writer do economically.', a: 'A brief reference to another text, myth, event or person that the reader is expected to recognise. It imports the whole weight of the referenced material in a few words.', explain: 'Calling a character "a Cassandra" carries prophecy, truth and being disbelieved, three ideas in one word. Allusion is a powerful basis for a connections essay because two texts alluding to the same source are in implicit conversation with each other.' },

    /* ---- discrimination cards ---- */
    { q: 'TELL THEM APART: a genuine connection vs a superficial similarity', a: 'A <strong>genuine</strong> connection illuminates something you could not see in either text alone. A <strong>superficial</strong> one merely notes that both texts contain the same feature.', explain: '"Both texts feature a journey" is superficial. "Both use the journey as a structure, but where one text lets arrival deliver meaning, the other withholds it. Suggesting that resolution itself is the illusion" is genuine. Test it: does the comparison change your reading of either text? If not, dig further.' },
    { q: 'TELL THEM APART: comparing texts vs summarising them in turn', a: 'Comparison INTERLEAVES the texts within paragraphs, using connective analysis. Summarising handles text A completely, then text B, leaving the reader to do the comparing.', explain: 'Structure each paragraph around a point of connection rather than around a text. Signal it with comparative language: "where X does this, Y instead…", "both achieve this, but by opposite means…". A text-by-text structure is the single most common cause of a capped grade in 3.7.' },
    { q: 'TELL THEM APART: similarity connections vs contrast connections', a: 'Both are valid, and CONTRAST is often more productive, two texts treating the same idea in opposing ways can reveal more than two treating it identically.', explain: 'The strongest essays usually do both: establish a shared concern, then analyse how the treatments diverge and what that divergence reveals. Pure similarity risks becoming repetitive, since you end up saying the same thing twice with different quotations.' },

    /* ---- craft depth ---- */
    { q: 'How should you choose texts to connect?', a: 'Choose texts that share a substantial idea but differ enough in form, context or stance that the comparison generates insight.', explain: 'Texts that are too alike produce a thin essay; texts with nothing genuinely in common force a strained argument. Different FORMS work particularly well. A novel and a film treating the same idea let you compare how each medium\'s techniques shape the same argument differently.' },
    { q: 'What should the connecting idea be, and how specific must it be?', a: 'A precise, arguable idea rather than a broad topic: not "both explore identity" but "both suggest that identity is something performed for others rather than possessed privately".', explain: 'The specificity of your connecting idea largely determines your ceiling. A broad topic lets you make only general observations; a precise claim forces close analysis of exactly how each text supports, complicates or resists it.' },
    { q: 'How do you use context to strengthen a connections essay?', a: 'Show how each text\'s different context shapes its treatment of the shared idea, so the contrast becomes explicable rather than arbitrary.', explain: 'This is a reliable route to Excellence. If two texts treat authority differently, and one was written under censorship while the other was not, that context explains the divergence and demonstrates genuinely critical reading rather than description of difference.' },
    { q: 'What does a strong conclusion do in a connections essay?', a: 'It states what the comparison as a whole revealed, the insight available only by reading the texts together, rather than restating each text\'s position.', explain: 'Ask yourself: what do I now understand that I would not have from either text alone? Answering that in two or three sentences is a far stronger conclusion than a summary, and it directly demonstrates the standard\'s purpose.' },
  ],

  quiz: [
    { type: 'mc', q: 'Which is the strongest connection statement?', choices: ['All four texts are about war', 'All four texts use a first-person narrator', 'All four texts present loyalty as the thing that traps a character', 'All four texts are set in the past'], answer: 2, explanation: 'It has a claim and a verb, so it can be argued and complicated. The others are flat topic or feature statements.' },
    { type: 'mc', q: 'Body paragraphs in this internal should be organised by:', choices: ['One paragraph per text', 'Aspects of the connection, across several texts', 'Chronological order of the texts', 'Length of each text'], answer: 1, explanation: 'Organising by text produces four mini-essays; organising by aspect forces genuine comparison.' },
    { type: 'mc', q: 'Two novels both present isolation as destructive; a third presents it as necessary for self-knowledge. What does the third text most usefully reveal?', choices: ['That the first two are wrong', 'That the first two treat isolation as involuntary. A condition they never make explicit', 'That three texts is too many', 'That isolation is a common theme'], answer: 1, explanation: 'The outlier exposes a hidden assumption in the others. Isolation read as destructive is isolation imposed on someone; isolation read as productive is isolation chosen. The disagreement is really about volition, which none of the texts states directly.' },

    { type: 'mc', q: 'Which is a genuine connection rather than a superficial similarity?', choices: ['"Both texts contain a journey."', '"Both texts were written in the 20th century."', '"Both use the journey structurally, but one lets arrival deliver meaning while the other withholds it. Suggesting resolution is itself an illusion."', '"Both texts have a main character."'], answer: 2, explanation: 'It identifies a shared structure AND analyses how the treatments diverge, producing an insight unavailable from either text alone. The test is whether the comparison changes your reading. The other three do not.' },
    { type: 'mc', q: 'The most common structural error in a connections essay is:', choices: ['Using too many quotations', 'Discussing text A fully, then text B fully, leaving the reader to compare', 'Writing an introduction', 'Comparing contrasting texts'], answer: 1, explanation: 'A text-by-text structure is summary, not comparison. Build each paragraph around a point of CONNECTION and interleave both texts within it, using explicit comparative language.' },
    { type: 'mc', q: 'Which connecting idea gives the strongest basis for an essay?', choices: ['"Both texts explore identity."', '"Both suggest identity is performed for others rather than possessed privately."', '"Both texts are interesting."', '"Both texts have themes."'], answer: 1, explanation: 'A precise, arguable claim forces close analysis of how each text supports or complicates it. A broad topic word permits only general observation and caps the grade you can reach.' },
    { type: 'mc', q: 'Using the texts\' different contexts to explain why they treat a shared idea differently:', choices: ['Is irrelevant to the standard', 'Is a reliable route to Excellence, because it makes the divergence explicable rather than arbitrary', 'Should replace textual analysis', 'Only works for historical texts'], answer: 1, explanation: 'Explaining WHY the treatments differ, censorship, audience, historical moment, demonstrates critical reading rather than mere description of difference. Keep it tethered to specific textual evidence.' },
    { type: 'sa', q: 'Name the term for a recurring image or idea that accumulates meaning through repetition across a text (one word).', accept: ['motif', 'a motif'], answer: 'motif', explanation: 'Distinguish it from a SYMBOL: a symbol stands for something beyond itself on each appearance, while a motif gains its force from repetition. The fifth appearance carries all four earlier ones with it. Tracing a shared motif across two texts is one of the most productive routes into a connections essay.' },
  ],
};
