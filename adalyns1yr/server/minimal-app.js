import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Minimal server is working!" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API test route is working!" });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`🚀 Minimal server is listening on port ${PORT}`);
}); 