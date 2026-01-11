📊 Finance Dashboard
A modern, responsive finance dashboard built with React, Vite, and Material UI, featuring real‑time crypto market data, curated financial news, and a personal budgeting module.
Deployed on Vercel:

👉 Live Demo:  
https://finance-dashboard1-68siivbkvbkv-kikinjeris-projects.vercel.app/ (finance-dashboard1-68siivbkvbkv-kikinjeris-projects.vercel.app in Bing)

🚀 Features
🌗 Dark/Light mode toggle

📈 Crypto Market Overview with sparkline charts, filters, and search

📰 Finance & Crypto News Feed

💰 Budget Tracker with clean UI

🎛️ Responsive Navbar linking to each section

🏎️ Smooth scrolling navigation

📡 Live API data (Crypto + News)

🎨 Modern, minimal UI with MUI

🧩 Tech Stack
React 19

Vite

Material UI (MUI)

React Sparklines

Axios

Vercel Deployment

📁 Project Structure
Code
src/
  components/
    Header.jsx
    Crawler.jsx
    Dashboard.jsx
    Crypto.jsx
    News.jsx
    Budget.jsx
  services/
    fetchCrypto.js
    fetchNews.js
  theme.js
  App.jsx
  main.jsx
screensot/
  Crypto.png
  News.png
  Budget.png
  (extra slot)
🖼️ Screenshots
📈 Crypto Market
[Looks like the result wasn't safe to show. Let's switch things up and try something else!]

📰 News
[Looks like the result wasn't safe to show. Let's switch things up and try something else!]

💰 Budget
[Looks like the result wasn't safe to show. Let's switch things up and try something else!]

🔧 Additional Screenshot
[Looks like the result wasn't safe to show. Let's switch things up and try something else!]

(Replace extra.png with any fourth screenshot you want.)

🔑 Environment Variables
Create a .env file in the project root:

Code
VITE_NEWS_API_KEY=your_news_api_key
VITE_CRYPTO_API_KEY=your_crypto_api_key   # if applicable
Restart the dev server after adding environment variables.

🛠️ Running Locally
bash
npm install
npm run dev
🧪 Build for Production
bash
npm run build
🚀 Deploying to Vercel
This project is fully configured for Vercel.

Push to GitHub

Import the repo into Vercel

Add environment variables

Deploy

Automatic deployments will trigger on every git push.

📜 License
MIT License — free to use, modify, and build upon.
