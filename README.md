# School Management API

A full-stack application for managing schools with proximity search functionality.

## Features

- **Add Schools**: Register new schools with location details (name, address, latitude, longitude)
- **Proximity Search**: Find schools near a specific location, sorted by distance
- **Real-time API Status**: Visual indicator showing backend connection status
- **Geolocation Support**: Use current location for proximity searches
- **Responsive Design**: Modern UI built with React and Tailwind CSS

## Project Structure

```
school-management-api/
├── backend/                 # Node.js/Express API server
│   ├── config/
│   │   └── database.js      # MySQL database configuration
│   ├── controllers/
│   │   ├── schoolController.js    # School CRUD operations
│   │   └── distanceController.js  # Distance calculation utilities
│   ├── routes/
│   │   └── schoolRoute.js   # API route definitions
│   ├── server.js            # Express server setup
│   └── package.json
└── frontend/                # React frontend application
    ├── src/
    │   ├── components/
    │   │   ├── add-school-form.jsx      # School registration form
    │   │   ├── proximity-search-form.jsx # Proximity search form
    │   │   ├── school-results.jsx        # Search results display
    │   │   ├── api-status.jsx            # API connection status
    │   │   └── ui/                       # Reusable UI components
    │   ├── services/
    │   │   └── api.js                    # API service functions
    │   └── App.jsx                       # Main application component
    └── package.json
```

## API Endpoints

### Backend Routes (http://localhost:3000)

- `GET /` - Test API connection
- `POST /addSchool` - Add a new school
- `GET /listSchools?latitude=X&longitude=Y` - Get schools sorted by proximity

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your database configuration:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   PORT=3000
   ```

4. Set up your MySQL database with the schools table:
   ```sql
   CREATE TABLE schools (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     address TEXT NOT NULL,
     latitude DECIMAL(10, 8) NOT NULL,
     longitude DECIMAL(11, 8) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

   The server will start on http://localhost:3000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will start on http://localhost:5173 (or another available port)

## Usage

1. **Adding a School**:
   - Fill in the school name, address, and coordinates
   - Click "Add School" to register the school in the database
   - Success/error messages will be displayed

2. **Finding Schools by Proximity**:
   - Enter your latitude and longitude coordinates
   - Or click "Use Current Location" to automatically detect your position
   - Click "Find Schools" to search for nearby schools
   - Results will be displayed sorted by distance (closest first)

3. **API Status**:
   - The status indicator in the header shows the connection status to the backend
   - Green: Connected
   - Red: Disconnected
   - Yellow: Checking connection

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Fetch API** - HTTP requests

## Error Handling

The application includes comprehensive error handling:
- Form validation for required fields
- API error messages display
- Network connection status monitoring
- Geolocation error handling
- Database error handling

## Development

- Backend runs on port 3000
- Frontend runs on port 5173 (Vite default)
- CORS is configured to allow frontend-backend communication
- Hot reloading enabled for both frontend and backend development

