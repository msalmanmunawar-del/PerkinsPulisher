import express from "express";
import path from "path";

async function startServer() {
  const app = express();
  // Hostinger and Cloud Run will specify PORT through environment variable
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Simple api health response for deployment validation
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Set up static files and routing
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Fallback for SPA routing
    app.get('*', (req, res) => {
      const indexFile = path.join(distPath, 'index.html');
      res.sendFile(indexFile, (err) => {
        if (err) {
          res.status(200).send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Perkins Publisher | Active Gateway</title>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                  background-color: #0b0f19;
                  color: #e5e7eb;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
                  margin: 0;
                  padding: 20px;
                  box-sizing: border-box;
                }
                .card {
                  background-color: #111827;
                  border: 1px solid #1f2937;
                  border-radius: 12px;
                  padding: 32px;
                  max-width: 500px;
                  width: 100%;
                  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
                  text-align: center;
                }
                h1 {
                  color: #f3f4f6;
                  font-size: 24px;
                  margin-top: 0;
                  margin-bottom: 12px;
                  font-weight: 600;
                }
                p {
                  color: #9ca3af;
                  font-size: 15px;
                  line-height: 1.6;
                  margin-bottom: 24px;
                }
                .footer {
                  margin-top: 24px;
                  font-size: 12px;
                  color: #4b5563;
                }
              </style>
            </head>
            <body>
              <div class="card">
                <h1>Server is Online</h1>
                <p>
                  The Perkins Publisher server is running successfully! However, the compiled frontend assets are not yet detected. If you just deployed, please run <strong>npm run build</strong> or ensure your <strong>dist/</strong> folder is uploaded.
                </p>
                <div class="footer">Perkins Publisher • Gateway Active</div>
              </div>
            </body>
            </html>
          `);
        }
      });
    });
  }

  // Determine if PORT is a numeric port or a Unix domain socket path
  const isNumeric = (val: string | number) => {
    return !isNaN(Number(val));
  };

  if (isNumeric(PORT)) {
    const numericPort = Number(PORT);
    app.listen(numericPort, "0.0.0.0", () => {
      console.log(`Server running on port ${numericPort}`);
    });
  } else {
    // Unix socket paths must NOT bind to "0.0.0.0"
    app.listen(PORT, () => {
      console.log(`Server running on Unix socket: ${PORT}`);
    });
  }
}

startServer();
