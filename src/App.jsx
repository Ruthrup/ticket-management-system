
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
  EyeOff,
  Trash2,
  Activity,
  Paperclip,
  MessageSquare,
  Download,
} from "lucide-react";

import "./App.css";

// ==========================================
// ADMIN ACCOUNT
// ==========================================

const ADMIN_EMAIL = "ruthragena@gmail.com";
const INITIAL_ADMIN_PASSWORD = "Admin123!";

// ==========================================
// LOCAL STORAGE
// ==========================================

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function getUsers() {
  const savedUsers = readStorage("users", []);

  // Find the previous Admin account so its password can be kept.
  const existingAdmin =
    savedUsers.find(
      (user) =>
        user.id === "admin-001" ||
        user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
    ) ||
    savedUsers.find(
      (user) => user.role?.toLowerCase() === "admin"
    );

  const adminAccount = {
    id: "admin-001",
    name: existingAdmin?.name || "Ruth",
    email: ADMIN_EMAIL,
    password:
      existingAdmin?.password || INITIAL_ADMIN_PASSWORD,
    role: "Admin",
  };

  const otherUsers = savedUsers.filter(
    (user) =>
      user !== existingAdmin &&
      user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()
  );

  const updatedUsers = [adminAccount, ...otherUsers];

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  return updatedUsers;
}

function getTickets() {
  return readStorage("tickets", []);
}

function saveTickets(tickets) {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

// ==========================================
// LOGO COMPONENT
// ==========================================

function BrandLogo({ className = "" }) {
  return (
    <div className={`brand-logo ${className}`}>
      <div className="brand-logo-icon">
        <Ticket size={23} />
      </div>

      <span>TicketSystem</span>
    </div>
  );
}

// ==========================================
// FOOTER COMPONENT
// ==========================================

function SiteFooter({ className = "" }) {
  return (
    <footer className={`site-footer ${className}`}>
      <BrandLogo className="footer-brand" />

      <span>
        © {new Date().getFullYear()} TicketSystem.
        All rights reserved.
      </span>

      <span>Support that keeps you moving.</span>
    </footer>
  );
}

// ==========================================
// SIDEBAR
// ==========================================

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
      name: "Activity Timeline",
      path: "/activity",
      icon: Activity,
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
        <BrandLogo />

        <button
          type="button"
          className="close-menu"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          <X />
        </button>
      </div>

      <div className="user-info">
        <div className="user-avatar">
          {currentUser.name?.charAt(0).toUpperCase()}
        </div>

        <div className="user-info-text">
          <h4>{currentUser.name}</h4>
          <span>{currentUser.role}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="nav-section-title">MAIN MENU</span>

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

      <div className="sidebar-bottom">
        <div className="sidebar-help">
          <MessageSquare size={19} />

          <div>
            <strong>Need help?</strong>
            <p>Manage your support requests here.</p>
          </div>
        </div>

        <button
          type="button"
          className="logout-btn"
          onClick={onLogout}
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}

