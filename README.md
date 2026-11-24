# Finora 2.1 — Personal Finance Management System


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
