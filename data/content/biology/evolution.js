/* ============================================================================
   AS 91605: Evolutionary processes leading to speciation (External, 4 credits)
   "3.5"  [verified vs NZQA]
   Variation · mechanisms (selection, drift, gene flow, mutation) · isolation ·
   speciation · patterns of evolution
   ========================================================================== */
export default {
  title: 'Evolutionary processes leading to speciation',
  accent: '#2E7FA8',   /* blue: Evolution & speciation */
  tags: ['Variation', 'Selection', 'Isolation', 'Speciation'],
  intro: 'How populations change over time and split into new species. You need the sources of variation, the four mechanisms that change allele frequencies, the isolating mechanisms, and the routes to speciation: explained as processes, not just definitions.',

  flashcards: [
    { q: 'Name the ultimate source of all new alleles', a: 'Mutation', explain: 'Other mechanisms only rearrange or change frequencies of existing alleles.' },
    { q: 'Name the four mechanisms of evolution', a: 'Natural selection, genetic drift, gene flow, mutation', explain: 'Only selection is adaptive; drift is random chance.' },
    { q: 'Compare pre-zygotic and post-zygotic isolation, with an example of each', a: 'Pre-zygotic stops a zygote forming at all; post-zygotic allows a zygote but it’s inviable or sterile', explain: 'e.g. temporal/behavioural (pre) vs a sterile mule (post).' },
    { q: 'Name the three types of natural selection and state what each does to the mean', a: '<strong>Directional</strong>. Shifts the mean toward one extreme. <strong>Stabilising</strong>. Holds the mean and narrows variation around it. <strong>Disruptive</strong>, favours both extremes against the middle, splitting the distribution.', explain: 'Shift the mean / favour the average / favour both extremes.' },
    { q: 'Convergent evolution produces…', a: 'analogous structures in unrelated species under similar selection pressures', explain: 'Divergent = related species becoming more different.' },
    { q: 'A mule (horse × donkey) is sterile: which mechanism?', a: 'Post-zygotic (hybrid sterility)', explain: 'A zygote formed and developed, but the hybrid can’t reproduce.' },

    /* ---- discrimination cards: the pairs markers see confused most ---- */
    { q: 'TELL THEM APART: natural selection vs genetic drift', a: 'Selection is <strong>non-random</strong> and driven by fitness: the environment "chooses". Drift is <strong>random</strong> chance sampling, with no reference to fitness at all.', explain: 'The giveaway word in a question is <em>chance</em> or <em>random</em>. If alleles change frequency because carriers survived better, it\'s selection; if they changed because a rockfall happened to kill half the population regardless of their genes, it\'s drift. Drift matters most in SMALL populations, because small samples deviate from the parent proportions more. The same reason 3 heads out of 4 tosses is unremarkable but 300 out of 400 is not.' },
    { q: 'TELL THEM APART: bottleneck vs founder effect', a: 'Both are drift and both slash diversity, but a <strong>bottleneck</strong> happens to an existing population that crashes and recovers <em>in place</em>; a <strong>founder effect</strong> happens when a few individuals <em>leave</em> and start a population somewhere new.', explain: 'Ask "did the population move?"Cheetahs (a past crash) = bottleneck. The Amish, or finches blown to an island = founder. Both leave the same signature, low heterozygosity and unusual allele frequencies, so the exam distinguishes them by the STORY, not the outcome.' },
    { q: 'TELL THEM APART: analogous vs homologous structures', a: '<strong>Homologous</strong> = same underlying structure, different function, shared ancestor (divergent evolution). <strong>Analogous</strong> = different underlying structure, same function, no shared ancestor (convergent evolution).', explain: 'A bat wing and a whale flipper share the pentadactyl limb bone-for-bone despite doing utterly different jobs: homologous. A bird wing and an insect wing both fly but share no bones or ancestry: analogous. Homologous is evidence FOR common ancestry; analogous is evidence for similar selection pressures and is a trap if you use it to argue relatedness.' },
    { q: 'TELL THEM APART: sympatric speciation vs allopatric speciation', a: '<strong>Allopatric</strong> needs a physical/geographic barrier to split the gene pool. <strong>Sympatric</strong> happens with no barrier: the populations overlap the whole time.', explain: 'Sympatric is the harder one to justify, so exams reward a concrete mechanism: polyploidy in plants (an instant chromosome-number barrier), or disruptive selection with assortative mating (apple maggot flies specialising onto different host fruits and mating on their host). Just saying "they became different in the same place" scores nothing.' },
    { q: 'TELL THEM APART: directional, stabilising and disruptive selection', a: 'Directional shifts the mean toward one extreme; stabilising narrows variation around the existing mean; disruptive favours BOTH extremes against the middle.', explain: 'Read the graph, not the words: one peak that has moved = directional; one peak that got taller and thinner = stabilising; two peaks = disruptive. Human birth weight is the classic stabilising example (too small and too large are both penalised). Disruptive selection is the one that can lead to sympatric speciation, because it splits the population into two viable groups.' },

    /* ---- process depth ---- */
    { q: 'Why does genetic drift have a much bigger effect in small populations?', a: 'Because small samples deviate from expected proportions far more than large ones. Chance events can wipe out or fix an allele outright.', explain: 'This is pure sampling statistics, the same idea as your Statistics standard. In a population of 10, losing 2 individuals by chance can remove an allele permanently; in a population of 10,000 the same 2 deaths change frequencies by ~0.02%. This is why conservation biologists care so much about minimum viable population size.' },
    { q: 'Why does gene flow SLOW down speciation?', a: 'It keeps introducing alleles between populations, so their gene pools stay similar and can\'t diverge enough to become reproductively isolated.', explain: 'Speciation requires the two gene pools to stop mixing. Any gene flow is a leak in that isolation. This is exactly why removing gene flow, a mountain range, a river, a rising sea level, is usually the first step in the allopatric story, and why a question mentioning "occasional interbreeding still occurs" is telling you speciation is incomplete.' },
    { q: 'Name four PRE-zygotic isolating mechanisms with an example of each', a: 'Temporal (breed at different times), behavioural (different courtship displays), ecological/habitat (different microhabitats in the same area), mechanical (incompatible genitalia or flower structure), gametic (sperm can\'t fertilise the egg).', explain: 'All of these prevent a zygote ever forming, which is why they are evolutionarily "cheaper" than post-zygotic mechanisms: no gametes are wasted on a doomed hybrid. Selection therefore tends to strengthen pre-zygotic barriers where hybrids are unfit, a process called reinforcement.' },
    { q: 'What exactly does "reproductive isolation" mean, and why is it the definition of a species?', a: 'Two populations can no longer interbreed to produce fertile, viable offspring, so their gene pools are permanently separate.', explain: 'The biological species concept defines a species by this criterion. It is why the mule matters: horses and donkeys CAN mate and produce a living animal, but because the mule is sterile the gene pools never merge, so they remain two species. Note the concept fails for asexual organisms and fossils, which is why other species concepts exist.' },
    { q: 'Punctuated equilibrium vs gradualism: what does the fossil record actually show?', a: 'Gradualism predicts slow steady change and many intermediate fossils; punctuated equilibrium predicts long periods of stasis broken by rapid bursts of change, so intermediates are rare.', explain: 'The fossil record largely shows stasis punctuated by rapid change, which is what punctuated equilibrium predicts, though "rapid" here still means tens of thousands of years. Both models are compatible with natural selection; they differ in tempo, not mechanism. A common exam trap is treating gaps in the fossil record as evidence AGAINST evolution rather than as evidence about its tempo.' },
    { q: 'Why is polyploidy an instant speciation mechanism in plants?', a: 'A polyploid offspring (e.g. tetraploid, 4n) cannot produce viable gametes with the diploid parent population, so it is reproductively isolated in a single generation.', explain: 'A 4n × 2n cross gives a 3n triploid, which cannot pair its chromosomes evenly at meiosis and is sterile. But the tetraploid CAN self-pollinate or cross with other tetraploids, so a new species establishes immediately. This is common in plants (wheat, cotton, many crops) and rare in animals, which mostly can\'t self-fertilise or tolerate the chromosome imbalance.' },
    { q: 'Adaptive radiation: define it and give the classic NZ example', a: 'One ancestral species rapidly diversifies into many species filling different ecological niches; NZ examples include the moa and NZ wrens, and internationally Darwin\'s finches.', explain: 'It needs two ingredients: ecological opportunity (empty niches, e.g. a new island or after a mass extinction) and a source of isolation between the subgroups. New Zealand is a textbook case because its long isolation and lack of mammalian predators left niches that birds and invertebrates radiated into: giant weta occupying a "rodent" niche is the standard example.' },
    { q: 'What is coevolution? Give an example that isn\'t predator–prey.', a: 'Two species act as selection pressures on each other so they evolve in response to one another: e.g. flowers and their specific pollinators, or a host and its parasite.', explain: 'NZ example worth quoting: native flax and the tūī/bellbird, or the long-tongued moths matched to long-spurred orchids. The test of true coevolution is <em>reciprocal</em> change: both lineages changed BECAUSE of each other. A predator getting faster while the prey stays the same is not coevolution.' },
  ],

  sections: [
    /* ============================================ 0 DEFINITIONS */
    {
      id: 'key-definitions', num: '0', title: 'Key definitions',
      video: null,
      intro: 'This standard is definition-heavy. Precise wording separates Merit from Excellence: learn these exactly.',
      blocks: [
        { t: 'definitions', title: '📖 Key definitions: Evolution & speciation (91605)', intro: 'Cover the right column and recite each one.', items: [
          { term: 'Evolution', def: 'A change in the <strong>allele frequencies</strong> of a population’s gene pool over successive generations.', note: 'Populations evolve: individuals do not.' },
          { term: 'Gene pool', def: 'All of the alleles of all the genes present in a breeding population at a given time.' },
          { term: 'Allele frequency', def: 'The proportion of a particular allele among all alleles of that gene in a population.' },
          { term: 'Mutation', def: 'A random change in the DNA base sequence: the <strong>ultimate source of all new alleles</strong>.' },
          { term: 'Natural selection', def: 'The process by which individuals with favourable heritable variations survive and reproduce more successfully, increasing the frequency of those alleles.' },
          { term: 'Genetic drift', def: 'A <strong>random</strong> change in allele frequencies due to chance, most significant in small populations.', note: 'Non-adaptive: unlike natural selection.' },
          { term: 'Bottleneck effect', def: 'A sharp reduction in population size (e.g. by a catastrophe) that leaves a surviving gene pool with reduced genetic diversity.' },
          { term: 'Founder effect', def: 'The reduced genetic diversity that results when a new population is established by a small number of individuals carrying only a sample of the original gene pool.' },
          { term: 'Gene flow', def: 'The movement of alleles between populations via migration and interbreeding. It makes populations more genetically similar.' },
          { term: 'Species', def: 'A group of organisms that can interbreed to produce <strong>fertile, viable offspring</strong>.' },
          { term: 'Speciation', def: 'The formation of a new species from an existing one, occurring when populations become reproductively isolated.' },
          { term: 'Allopatric speciation', def: 'Speciation caused by a <strong>geographical barrier</strong> physically separating populations and preventing gene flow.' },
          { term: 'Sympatric speciation', def: 'Speciation occurring <strong>without</strong> geographical separation, e.g. by polyploidy or exploiting different niches.' },
          { term: 'Reproductive isolation', def: 'Any mechanism that prevents two populations from interbreeding successfully.' },
          { term: 'Pre-zygotic mechanism', def: 'An isolating mechanism that prevents a zygote from forming (temporal, ecological, behavioural, mechanical, gametic).' },
          { term: 'Post-zygotic mechanism', def: 'An isolating mechanism acting after fertilisation. The hybrid is inviable, sterile, or its offspring break down.' },
          { term: 'Directional selection', def: 'Selection favouring one extreme phenotype, shifting the population mean toward it.' },
          { term: 'Stabilising selection', def: 'Selection favouring the intermediate phenotype and acting against both extremes.' },
          { term: 'Disruptive selection', def: 'Selection favouring both extreme phenotypes over the intermediate: can split a population.' },
          { term: 'Divergent evolution', def: 'Related species becoming increasingly different over time, producing <strong>homologous</strong> structures.' },
          { term: 'Convergent evolution', def: 'Unrelated species evolving similar features under similar selection pressures, producing <strong>analogous</strong> structures.' },
          { term: 'Coevolution', def: 'Two or more species evolving in response to each other (e.g. flower and pollinator).' },
          { term: 'Adaptive radiation', def: 'The rapid diversification of one ancestral species into many species occupying different niches.' },
          { term: 'Punctuated equilibrium', def: 'A pattern of long periods of little change (stasis) interrupted by short bursts of rapid evolutionary change.' },
        ]},
        { t: 'connects', title: 'Related elsewhere', items: [
          { to: '#/command-words', label: 'Study skills: NZQA command words',
            why: 'Biology grades hinge on the command word: “describe” wants what happens, “explain” wants why, and “discuss/evaluate” wants a judgement. A precise definition plus the right depth for the verb is most of the difference between Achieved and Excellence here.' },
        ]},
      ],
    },
    {
      id: 'variation', num: '1', title: 'Variation & the gene pool',
      video: 'NCEA Level 3 biology evolution speciation processes',
      blocks: [
        { t: 'key', title: 'Sources of genetic variation', items: [
          '<strong>Mutation</strong>, the ultimate source of all new alleles.',
          '<strong>Sexual reproduction</strong>, crossing over, independent assortment, and random fertilisation shuffle alleles into new combinations.',
          '<strong>Gene flow</strong>, new alleles arriving via migration/interbreeding.',
        ]},
        { t: 'p', html: `A <strong>gene pool</strong> is all the alleles in a population. Evolution is a change in <strong>allele frequencies</strong> in the gene pool over generations. Variation is essential, without it, natural selection has nothing to act on.` },
      ],
    },
    {
      id: 'mechanisms', num: '2', title: 'Mechanisms that change allele frequencies',
      blocks: [
        { t: 'table', caption: 'The four mechanisms of evolution', headers: ['Mechanism', 'What it does', 'Effect'], rows: [
          ['Natural selection', 'Individuals with favourable alleles survive & reproduce more', 'Adaptive: increases beneficial alleles'],
          ['Genetic drift', 'Random change in allele frequency (chance)', 'Non-adaptive; strong in small populations'],
          ['Gene flow', 'Movement of alleles between populations', 'Makes populations more similar'],
          ['Mutation', 'New alleles arise', 'Introduces new variation (raw material)'],
        ]},
        { t: 'key', title: 'Types of natural selection', items: [
          '<strong>Directional:</strong> favours one extreme → shifts the mean (e.g. antibiotic resistance).',
          '<strong>Stabilising:</strong> favours the average, selects against extremes (e.g. human birth weight).',
          '<strong>Disruptive:</strong> favours both extremes over the middle → can split a population.',
        ]},
        { t: 'key', title: 'Genetic drift: bottleneck & founder effect', items: [
          '<strong>Bottleneck:</strong> a catastrophe drastically cuts population size → surviving gene pool is a random subset (reduced diversity).',
          '<strong>Founder effect:</strong> a few individuals start a new population → carry only a sample of the original alleles.',
          'Drift matters most in <strong>small</strong> populations, where chance can fix or lose alleles.',
        ]},
      ],
    },
    {
      id: 'isolation', num: '3', title: 'Reproductive isolating mechanisms',
      blocks: [
        { t: 'p', html: `Speciation needs gene flow between populations to stop. <strong>Isolating mechanisms</strong> prevent interbreeding or prevent viable, fertile offspring.` },
        { t: 'table', caption: 'Isolating mechanisms', headers: ['Type', 'Mechanism', 'Example'], rows: [
          ['Pre-zygotic', 'Temporal: breed at different times', 'Two frog species breeding in different seasons'],
          ['Pre-zygotic', 'Ecological/habitat: live in different habitats', 'One species in trees, another on the ground'],
          ['Pre-zygotic', 'Behavioural: different courtship signals', 'Bird songs/displays that don’t attract each other'],
          ['Pre-zygotic', 'Mechanical: incompatible reproductive structures', 'Flower shapes fitting different pollinators'],
          ['Pre-zygotic', 'Gametic: gametes don’t fuse', 'Sperm & egg chemically incompatible'],
          ['Post-zygotic', 'Hybrid inviability/sterility/breakdown', 'Mule (horse × donkey) is sterile'],
        ]},
        { t: 'note', title: 'Pre- vs post-zygotic', html: '<strong>Pre-zygotic</strong> mechanisms stop a zygote forming at all; <strong>post-zygotic</strong> allow a zygote but it’s inviable, sterile, or its offspring are weak.' },
      ],
    },
    {
      id: 'speciation', num: '4', title: 'Speciation & patterns of evolution',
      blocks: [
        { t: 'key', title: 'Routes to speciation', items: [
          '<strong>Allopatric</strong> (“other country”): a geographic barrier splits a population → independent evolution → reproductive isolation. The commonest route.',
          '<strong>Sympatric</strong> (“same country”): new species arise without geographic separation: e.g. <strong>polyploidy</strong> in plants, or exploiting different niches.',
        ]},
        { t: 'key', title: 'Patterns of evolution', items: [
          '<strong>Divergent:</strong> related species become more different (adaptive radiation from a common ancestor).',
          '<strong>Convergent:</strong> unrelated species evolve similar features under similar selection pressures (analogous structures).',
          '<strong>Coevolution:</strong> two species evolve in response to each other (e.g. flower & pollinator).',
          '<strong>Gradualism vs punctuated equilibrium:</strong> slow steady change vs long stasis interrupted by rapid change.',
        ]},
        { t: 'example', tag: 'Worked example', title: 'Explaining allopatric speciation', problem: 'Outline how a mountain range could lead to two species from one.', steps: [
          'A barrier (mountain range) divides the population → gene flow stops.',
          'Each population faces different selection pressures and undergoes independent mutation and drift.',
          'Allele frequencies diverge over many generations; adaptations differ.',
          'Reproductive isolating mechanisms accumulate. Even if reunited, they can no longer interbreed to produce fertile offspring → two species.',
        ], answer: 'Isolation → independent evolution (selection/drift/mutation) → reproductive isolation → speciation.' },
      ],
    },
  ],

  links: [
    { label: 'NZQA, Biology L3 (91605) past papers & schedules', url: 'https://www.nzqa.govt.nz/ncea/assessment/search.do?query=91605&view=exams', note: 'Official exams + assessment schedules', verify: true },
    { label: 'NZQA, Biology subject page', url: 'https://www.nzqa.govt.nz/ncea/subjects/biology/', note: 'Specifications, clarifications & resources', verify: true },
  ],

  quiz: [
    { type: 'mc', q: 'The ultimate source of all new alleles is:', choices: ['Natural selection', 'Mutation', 'Gene flow', 'Genetic drift'], answer: 1, explanation: 'Mutation creates new alleles; the other mechanisms only rearrange or change the frequency of existing ones.' },
    { type: 'mc', q: 'A small population survives a volcanic eruption by chance, losing much of its genetic diversity. This is:', choices: ['Directional selection', 'A bottleneck (genetic drift)', 'Gene flow', 'Coevolution'], answer: 1, explanation: 'A random catastrophe drastically reducing population size and diversity is a bottleneck: a form of genetic drift.' },
    { type: 'mc', q: 'A mule (horse × donkey) is sterile. This is an example of a:', choices: ['Pre-zygotic mechanism', 'Post-zygotic mechanism', 'Behavioural isolation', 'Gene flow'], answer: 1, explanation: 'A zygote forms and develops, but the hybrid is sterile: a post-zygotic isolating mechanism.' },
    { type: 'mc', q: 'Speciation caused by a geographic barrier is called:', choices: ['Sympatric', 'Allopatric', 'Convergent', 'Gradual'], answer: 1, explanation: 'Allopatric speciation results from geographic separation stopping gene flow.' },
    { type: 'sa', q: 'Unrelated species evolving similar features under similar pressures is called ______ evolution.', accept: ['convergent'], answer: 'convergent', explanation: 'Convergent evolution produces analogous structures in unrelated lineages.' },

    /* ---- application & scenario questions (Merit/Excellence style) ---- */
    { type: 'mc', q: 'A population of 40 beetles is reduced to 6 by a landslide. The survivors happen to be mostly green, though colour gave no survival advantage in a landslide. Ten generations later the population is almost entirely green. The best explanation is:', choices: ['Directional natural selection for green', 'Genetic drift (bottleneck effect)', 'Gene flow from a green population', 'A new mutation for green arose'], answer: 1, explanation: 'The question deliberately tells you colour gave no advantage, so this cannot be selection. A chance catastrophe that slashed the population and left an unrepresentative sample of alleles is the bottleneck effect, a form of genetic drift.' },
    { type: 'mc', q: 'Two populations of the same insect live in the same meadow, but one breeds in early spring and the other in late summer. Over time they become separate species. This is:', choices: ['Allopatric speciation via a geographic barrier', 'Sympatric speciation via temporal isolation', 'Post-zygotic isolation', 'Convergent evolution'], answer: 1, explanation: 'They share the same area: so it is sympatric, not allopatric. The barrier is timing of breeding, which stops a zygote ever forming, making it a pre-zygotic (temporal) mechanism.' },
    { type: 'mc', q: 'Which observation would be the STRONGEST evidence that two similar-looking NZ birds are NOT closely related?', choices: ['They live on different islands', 'They eat different foods', 'Their similar beaks develop from different underlying bone structures', 'One is larger than the other'], answer: 2, explanation: 'Different underlying structure with the same function means the beaks are analogous, not homologous: the signature of convergent evolution in unrelated lineages. Geography, diet and size can all vary within a single species.' },
    { type: 'mc', q: 'Antibiotic resistance spreading through a bacterial population is an example of:', choices: ['Stabilising selection', 'Directional selection', 'Disruptive selection', 'Genetic drift'], answer: 1, explanation: 'The antibiotic shifts the population mean toward one extreme (highly resistant), which is directional selection. A very common error is to say the bacteria "became resistant in response to" the drug: the resistant alleles were already present by mutation; the antibiotic only selected them.' },
    { type: 'mc', q: 'Human birth weight has stayed near a narrow optimum for a long time: very small and very large babies both had lower survival. This is:', choices: ['Directional selection', 'Disruptive selection', 'Stabilising selection', 'Sexual selection'], answer: 2, explanation: 'Both extremes are penalised and the mean stays put, narrowing variation: the definition of stabilising selection. On a graph the curve becomes taller and thinner without moving.' },
    { type: 'mc', q: 'A tetraploid (4n) plant arises in a diploid (2n) population and can reproduce with other tetraploids but not with 2n plants. Why is this instant speciation?', choices: ['The tetraploid is physically larger', 'A 4n × 2n cross gives a sterile 3n offspring, so gene pools are already isolated', 'Polyploids always live in a different habitat', 'Tetraploids mutate faster'], answer: 1, explanation: 'The triploid offspring cannot pair chromosomes evenly at meiosis, so it is sterile. Reproductive isolation is therefore complete in a single generation: no geographic barrier and no gradual divergence needed.' },
    { type: 'mc', q: 'Gene flow between two diverging populations is best described as:', choices: ['A driver of speciation', 'A brake on speciation', 'Irrelevant to speciation', 'The same thing as genetic drift'], answer: 1, explanation: 'Gene flow keeps mixing alleles, so the gene pools stay similar and cannot diverge far enough for reproductive isolation. If a question tells you occasional interbreeding still happens. It is signalling that speciation is incomplete.' },
    { type: 'sa', q: 'A horse × donkey cross produces a living but sterile mule. Name the exact type of isolating mechanism (two words).', accept: ['post-zygotic', 'postzygotic', 'post zygotic', 'hybrid sterility'], answer: 'post-zygotic (hybrid sterility)', explanation: 'A zygote formed AND developed, so nothing pre-zygotic applied. The barrier acts after fertilisation, making the hybrid sterile, so the two gene pools still never merge, which is why horses and donkeys stay separate species.' },
    { type: 'sa', q: 'What is the ONE quantity that must change for a population to be described as evolving?', accept: ['allele frequency', 'allele frequencies', 'frequency of alleles', 'allele frequencies in the gene pool'], answer: 'allele frequencies', explanation: 'Evolution is defined as a change in allele frequencies in a population\'s gene pool over generations. This wording matters: individuals do not evolve, and a population that merely gets bigger or changes behaviour has not necessarily evolved.' },
    { type: 'sa', q: 'Name the type of drift where a few individuals leave and establish a new population elsewhere.', accept: ['founder effect', 'founder'], answer: 'founder effect', explanation: 'Contrast with a bottleneck, where the original population crashes in place. Both reduce diversity identically, the exam distinguishes them by whether the population moved.' },
  ],
};
