# Vercel Deployment Guide

## Prerequisites
1. Make sure you have a Vercel account
2. Install Vercel CLI: `npm i -g vercel`
3. Ensure your database (Neon PostgreSQL) is accessible from Vercel

## Environment Variables Setup

Before deploying, you need to set up these environment variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:

```
DATABASE_URL=your_neon_database_connection_string
NODE_ENV=production
```

## Deployment Steps

### Option 1: Using Vercel CLI (Recommended)

1. Navigate to your backend directory:
   ```bash
   cd backend
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Link to existing project or create new
   - Set project name
   - Confirm deployment

### Option 2: Using GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push

## Project Structure for Vercel

```
backend/
├── api/
│   └── index.js          # Vercel entry point
├── config/
│   └── database.js       # Database configuration
├── controllers/
│   └── schoolController.js
├── routes/
│   └── schoolRoute.js
├── server.js             # Main Express app
├── vercel.json           # Vercel configuration
└── package.json
```

## Important Notes

1. **Database Connection**: Ensure your Neon database allows connections from Vercel's IP ranges
2. **CORS**: Update the `allowedOrigins` in `server.js` with your actual frontend domain
3. **Environment**: The app automatically detects if it's running on Vercel vs local development

## Testing Deployment

After deployment, test these endpoints:

- `GET /` - Basic API status
- `GET /health` - Health check
- `GET /db-test` - Database connection test
- Your school routes (e.g., `/schools`)

## Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Check if `DATABASE_URL` is set in Vercel
   - Ensure Neon database allows external connections
   - Check if database is running

2. **CORS Errors**
   - Update `allowedOrigins` in `server.js`
   - Make sure your frontend domain is included

3. **Build Failures**
   - Check if all dependencies are in `package.json`
   - Ensure `main` field points to correct file

### Local Development vs Production

- **Local**: Server runs on port 3000 with full logging
- **Vercel**: Serverless functions with minimal logging

## Updating CORS Origins

After deploying your frontend, update the `allowedOrigins` array in `server.js`:

```javascript
const allowedOrigins = [
  "https://your-backend.vercel.app",
  "https://your-frontend.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173"
];
```

## Performance Optimization

- Vercel automatically optimizes your serverless functions
- Database connections are managed per request
- Consider connection pooling for high-traffic applications
