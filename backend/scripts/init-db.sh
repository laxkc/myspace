#!/bin/bash

echo "⏳ Copying schema.sql into container..."
docker cp schema.sql postgres_sql:/schema.sql

echo "⚙️  Running schema.sql inside container..."
docker exec -it postgres_sql psql -U laxmankc -d myapp -f /schema.sql

echo "✅ Database schema loaded successfully!"
