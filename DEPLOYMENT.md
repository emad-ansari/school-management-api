# Deployment Guide for Render with NeonDB PostgreSQL

## Quick Setup: NeonDB PostgreSQL

### Step 1: Create NeonDB Database

1. **Go to [neon.tech](https://neon.tech)**
2. **Sign up for a free account**
3. **Create a new project**
4. **Copy your connection string** (it looks like: `postgresql://user:password@host/database`)

### Step 2: Set Environment Variables in Render

1. **Go to your Render Dashboard**
2. **Click on your backend service**
3. **Go to "Environment" tab**
4. **Add this environment variable:**
   ```
   DATABASE_URL=your-neon-connection-string-here
   NODE_ENV=production
   ```

### Step 3: Install Dependencies

Make sure your backend has the PostgreSQL driver:

```bash
cd backend
npm install pg
```

### Step 4: Database Setup

After connecting to your NeonDB database, run this SQL in the NeonDB SQL Editor:

```sql
-- Create the schools table for PostgreSQL
CREATE TABLE IF NOT EXISTS schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data (optional)
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Central High School', '123 Main Street, Downtown', 40.7128, -74.0060),
('North Elementary', '456 Oak Avenue, North District', 40.7589, -73.9851);
```

## Update Frontend API URL

Update your frontend API service to use your Render URL:

```javascript
// In frontend/src/services/api.js
const API_BASE_URL = 'https://your-app-name.onrender.com';
```

## Test Your Deployment

1. Visit your Render URL: `https://your-app-name.onrender.com`
2. You should see: `{"message":"School API is working!","environment":"production","database":"configured"}`
3. Test API endpoints: `https://your-app-name.onrender.com/addSchool`

## NeonDB Benefits

- **Free Tier**: 3 projects, 10GB storage, 100GB transfer
- **Serverless**: Auto-scales based on usage
- **PostgreSQL**: Full PostgreSQL compatibility
- **Easy Setup**: Simple connection string

## Troubleshooting

- **Database connection fails**: Make sure you've set the DATABASE_URL in Render
- **CORS errors**: The backend already has CORS configured
- **API not working**: Check that your frontend is using the correct Render URL
- **SSL errors**: NeonDB requires SSL in production (already configured)
