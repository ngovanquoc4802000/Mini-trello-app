## Mini Trello App

A Trello-style task management application with core features:

- 🧩 Create boards
- 📋 Create lists
- 📝 Create cards/tasks
- 👥 Invite members to join boards

## ⚙️ System Requirements
Before you begin, ensure you have these set up:
- Firebase Authentication integration
- Node.js v16 or higher
- MySQL running locally
- Firebase Project + Admin SDK (Service Account)

## Backend:
    - Step 1: Navigate to the backend directory and install dependencies: 
    > Navigate to the backend directory and install the required packages: cd backend -> npm installs
    
    - Step 2: Create a .env file using values from the Firebase Service Account JSON. Account JSON
    
    - Step 3: Set up Firebase Admin SDK (Service Account):
    
      + Go to https://console.firebase.google.com

      + Select your existing project or create a new one

      + Navigate to Project Settings > Service accounts > Click "Generate new private key"

      + Firebase will download a .json file → rename it to firebaseAdmin.json
     
      + Move this file to the backend/config directory

      + Copy the contents of the JSON file into your .env file according to the example provided - Bước 4: Chạy backend + cd backend -> npm run serve
    - Step 4: Start the backend server:
       + cd backend > npm run serve
## Frontend:
     - Step 1: Setting and run frontend (Vite + React + Typescript)
       + cd app-frontend
       + npm install
       + npm run dev

## Dev Note

✅ Firebase Admin SDK is configured in backend/config/firebaseAdmin.js

✅ .env uses values extracted from the Firebase Service Account JSON

✅ Follows MVC architecture:

controllers/: handle business logic

routers/: define RESTful API routes like /boards, /cards, /tasks, etc.

✅ Backend uses Express.js + Sequelize for MySQL integration

✅ Frontend built with React + Vite + TypeScript

✅ Tailwind CSS is used for styling (you can switch to CSS Modules if preferred)

✅ State is managed using React state and react-query

## Implemented Features:
 
## Frontend:
✅ Responsive Design: Boards, cards, and tasks are designed to provide a great user experience across various screen sizes (mobile, tablet, desktop).

✅ Authentication UI: Complete user interface for both login and authentication pages.

✅ Board Management: Users can create, edit, and view individual board details.

✅ Card Management: Displays lists of cards and allows users to create new cards.

✅ Task Details: Users can view individual task details, add descriptions, and leave comments.
## Backend:
✅ Full CRUD Functionality: Complete Create, Read, Update, and Delete operations for boards, cards, and tasks.

Note: Advanced features like GitHub OAuth integration and invite functionalities are planned for future development.
## Do not commit the .env file or any .json files containing sensitive information to GitHub.

## Sample .env file (place it inside the backend/config directory)

## Useful Links

## GitHub repository: `https://github.com/ngovanquoc4802000/Mini-trello-app`

## Project management Trello board : `Trello.com(https://trello.com/b/tzToe2HL/challenge-5daysa)`
