# A-35 Coalition of Golden Gate Canyon

Static rebuild of the WordPress/Elementor site. No build step.

- Preview locally: `python -m http.server` in this folder, open http://localhost:8000
- GitHub Pages: push this folder's contents to the repo root (or point Pages at this folder), Settings > Pages > Deploy from branch.
- `.nojekyll` is included so Pages serves files as-is.
- Content source: `backup/a35coalition/database.sql` (page ID 2) plus Elementor CSS and a Nov 2024 Wayback snapshot for layout.
