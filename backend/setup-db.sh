#!/bin/bash

# Quick Database Setup for AWS RDS
# Run this script to set up your database in one command

echo "🗄️  Setting up database..."

# Create database if it doesn't exist
psql "postgresql://laxmankc:0tiR69pniILlQ1N8Z@myspace.c5m2kawe8zek.us-east-1.rds.amazonaws.com:5432/postgres?sslmode=require" -c "CREATE DATABASE myspace;" 2>/dev/null || echo "Database already exists"

# Apply schema
psql "postgresql://laxmankc:0tiR69pniILlQ1N8Z@myspace.c5m2kawe8zek.us-east-1.rds.amazonaws.com:5432/myspace?sslmode=require" -f schema.sql

# Verify tables
echo "✅ Database setup complete!"
echo "📋 Tables created:"
psql "postgresql://laxmankc:0tiR69pniILlQ1N8Z@myspace.c5m2kawe8zek.us-east-1.rds.amazonaws.com:5432/myspace?sslmode=require" -c "\dt" 