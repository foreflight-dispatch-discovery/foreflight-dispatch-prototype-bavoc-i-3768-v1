# Air Refueling Mission Planner Prototype

## Overview
A single-page clickable prototype for an "Air Refueling Mission Planner," designed as a module for ForeFlight Dispatch. Built to validate a "mission-first" planning approach for military aviation operators, coordinating tankers and receiver aircraft within a single mission object.

## Technology Stack
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6) — no frameworks or build tools
- **Server (dev):** Node.js inline HTTP server on port 5000

## Project Structure
- `index.html` — Entry point with layout (sidebar, header, main content areas)
- `app.js` — Application state, rendering logic, and event handlers
- `styles.css` — All visual styling (dark-themed UI)
- `README.md` — High-level project overview
- `brief.md` — Design brief with problem statement, decisions, and testing questions

## Running the Project
The project is served via a simple Node.js HTTP server configured as the "Start application" workflow on port 5000.

## Deployment
Configured as a static deployment (publicDir: ".") — no build step required.