// ==========================================
// LOGIN PAGE - TWO SIDES
// ==========================================

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const users = readStorage("users", []);

    const foundUser = users.find(
      (user) =>
        user.email?.trim().toLowerCase() ===
        email.trim().toLowerCase() &&
        user.password === password
    );

    if (!foundUser) {
      setError("Incorrect email or password.");
      return;
    }

    setError("");
    onLogin(foundUser);
  }

  return (
    <div className="login-page-layout">
      {/* LEFT SIDE */}

      <section className="login-promo">
        <BrandLogo className="promo-brand" />

        <div className="promo-content">
          <span className="promo-label">
            SUPPORT MANAGEMENT PLATFORM
          </span>

          <h1>
            Your Support,
            <br />
            Made Simple.
          </h1>

          <h3>
            Every request matters. Every solution starts here.
          </h3>

          <p>
            Create tickets, track progress, and stay connected
            with your support team — all in one place.
          </p>

          <div className="promo-features">
            <div>
              <Ticket size={19} />
              <span>Easy ticket creation</span>
            </div>

            <div>
              <Activity size={19} />
              <span>Track ticket progress</span>
            </div>

            <div>
              <Users size={19} />
              <span>Simple team management</span>
            </div>
          </div>
        </div>

        <p className="promo-footer">
          Your requests. Your progress. Your solutions.
        </p>
      </section>

      {/* RIGHT SIDE */}

      <section className="login-form-side">
        <form
          className="auth-card login-form-card"
          onSubmit={handleSubmit}
        >
          <span className="form-welcome-label">
            WELCOME BACK
          </span>

          <h2>Welcome Back!</h2>

          <p className="login-subtitle">
            Log in to continue your journey.
          </p>

          {error && (
            <p className="error-message">{error}</p>
          )}

          <label htmlFor="login-email">
            Email Address
          </label>

          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="login-password">
            Password
          </label>

          <div className="password-field">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <button type="submit" className="auth-submit">
            Login to Your Account
          </button>

          <p className="auth-form-footer">
            New to our platform?{" "}
            <NavLink to="/register">
              Create Your Account
            </NavLink>
          </p>

          <div className="login-security-note">
            Secure account access <span>•</span> TicketSystem
          </div>
        </form>
      </section>

      <SiteFooter className="login-site-footer" />
    </div>
  );
}

// ==========================================
// REGISTER PAGE
// ==========================================

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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

    const users = readStorage("users", []);

    const exists = users.some(
      (user) =>
        user.email?.toLowerCase() ===
        email.trim().toLowerCase()
    );

    if (exists) {
      setError("This email is already registered.");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
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
      <form
        className="auth-card register-card"
        onSubmit={handleSubmit}
      >
        <BrandLogo className="register-brand" />

        <h1>Create Your Account</h1>

        <p className="auth-description">
          Join us to create support requests, follow updates,
          and get help whenever you need it.
        </p>

        {error && (
          <p className="error-message">{error}</p>
        )}

        <label htmlFor="register-name">Full Name</label>

        <input
          id="register-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          required
        />

        <label htmlFor="register-email">Email Address</label>

        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoComplete="username"
          required
        />

        <label htmlFor="register-password">Password</label>

        <div className="password-field">
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            required
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <label htmlFor="confirm-password">
          Confirm Password
        </label>

        <div className="password-field">
          <input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            autoComplete="new-password"
            required
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            aria-label={
              showConfirmPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <button type="submit" className="auth-submit">
          Create Account
        </button>

        <p className="auth-form-footer">
          Already have an account?{" "}
          <NavLink to="/login">Login</NavLink>
        </p>
      </form>

      <SiteFooter className="auth-site-footer" />
    </div>
  );
}

// ==========================================
// TICKET TABLE
// ==========================================

function TicketTable({
  tickets,
  isAdmin,
  onStatusChange,
}) {
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

              {isAdmin && (
                <td>{ticket.createdByName || "Unknown"}</td>
              )}

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

// ==========================================
// DASHBOARD
// ==========================================

function Dashboard({ currentUser, tickets }) {
  const visibleTickets =
    currentUser.role === "Admin"
      ? tickets
      : tickets.filter(
        (ticket) => ticket.createdBy === currentUser.id
      );

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
      <div className="dashboard-heading">
        <div>
          <span className="page-eyebrow">OVERVIEW</span>
          <h1>{currentUser.role} Dashboard</h1>
          <p>Welcome back, {currentUser.name}.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">
            <Ticket size={21} />
          </div>
          <h3>Total Tickets</h3>
          <h2>{visibleTickets.length}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <Activity size={21} />
          </div>
          <h3>Open Tickets</h3>
          <h2>{open}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            <SettingsIcon size={21} />
          </div>
          <h3>In Progress</h3>
          <h2>{progress}</h2>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            <Users size={21} />
          </div>
          <h3>Resolved Tickets</h3>
          <h2>{resolved}</h2>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <h2>Recent Tickets</h2>
          <p>Latest support requests in your system.</p>
        </div>

        {currentUser.role === "Admin" && (
          <NavLink className="text-link" to="/tickets">
            View all tickets
          </NavLink>
        )}
      </div>

      <TicketTable
        tickets={[...visibleTickets].slice(-5).reverse()}
        isAdmin={currentUser.role === "Admin"}
      />
    </div>
  );
}

