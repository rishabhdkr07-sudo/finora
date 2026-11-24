# Finora 2.1 — Personal Finance Management System

This is a complete static website built with HTML, CSS and vanilla JavaScript. It uses browser `localStorage` for account and finance data. No backend, framework, build step or database server is required.

## IMPORTANT: GitHub Pages file layout

Keep these five files together in the **repository root** (the top level of the `finora` repository):

```text
finora/
├── index.html
├── styles.css
├── app.js
├── storage.js
├── reports.js
└── README.md
```

The HTML intentionally uses relative root paths:

```html
<link rel="stylesheet" href="./styles.css">
<script type="module" src="./app.js"></script>
```

The JavaScript imports `./storage.js` and `./reports.js`. Do not move the files into `css/` or `js/` folders unless you also update every reference.

## Publish on GitHub Pages

1. Download and extract `Finora-2.1.zip`.
2. Open your `rishabhdkr07-sudo/finora` GitHub repository.
3. Upload/replace the five project files at the repository root. Do not upload the enclosing `Finora-2.1` folder itself.
4. Commit the changes to the branch and folder configured in **Settings → Pages**.
5. Wait for deployment, then open `https://rishabhdkr07-sudo.github.io/finora/`.
6. Hard refresh with `Ctrl + Shift + R`.

## Run locally

For ES modules, use VS Code Live Server or run `python -m http.server 8000` in this folder and open `http://localhost:8000`.

## Features

- Local registration, login and logout
- Password hash stored locally (SHA-256 through Web Crypto; this is not a substitute for server authentication)
- Per-account transactions stored in localStorage
- Add, edit, delete, search and filter transactions
- PDF and CSV transaction exports
- Category budgets and 80%/over-limit alerts
- Savings goals and contribution tracking
- Dashboard with income, expenses, balance and savings
- Six-month cash-flow chart and category breakdown
- Monthly and yearly comparison reports
- Rule-based spending recommendations
- Dark mode and responsive layout

## Data and security

- Data stays in the same browser profile and device. It does not sync to a server.
- Clearing browser site data can permanently erase accounts and finance records.
- This is an educational/demo project, not a production banking application. Client-side authentication and local storage are not secure against someone who can inspect or control the browser.
- Do not enter bank login credentials, card numbers or other sensitive financial information.
