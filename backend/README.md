# Backend API - Node.js/Express/PostgreSQL

A robust REST API built with Node.js, Express, and PostgreSQL, hosted on AWS RDS.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- PostgreSQL client (`psql`)
- AWS RDS PostgreSQL instance

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure your database credentials:

```bash
cp .env.example .env
```

### Database Setup (One Command)

```bash
./scripts/setup-db.sh
```

This script will:

- Create the database if it doesn't exist
- Run the schema to create all tables
- Verify the setup

## 📊 Database Connection

### AWS RDS Details

- **Host:** `myspace.c5m2kawe8zek.us-east-1.rds.amazonaws.com`
- **Port:** `5432`
- **Database:** `myspace`
- **SSL:** Required

## 🗄️ Database Schema

### Tables

- `admin` - Admin users
- `contact_info` - Contact information
- `blogs` - Blog posts
- `tags` - Tags for blogs and projects
- `blog_tags` - Many-to-many relationship
- `projects` - Portfolio projects
- `project_tags` - Many-to-many relationship

### Schema File

```bash
# View schema
cat schema.sql

# Apply schema
psql "postgresql://..." -f schema.sql
```

## 🔧 Development

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

## 🔐 Security

### SSL Connection

AWS RDS requires SSL connections. Always use `sslmode=require` in connection strings.

### Environment Variables

- Never commit `.env` files to version control
- Use strong, unique passwords
- Rotate secrets regularly

### AWS RDS Security

- Configure Security Groups to allow your IP
- Use IAM authentication when possible
- Enable encryption at rest

## 📁 Project Structure

```
backend/
├── src/
│   ├── configs/          # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Express middlewares
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── utils/            # Utility functions
├── scripts/              # Database scripts
├── schema.sql           # Database schema
├── seed.sql             # Sample data
└── .env                 # Environment variables
```

## 🛠️ API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `POST /api/auth/refresh` - Refresh token

### Blogs

- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

### Projects

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tags

- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create tag

### Contact

- `POST /api/contact` - Submit contact form

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Failed

```bash
# Check if database exists
psql "postgresql://..." -c "\l"

# Check connection
psql "postgresql://..." -c "SELECT version();"
```

#### SSL Connection Error

- Ensure `sslmode=require` is in connection string
- Check AWS RDS SSL settings

#### Permission Denied 

- Verify username/password
- Check AWS Security Group settings
- Ensure IP is whitelisted

### Logs

```bash
# View application logs
tail -f combined.log

# View error logs
tail -f error.log
```

## 📝 License

MIT License - see LICENSE file for details.
