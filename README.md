# F1 Reaction Time Game

A small browser game inspired by the start lights of a Formula 1 race.

The game tests how quickly you react when the lights turn green. Enter your name, wait for the starting sequence, and click as soon as the lights change to green. The game runs for two rounds and then shows your average reaction time.

## Live Demo

https://f1-reaction-time-game.onrender.com

## How it works

The game uses a two-stage traffic-light sequence similar to an F1 race start.

- The lights turn red one by one.
- Once all the lights are red, there is a random delay.
- The lights then turn green.
- The player has to click as quickly as possible.
- Clicking before the green signal adds a 100 ms penalty.
- Two rounds are played.
- The average reaction time is calculated at the end.

The lower the reaction time, the better the result.

## Features

- F1-style starting light sequence
- Randomized delay before the green signal
- Two reaction-time rounds per game
- Early-click penalty system
- Reaction time displayed in milliseconds
- Average reaction time after each game
- Local leaderboard
- Player names
- Clear leaderboard option
- Keyboard support using the Enter key
- F1-inspired sounds and visual design
- Works directly in a modern web browser

## Scoring

Reaction time is measured from the moment the lights turn green until the player clicks.

If the player clicks while the lights are still red, a penalty of 100 milliseconds is added for each early click.

For example:

```text
Actual reaction time: 185 ms
Early-click penalty: 100 ms

Recorded time: 285 ms
```

After two rounds, the game calculates the average:

```text
Average = (Round 1 + Round 2) / 2
```

Leaderboard entries are sorted from the lowest average reaction time to the highest.

## Leaderboard

The leaderboard is stored using the browser's `localStorage`.

This means:

- No database is required.
- No account is required.
- Scores are saved in the browser.
- Scores are not shared between different browsers or devices.
- Clearing the browser's site data can remove saved scores.
- The Clear Leaderboard button removes the saved leaderboard from the current browser.

The leaderboard stores the player's name and average reaction time.

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Browser `performance.now()` API for timing
- Browser `localStorage` API for leaderboard data
- HTML5 Audio API for game sounds
- Google Fonts (Poppins)

No framework or backend is required.

## Project Structure

```text
F1/
├── index.html
├── script.js
├── styles.css
├── background_pic.jpg
├── background_pic2.jpg
├── bottas.jpg
├── hamilton.jpg
├── verstappen.jpg
├── F1sound.mp3
└── Mario Kart Race Start - Sound Effect (HD).mp3
```

### Main files

`index.html`

Contains the game layout, player input, leaderboard, buttons and traffic-light elements.

`styles.css`

Contains the visual design, traffic-light states, animations, layout and responsive styling.

`script.js`

Contains the game logic, timing system, penalty handling, audio control and leaderboard functionality.

## Running locally

You do not need to install any dependencies.

Clone the repository:

```bash
git clone <repository-url>
```

Enter the project directory:

```bash
cd F1
```

You can open `index.html` directly in a browser.

For a more reliable local development setup, run a simple HTTP server.

### Python

If Python is installed:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploying on Render

The game is a static website, so it can be deployed as a Render Static Site.

### Render settings

Use the GitHub repository containing the project and configure it approximately as follows:

```text
Service Type: Static Site
Branch: main
Root Directory: .
Build Command: leave blank
Publish Directory: .
```

The repository should have `index.html` available at its root.

After deployment, Render will provide a URL similar to:

```text
https://your-project-name.onrender.com
```

The current live version is available at:

https://f1-reaction-time-game.onrender.com

## Browser compatibility

The game uses standard browser APIs and should work in current versions of:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

Sound playback may depend on the browser's autoplay policies. Starting the game through the provided button or pressing Enter allows the browser to treat the interaction as user-initiated.

## Game flow

```text
Enter player name
        |
        v
     Start game
        |
        v
   Red lights appear
        |
        v
   Random wait period
        |
        v
    Lights turn green
        |
        v
      Click
        |
        v
   Record reaction time
        |
        v
      Round 2
        |
        v
  Calculate average
        |
        v
 Update leaderboard
```

## Notes

The game is intentionally simple and runs entirely in the browser. There is no server-side game logic or user account system.

Leaderboard data is local to the browser, so the online deployment does not provide one shared leaderboard for everyone visiting the website.

The reaction timer uses `performance.now()` rather than `Date.now()` to get higher-resolution timing suitable for a reaction-time game.

## Possible improvements

Some ideas for future versions:

- Add more rounds or selectable game lengths
- Add reaction-time statistics
- Add personal best tracking
- Add a global leaderboard with a backend
- Add difficulty levels
- Add false-start statistics
- Add a countdown mode
- Add mobile-specific controls
- Add an F1-style results screen
- Add more sound and animation options
- Add player history and performance graphs

## License

No license has currently been added to this project.

If the repository is going to be distributed as open source, add a `LICENSE` file with the terms you want to use.

## Author

Debtulya Chakraborty

## Live Project

https://f1-reaction-time-game.onrender.com
