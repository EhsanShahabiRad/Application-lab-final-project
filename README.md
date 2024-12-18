1. Project Setup
Prerequisites
Make sure the following tools are installed on your machine:

Node.js (LTS version recommended)
npm (Node Package Manager)
MongoDB (Installed locally or on the cloud)
Git (Optional for cloning the repository)
MongoDB Compass (For database management, optional)
PayPal Developer Account (For testing payments)

2. Clone the Project
To clone the repository, run the following command in your terminal:
git clone https://github.com/EhsanShahabiRad/Application-lab-final-project.git
cd Application-lab-final-project

3. Backend Setup
Navigate to the Backend folder and follow these steps:

Install Dependencies
Run the following command to install all required backend dependencies:
cd Backend
npm install

Configure Environment Variables
Create a .env file inside the Backend folder and add the following environment variables:
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongodb://localhost:27017/ehsan-eshop
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET=your_paypal_secret_key
*****Replace the placeholders (your_jwt_secret_key, your_paypal_client_id, etc.) with the appropriate values.

Run the Backend Server
Start the backend server by running:
npm run dev

The backend server will start at:
http://localhost:3000

4. Frontend Setup
Navigate to the Frontend folder and follow these steps:

Install Dependencies
Run the following command to install all required frontend dependencies:
cd Frontend
npm install

Configure Environment Variables
Create a .env file inside the Frontend folder and add the following variable:
VITE_BASE_API_URL=http://localhost:3000/api
Make sure the backend server is running at this address.

Run the Frontend Server
Start the frontend development server with:
npm run dev

The frontend server will be available at:
http://localhost:5173

5. MongoDB Setup
Importing Database Backup
If you’re using MongoDB locally, follow these steps to restore the provided database dump:

Download the DB folder from the project.

Run the following command in your terminal to import the database:
mongorestore --db ehsan-eshop /path-to-project/DB/ehsan-eshop
*****Replace the placeholders (/path-to-project) with the appropriate path.
Verify the database is restored using MongoDB Compass or mongosh shell.

6. Running the Application
Ensure both backend and frontend servers are running:

Backend: http://localhost:3000
Frontend: http://localhost:5173
Open the frontend URL in your browser (http://localhost:5173) to interact with the application.

7. Log in to website
 use predifined username and password to login to the application
use Username: admin  and Password: admin to access admin-panel
use Username: user  and Password: user to access application as a normal user

8. Folder Structure

E-Shop/
│
├── Backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── .env
│   ├── main.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.vue
│   ├── .env
│   └── package.json
│
└── DB/           <-- MongoDB backup folder

9. Troubleshooting
Backend doesn’t start: Ensure MongoDB is running and the .env file is properly configured.
Frontend API errors: Verify the VITE_BASE_API_URL in Frontend/.env matches the backend URL.
PayPal Issues: Check PayPal sandbox credentials in the backend .env file.

10. Credits
This project is built by Ehsan Shahabirad.
Technologies used:

Vue.js (Frontend)
Node.js and Express (Backend)
MongoDB (Database)
PayPal Sandbox (Payments)
