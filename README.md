# 🛡️ ArmorIQ

**ArmorIQ** is an enterprise-ready AI Agent Platform that enables Large Language Models to securely interact with external tools through the **Model Context Protocol (MCP)**. Every AI action is governed by a policy engine, approval workflows, and audit logs to ensure transparent, secure, and controlled automation.

> Secure AI Agents • MCP Integration • Policy Enforcement • Human Approval Workflows

---

## ✨ Features

### 🤖 AI Agent
- Chat with an AI assistant powered by Gemini
- Tool-aware conversations
- Context-aware responses
- Secure execution pipeline

### 🔌 MCP (Model Context Protocol)
- Connect custom MCP servers
- Discover available tools dynamically
- Execute external tools securely
- Support for multiple MCP servers

### 🔒 Policy Engine
- Block sensitive tools
- Require human approval before execution
- Granular tool-level permissions
- Organization-ready security controls

### ✅ Approval Workflow
- Pending approval queue
- Approve or reject tool executions
- Human-in-the-loop AI automation

### 📊 Monitoring
- Tool execution history
- Audit logs
- Real-time execution status
- Error tracking

### 🗂 File Operations
Example MCP tools include:

- Read Files
- Write Files
- Search Files
- Delete Files
- List Directory
- Custom Tools

---

# 🏗 Architecture

```
                    +----------------------+
                    |     Next.js UI       |
                    +----------+-----------+
                               |
                               |
                    REST API / Chat
                               |
                               ▼
                   +-----------------------+
                   |  Express Backend API  |
                   +-----------+-----------+
                               |
                 +-------------+-------------+
                 |                           |
                 ▼                           ▼
        Policy Engine                Gemini AI
                 |
                 ▼
        Approval Service
                 |
                 ▼
          MCP Manager
                 |
     -------------------------
     |                       |
     ▼                       ▼
Custom MCP Server      External MCP Servers
```

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## AI

- Google Gemini API

## Infrastructure

- Docker
- Docker Compose

## Protocol

- Model Context Protocol (MCP)

---

# 📁 Project Structure

```text
ArmorIQ
│
├── apps
│   ├── frontend
│   ├── backend
│   └── custom-mcp-server
│
├── packages
│   ├── shared
│   ├── config
│   └── types
│
├── prisma
│
├── docker
│
└── README.md
```

---

# 🔐 Security Features

- Policy-based tool execution
- Human approval workflow
- Audit logging
- Secure MCP communication
- Tool access restrictions
- Execution monitoring

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/armoriq.git

cd armoriq
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file.

```env
DATABASE_URL=
GEMINI_API_KEY=
JWT_SECRET=
PORT=5000
```

---

## 4. Start Docker Services

```bash
docker compose up -d
```

---

## 5. Run Database Migrations

```bash
npx prisma migrate dev
```

---

## 6. Start Development Server

```bash
npm run dev
```

---

# 🚀 Available Scripts

```bash
npm run dev        # Start all applications
npm run build      # Build monorepo
npm run lint       # Lint project
npm run format     # Format code
npm run test       # Run tests
```

---

# 📸 Screenshots

Include screenshots for:

- Dashboard
- AI Chat Interface
- Tool Approval Panel
- MCP Server Management
- Audit Logs
- Policy Configuration

---

# 🚧 Roadmap

- Multi-agent collaboration
- Role-Based Access Control (RBAC)
- Streaming AI responses
- Plugin marketplace
- OAuth providers
- Tool analytics dashboard
- Multi-tenant support

---

# 🤝 Contributing

Contributions are welcome!

Fork the repository, create a feature branch, and submit a pull request.

For major changes, please open an issue first to discuss your proposal.

---

# 👨‍💻 Author

**Hardik Goel**

GitHub: https://github.com/hardik07777

Portfolio: https://portfolio-hardik07.vercel.app/

LinkedIn: https://linkedin.com/in/hardik-goel

---

# ⭐ Support

If you found ArmorIQ useful, consider giving the repository a ⭐ on GitHub.
