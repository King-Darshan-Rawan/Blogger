

# 📝 Full Stack Blog Editor with Auto-Save Draft Feature

## 🚀 Introduction

This project is a **Full Stack Blog Editor Application** built to showcase strong frontend and backend integration, complete CRUD functionality, and smart UX features like **auto-save**. The goal is to provide a seamless experience for writers to create, save drafts, edit, and publish blogs, while ensuring their progress is preserved automatically.

The application is built using:

* **Frontend**: React.js
* **Backend**: Node.js with Express.js
* **Database**: MongoDB (NoSQL)
* **Optional Enhancements**: Auto-save with debounce logic, toast notifications, JWT authentication

---

## 🎯 Key Features

### ✍️ Blog Editor Page

* **Title Input**: A simple text field for the blog title.
* **Content Editor**: A rich text editor for writing content.
* **Tags Field**: Comma-separated tags to categorize the blog.
* **Save as Draft**: Explicit button to save a blog in draft state.
* **Publish**: Button to mark a blog as published.
* **Auto-Save**: Saves automatically every 30 seconds or after 5 seconds of typing inactivity.

### 📄 Blog Listing

* Lists all blogs, grouped by:

  * **Published Blogs**
  * **Drafts**
* Each entry shows title, timestamp, and allows for **editing**.

### ✏️ Edit & Update

* Drafts and published posts can be reopened in the editor.
* Changes are saved automatically and can be published or updated.

### 🔄 Auto-Save Logic

* Drafts are auto-saved using a **debounced save**:

  * If the user stops typing for 5 seconds, a save is triggered.
  * A backup save is also run every 30 seconds.

### 🔐 (Bonus) Authentication

* JWT-based authentication implemented for protected routes like saving/publishing blogs.

### 🔔 (Bonus) Notifications

* Users are notified via toast messages:

  * On auto-save
  * On successful publish
  * On errors or connection failures

---

## 🏗️ System Architecture

```
[ User (Browser) ]
        |
        v
[ Frontend (React.js SPA) ]
        |
 REST API Calls (HTTP)
        |
        v
[ Backend (Express.js API Server) ]
        |
        v
[ MongoDB (Database) ]
```

---

## 🧰 Technology Stack

| Layer                     | Technology                         |
| ------------------------- | ---------------------------------- |
| Frontend                  | React.js, Axios, Toastify          |
| Backend                   | Node.js, Express.js                |
| Database                  | MongoDB with Mongoose              |
| Authentication (Optional) | JWT                                |
| Editor                    | React-Quill (or Textarea fallback) |
| Notifications             | React-Toastify                     |

---

## 📦 Backend Implementation

### Schema Definition

```js
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
```

### API Endpoints

