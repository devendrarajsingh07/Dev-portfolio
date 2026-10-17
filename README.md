# Devendra Raj Singh — Portfolio

A static software-development portfolio with an interactive 3D project ring, nine project case studies, technical skill icons, experience, a downloadable resume, and an EmailJS contact form.

## Preview locally

With Node.js installed:

```sh
node preview-server.cjs
```

Open http://127.0.0.1:4173/.

## Update content

- `design/projects.json`: project summaries and repository links.
- `design/case-studies.json`: case-study content and source references.
- `design/skills-source.html`: technical skill icons and labels.
- `design/build-portfolio.cjs`: homepage content, experience, and page generation.
- `portfolio.css` and `case-study.css`: presentation and responsive layouts.
- `portfolio.js`: navigation, 3D ring controls, and contact submission.
- `resume.html` and `resume.css`: resume source.
- `output/pdf/Devendra_Raj_Singh_Resume.pdf`: downloadable resume.

Rebuild the homepage and all case-study pages after changing their source content:

```sh
node design/build-portfolio.cjs
```

Generated HTML is checked in, so static hosting requires no build command. Publish the repository root.

## Contact form

The form uses the EmailJS browser SDK with a public key, service ID, and template ID. A test submission from the local preview was successfully received and confirmed by the owner on 17 October 2026. When publishing on a new domain, verify that the EmailJS service, template, quota, and allowed origins permit that deployment.

## Visuals

Project covers are conceptual illustrations rather than application screenshots. Font and icon attributions are in `fonts/README.md` and `images/icons/README.md`. Design notes are in `design/current-design.md`.
