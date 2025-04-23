# 📌 User Management Dashboard

This project is a React + Vite single-page application that demonstrates a complete CRUD workflow against a JSON Server backend. You can add, edit, search, paginate, and delete users—all from one unified interface. It uses Axios for API calls, Bootstrap for styling, and React-Toastify for notifications.

## 🚀 Features

- **Add & Edit Users:**

  - Form with custom validation rules:

  - Name (min. 3 characters)
  - Email (valid format)
  - Phone (digits, spaces, hyphens, plus signs & parentheses)
  - Image URL (must end in common image extension)
  - Inline validation feedback.

- **Unified Form & List View:**

  - The “Add/Edit User” form appears at the top of the home page.
  - The user list renders directly beneath the form—no separate route needed.

- **Search & Pagination:**

  - Filter users by name, email, or phone (case-insensitive).
  - Choose 5, 10, or 15 records per page.
  - Elegant Bootstrap pagination with numbered pages, “Previous”/“Next” buttons, and active/disabled states.

- **Hard Delete:**

  - Permanently remove a user from the JSON database with a single click.

- **Toast Notifications:**

  - Success and error toasts for add, update, and delete actions via React-Toastify.

- **Soft & Hard Data Persistence:**
  - Backend powered by JSON Server (with --watch to persist changes).
  - Axios handles all HTTP requests.

## 📂 Project Folder Structure

```jsx
├── node_modules/
├── public/                         # Static assets (index.html, favicon)
├── src/
│   ├── Components/
│   │   ├── App.jsx                 # Main router: form at `/`, edit at `/edit/:id`
│   │   ├── UserInputForm.jsx       # Add/Edit form + inline list
│   │   └── UsersDataList.jsx       # Searchable, paginated user table
│   ├── Services/
│   │   └── api.js                  # Axios instance pointing to JSON Server
│   ├── database.json               # JSON Server data file
│   ├── index.jsx                   # React DOM entry point
│   └── styles.css                  # (optional) global/custom styles
├── .gitignore
├── package.json
├── package-lock.json
└── vite.config.js                  // Vite build & dev‑server configuration

```

## 🏗️ How to Use

1. **Clone the Repository:**

```bash

```

2. **Navigate to the Project Directory:**

```bash
cd
```

3. **Install Dependencies:**
   Install the required Dependencies using this command

```bash
  npm install
```

4. **Run the Application:**
   Start the development server

```bash
  npm run dev
```

5. **Open in Browser:**
   Navigate to Localhost url in your web browser to view the application.

## 👨🏼‍💻 Usage

- **Add a User:**
  Fill out the form at the top and click Add User. You’ll see a success toast and the list below will refresh.

- **Edit a User:**
  Click Edit next to any user row. The form fields populate; make changes and click Update User.

- **Search & Filter:**
  Type into the search box to filter by name, email, or phone in real time.

- **Pagination:**
  Use the dropdown to select how many users per page. Navigate pages with the numbered controls.

- **Delete a User:**
  Click the Delete button and confirm. The user is permanently removed and you’ll see a toast confirmation.

# 📷 Screenshots

<img width="330" alt="React Final Exam - 1" src="./src/Images/">

## 🛠️ Technologies Used

- **📄 HTML:**
  HTML is used to structure the core layout of the application, including the form elements, buttons, and user list. It defines the semantic skeleton of the user interface, ensuring accessibility and proper rendering across all browsers.
- **🎨 CSS & Bootstrap 5:**
  CSS, along with Bootstrap 5, styles and enhances the interface. Bootstrap provides a grid system, spacing utilities, and ready-made components, enabling a clean, responsive, and mobile‑friendly UI. It ensures that form controls, layout grids, and user lists are well-aligned and visually appealing with minimal custom CSS.
- **🌐 Node.js**
  Node.js serves as the runtime environment to run development scripts and JSON Server. It also manages project dependencies through npm, streamlining package management and build processes.
- **⚛️ React + Vite + JSX (JavaScript & XML):**
  React + Vite + JSX is a modern stack for building fast web apps. React provides reusable UI components, Vite offers fast development and optimized builds, and JSX allows writing HTML-like code in JavaScript for seamless UI creation.
- **🔁 React Hooks (useState, useEffect):**
  React Hooks such as useState and useEffect are the backbone of state and lifecycle management. useState controls all dynamic form data, loading states, and pagination settings, while useEffect is responsible for triggering actions like data fetching, filtering, and syncing with the backend upon certain state changes.
- **🧭 React Router:**
  React Router is used to handle client‑side navigation. This application uses route-based rendering to load different components—for example, the user input form (/) and the edit form (/edit/:id)—without reloading the page. It ensures a smooth and seamless single-page application (SPA) experience.
- **📡 Axios:**
  Axios is a promise‑based HTTP client used for interacting with the backend API (JSON Server). It handles all CRUD operations (Create, Read, Update, Delete) in a clean and consistent way, with built-in error handling. Axios improves code readability and simplifies asynchronous data requests and updates.
- **🔔 React-Toastify:**
  React-Toastify is integrated to display non‑intrusive toast notifications whenever users are added, edited, or deleted. This enhances user feedback without disrupting their workflow, contributing to a polished user experience.
- **🗄️ JSON Server (database.json):**
  JSON Server serves as the mock backend, with the database.json file acting as a live database. It responds to all CRUD operations and supports features like pagination via \_page and \_limit and keyword search using q. Every action performed from the frontend reflects directly in this file, mimicking real‑time backend behavior during development.

## 📜 License

This project is licensed under the MIT License.
Feel free to fork, modify, and distribute!
