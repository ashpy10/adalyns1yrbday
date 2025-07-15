import express from "express";
import cors from "cors";
import rsvpsRouter from "./api/rsvps.js";

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://127.0.0.1:5173',
    'https://adalynbday.netlify.app'
  ],
  credentials: true
}));

app.use(express.json());

// Test route to verify app is working
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Mount the RSVPs API router
app.use("/api/rsvps", rsvpsRouter);

// 404 handler (if no route matched)
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
  });
  
  // Global error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  });
  
  export default app;
  