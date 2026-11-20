# 🎫 Ticket Management System

**A modern and responsive platform for creating, tracking, and managing support tickets with separate Admin and User roles.**

[Live Demo](ADD_YOUR_LIVE_DEMO_LINK_HERE) · [GitHub Repository](ADD_YOUR_GITHUB_REPOSITORY_LINK_HERE)

---

## 📸 Screenshots and Demo

### Login Page
![Login Page](docs/screenshots/login.png)

### Admin Dashboard
![Admin Dashboard](docs/screenshots/dashboard.png)

### Ticket Management
![Ticket Management](docs/screenshots/tickets.png)

### Project Demo
![Project Demo](docs/demo.gif)

> Add your own screenshots and GIF using the file names shown above. Replace the live demo and GitHub links with your real links when available.

---

## ✨ Features

### Admin Features
- Admin login and dashboard.
- View all support tickets.
- Update ticket status.
- Manage user accounts.
- View ticket activity.
- Manage account settings.

### User Features
- Register and log in.
- Create support tickets.
- View personal tickets.
- Add comments to tickets.
- Upload and download attachments.
- View ticket activity.
- Change profile details and password.

### Design Features
- Modern dark theme.
- Professional purple and blue colour scheme.
- Responsive dashboard.
- Sidebar navigation.
- Dashboard statistics.
- Clean tables and forms.
- Mobile-friendly layout.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and responsive design |
| JavaScript | Application logic |
| React | User interface |
| React Router | Page navigation |
| Vite | Development server and build tool |
| Lucide React | Icons |
| Local Storage | Saving demo application data |
| Git and GitHub | Version control and project hosting |

---

## ⚙️ Installation and Setup

Follow these steps to run the project on your computer.

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project folder

```bash
cd Ticket-Management-system
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open the local URL shown in your terminal. It is usually:

```text
http://localhost:5173
```

---

## 📂 Project Folder Structure

```text
Ticket-Management-system/
│
├── public/
│   └── images/
│
├── docs/
│   ├── screenshots/
│   │   ├── login.png
│   │   ├── dashboard.png
│   │   └── tickets.png
│   └── demo.gif
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── tickets/
│   │
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   ├── data/
│   ├── utils/
│   ├── styles/
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

> This is the intended project structure. Keep your actual existing files and folders; do not create duplicate folders just to match this example.

---

## 🔌 API Used

**Current API status: No external API is connected yet.**

The current version uses browser Local Storage to save:
- User accounts.
- Ticket information.
- Comments.
- Attachments.
- Activity records.
- Account settings.

A backend REST API and database can be added in a future version.

---

## 🧩 Challenges and Solutions

### 1. Admin and User Roles
**Challenge:** Creating separate permissions for administrators and normal users.

**Solution:** Added role-based navigation and protected application routes so each role sees the pages it is allowed to access in the demo.

### 2. Saving User Information
**Challenge:** Keeping account information and tickets after refreshing the browser.

**Solution:** Used browser Local Storage to save and retrieve application data.

### 3. Ticket Management
**Challenge:** Creating tickets and tracking their progress.

**Solution:** Added ticket creation, status updates, comments, and activity records.

### 4. Responsive Design
**Challenge:** Making the dashboard display well on different screen sizes.

**Solution:** Used CSS Grid, Flexbox, and media queries to arrange the sidebar, cards, tables, and forms.

### 5. File Attachments
**Challenge:** Allowing users to attach files to support tickets.

**Solution:** Used the browser FileReader API to read supported files and save their data in Local Storage for the demo.

---

## 🚀 Future Improvements

- Connect a secure backend REST API.
- Add a database for permanent storage.
- Implement secure authentication.
- Add email notifications.
- Add ticket search and filtering.
- Add advanced dashboard reports.
- Add password reset functionality.
- Deploy the application online.

---

## 🎓 Learning Goals

This project helps demonstrate practical skills in:

- React components and state management.
- React Router.
- JavaScript programming.
- Responsive web design.
- Form handling and validation.
- Browser Local Storage.
- User role management.
- Git and GitHub.

---

## 👩‍💻 Developer

**Ruth IRAGENA**

Computer Systems Student

Project: Ticket Management System

---

## 🙏 Credits

- React documentation.
- Vite documentation.
- React Router documentation.
- Lucide React icon library.
- Open-source developer community.

---

## 📌 Important Note

This project is currently a frontend demonstration. It uses Local Storage and does not have secure server-side authentication or a production database.

Do not use the current demo login system to protect real user accounts or sensitive information.

---

**Built with ❤️ using React, JavaScript, and CSS.**