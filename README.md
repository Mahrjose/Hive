## Hive - A Simple Open Source Chat Application

**Hive** is a simple, open-source chat application built for real-time communication and community building. This project was developed as part of the CSE470 - Software Engineering course at BRAC University.

**Features:**

* **User Accounts:** Users can sign up and log in to access the chat platform.
* **Real-time Chat:** Send and receive messages with other users instantly using Socket.io.
* **Group Chats:** Create and participate in group chats for discussions with multiple users.
* **Notifications:** Receive notifications for new messages and activity.
* **Intuitive Interface:** The user interface is built with Chakra UI, providing a clean and modern experience.

**Technologies Used:**

* Frontend: React
* Backend: Node.js, Express (MERN Stack)
* Database: MongoDB, Mongoose
* Real-time Messaging: Socket.io
* UI Framework: Chakra UI

**Contributing:**

We welcome contributions to this project! Feel free to fork the repository, make changes, and submit a pull request.

I'd be glad to provide a comprehensive response incorporating the best aspects of the previous responses, addressing potential issues, and following the guidelines:

**Getting Started with Hive**

This guide outlines the steps to set up and run the Hive chat application locally on your development machine.

**Prerequisites:**

- Node.js (version 14 or later): [https://nodejs.org/en](https://nodejs.org/en)
- npm (Node Package Manager): Comes bundled with Node.js installation

**Installation:**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/mahrjose/hive.git
   cd hive
   ```

2. **Install Dependencies:**

   - Install dependencies for backend:

     ```bash
     npm install
     ```
   - Install dependencies for frontend:

     ```bash
     cd frontend
     npm install
     ```

   - If encountering peer dependency conflicts, use `npm install --legacy-peer-deps` as a temporary workaround. However, it's generally better to address compatibility issues by updating dependencies to work together. Refer to the official npm documentation for more details on peer dependencies: [https://nodejs.org/en/blog/npm/peer-dependencies](https://nodejs.org/en/blog/npm/peer-dependencies)

**Building the Frontend:**

1. **Build the Frontend Application:**

   ```bash
   cd frontend
   npm run build
   ```

   This command creates an optimized production build of the frontend code.

**Starting the Application:**

1. **Return to the Project Root Directory:**

   ```bash
   cd ..  # Navigate back to the root directory of the project
   ```

2. **Start the Backend Server:**

   ```bash
   npm start
   ```

   This command starts the Node.js server that powers the backend functionality of the Hive application.

**Running the Application:**

Once the backend server is running (usually on port 5000 by default), you can access the Hive chat application in your web browser by visiting:

```
http://localhost:5000
```

**Notes:**

- Change the origin URL in [server.js](./backend/server.js) and ENDPOINT url in [SingleChat.js](./frontend/src/components/SingleChat.js) to `http://localhost:3000` if you're running the application locally. This step is crucial for enabling CORS (Cross-Origin Resource Sharing) and allowing the frontend to communicate with the backend server.

- A `backend/.env` file is needed with the `MONGO_URI`, `PORT`, `JWT_SECRET`, `NODE_VERSION` and `NODE_ENV` (optional) variables. The MONGO_URI should be a connection string to your MongoDB database, the PORT should be the port number for the backend server, and the JWT_SECRET should be a secret key for JSON Web Token (JWT) authentication. Here's an example of the `.env` file:
```bash
   MONGO_URI=mongodb+srv://<DB_username>:<DB_password>@<applicationName>.wt9mah7.mongodb.net/?retryWrites=true&w=majority&appName=<applicationName>
   PORT=5000
   JWT_SECRET=secret
   NODE_VERSION = 21.7.3
   NODE_ENV = production / development  ## OPTIONAL
```
- To read the .env file in the backend/ directory, change the script in the `./package.json` file to:
```bash
   "start":"node --env-file=backend/.env backend/server.js",
   "dev": "nodemon --env-file=backend/.env backend/server.js",
```
- For testing and developing the app locally, you can use the `dev script by running:
```bash
   npm run dev
```
And in the frontend you'll need to run the following command:
```bash
   cd frontend
   npm start
```

**License:**

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

**Developed by:**

* Mirza Mahrab Hossain (BRAC University)
