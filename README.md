# Ledger — Customer Management System (Frontend)

A React frontend for a Customer Management System. No backend required —
customer data and login are simulated using the browser's `localStorage`,
so everything still works and persists across refreshes.

## Features

- **Login** — mock authentication (see demo credentials below)
- **Customer list** — table view of all customers
- **Search** — by name, email, or company
- **Filter** — by status (Active / Lead / Inactive)
- **Add / Edit / Delete** — full CRUD with form validation and a delete confirmation step

## Demo credentials

- Username: `admin`
- Password: `admin123`

## Running it locally

You need [Node.js](https://nodejs.org) installed (version 18 or higher).

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

## Project structure

```
src/
  context/
    AuthContext.jsx       -> handles login state (mock, no real backend)
    CustomerContext.jsx   -> acts as a "fake backend": all CRUD operations,
                              persisted to localStorage
  data/
    mockCustomers.js      -> the starting/seed dataset
  components/
    Sidebar.jsx            -> left navigation + logout
    ProtectedRoute.jsx      -> redirects to /login if not authenticated
    CustomerTable.jsx       -> renders the customer rows
    CustomerFormModal.jsx   -> add/edit form with validation
    ConfirmDialog.jsx       -> reusable "are you sure?" dialog
  pages/
    Login.jsx
    Customers.jsx           -> ties search + filter + table + modals together
  App.jsx                   -> route definitions
  main.jsx                  -> app entry point, wraps app in providers
```

## How to explain this in your presentation

- **Why Context API instead of just useState in App.jsx?** So that any
  component (Sidebar, Customers page, forms) can read/update the same
  data without passing props down manually through every layer
  ("prop drilling").
- **Why localStorage instead of a real database?** This is a frontend-only
  project. `CustomerContext.jsx` is written so that swapping localStorage
  calls for real API calls (e.g. `fetch('/api/customers')`) later would
  only require changes in one file — the rest of the app wouldn't need to
  change, since components only ever call `addCustomer`, `updateCustomer`,
  etc.
- **Why React Router?** To have distinct URLs (`/login`, `/customers`) and
  to protect the customers page from being viewed without logging in
  first (`ProtectedRoute.jsx`).

## Next steps you could add

- A dashboard page with charts (total customers, status breakdown)
- Pagination for large customer lists
- Sorting by clicking table headers
- Connecting to a real backend (Node/Express + MongoDB, or Firebase)
