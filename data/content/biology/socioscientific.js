/* ============================================================================
   AS 91602 — Integrate biological knowledge to develop an informed response
   to a socio-scientific issue (Internal, 3 credits) — "3.2"
   ========================================================================== */
export default {
  /* This standard is INTERNALLY assessed. Once it is submitted or graded there
     is no exam left to revise for — UNLESS the same content is examined
     elsewhere. The biology this internal draws on — selection, resistance, population
     genetics, plant/animal responses — is examined in 91605 and 91603.
     Read by js/revision-scope.js to decide whether to keep this topic in
     revision sessions after the internal is finished. */
  stillExaminedIn: ['bio-91605', 'bio-91603'],

  title: 'Integrate biological knowledge — socio-scientific issue',
  accent: '#3F8F86',   /* teal — socio-scientific */
  tags: ['Research', 'Biological mechanism', 'Perspectives', 'Informed response'],
  intro: 'A research internal: pick a biological issue that society genuinely argues about, explain the <strong>biology underneath it</strong> properly, weigh up the different perspectives, and land a justified personal position. The marks come from <em>integrating</em> biology into the argument — not from the opinion itself.',

  sections: [
    {
      id: 'key-definitions', num: '0', title: 'Key definitions',
      intro: 'Get these straight before you start — the standard is worded precisely.',
      blocks: [
        { t: 'definitions', title: '📖 Key terms — 91602', items: [
          { term: 'Socio-scientific issue', def: 'A real issue where <strong>science and society interact</strong> — there is genuine scientific content, but also social, ethical, economic, cultural or environmental dimensions that people disagree about.' },
          { term: 'Integrate', def: 'To <strong>combine biological knowledge from more than one area</strong> and use it to build your response — not to describe biology in one paragraph and opinions in another.', note: '⚠️ This word is the whole standard. Integration is what is being assessed.' },
          { term: 'Informed response', def: 'A personal position that is <strong>justified by the biology and the evidence</strong>, not by feelings or unsupported assertion.' },
          { term: 'Perspective', def: 'The viewpoint of a particular group (e.g. scientists, iwi/Māori, farmers, patients, industry, government), including <em>why</em> they hold it.' },
          { term: 'Implication', def: 'A consequence of the issue or of a proposed action — biological, social, economic, ethical, cultural or environmental.' },
          { term: 'Validity / reliability of a source', def: 'Whether a source is credible: who wrote it, do they have expertise, is it peer-reviewed, is it current, and do they have a vested interest?' },
          { term: 'Bias', def: 'A leaning in a source that makes it present evidence selectively — often from funding, ideology or commercial interest.' },
        ]},
      ],
    },

    {
      id: 'choosing', num: '1', title: 'Choosing an issue that will actually score',
      video: 'NCEA Level 3 biology socio-scientific issue internal',
      blocks: [
        { t: 'key', title: 'A good issue has all four of these', items: [
          '<strong>Real biology underneath it</strong> that you can explain at Level 3 depth (genetics, evolution, physiology, ecology).',
          '<strong>Genuine disagreement</strong> — if everyone agrees, there are no perspectives to weigh.',
          '<strong>Multiple stakeholder groups</strong> with different, explicable positions.',
          '<strong>Available credible evidence</strong> — enough published material to reference properly.',
        ]},
        { t: 'table', caption: 'Strong NZ-relevant options', headers: ['Issue', 'The biology you would integrate'], rows: [
          ['Predator Free 2050 / 1080 use', 'Population dynamics, food webs, invasive species, non-target effects, toxicology, native bird breeding biology'],
          ['Gene editing (CRISPR) in agriculture', 'DNA structure, gene expression, mutation, selective breeding vs GM, gene flow to wild populations'],
          ['Antibiotic resistance', 'Natural selection, bacterial reproduction & mutation rates, horizontal gene transfer, evolution in real time'],
          ['Kākāpō genetic rescue / conservation breeding', 'Genetic bottlenecks, inbreeding depression, gene pools, founder effect, artificial insemination'],
          ['Mass vaccination programmes', 'Immune response, antigens/antibodies, herd immunity thresholds, pathogen evolution'],
          ['Dairy intensification & waterways', 'Nutrient cycles, eutrophication, ecosystem effects, indicator species'],
          ['Genetic testing for disease risk', 'Inheritance patterns, alleles, penetrance, ethics of predictive information'],
        ]},
        { t: 'tip', title: 'The test for a good choice', html: 'Ask: “Can I write two full pages explaining the <em>biology</em> before I ever mention an opinion?” If not, the issue is too thin and you will end up writing a social-studies essay.' },
      ],
    },

    {
      id: 'structure', num: '2', title: 'How to structure the report',
      blocks: [
        { t: 'key', title: 'A reliable structure', items: [
          '<strong>1. The issue</strong> — state it clearly and explain why it is socio-scientific (science + society tension).',
          '<strong>2. The biology</strong> — the core of your report. Explain the underlying biology in proper depth, from more than one area, using correct terminology.',
          '<strong>3. Perspectives</strong> — 3+ stakeholder groups: what they think, <em>and the biological reasoning behind it</em>.',
          '<strong>4. Implications</strong> — biological, social, ethical, economic, cultural, environmental.',
          '<strong>5. Your informed response</strong> — your position, justified by the biology and evidence, acknowledging the strongest counter-argument.',
          '<strong>6. Sources</strong> — referenced, with a comment on their credibility.',
        ]},
        { t: 'mistake', title: 'The mistake that caps this at Achieved', html: 'Writing the biology and the opinions as <strong>separate blocks</strong>. Achieved says “here is the biology; here is what people think.” Excellence <em>weaves them</em>: “Farmers oppose this <em>because</em> the resistance allele would spread through the population within a few generations, given bacterial generation times of ~20 minutes and horizontal gene transfer…”' },
      ],
    },

    {
      id: 'excellence', num: '3', title: 'Achieved → Merit → Excellence',
      blocks: [
        { t: 'table', caption: 'What each grade looks like', headers: ['Grade', 'Standard wording', 'In practice'], rows: [
          ['Achieved', 'Integrate biological knowledge to develop an informed response', 'You describe the biology correctly and give a response based on it.'],
          ['Merit', '…<strong>in depth</strong>', 'The biology is explained with proper mechanism and detail, and clearly linked to the perspectives — not just stated.'],
          ['Excellence', '…<strong>comprehensively</strong>', 'You integrate biology from multiple areas, evaluate the perspectives and the evidence (including source credibility), consider implications across several dimensions, and justify your position while engaging with the strongest opposing view.'],
        ]},
        { t: 'key', title: 'Excellence moves that reliably work', items: [
          'Bring in biology from <strong>two or more different areas</strong> (e.g. genetics + ecology, or physiology + evolution).',
          '<strong>Evaluate your sources</strong> explicitly — “this study was funded by the industry it assesses, so I weighted it less than the peer-reviewed meta-analysis.”',
          'Quantify where you can — generation times, population numbers, percentages, timeframes.',
          'Steel-man the opposing view, then explain <em>biologically</em> why you still disagree.',
          'Acknowledge <strong>uncertainty</strong> — what the science does not yet know, and how that affects your position.',
          'Include <strong>te ao Māori perspectives</strong> where genuinely relevant (e.g. kaitiakitanga, whakapapa, mauri in conservation and gene-technology debates) — treated seriously, not tokenistically.',
        ]},
      ],
    },

    {
      id: 'worked', num: '4', title: 'A worked mini-example',
      blocks: [
        { t: 'example', tag: 'Model paragraph', title: 'Integrating biology into a perspective (antibiotic resistance)', problem: 'Show the difference between a described perspective and an integrated one.', steps: [
          '<strong>Weak (Achieved-level):</strong> “Farmers want to keep using antibiotics because it keeps their animals healthy. Doctors are worried about resistance.”',
          '<strong>Strong (Excellence-level):</strong> “Farmers argue routine antibiotic use protects animal welfare and yields. Biologically, however, sub-therapeutic dosing creates exactly the selection pressure that drives resistance: bacteria reproduce roughly every 20 minutes, so a population experiences thousands of generations in a season. Any random mutation conferring resistance is strongly selected for, and because bacteria also exchange plasmids by horizontal gene transfer, that allele can spread <em>between species</em> — including to human pathogens. This is natural selection operating on a timescale we can observe directly, which is why the medical perspective treats agricultural use as a shared risk rather than a farming-only decision.”',
          '<strong>What changed:</strong> the second version explains the mechanism (selection pressure, generation time, mutation, horizontal gene transfer) and uses it to explain <em>why</em> the two groups disagree. That is “integrate”.',
        ], answer: 'Integration = the biology does the explanatory work in the argument.' },
      ],
    },
  ],

  links: [
    { label: 'NZQA — Biology L3 (91602) assessment resources', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91602', note: 'Internal assessment resources, exemplars & conditions', verify: true },
    { label: 'NZQA — Biology subject page', url: 'https://www.nzqa.govt.nz/ncea/subjects/biology/', note: 'Specs & clarifications', verify: true },
  ],

  flashcards: [
    { q: 'What makes an issue "socio-scientific"?', a: 'It has real scientific content AND social/ethical/economic/cultural dimensions that people genuinely disagree about', explain: 'If there is no disagreement, there are no perspectives to weigh; if there is no science, you cannot integrate biology.' },
    { q: 'What does "integrate" mean in this standard?', a: 'Use biological knowledge from more than one area to build the argument itself', explain: 'Not biology in one section and opinions in another — the biology must do the explanatory work inside each perspective.' },
    { q: 'Explain how horizontal gene transfer accelerates antibiotic resistance compared with mutation alone.', a: 'Resistance genes move between bacteria on plasmids by conjugation, so a resistant gene can spread laterally across a population — and even between species — without waiting for each lineage to mutate independently.', explain: 'Vertical inheritance would require every resistant lineage to acquire the mutation itself. Conjugation lets one successful resistance gene sweep through an entire community in a few generations, which is why resistance appears in bacteria that were never directly exposed to the drug.' },
    { q: 'How do you evaluate a source?', a: 'Author expertise, peer review, currency, and vested interest / funding', explain: 'Saying explicitly how you weighted conflicting sources is a strong Excellence move.' },
    { q: 'Name three dimensions of "implications" you should cover', a: 'Any of: biological, social, ethical, economic, cultural, environmental', explain: 'Excellence covers several dimensions rather than only the science.' },
    { q: 'Explain why bioaccumulation risk differs between 1080 and an organochlorine pesticide like DDT.', a: '1080 is water-soluble and rapidly broken down by soil microbes and aquatic organisms, so it does not persist or concentrate up food chains. DDT is fat-soluble and chemically stable, so it is stored in adipose tissue and biomagnifies at each trophic level.', explain: 'Solubility drives the whole difference: fat-soluble compounds are retained, water-soluble ones are excreted and degraded. This is why the persistence argument that correctly applies to DDT does not transfer to 1080 — a distinction worth getting right, because the two are frequently conflated.' },
    { q: 'Why is antibiotic resistance a strong choice of issue?', a: 'It is natural selection observable in real time, with clear mechanism and genuine stakeholder conflict', explain: 'Short generation times, mutation and horizontal gene transfer give you rich, quantifiable biology to integrate.' },

    /* ---- discrimination cards ---- */
    { q: '⚖️ TELL THEM APART: "integrate" vs "describe" biological knowledge', a: '<strong>Describe</strong> = set out the biology accurately. <strong>Integrate</strong> = link biology from DIFFERENT areas together, and connect it to the social, ethical, economic and cultural dimensions of the issue.', explain: 'This is the single biggest reason 91602 reports lose marks. A report that explains genetics beautifully but only genetics has described, not integrated. Integration means (for example) tying molecular genetics to population ecology to human health economics in one coherent argument about the same issue.' },
    { q: '⚖️ TELL THEM APART: a scientific claim vs a values claim', a: 'A <strong>scientific</strong> claim can in principle be tested against evidence ("this pesticide reduces bee foraging success by 30%"). A <strong>values</strong> claim expresses what someone thinks matters ("protecting bees is more important than crop yield").', explain: 'Science can inform a values claim but never settle it — that is the definition of a socio-scientific issue. Excellence answers explicitly separate the two, showing where the disagreement is genuinely about evidence and where it is about priorities. Treating a values disagreement as if better data would resolve it is a conceptual error.' },
    { q: '⚖️ TELL THEM APART: correlation vs causation in a socio-scientific claim', a: 'Correlation = two variables move together. Causation = one produces the other. Establishing causation needs a plausible mechanism, correct time order, dose-response, and control of confounders.', explain: 'Media coverage of health and environment issues constantly reports correlations as causes. Naming the missing mechanism or the likely confounder in a source you cite is one of the cleanest ways to show genuine evaluation — and it links straight across to your Statistics 3.10 report standard.' },
    { q: '⚖️ TELL THEM APART: primary vs secondary sources, and peer-reviewed vs not', a: '<strong>Primary</strong> = the original research reporting new data. <strong>Secondary</strong> = something summarising or commenting on it. <strong>Peer-reviewed</strong> = checked by independent experts before publication.', explain: 'A news article about a study is secondary and not peer-reviewed even if the study it describes is both. For Excellence, cite the primary peer-reviewed work where you can, and when you use a secondary source say WHY (accessibility, stakeholder perspective, public framing) rather than pretending it carries the same evidential weight.' },

    /* ---- process depth ---- */
    { q: 'What are the four dimensions you should cover for a socio-scientific issue?', a: 'The biology (mechanism and evidence), plus the social, ethical/cultural, economic and environmental implications — and the different stakeholder positions arising from them.', explain: 'Build your report so each dimension is anchored in actual biology rather than opinion. "Farmers oppose this" is weak; "farmers oppose this because the resistance mechanism means the treatment must be reapplied every season, tripling input costs" integrates economics WITH biology, which is the standard\'s whole purpose.' },
    { q: 'How do you evaluate the reliability of a source in this report?', a: 'Check who produced it and who funded it, whether it is peer-reviewed, how recent it is, whether the sample and method support the conclusion, and whether the claim is corroborated by independent sources.', explain: 'The strongest move is to compare two sources that disagree and explain the disagreement biologically — different sample sizes, different populations, different timeframes. Simply labelling a source "reliable" or "biased" with no reasoning earns nothing; the reasoning IS the mark.' },
    { q: 'What makes a genuinely good socio-scientific issue to choose?', a: 'It has substantial underlying biology you can explain, genuine unresolved disagreement, identifiable stakeholders with conflicting interests, and accessible evidence on more than one side.', explain: 'Avoid issues with a settled scientific answer (does smoking cause cancer?) — there is no genuine tension to evaluate. Also avoid issues so broad you can only skim. NZ-relevant options that work well: 1080 use, gene editing for predator control, freshwater quality and dairy intensification, or kauri dieback management.' },
    { q: 'Why is 1080 a strong NZ issue for this standard?', a: 'It combines real population ecology and toxicology with deep cultural, ethical and economic conflict, and both sides cite scientific evidence.', explain: 'The biology is rich: sodium fluoroacetate blocks the citric acid cycle, native birds have different susceptibility from introduced mammals, and there are measurable population responses in both target and non-target species. The disagreement involves DOC, hunters, farmers, iwi with kaitiakitanga obligations and conservation groups — genuine stakeholder conflict, not manufactured debate.' },
    { q: 'How should you handle mātauranga Māori in a socio-scientific report?', a: 'Treat it as a legitimate knowledge system and a stakeholder perspective in its own right — engage with concepts such as kaitiakitanga and mauri specifically, rather than mentioning them in passing.', explain: 'Tokenism is visible to markers. Say what the concept actually implies for THIS issue: kaitiakitanga as a guardianship obligation, for example, frames intervention decisions around long-term ecosystem responsibility rather than short-term cost–benefit. That is a substantive contribution to the argument, not a box tick.' },
    { q: 'Explain the biochemical mechanism by which 1080 (sodium fluoroacetate) kills a mammal.', a: 'Fluoroacetate is converted in the cell to fluorocitrate, which blocks aconitase in the citric acid cycle. The cycle halts, ATP production collapses, and citrate accumulates — death follows from energy failure in the heart and brain.', explain: 'This is why 1080 acts on ALL aerobic animals, not just pests — the citric acid cycle is universal. Species differences in susceptibility come from body mass, metabolic rate and dose per kilogram, not from a different mechanism, which is the crux of the non-target-species argument.' },
    { q: 'Why does antibiotic resistance illustrate evolution better than almost any other issue?', a: 'Because you can watch selection happen: bacteria have short generation times, resistance alleles arise by mutation, the antibiotic is the selection pressure, and horizontal gene transfer spreads resistance between species.', explain: 'It also links your standards together — 91605 evolutionary mechanisms, plus real economic and behavioural drivers (agricultural antibiotic use, patient demand, the weak commercial incentive to develop new antibiotics). Note the common misconception to correct: bacteria do not "become" resistant in response to the drug; resistant variants already exist and the drug selects them.' },
  ],

  quiz: [
    { type: 'mc', q: 'In this standard, "integrate" means:', choices: ['Write a longer report', 'Use biology from more than one area to build the argument itself', 'Include more sources', 'Describe both sides equally'], answer: 1, explanation: 'Integration means the biology is doing the explanatory work inside your argument, not sitting in a separate section.' },
    { type: 'mc', q: 'CRISPR is proposed to spread a female-infertility gene through a wild predator population. The main biological reason this could work faster than natural selection is that:', choices: ['CRISPR edits are always beneficial', 'A gene drive biases inheritance so the edit is passed to nearly all offspring, not 50%', 'It increases the mutation rate', 'It sterilises the whole population at once'], answer: 1, explanation: 'A gene drive copies itself onto the homologous chromosome in the germline, so heterozygotes pass it on at close to 100% rather than the Mendelian 50%. That is what lets a deleterious allele spread rather than being removed by selection — and it is also the source of the containment concern.' },
    { type: 'mc', q: 'A good socio-scientific issue must have:', choices: ['A clear right answer', 'Genuine disagreement plus real biology', 'Only NZ relevance', 'At least ten sources'], answer: 1, explanation: 'Without disagreement there are no perspectives; without biology you cannot integrate anything.' },

    /* ---- application & evaluation questions ---- */
    { type: 'mc', q: 'A report explains the genetics of pest resistance in detail, accurately and at length, but discusses nothing else. At best this is:', choices: ['Excellence — the biology is accurate', 'Achieved — biology described but not integrated', 'Merit — depth compensates for breadth', 'Not achieved'], answer: 1, explanation: 'The verb in the standard is INTEGRATE. Accurate single-area biology is description. To move up you must link biology from different areas to each other AND to the social, ethical, economic and environmental dimensions of the issue.' },
    { type: 'mc', q: 'Which of these is a VALUES claim rather than a scientific claim?', choices: ['1080 breaks down in water within weeks', 'Possum numbers fell 85% after the drop', 'Protecting native birds justifies some non-target deaths', 'Sodium fluoroacetate blocks the citric acid cycle'], answer: 2, explanation: 'The other three can be tested against evidence. Whether one outcome JUSTIFIES another is a judgement about priorities that no experiment can settle. Excellence answers separate these explicitly, because it shows you understand why the issue is genuinely contested.' },
    { type: 'mc', q: 'A news article reports "areas with more dairy farms have more waterway nitrate". The weakest part of using this to argue for regulation is that it:', choices: ['Comes from a newspaper', 'Shows correlation without establishing mechanism or ruling out confounders', 'Uses New Zealand data', 'Mentions nitrate'], answer: 1, explanation: 'A correlation alone does not establish causation. A strong answer names what would strengthen it — a plausible mechanism (nitrate leaching from urine patches and fertiliser), dose-response, correct time ordering, and control for confounders such as soil type or rainfall. This is the same reasoning as your Statistics report standard.' },
    { type: 'mc', q: 'You cite a study funded by a pesticide manufacturer. The best way to handle this is to:', choices: ['Leave the funding out', 'Discard it as biased', 'State the funding source and evaluate the method and data on their merits, noting the conflict of interest', 'Only use it if it supports your view'], answer: 2, explanation: 'Funding is a reason for scrutiny, not automatic dismissal — industry-funded work can be methodologically sound. Naming the conflict AND assessing the actual method demonstrates genuine evaluation. Discarding it unexamined is as unscientific as ignoring the conflict.' },
    { type: 'mc', q: 'Kauri dieback is caused by <em>Phytophthora agathidicida</em>, which spreads in soil and water. Which control measure follows most directly from that biology?', choices: ['Spraying the canopy with fungicide', 'Cleaning footwear and restricting track access to limit soil movement', 'Removing competing understorey plants', 'Increasing forest humidity'], answer: 1, explanation: '<em>Phytophthora</em> is a soil-borne oomycete with motile zoospores that swim in water films and infect roots. Because transmission is via contaminated soil moved by feet, tyres and animals, hygiene stations and track closures target the actual vector. Canopy spraying misses the root infection route entirely.' },
    { type: 'mc', q: 'The best reason to include mātauranga Māori perspectives such as kaitiakitanga is that they:', choices: ['Are required for NZ credits', 'Constitute a legitimate knowledge system that frames the issue around long-term guardianship obligations, changing how the decision is weighed', 'Make the report longer', 'Always oppose intervention'], answer: 1, explanation: 'Engage with what the concept actually implies for THIS issue. A passing mention reads as tokenism; explaining that a kaitiakitanga framing prioritises intergenerational ecosystem responsibility over short-term cost–benefit is a substantive contribution to the argument.' },
    { type: 'sa', q: 'What one word in the standard\'s title tells you that describing biology accurately is not enough?', accept: ['integrate', 'integrating', 'integration'], answer: 'integrate', explanation: 'Integration means linking biology from different areas together and connecting it to the social, ethical, economic and environmental dimensions. It is the difference between a good essay about biology and a 91602 report.' },
    { type: 'sa', q: 'Name the element a conclusion needs in order to show a claim is evidence-dependent rather than an opinion.', accept: ['what would change my mind', 'falsifiability', 'what evidence would change my view', 'disconfirming evidence', 'what evidence would change my mind'], answer: 'a statement of what evidence would change your position', explanation: 'This is the clearest single Excellence signal available to you. It shows you hold the position because of the evidence, not in spite of it — and it takes one sentence to add.' },
  ],
};
