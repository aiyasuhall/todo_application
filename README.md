<h1>Task Manager - Full-Stack Todo Application</h1>

<p>This project is a modern, responsive <strong>Full-Stack Todo Application</strong> built using the <strong>MERN Stack</strong> (MongoDB, Express, React, Node.js). It is designed to help users efficiently manage their daily tasks with features like date/time filtering, pagination, and real-time task statistics, all wrapped in a sleek and user-friendly interface.</p>

<hr>

<h2><b>📋 Features</b></h2>
<p>The system provides a robust set of features for task management:</p>
<ul>
  <li><strong>Comprehensive Task Management:</strong> Create, read, update, and delete (CRUD) tasks effortlessly.</li>
  <li><strong>Advanced Filtering:</strong> Filter tasks based on specific dates and times to stay organized.</li>
  <li><strong>Task Statistics:</strong> View quick insights and statistics about your completed and pending tasks.</li>
  <li><strong>Pagination:</strong> Navigate through large lists of tasks smoothly without cluttering the UI.</li>
  <li><strong>Empty States & Error Handling:</strong> Custom UI for empty task lists and a dedicated 404 Not Found page.</li>
  <li><strong>Responsive UI:</strong> A beautiful, mobile-friendly interface built with modern CSS frameworks.</li>
</ul>

<hr>

<h2><b>💻 Technologies & Tools</b></h2>
<p>This project leverages a modern web development stack to ensure a seamless developer and user experience. Here is a breakdown of the key technologies used:</p>
<ul>
  <li><strong>React & Vite:</strong> The frontend is built using React for a dynamic user interface and Vite as the build tool for incredibly fast development server startup and optimized production builds.</li>
  <li><strong>Tailwind CSS & Shadcn UI:</strong> Tailwind is used for utility-first, rapid styling. <strong>Shadcn UI</strong> (built on top of Radix UI) provides accessible, highly customizable, and beautiful components like Dialogs, Popovers, Badges, and Pagination.</li>
  <li><strong>React Router DOM:</strong> Handles client-side routing, enabling seamless navigation between the home page and the 404 Error page without reloading the browser.</li>
  <li><strong>Axios & Date-fns:</strong> Axios is used for making clean, promise-based HTTP requests to the backend API. <code>date-fns</code> provides comprehensive toolsets to manipulate, format, and filter task dates and times.</li>
  <li><strong>Node.js & Express:</strong> The backend API is constructed with Node.js and Express, providing lightweight, fast, and robust routing for the task controllers.</li>
  <li><strong>MongoDB & Mongoose:</strong> A NoSQL database (MongoDB) is used to flexibly store task documents. Mongoose acts as the ODM (Object Data Modeling) library to enforce a strict schema for the Task model (e.g., title, description, status, due dates).</li>
</ul>

<hr>

<h2><b>🛠 Prerequisites</b></h2>
<ul>
  <li><strong>Node.js & npm:</strong> Ensure you have Node.js installed on your machine.</li>
  <li><strong>MongoDB:</strong> A running MongoDB instance (locally via MongoDB Compass or cloud-based via MongoDB Atlas).</li>
</ul>

<hr>

<h2><b>⚙️ Environment Configuration</b></h2>
<p>Before running the application, you must set up the environment variables for both the backend and frontend:</p>

<ol>
  <li><strong>Backend Configuration:</strong> Create a <code>.env</code> file in the <code>backend/</code> directory:</li>
</ol>

<pre><code>PORT=5000
MONGO_URI=your_mongodb_connection_string
</code></pre>

<ol start="2">
  <li><strong>Frontend Configuration:</strong> Create a <code>.env</code> file in the <code>frontend/</code> directory:</li>
</ol>

<pre><code>VITE_API_URL=http://localhost:5000/api
</code></pre>

<p><strong>Important Note:</strong> Replace <code>your_mongodb_connection_string</code> with your actual MongoDB URI. Make sure the <code>VITE_API_URL</code> port matches your backend port.</p>

<hr>

<h2><b>🚀 Installation & Usage Guide</b></h2>

<h3>Step 1: Clone the Repository</h3>
<p>Open your terminal and clone the project:</p>
<pre><code>git clone https://github.com/your-username/todo-application.git
cd todo-application</code></pre>

<h3>Step 2: Run Backend Server</h3>
<p>Open a terminal window, navigate to the backend folder, install dependencies, and start the development server:</p>
<pre><code>cd backend
npm install
npm run dev</code></pre>
<p><em>The server should start on port 5000 and display a successful MongoDB connection message.</em></p>

<h3>Step 3: Run Frontend Client</h3>
<p>Open a new terminal window, navigate to the frontend folder, install the packages, and run Vite:</p>
<pre><code>cd frontend
npm install
npm run dev</code></pre>

<hr>

<h2><b>📖 User Guide (Client Flow)</b></h2>
<p>Once both servers are running, follow these steps to use the app:</p>
<ol>
  <li><strong>Access the App:</strong> Open your browser and navigate to <code>http://localhost:5173</code> (or the URL provided by Vite).</li>
  <li><strong>Add a Task:</strong> Click the "Add Task" button, fill out the task details (title, description, date), and save.</li>
  <li><strong>Manage Tasks:</strong>
    <ul>
      <li>Use the action buttons on each task card to mark it as complete, edit its details, or delete it entirely.</li>
      <li>Use the Date/Time filter at the top to narrow down tasks for specific days.</li>
    </ul>
  </li>
  <li><strong>View Stats & Navigate:</strong> Check the statistics section to track your progress, and use the pagination controls at the bottom to browse through different pages of tasks.</li>
</ol>

<hr>

<h2><b>❓ Troubleshooting</b></h2>
<p>If you encounter issues, please check the following:</p>
<ul>
  <li>Is your MongoDB instance running and is the <code>MONGO_URI</code> correct?</li>
  <li>Did you create the <code>.env</code> files in the correct directories (one in <code>backend/</code> and one in <code>frontend/</code>)?</li>
  <li>Are the ports <code>5000</code> and <code>5173</code> free and not currently in use by other applications?</li>
  <li>Check the browser console (F12) or the terminal for any specific Axios network errors or Node.js crash logs.</li>
</ul>