// ==========================================
// ALL TICKETS
// ==========================================

function AllTickets({ tickets, onStatusChange }) {
  return (
    <div className="page-content">
      <span className="page-eyebrow">MANAGEMENT</span>
      <h1>All Tickets</h1>
      <p>View and update all support tickets.</p>

      <TicketTable
        tickets={tickets}
        isAdmin={true}
        onStatusChange={onStatusChange}
      />
    </div>
  );
}

// ==========================================
// MY TICKETS
// ==========================================

function MyTickets({ tickets, currentUser }) {
  const myTickets = tickets.filter(
    (ticket) => ticket.createdBy === currentUser.id
  );

  return (
    <div className="page-content">
      <span className="page-eyebrow">YOUR REQUESTS</span>
      <h1>My Tickets</h1>
      <p>View the support tickets you have created.</p>

      <TicketTable
        tickets={myTickets}
        isAdmin={false}
      />
    </div>
  );
}

// ==========================================
// CREATE TICKET
// ==========================================

function CreateTicket({ currentUser, onAddTicket }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit(e) {
    e.preventDefault();

    const newTicket = {
      id: `TK-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
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
      <span className="page-eyebrow">SUPPORT REQUEST</span>
      <h1>Create Ticket</h1>
      <p>Tell us what you need help with.</p>

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

// ==========================================
// FILE READER
// ==========================================

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () =>
      reject(new Error("Could not read file."));

    reader.readAsDataURL(file);
  });
}

// ==========================================
// TICKET DETAILS
// ==========================================

function TicketDetails({
  tickets,
  currentUser,
  onUpdateTicket,
}) {
  const { ticketId } = useParams();

  const ticket = tickets.find(
    (item) => item.id === ticketId
  );

  const [comment, setComment] = useState("");
  const [fileError, setFileError] = useState("");

  const canView =
    ticket &&
    (currentUser.role === "Admin" ||
      ticket.createdBy === currentUser.id);

  if (!canView) {
    return (
      <div className="page-content">
        <h1>Access Denied</h1>
        <p>Ticket not found or you do not have permission to view it.</p>
      </div>
    );
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
          text: comment.trim(),
          date: new Date().toLocaleString(),
        },
      ],
      activity: [
        ...(ticket.activity || []),
        {
          action: "Comment added",
          date: new Date().toLocaleString(),
          user: currentUser.name,
        },
      ],
    };

    onUpdateTicket(updatedTicket);
    setComment("");
  }

  async function handleFileUpload(e) {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    setFileError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    const validFiles = [];
    const errors = [];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: File type not supported.`);
        continue;
      }

      if (file.size > 2 * 1024 * 1024) {
        errors.push(`${file.name}: File must be under 2 MB.`);
        continue;
      }

      validFiles.push(file);
    }

    if (errors.length) {
      setFileError(errors.join(" "));
    }

    try {
      const uploadedFiles = await Promise.all(
        validFiles.map(async (file, index) => ({
          id: `${Date.now()}-${index}`,
          name: file.name,
          type: file.type,
          size: file.size,
          data: await readFileAsDataURL(file),
          uploadedBy: currentUser.name,
        }))
      );

      if (uploadedFiles.length) {
        const updatedTicket = {
          ...ticket,
          attachments: [
            ...(ticket.attachments || []),
            ...uploadedFiles,
          ],
          activity: [
            ...(ticket.activity || []),
            {
              action: "File attached",
              date: new Date().toLocaleString(),
              user: currentUser.name,
            },
          ],
        };

        onUpdateTicket(updatedTicket);
      }
    } catch {
      setFileError("One or more files could not be uploaded.");
    }

    e.target.value = "";
  }

  function removeAttachment(attachmentId) {
    const updatedTicket = {
      ...ticket,
      attachments: (ticket.attachments || []).filter(
        (file) => file.id !== attachmentId
      ),
    };

    onUpdateTicket(updatedTicket);
  }

  return (
    <div className="page-content">
      <span className="page-eyebrow">TICKET DETAILS</span>
      <h1>{ticket.title}</h1>
      <p>{ticket.description}</p>

      <div className="ticket-details-card">
        <p><strong>Ticket ID:</strong> {ticket.id}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>
        <p><strong>Created By:</strong> {ticket.createdByName}</p>
        <p><strong>Created At:</strong> {ticket.createdAt}</p>
      </div>

      <h2>
        <MessageSquare size={19} /> Comments
      </h2>

      <div className="comments-list">
        {(ticket.comments || []).map((item, index) => (
          <div className="comment-item" key={index}>
            <strong>{item.author}</strong>
            <p>{item.text}</p>
            <small>{item.date}</small>
          </div>
        ))}
      </div>

      <form className="ticket-form comment-form" onSubmit={addComment}>
        <label>Add a comment</label>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          required
        />

        <button type="submit">Add Comment</button>
      </form>

      <h2>
        <Paperclip size={19} /> Attachments
      </h2>

      <div className="ticket-form">
        <label>Upload a file (maximum 2 MB)</label>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.txt"
          multiple
          onChange={handleFileUpload}
        />

        {fileError && (
          <p className="error-message">{fileError}</p>
        )}
      </div>

      <div className="attachments-list">
        {(ticket.attachments || []).map((file) => (
          <div className="attachment-item" key={file.id}>
            <span>{file.name}</span>

            <a
              href={file.data}
              download={file.name}
              aria-label={`Download ${file.name}`}
            >
              <Download size={18} />
            </a>

            <button
              type="button"
              onClick={() => removeAttachment(file.id)}
              aria-label={`Remove ${file.name}`}
            >
              <Trash2 size={17} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// ACTIVITY TIMELINE
// ==========================================

function ActivityTimeline({ tickets, currentUser }) {
  const visibleTickets =
    currentUser.role === "Admin"
      ? tickets
      : tickets.filter(
        (ticket) => ticket.createdBy === currentUser.id
      );

  const activities = visibleTickets
    .flatMap((ticket) =>
      (ticket.activity || []).map((item, index) => ({
        ...item,
        ticketTitle: ticket.title,
        id: `${ticket.id}-${index}`,
      }))
    )
    .reverse();

  return (
    <div className="page-content">
      <span className="page-eyebrow">RECENT UPDATES</span>
      <h1>Activity Timeline</h1>
      <p>See recent actions on your tickets.</p>

      {activities.length === 0 ? (
        <p>No activity yet.</p>
      ) : (
        <div className="activity-list">
          {activities.map((item) => (
            <div className="comment-item" key={item.id}>
              <strong>{item.action}</strong>
              <p>{item.ticketTitle}</p>
              <small>
                {item.user} · {item.date}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// USER MANAGEMENT
// ==========================================

function UserManagement({
  users,
  currentUser,
  onAddUser,
  onDeleteUser,
}) {
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

    const exists = users.some(
      (user) =>
        user.email.toLowerCase() ===
        email.trim().toLowerCase()
    );

    if (exists) {
      setError("This email is already registered.");
      return;
    }

    onAddUser({
      id: Date.now().toString(),
      name: name.trim(),
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
      <span className="page-eyebrow">ADMINISTRATION</span>
      <h1>User Management</h1>
      <p>Manage accounts and user roles.</p>

      <form className="ticket-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
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

        <label>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit">Add User</button>
      </form>

      <div className="section-heading">
        <div>
          <h2>Registered Accounts</h2>
          <p>All accounts in the system.</p>
        </div>
      </div>

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
                  {user.id !== currentUser.id &&
                    user.id !== "admin-001" && (
                      <button
                        type="button"
                        className="icon-danger-button"
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

// ==========================================
// SETTINGS
// ==========================================

function Settings({ currentUser, onUpdateUser }) {
  const [name, setName] = useState(currentUser.name);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (password && password.length < 8) {
      setError("New password must have at least 8 characters.");
      setSuccess("");
      return;
    }

    const updatedUser = {
      ...currentUser,
      name: name.trim(),
      ...(password ? { password } : {}),
    };

    onUpdateUser(updatedUser);

    setPassword("");
    setError("");
    setSuccess("Your settings have been updated.");
  }

  return (
    <div className="page-content">
      <span className="page-eyebrow">ACCOUNT</span>
      <h1>Settings</h1>
      <p>Manage your account details.</p>

      <form className="ticket-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input value={currentUser.email} disabled />

        <label>Account Role</label>
        <input value={currentUser.role} disabled />

        <label>New Password</label>

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

// ==========================================
// PROTECTED ROUTES
// ==========================================

function ProtectedRoute({
  currentUser,
  adminOnly = false,
  children,
}) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && currentUser.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

// ==========================================
// MAIN APP LAYOUT
// ==========================================

function AppLayout({
  currentUser,
  onLogout,
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-layout">
      <div
        className={
          menuOpen
            ? "sidebar-overlay show"
            : "sidebar-overlay"
        }
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={
          menuOpen
            ? "sidebar-wrapper open"
            : "sidebar-wrapper"
        }
      >
        <Sidebar
          currentUser={currentUser}
          onLogout={onLogout}
          closeMenu={() => setMenuOpen(false)}
        />
      </div>

      <main className="main-content">
        <header className="topbar">
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <Menu />
          </button>

          <div className="topbar-user">
            <div className="topbar-avatar">
              {currentUser.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{currentUser.name}</strong>
              <span>{currentUser.role}</span>
            </div>
          </div>
        </header>

        <div className="main-page-area">
          {children}
        </div>

        <SiteFooter className="dashboard-footer" />
      </main>
    </div>
  );
}

// ==========================================
// MAIN APPLICATION
// ==========================================

export default function App() {
  const [users, setUsers] = useState(() => getUsers());

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = readStorage("currentUser", null);

    if (!savedUser) return null;

    const currentUsers = readStorage("users", []);

    const matchingUser =
      currentUsers.find((user) => user.id === savedUser.id) ||
      (savedUser.role === "Admin"
        ? currentUsers.find((user) => user.role === "Admin")
        : currentUsers.find(
          (user) =>
            user.email?.toLowerCase() ===
            savedUser.email?.toLowerCase()
        ));

    if (matchingUser) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(matchingUser)
      );

      return matchingUser;
    }

    localStorage.removeItem("currentUser");
    return null;
  });

  const [tickets, setTickets] = useState(() => getTickets());

  function saveUsers(updatedUsers) {
    setUsers(updatedUsers);

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );
  }

  function login(user) {
    setCurrentUser(user);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  function addTicket(ticket) {
    const updatedTickets = [...tickets, ticket];

    setTickets(updatedTickets);
    saveTickets(updatedTickets);
  }

  function updateTicket(updatedTicket) {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === updatedTicket.id
        ? updatedTicket
        : ticket
    );

    setTickets(updatedTickets);
    saveTickets(updatedTickets);
  }

  function changeStatus(ticketId, status) {
    const ticket = tickets.find(
      (item) => item.id === ticketId
    );

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
    const updatedUsers = users.filter(
      (user) => user.id !== userId
    );

    saveUsers(updatedUsers);
  }

  function updateUser(updatedUser) {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id
        ? updatedUser
        : user
    );

    saveUsers(updatedUsers);
    setCurrentUser(updatedUser);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );
  }

  if (!currentUser) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={login} />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    );
  }

  return (
    <AppLayout
      currentUser={currentUser}
      onLogout={logout}
    >
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
            <ProtectedRoute
              currentUser={currentUser}
              adminOnly
            >
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
          path="/activity"
          element={
            <ActivityTimeline
              tickets={tickets}
              currentUser={currentUser}
            />
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute
              currentUser={currentUser}
              adminOnly
            >
              <UserManagement
                users={users}
                currentUser={currentUser}
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

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </AppLayout>
  );
}
