import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Test server is working!" });
});

app.get("/test", (req, res) => {
  res.json({ message: "Test route is working!" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🧪 Test server is listening on port ${PORT}`);
}); 