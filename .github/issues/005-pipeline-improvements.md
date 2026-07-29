---
title: "Improve CI/CD with release automation"
labels: ["ci", "enhancement"]
---

## Description

Add release automation to the CI/CD pipeline. This should include automatic semantic versioning, changelog generation, and GitHub releases.

## Acceptance Criteria

- [ ] Add `release.yml` workflow triggered by version tags
- [ ] Generate changelog from conventional commits
- [ ] Create GitHub Release with release notes
- [ ] Optionally publish to npm
- [ ] Update `CHANGELOG.md` with unreleased changes format

## Resources

- Existing workflows in `.github/workflows/`
- `CHANGELOG.md` for the changelog format
