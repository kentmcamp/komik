# Komik Reader

A lightweight, web-based platform to easily publish webcomics, built with React, TypeScript, and Vite.

## Overview

KomikReader is designed to provide a focused and efficient reading experience. As of the current version, the app handles basic webcomic organization and presentation.

### Current Features

As of right now, this is still an early prototype build. Basic fundamental systems are still under development, mainly those focusing on UI/UX and presentation. All assets are being hosted on a database and just being fetched and displayed in this app. This includes features like...

* Component for Series Cards to be displayed on the HomePage.
* A carosel of banner images of recently uploaded/updated series for the HomePage header.
The project is in an **early prototype** phase. Core systems for UI/UX and data presentation are actively under development.
* The SeriesPage will be styled with a banner image up top with styled metadata text.
* Buttons on/under the banner for "Read Latest Issue" and "Start From Issue One".

### Features Implemented
- **Home Page:** Series card components and a featured banner carousel for recently updated titles.
- **Series Page:** Metadata display with banner art and "Quick Start" navigation (Read Latest / Start from Issue One).
- **Reader Page:** Interactive comic viewer with integrated navigation controls (Next/Prev Issue).

### Roadmap / Planned Features
- **Snap Zoom:** Double-click/tap toggle for mobile-friendly reading.
- **Act Containers:** Support for grouping issues into Chapters or Acts.
- **Dynamic Header:** A vanishing top-bar with search, series selector, and navigation links.

### Planned Features
* A snap zoom toggle that works via double clicking/double tapping on a page in the reader.
* An "Act" container for series that are big enough to break their issues into acts/chapters/etc.
* A vanishing header (only displays on top and when scrolling up) that has links for...
  1. Back to HomePage
  2. Series selector menu
  3. Search
  4. About/Updates

## Tech Stack
- **Framework:** [React](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)

## Author
**Kent** - [GitHub Profile](https://github.com/kentmcamp)

## License
This project is licensed under the MIT License - see the LICENSE file for details.
