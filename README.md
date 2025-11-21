# 🐝 **TASK HIVE PRO**

# Task Hive Pro 🐝

A full-stack Task Manager Dashboard with CRUD operations, filtering, pagination, and real-time Audit Logs — built to demonstrate professional frontend, backend, database, and security skills.

---

## 🚀 Overview

**Task Hive Pro** is a complete full-stack application designed as an assessment of full-stack engineering skills.
It includes:

* 🖥️ **Frontend** — responsive dashboard UI
* ⚙️ **Backend** — REST API with modular routing & controllers
* 🗂️ **Database** — tasks & audit logs
* 🔐 **Security** — Basic Auth + input validation
* 📊 **Audit Logs** — detailed history of create/update/delete actions

This project mimics a **real-world system** with clean architecture, validation, authentication, and a professional UI.

---

## 🎯 Features

### 📝 Task Management

* Create, edit, delete tasks
* View task list (with pagination)
* Search + filter by title or description
* Responsive task table
* Modal/drawer for create/update

### 📜 Audit Logging

Automatically logs:

* **Create Task** → green
* **Update Task** → yellow
* **Delete Task** → red

Each log contains:

* Timestamp
* Action type
* Task ID
* Updated content

### 🔐 Basic Authentication

All API routes require:

```
Username: admin
Password: password123
```

### 🧹 Validation & Security

* Frontend + backend input validation
* Prevent empty title/description
* Length constraints
* Sanitization (XSS protection)
* No sensitive info exposed to the client

---

## 🏗️ Tech Stack

### **Frontend**

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Fully responsive UI

### **Backend**

* API Routes in Next.js
* Basic Authentication
* REST API architecture
* Modular folder structure

### **Database**

Choose based on implementation:

* SQLite / PostgreSQL / MongoDB / Local JSON storage

---

## 📂 Folder Structure

```
task-hive-pro/
│
├── src/
│   ├── app/                # Next.js routes & UI pages
│   ├── components/         # UI components
│   ├── lib/                # DB + utilities
│   ├── api/                # API endpoints
│
├── docs/                   # Documentation
├── data/                   # Local JSON DB (if used)
│
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

---

## 🔌 API Documentation

### **1. Get Tasks**

```
GET /api/tasks?search=&page=
```

### **2. Create Task**

```
POST /api/tasks
{
  "title": "New Task",
  "description": "Details"
}
```

### **3. Update Task**

```
PUT /api/tasks/:id
```

### **4. Delete Task**

```
DELETE /api/tasks/:id
```

### **5. Get Audit Logs**

```
GET /api/logs
```

All requests require Basic Auth.

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repo

```sh
git clone https://github.com/ax2dani/task-hive-pro
cd task-hive-pro
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Run the Development Server

```sh
npm run dev
```

### 4️⃣ Environment Variables (example)

```
DATABASE_URL=...
BASIC_AUTH_USER=admin
BASIC_AUTH_PASS=password123
```

---

## 🧪 Testing the API (Example cURL)

```sh
curl -u admin:password123 http://localhost:3000/api/tasks
```

---

## 🛡️ Security Notes

* All user input is validated & sanitized
* Error responses are safe & consistent
* Authentication required for every API call
* No sensitive data exposed on client

---

## 📸 Screenshots (Add Your Own)

(Replace placeholders with real images)

* **Dashboard View**
* **Create Task Modal**
* **Audit Logs View**
* **Mobile Responsive Layout**

---

## 📅 Project Goals

This project was built to demonstrate:

* Clean architecture
* UI/UX quality
* Backend design & routing
* Data modeling
* Auth + security
* Logging & traceability
* Frontend–backend integration
