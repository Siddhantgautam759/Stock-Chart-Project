 Real-Time Stock Chart App

A full-stack web application that displays real-time stock prices using React, Chart.js, and Node.js with Server-Sent Events (SSE).

🔧 Tech Stack

Frontend: React, Chart.js, react-chartjs-2

Backend: Node.js, Express.js

Communication: Server-Sent Events (SSE)

CORS Enabled for cross-origin communication

📂 Project Structure

stock-chart-project/
│
├── backend/
│   ├── server.js         # Express server generating stock data
│   └── package.json      # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── App.js        # Main entry point for React
    │   ├── StockChart.js # React component for live chart
    │   └── index.js      # React root render
    ├── public/
    │   └── index.html
    └── package.json      # Frontend dependencies

🚀 How It Works

✅ Frontend (App.js, StockChart.js)

App.js renders the <StockChart /> component.

StockChart.js connects to http://localhost:5001/stock-data using Server-Sent Events.

It receives live stock data every 2 seconds and updates the chart in real-time using react-chartjs-2.

✅ Backend (server.js)

The backend generates mock stock data every 2 seconds (symbol, open/close prices, volume, etc.).

Data is streamed using the /stock-data endpoint.

CORS is configured to allow access from http://localhost:3000.

🛠️ Setup Instructions

1. Clone the Repo

git clone https://github.com/your-username/stock-chart-project.git
cd stock-chart-project

2. Start the Backend

cd backend
npm install
npm start

Server will run on http://localhost:5001

3. Start the Frontend

cd ../frontend
npm install
npm start

React app will run on http://localhost:3000

📊 Output

A clean, responsive chart of live stock prices

Prices update every 2 seconds

Displays last 10 price points in a line graph
