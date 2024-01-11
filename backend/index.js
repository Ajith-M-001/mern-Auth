import path from "path";
import express from "express";
import connectDB from "./database/db.js";
import userRouter from "./Router/userRouter.js";
import { errorHandler, notFound } from "./middleWare/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRouter);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "frontend", "dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on the port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(
      `Error connecting to the MongoDB Atlas database: ${error.message}`
    );
    process.exit(1);
  }
};

startServer();
