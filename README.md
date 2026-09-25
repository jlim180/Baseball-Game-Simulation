# DBL: Doll Baseball League ⚾

A browser-based baseball game simulator for the **Doll Baseball League (인형야구)**, a made-up league of four teams whose players are dolls. Pick two teams, set your batting order and pitchers, and watch a full nine-inning game play out with a live scoreboard and play-by-play.

Built with plain **HTML, CSS and JavaScript**. There are no frameworks, no build step and nothing to install.

## Features

- **Game simulation:** choose a home and an away team, arrange each team's lineup, and simulate a 9-inning game. A stadium-style scoreboard updates inning by inning, and each half-inning has its own play-by-play feed (hits, outs, home runs and pitching changes).
- **Fantasy simulation:** the same game engine with mixed rosters (Korea, America and an all-star Fantasy team), styled in purple and gold.
- **Team pages:** a page for each team with its stadium, manager, season record, roster and player statistics.
- **Team manager:** move any player to a different team. Simulations use the new rosters until you reset them.
- **Player stats:** stats carry over between games. You can save them to a `.txt` file or reset them.

## The teams

| Team | City | Stadium |
|---|---|---|
| Kia Tigers | Gwangju | Gwangju Kia Championsfield |
| LG Twins | Seoul | Jamsil Baseball Stadium |
| Lotte Giants | Busan | Busan Sajik Baseball Stadium |
| Samsung Lions | Daegu | Daegu Baseball Stadium |

## Getting started

1. Clone the repository:
   ```bash
   git clone https://github.com/jlim180/Baseball-Simulation.git
   cd Baseball-Simulation
   ```
2. Start a local web server in the project folder:
   ```bash
   python3 -m http.server 8000
   ```
3. Open **http://localhost:8000/main.html** in your browser.

You can also open `main.html` by double-clicking it. A local server is still recommended so that saved rosters and stats (stored in the browser's `localStorage`) are shared between pages.

> **Note:** "Save Player Stats" uses the browser's File System Access API, which works in Chrome and Edge. Other browsers can still play games but may not be able to save the stats file.

## How to play

1. On the home page, choose **Simulation Page**.
2. **Step 1:** pick a Home and an Away team, then click **Submit teams**.
3. **Step 2:** adjust the batting order and pitchers with the dropdowns, then click **Submit chosen roster**.
4. **Step 3:** click **Click to start** and watch the game.
5. When the game ends, click **Save Player Stats** to write the season stats to a text file.

To trade players between teams, go to **Manage Teams** on the home page, change a player's team, then click **Save Changes**.

## Project structure

| File | What it does |
|---|---|
| `main.html`, `mainDesign.css`, `simulation.js` | Home page and its navigation buttons |
| `simulationPage.html`, `simulationFunction.js` | The game simulator |
| `fantasySimulationPage.html`, `fantasySimulationFunction.js` | Fantasy mode |
| `simulationDesign.css` | Shared styles for both simulator pages (fantasy mode adds its own colours) |
| `kia.html`, `lg.html`, `lotte.html`, `samsung.html`, `team.css` | Team pages. One shared stylesheet; each page picks its team colours with a `<body>` class |
| `teamManager.html`, `teamManagerFunction.js`, `teamManagerDesign.css` | The team manager |
| `images/` | League logo and team logos |

### Saved data

Everything is stored in the browser's `localStorage`:

| Key | Contents |
|---|---|
| `customTeamRosters`, `customTeamPitchers` | Rosters saved from the team manager |
| `baseballPlayerStats`, `baseballPitcherStats` | Batting and pitching stats that carry over between games |

## Stats glossary

- **GOMGOM Index:** the league's own scoring stat, calculated as *(70% of scores + 30% of home runs) ÷ games played*.
- **ERA / WHIP:** the standard pitching stats, included in the saved stats file.

## Built with

- HTML5 and CSS3 (CSS variables, Grid, Flexbox)
- Vanilla JavaScript
- [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) and [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts

## Author

**Jaewan Lim** ([@jlim180](https://github.com/jlim180))
