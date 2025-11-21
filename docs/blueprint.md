# **App Name**: TaskMaster Pro

## Core Features:

- Task Management: Create, update, view, and delete tasks with title, description, and creation timestamp.
- Task Filtering: Filter tasks by title or description using a search bar.
- Task Pagination: Display tasks in a paginated list (5 tasks per page) on both frontend and backend.
- Audit Logging: Automatically log all create, update, and delete actions with timestamps, action types, task IDs, and updated content, recording to a persistent database. Generates audit entries including old and new state of updated content. This tool can reason to decide when to save or incorporate updates to its database
- Audit Log Visualization: Display audit logs in a separate section with timestamp, action type, task ID, and updated content with color-coded action types.
- Basic Authentication: Secure all API routes with Basic Authentication using static credentials (username: admin, password: password123).
- Input Sanitization: Sanitize user inputs on both frontend and backend to prevent XSS attacks.

## Style Guidelines:

- Primary color: Deep indigo (#4B0082), chosen to evoke feelings of competence, polish, and expertise
- Background color: Very light gray (#F0F0F0), of similar hue to the primary color, for high readability
- Accent color: Lavender (#E6E6FA), approximately 30 degrees 'left' of indigo, for good visual contrast in key interface elements
- Body and headline font: 'Inter', a sans-serif known for its clean readability, will suit both headline and body text, creating a simple and unified feel
- Use simple, professional icons for task actions (edit, delete) and navigation items (Tasks, Audit Logs).
- Left Sidebar: Static navigation for Tasks and Audit Logs. Top Header Bar: Application title or logo. Main Area: Displays a table of tasks.
- Subtle animations for CRUD operations (e.g., fade-in for new tasks, slide-out for deleted tasks).