# Deployment Instructions

To secure your API key, this project now uses a serverless function. You should deploy this to **Vercel** (recommended) or Netlify.

## How to Deploy to Vercel

1.  **Push to GitHub**: Make sure your latest changes (including `api/chat.js`) are pushed to your GitHub repository.
2.  **Sign up/Login to Vercel**: Go to [vercel.com](https://vercel.com) and log in with GitHub.
3.  **Import Project**:
    *   Click "Add New..." -> "Project".
    *   Select your `Command-Line-Based-Portfolio` repository.
4.  **Configure Project**:
    *   **Framework Preset**: It should auto-detect or select "Other".
    *   **Root Directory**: Leave as `./`.
5.  **Environment Variables** (CRITICAL):
    *   Expand the "Environment Variables" section.
    *   Add a new variable:
        *   **Key**: `OPENROUTER_API_KEY`
        *   **Value**: `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` (Your actual key)
    *   Click "Add".
6.  **Deploy**: Click "Deploy".

## Local Development
To run this locally with the API working, you need the Vercel CLI:
1.  Install Vercel CLI: `npm i -g vercel`
2.  Run: `vercel dev`
3.  Open `http://localhost:3000`

If you just open `index.html` directly, the chat feature will **not** work because it needs the backend API.
