# AGENTS.md

This is a learning project from The Odin Project (TOP). The user should do almost all coding manually.
Agents should primarily help with planning, debugging guidance, reviews, and small targeted fixes when explicitly requested.

## Current Progress

- The `Ship` module is complete.
- Work is currently focused on the `Gameboard` module.

## Project Specifications (The Odin Project)

Source: <https://www.theodinproject.com/lessons/node-path-javascript-battleship>

### Introduction constraints

- Build the classic Battleship game using TDD.
- Work one step at a time: write a test, then make it pass.
- Do not test DOM appearance for this assignment.
- Isolate game logic from DOM manipulation as much as possible.

### Assignment

#### Jest and ESM

- Jest does not have built-in stable support for ESM.
- Set up Babel for Jest ESM/CJS conversion (as covered in TOP testing lessons).

1. Create a `Ship` class/factory.
   - Ship objects include:
     - `length`
     - number of times hit
     - whether it has sunk
   - Test only the public interface.
   - Implement `hit()` to increase hit count.
   - Implement `isSunk()` to determine sunk status from length vs hits.

2. Create a `Gameboard` class/factory.
   - Rely on tests, not `console.log` or DOM methods, to validate logic.
   - Place ships at specific coordinates by calling the ship class/factory.
   - Implement `receiveAttack([x, y])` to:
     - detect hit or miss
     - call `hit()` on the correct ship for hits
     - record missed coordinates for misses
   - Track missed attacks.
   - Report whether all ships are sunk.

3. Create a `Player` class/factory.
   - Support two player types: real and computer.
   - Each player contains its own gameboard.

4. Connect modules and run the game from a DOM/controller module.
   - Import classes/factories into another file and use event listeners.
   - Create a module that manages DOM actions.
   - Set up a new game by creating players.
   - Initially populate gameboards with predetermined ship coordinates.
   - Display both boards using data from `Gameboard`.
   - Add rendering methods in an appropriate module.
   - Event listeners should progress turns using object methods.
   - For attacks:
     - user clicks enemy board coordinates
     - pass input to object methods
     - re-render boards
   - Alternate turns between players.
   - Computer player should make random legal moves (no duplicate shots).
   - End game when one player has all ships sunk.

5. Add player ship placement.
   - Example approaches:
     - type coordinates for each ship
     - button to cycle random placements

### Extra credit

- Add drag-and-drop ship placement.
- Add local 2-player mode with a pass-device screen.
- Improve computer AI to target adjacent coordinates after a hit.