| Method | Endpoint                | Function              |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/blogs/save-draft` | Save or update draft  |
| POST   | `/api/blogs/publish`    | Save and publish post |
| GET    | `/api/blogs`            | Get all blogs         |
| GET    | `/api/blogs/:id`        | Get blog by ID        |

Each API includes:

* **Input validation**
* **Error handling**
* **Status-based response codes**
* (Optional) **JWT token check**

---

## 🖥️ Frontend Implementation

### Editor Page

* Built using React.js with functional components and hooks.
* Uses `React-Quill` as a rich-text editor.
* All fields are managed via local state.
* Auto-save logic uses:

  * A `setTimeout` debounce
  * A `setInterval` backup every 30s

### Blog List Page

* Blogs are fetched on load from `/api/blogs`.
* Separate sections render **Drafts** and **Published**.
* Clicking a blog opens it in the editor for updates.

### Toast Notifications

* Using `react-toastify` to show:

  * "Auto-saved at \[time]"
  * "Blog published successfully"
  * "Error saving draft" etc.

---

## 🔄 Auto-Save Draft – Logic Explained

### Debounce-Based Save

```js
useEffect(() => {
  if (title || content) {
    const timer = setTimeout(() => {
      saveDraft();
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [title, content]);
```

### Interval-Based Save

```js
useEffect(() => {
  const interval = setInterval(() => {
    saveDraft();
  }, 30000);
  return () => clearInterval(interval);
}, []);
```

Both mechanisms ensure minimal data loss and user-friendly UX.

---

## ✅ Form Validation

* Empty title/content shows inline warnings.
* Tag field automatically trims and splits values.
* Publish is blocked if required fields are empty.

---

## 🔐 Bonus: JWT Authentication (Optional)

* Login endpoint provides a token.
* Save/publish APIs require `Authorization: Bearer <token>`.
* Token is stored in localStorage.
* Middleware protects the backend routes.

---

## 🧪 Testing

* **Manual Testing**:

  * Drafts auto-save correctly.
  * Reloading page retains last saved draft.
  * Published blogs are immutable until edited.
* **Backend Unit Tests**:

  * Blog model validations
  * Save & publish routes
* **API Testing Tools**: Postman & ThunderClient

---

## 🗂️ Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env
└── README.md
```

---

## 📋 README Overview

The GitHub repo includes a detailed README file with:

* **Tech stack**
* **Installation instructions**
* **Environment variables**
* **How to run client and server**
* **Screenshots (if available)**

---

## 📽️ (Optional) Demo Walkthrough

A recorded screen demo is provided (or linked in the README), explaining:

* How to write and save drafts
* How the auto-save works
* How blogs are published
* Editing workflows
* API behavior via network panel

---

## 🧹 Clean Code Practices

* Organized code structure
* Separated concerns: editor, listing, API calls
* Reusable components
* Consistent naming conventions
* Error handling both client and server side
* Use of async/await with proper try/catch blocks

---

## 📌 Learnings & Takeaways

This project demonstrates:

* Effective **state management** and **UX handling** in React
* Thoughtful **API design** with Mongoose + Express
* Reliable **auto-save strategies** using debounce + interval
* Cleanly managed CRUD operations
* Scalable structure for future enhancements (auth, comments, likes, etc.)

---

## 📎 Conclusion

The Blog Editor application effectively balances **performance**, **usability**, and **modularity**. With essential features like **drafts, publishing, and auto-save**, it offers a modern experience for writers and content creators.

---


## 🖥️ For the **Frontend** (e.g., in `vite-project` or similar folder)

```bash
cd vite-project
npm install
npm run dev
```

* `cd vite-project`: Go into the frontend folder.
* `npm install`: Installs all dependencies listed in `package.json`.
* `npm run dev`: Starts the Vite dev server (usually at `http://localhost:5173`).

---

## ⚙️ For the **Backend** (e.g., in `backend` or `server` folder)

```bash
cd backend
npm install
npm run dev
```

* `cd backend`: Go into the backend folder.
* `npm install`: Installs backend dependencies like Express, Mongoose, etc.
* `npm run dev`: Starts the backend server (usually on `http://localhost:5000` or similar).

> ⚠️ You can replace `npm run dev` with whatever script you're using (e.g., `node index.js` or `nodemon server.js`) — depends on your `package.json`.

---

## 🔐 Optional: Add `.env.example`

If your backend needs environment variables (e.g., for database, JWT keys), include a `.env.example` file to show users what they need to define.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---


## 🔗 Links

* **GitHub Repository**: [GitHub.com/YourUsername/BlogEditorApp](https://github.com/YourUsername/BlogEditorApp)
* **Live Demo** (if deployed): [https://blogeditor-app.vercel.app/](https://blogeditor-app.vercel.app/)
* **Walkthrough Video**: (https://drive.google.com/file/d/1GdRkE1YXhrer0DjmAAJ7cjDik1aM8TI9/view?usp=drive_link)(https://drive.google.com/file/d/1B5sMQiNzUmyJIaQwh0mxYrWG9IzdL3Qt/view?usp=drive_link)

