# School Management API Backend

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the backend directory with:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/school_management
   PORT=3000
   NODE_ENV=development
   ```

3. **Database Setup**
   - Run the SQL commands in `database-setup.sql` to create the schools table
   - Make sure your PostgreSQL database is running and accessible

4. **Start the Server**
   ```bash
   npm run dev    # Development mode with nodemon
   npm start      # Production mode
   ```

## API Endpoints

### Schools

- **POST** `/addSchool` - Create a new school
  - Body: `{ name, address, city, state, contact, pictureUrl, email }`

- **GET** `/getAllSchools` - Get all schools

- **GET** `/search?q=query` - Search schools by name, address, city, or state

- **GET** `/school/:id` - Get a specific school by ID

## Database Schema

The `schools` table has the following structure:
- `id` - Auto-incrementing primary key
- `name` - School name (required)
- `address` - School address (required)
- `city` - City (required)
- `state` - State (required)
- `contact` - Contact number (required)
- `image` - Image URL (optional)
- `email_id` - Email address (required)
- `created_at` - Timestamp of creation

## Features

- ✅ Add new schools
- ✅ List all schools
- ✅ Search schools by multiple criteria
- ✅ Get school by ID
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ PostgreSQL database support
