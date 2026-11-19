
import { useState } from "react";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  User,
  Users,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Eye,
  Trash2,
} from "lucide-react";

import "./App.css";

const ADMIN_EMAIL = "admin@ticketdesk.com";
const ADMIN_PASSWORD = "Admin123!";

function getUsers() {
  const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");

  const adminExists = savedUsers.some(
    (user) => user.email.toLowerCase() === "ruthragena@gimail.com"
  );

  if (!adminExists) {
    savedUsers.push({
      id: "admin-001",
      name: "Ruth",
      email: "ruthragena@gimail.com",
      password: "Admin123!",
      role: "Admin",
    });
  }

  localStorage.setItem("users", JSON.stringify(savedUsers));

  return savedUsers;
}

function getTickets() {
  return JSON.parse(localStorage.getItem("tickets") || "[]");
}

function Sidebar({ currentUser, onLogout, closeMenu }) {
  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
      show: true,
    },
    {
      name: "All Tickets",
      path: "/tickets",
      icon: Ticket,
      show: currentUser.role === "Admin",
    },
    {
      name: "My Tickets",
      path: "/my-tickets",
      icon: User,
      show: true,
    },
    {
      name: "Create Ticket",
      path: "/create-ticket",
      icon: PlusCircle,
      show: true,
    },
    {
      name: "Users",
      path: "/users",
      icon: Users,
      show: currentUser.role === "Admin",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: SettingsIcon,
      show: true,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>TicketDesk</h2>
        <button className="close-menu" onClick={closeMenu}>
          <X />
        </button>
      </div>

      <div className="user-info">
        <div className="user-avatar">
          {currentUser.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h4>{currentUser.name}</h4>
          <span>{currentUser.role}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links
          .filter((link) => link.show)
          .map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={closeMenu}
              >
                <Icon size={19} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
      </nav>

      <button className="logout-btn" onClick={onLogout}>
        <LogOut size={19} />
        Logout
      </button>
    </aside>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const users = getUsers();

    const foundUser = users.find(
      (user) =>
        user.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (!foundUser) {
      setError("Incorrect email or password.");
      return;
    }

    onLogin(foundUser);
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <p>Login to your Ticket Management System</p>

        {error && <p className="error-message">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account? <NavLink to="/register">Register</NavLink>
        </p>

        <div className="demo-login">
          <strong>Demo Admin Account</strong>
          <p>Email: {ADMIN_EMAIL}</p>
          <p>Password: {ADMIN_PASSWORD}</p>
        </div>
      </form>
    </div>
  );
}

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must have at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = getUsers();

    const exists = users.some(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (exists) {
      setError("This email is already registered.");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.trim(),
      password,
      role: "User",
    };

    localStorage.setItem(
      "users",
      JSON.stringify([...users, newUser])
    );

    navigate("/login");
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p>Register as a normal user</p>

        {error && <p className="error-message">{error}</p>}

        <label>Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          required
        />

        <button type="submit">Register</button>

        <p>
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </form>
    </div>
  );
}

function Dashboard({ currentUser, tickets }) {
  const visibleTickets =
    currentUser.role === "Admin"
      ? tickets
      : tickets.filter((ticket) => ticket.createdBy === currentUser.id);

  const open = visibleTickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const progress = visibleTickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolved = visibleTickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  return (
    <div className="page-content">
      <h1>{currentUser.role} Dashboard</h1>
      <p>Welcome, {currentUser.name}.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tickets</h3>
          <h2>{visibleTickets.length}</h2>
        </div>

        <div className="stat-card">
          <h3>Open Tickets</h3>
          <h2>{open}</h2>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <h2>{progress}</h2>
        </div>

        <div className="stat-card">
          <h3>Resolved</h3>
          <h2>{resolved}</h2>
        </div>
      </div>

      <h2>Recent Tickets</h2>

      <TicketTable
        tickets={[...visibleTickets].slice(-5).reverse()}
        isAdmin={currentUser.role === "Admin"}
      />
    </div>
  );
}

function TicketTable({ tickets, isAdmin, onStatusChange }) {
  if (tickets.length === 0) {
    return <p>No tickets found.</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            {isAdmin && <th>Created By</th>}
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>
                {isAdmin && onStatusChange ? (
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      onStatusChange(ticket.id, e.target.value)
                    }
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                ) : (
                  ticket.status
                )}
              </td>
              <td>{ticket.priority}</td>

              {isAdmin && <td>{ticket.createdByName}</td>}

              <td>
                <NavLink to={`/tickets/${ticket.id}`}>
                  <Eye size={18} />
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AllTickets({ tickets, onStatusChange }) {
  return (
    <div className="page-content">
      <h1>All Tickets</h1>
      <p>Admin can view and update all tickets.</p>

      <TicketTable
        tickets={tickets}
        isAdmin={true}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}

function MyTickets({ tickets, currentUser }) {
  const myTickets = tickets.filter(
    (ticket) => ticket.createdBy === currentUser.id
  );

  return (
    <div className="page-content">
      <h1>My Tickets</h1>
      <p>View the tickets you have created.</p>

      <TicketTable tickets={myTickets} isAdmin={false} />
    </div>
  );
}

function CreateTicket({ currentUser, onAddTicket }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit(e) {
    e.preventDefault();

    const newTicket = {
      id: `TK-${Date.now()}`,
      title,
      description,
      priority,
      status: "Open",
      createdBy: currentUser.id,
      createdByName: currentUser.name,
      createdAt: new Date().toLocaleString(),
      comments: [],
      attachments: [],
      activity: [
        {
          action: "Ticket created",
          date: new Date().toLocaleString(),
          user: currentUser.name,
        },
      ],
    };

    onAddTicket(newTicket);
    navigate("/my-tickets");
  }

  return (
    <div className="page-content">
      <h1>Create Ticket</h1>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <label>Ticket Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter ticket title"
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your problem"
          required
        />

        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>

        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
}

function TicketDetails({ tickets, currentUser, onUpdateTicket }) {
  const { ticketId } = useParams();

  const ticket = tickets.find((item) => item.id === ticketId);

  const canView =
    ticket &&
    (currentUser.role === "Admin" ||
      ticket.createdBy === currentUser.id);

  const [comment, setComment] = useState("");

  if (!canView) {
    return <div className="page-content"><h2>Ticket not found or access denied.</h2></div>;
  }

  function addComment(e) {
    e.preventDefault();

    if (!comment.trim()) return;

    const updatedTicket = {
      ...ticket,
      comments: [
        ...(ticket.comments || []),
        {
          author: currentUser.name,
          text: comment,
          date: new Date().toLocaleString(),
        },
      ],
    };

    onUpdateTicket(updatedTicket);
    setComment("");
  }

  return (
    <div className="page-content">
      <h1>{ticket.title}</h1>
      <p>{ticket.description}</p>
      <p><strong>Ticket ID:</strong> {ticket.id}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
      <p><strong>Created by:</strong> {ticket.createdByName}</p>

      <h2>Comments</h2>

      {(ticket.comments || []).map((item, index) => (
        <div className="comment-item" key={index}>
          <strong>{item.author}</strong>
          <p>{item.text}</p>
          <small>{item.date}</small>
        </div>
      ))}

      <form onSubmit={addComment}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment"
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}

function UserManagement({ users, onAddUser, onDeleteUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must have at least 8 characters.");
      return;
    }

    if (
      users.some(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase()
      )
    ) {
      setError("This email already exists.");
      return;
    }

    onAddUser({
      id: Date.now().toString(),
      name,
      email: email.trim(),
      password,
      role,
    });

    setName("");
    setEmail("");
    setPassword("");
    setRole("User");
    setError("");
  }

  return (
    <div className="page-content">
      <h1>User Management</h1>
      <p>Admin can add and remove accounts.</p>

      <form className="ticket-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit">Add User</button>
      </form>

      <h2>Registered Users</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.email !== ADMIN_EMAIL && (
                    <button
                      type="button"
                      onClick={() => onDeleteUser(user.id)}
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Settings({ currentUser, onUpdateUser }) {
  const [name, setName] = useState(currentUser.name);
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      ...currentUser,
      name,
      ...(password ? { password } : {}),
    });

    setPassword("");
    alert("Settings updated.");
  }

  return (
    <div className="page-content">
      <h1>Settings</h1>

      <form className="ticket-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input value={currentUser.email} disabled />

        <label>New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave blank to keep current password"
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

function ProtectedRoute({ currentUser, adminOnly = false, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && currentUser.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppLayout({
  currentUser,
  onLogout,
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-layout">
      <div className={menuOpen ? "sidebar-overlay show" : "sidebar-overlay"} onClick={() => setMenuOpen(false)} />

      <div className={menuOpen ? "sidebar-wrapper open" : "sidebar-wrapper"}>
        <Sidebar
          currentUser={currentUser}
          onLogout={onLogout}
          closeMenu={() => setMenuOpen(false)}
        />
      </div>

      <main className="main-content">
        <header className="topbar">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </button>
          <span>{currentUser.role} Account</span>
        </header>

        {children}
      </main>
    </div>
  );
}

export default function App() {
  const [users, setUsers] = useState(getUsers);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [tickets, setTickets] = useState(getTickets);

  function saveUsers(updatedUsers) {
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }

  function login(user) {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  function addTicket(ticket) {
    const updated = [...tickets, ticket];
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
  }

  function updateTicket(updatedTicket) {
    const updated = tickets.map((ticket) =>
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    );

    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
  }

  function changeStatus(ticketId, status) {
    const ticket = tickets.find((item) => item.id === ticketId);
    if (!ticket) return;

    updateTicket({
      ...ticket,
      status,
      activity: [
        ...(ticket.activity || []),
        {
          action: `Status changed to ${status}`,
          date: new Date().toLocaleString(),
          user: currentUser.name,
        },
      ],
    });
  }

  function addUser(user) {
    saveUsers([...users, user]);
  }

  function deleteUser(userId) {
    const updated = users.filter((user) => user.id !== userId);
    saveUsers(updated);
  }

  function updateUser(updatedUser) {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );

    saveUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  }

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <AppLayout currentUser={currentUser} onLogout={logout}>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              currentUser={currentUser}
              tickets={tickets}
            />
          }
        />

        <Route
          path="/tickets"
          element={
            <ProtectedRoute currentUser={currentUser} adminOnly>
              <AllTickets
                tickets={tickets}
                onStatusChange={changeStatus}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets/:ticketId"
          element={
            <TicketDetails
              tickets={tickets}
              currentUser={currentUser}
              onUpdateTicket={updateTicket}
            />
          }
        />

        <Route
          path="/my-tickets"
          element={
            <MyTickets
              tickets={tickets}
              currentUser={currentUser}
            />
          }
        />

        <Route
          path="/create-ticket"
          element={
            <CreateTicket
              currentUser={currentUser}
              onAddTicket={addTicket}
            />
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute currentUser={currentUser} adminOnly>
              <UserManagement
                users={users}
                onAddUser={addUser}
                onDeleteUser={deleteUser}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <Settings
              currentUser={currentUser}
              onUpdateUser={updateUser}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
