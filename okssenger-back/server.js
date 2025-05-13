import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chats.js";
import authMiddleware from "./middleware/auth.js";

const app = express();
app.use(cors());
app.use(cors(), express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chats", authMiddleware, chatRoutes);

const PORT = process.env.PORT || 4000;
app.use((err, req, res, next) => {
  console.error("🔥 서버 에러:", err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
