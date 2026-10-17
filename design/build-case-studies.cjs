const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const caseData = JSON.parse(fs.readFileSync(path.join(__dirname, 'case-studies.json'), 'utf8'));
const projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'projects.json'), 'utf8'));
const caseByRepo = new Map(caseData.map(study => [study.repo, study]));
const order = ['SIH2026-MGHSIS.', ...projects.filter(project => project.repo !== 'SIH2026-MGHSIS.').map(project => project.repo)];
if (caseByRepo.size !== caseData.length || new Set(caseData.map(study => study.slug)).size !== caseData.length || projects.some(project => !caseByRepo.has(project.repo))) {
  throw new Error('Each project must have one case study with a unique repository and slug.');
}
const cases = order.map(repo => caseByRepo.get(repo));
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const arrow = '<img src="../images/icons/arrow-up-right.svg" width="18" height="18" alt="">';
fs.mkdirSync(path.join(root, 'case-studies'), { recursive: true });

cases.forEach((study, index) => {
  const repo = `https://github.com/devendrarajsingh07/${study.repo}`;
  const next = cases[(index + 1) % cases.length];
  const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(study.title)} — Case Study | Devendra Raj Singh</title>
  <meta name="description" content="${escape(study.intro)}">
  <meta name="theme-color" content="#fcfaf8">
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <link rel="preload" href="../fonts/gambarino.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="../portfolio.css">
  <link rel="stylesheet" href="../case-study.css">
</head>
<body>
  <a class="skip" href="#case-main">Skip to case study</a>
  <header class="case-header">
    <a class="wordmark" href="../index.html#home" aria-label="Devendra Raj Singh home">Devendra</a>
    <nav aria-label="Case study navigation"><a href="../index.html#projects">All projects ↗</a><a href="../output/pdf/Devendra_Raj_Singh_Resume.pdf" target="_blank" rel="noopener">Resume ↗</a></nav>
  </header>
  <main class="case-main" id="case-main">
    <article>
      <header class="case-hero">
        <div class="case-kicker eyebrow"><span>${escape(study.title)} / Case study</span><span>${String(index + 1).padStart(2, '0')} — ${String(cases.length).padStart(2, '0')}</span></div>
        <h1>${escape(study.headline)}</h1>
        <p class="case-intro">${escape(study.intro)}</p>
        <div class="case-actions"><a class="text-link" href="#problem">Explore the story <img src="../images/icons/arrow-down.svg" alt="" width="18" height="18"></a><a class="text-link" href="${repo}" target="_blank" rel="noopener noreferrer">View source ${arrow}</a></div>
      </header>
      ${study.cover ? `<figure class="case-cover"><img src="../images/redesign/${study.cover}" alt="${escape(study.title)} conceptual project illustration" width="1536" height="1024"><figcaption>Conceptual project artwork. Implementation and documentation are linked below.</figcaption></figure>` : ''}
      <dl class="case-facts"><div><dt>Project</dt><dd>${escape(study.category)}</dd></div><div><dt>Engineering focus</dt><dd>${escape(study.focus)}</dd></div><div><dt>Technology</dt><dd>${study.stack.map(escape).join(' · ')}</dd></div></dl>
      <section class="case-section" id="problem" aria-labelledby="problem-title"><h2 id="problem-title">The problem</h2><div class="case-copy"><p>${escape(study.problem)}</p></div></section>
      <section class="case-section" aria-labelledby="approach-title"><h2 id="approach-title">The approach</h2><div class="case-copy"><p>${escape(study.approach)}</p><ol class="case-pipeline" aria-label="Application workflow">${study.flow.map(step => `<li>${escape(step)}</li>`).join('')}</ol></div></section>
      <section class="case-section" aria-labelledby="decisions-title"><h2 id="decisions-title">Key decisions</h2><div class="case-copy">${study.decisions.map(decision => `<div class="decision"><h3>${escape(decision.title)}</h3><p>${escape(decision.body)}</p><p class="tradeoff"><strong>The tradeoff.</strong> ${escape(decision.tradeoff)}</p></div>`).join('')}</div></section>
      <section class="case-section" aria-labelledby="outcome-title"><h2 id="outcome-title">Where it stands</h2><div class="case-copy"><p>${escape(study.outcome)}</p><div class="case-scope"><h3>Current scope</h3><p>${escape(study.scope)}</p></div><p class="case-next">${escape(study.next)}</p></div></section>
      <section class="case-section" aria-labelledby="source-title"><h2 id="source-title">Explore the build</h2><div class="case-copy"><ul class="source-links">${study.sources.map(source => `<li><a href="${repo}/blob/${study.ref || 'main'}/${source.path}" target="_blank" rel="noopener noreferrer">${escape(source.label)} ${arrow}</a></li>`).join('')}</ul><p class="source-note">Repository sources reviewed on 17 October 2026. The tradeoffs above reflect an analysis of the implementation and documentation.</p></div></section>
    </article>
    <nav class="case-next-project" aria-label="More case studies"><a href="${next.slug}.html"><p class="eyebrow">Next case study</p><span class="serif">${escape(next.title)} ↗</span></a><a class="text-link" href="../index.html#projects">All projects ${arrow}</a></nav>
  </main>
  <footer class="site-footer"><span>© ${new Date().getFullYear()} Devendra Raj Singh</span><a href="mailto:devendrarajsingh2005@gmail.com">Let’s talk ↗</a></footer>
</body>
</html>`;
  fs.writeFileSync(path.join(root, 'case-studies', `${study.slug}.html`), page);
});
console.log(`Built ${cases.length} case studies.`);
