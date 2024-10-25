#ToDo-Web Project :    

    This is a full-stack web application that allows users to manage tasks and projects efficiently. 
    Built with a React frontend and an Express backend, the ToDo-Web app offers user authentication, 
    task management, and project categorization, enabling users to stay organized and prioritize tasks.
Features:
    
    User Authentication: Sign up and sign in with token-based authentication.
    Task Management: Add, delete, and categorize tasks.
    Project Management: Create projects and add tasks within projects.
    Automatic Date-Based Task Sorting: Tasks are sorted as overdue, today, and upcoming based on the due date.
    Settings: Update user details such as name, email, and password.
    Responsive Design: Optimized for both desktop and mobile use.
    
Technologies Used:

    Frontend: React, TypeScript, React Router
    Backend: Express, Node.js, MongoDB
    Styling: SCSS, Bootstrap
    Build Tools: Vite (for frontend), Node/NPM

Setup and Installation:

Clone the repository:

    git clone https://github.com/yourusername/ToDo-Web.git
    cd ToDo-Web
Backend Setup:

    cd backend
    npm install
    node index.js
Frontend Setup:

    cd frontend
    npm install
    npm run dev
Environment Variables:

    MONGO_URI= Your MongoDB URL
    PORT= Server Port
    JWT_SECRET=your_jwt_secret_key
    FRONTEND_URL= Your Frontend URL





