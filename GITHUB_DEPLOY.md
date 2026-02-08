# GitHub Deployment Guide

This guide explains how to push your `decoration-site` project to GitHub and deploy it.

## 1. Initialize Git Repository
If you haven't already, verify the `.gitignore` files are in place (already created in project root).
Then run:

```bash
git init
git add .
git commit -m "Initial commit: Validation & Admin Features"
```

## 2. Push to GitHub
1.  Create a **new empty repository** on GitHub.
2.  Copy the remote URL (e.g., `https://github.com/username/repo.git`).
3.  Run:
    ```bash
    git branch -M main
    git remote add origin <your-repo-url>
    git push -u origin main
    ```

## 3. GitHub Actions (Optional CI/CD)
To automate deployment, you can create a workflow file at `.github/workflows/deploy.yml`.

Example for **Deploying to a VPS/Droplet**:
```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
    - run: npm install
    - run: npm run build
    # Add steps to SCP files to your server
```

## 4. Manual Deployment
1.  Run `npm run build` locally.
2.  Upload the `dist` folder (Frontend) and `server` folder to your server.
3.  Start the server with `npm start` (or use PM2).
