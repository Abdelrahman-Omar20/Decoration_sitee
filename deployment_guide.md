# Deployment Guide

This guide outlines how to prepare and deploy the **Elegance Decor** website.

## 1. Preparing for Production

### Frontend Build
Navigate to the `client` directory and run:
```bash
npm run build
```
This will create a `dist` folder. You can serve this using the backend or host it on a CDN like Vercel or Netlify.

### Backend Setup
The backend is a Node.js/Express app. Ensure you have Node.js installed on your server.
To start the production server:
```bash
npm run start
```
(You may need to install `pm2` or similar to keep the process running).

## 2. Environment Variables
Create a `.env` file in the `server` directory with these values:
```env
PORT=4000
DATABASE_PATH=./data/database.json
UPLOAD_DIR=./uploads
JWT_SECRET=your_jwt_secret_here
```

## 3. Hosting Options

### Option A: GoDaddy (or other VPS)
1. Use **Cpanel** or **SSH** to upload your code.
2. Install Node.js on the server.
3. Use a process manager like **PM2** to run the backend.
4. Configure a **Reverse Proxy** (Nginx/Apache) to map your domain to port 4000.

### Option B: GitHub Pages (Frontend Only)
- **Note**: GitHub Pages only hosts static files. It cannot run the Node.js backend.
- You would need to host the backend separately (e.g., on Render or Railway) and update the frontend `baseUrl` to point to that backend.

### Option C: Vercel + Render (Recommended)
- **Frontend**: Deploy the `client` folder to Vercel (free and very fast).
- **Backend**: Deploy the `server` folder to Render or Railway (handles the Node.js process and JSON database).

## 4. Final Directory Structure
Ensure your uploads and data folders persist between deployments:
```
/root
  /client (built files)
  /server
    /data/database.json
    /uploads
```
