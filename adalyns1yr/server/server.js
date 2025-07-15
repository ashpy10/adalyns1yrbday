import dotenv from "dotenv";
import app from "./app.js";

dotenv.config(); // load .env variables (e.g. PORT)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
