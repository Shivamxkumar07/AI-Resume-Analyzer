# AI Resume Analyzer

An intelligent resume analysis tool that uses machine learning to evaluate and provide insights on resumes. The application consists of a React frontend, Node.js backend, and Python ML backend for processing and analyzing resume data.

## Features

- Upload and analyze resumes
- AI-powered insights and scoring
- Job matching recommendations
- User dashboard for tracking analyses
- Secure file handling

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **ML Backend**: Python with Flask
- **Database**: MongoDB (assumed from models/Analysis.js)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Shivamxkumar07/Resume_Analyzer.git
   cd AI-Resume-Analyzer-Project
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Install ML backend dependencies:
   ```bash
   cd ../ml-backend
   pip install -r requirements.txt
   ```

5. Set up environment variables:
   - Copy `.env` files in backend and frontend directories
   - Configure MongoDB connection, API keys, etc.

## Usage

1. Start the ML backend:
   ```bash
   cd ml-backend
   python app.py
   ```

2. Start the Node.js backend:
   ```bash
   cd backend
   npm start
   ```

3. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

4. Open your browser to `http://localhost:5173` (or the configured port)

## API Endpoints

- `POST /api/analyze` - Upload and analyze a resume
- `GET /api/jobs` - Get job listings
- `GET /api/dashboard` - Get user dashboard data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.