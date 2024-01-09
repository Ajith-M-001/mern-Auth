import path from "path";
import express from "express";
import connectDB from "./database/db.js";
import userRouter from "./Router/userRouter.js";
import { errorHandler, notFound } from "./middleWare/errorHandler.js";
import cookieParser from "cookie-parser";


// import dotenv from "dotenv";
// dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

// Define multiple options for CORS


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRouter);


if (process.env.NODE_ENV === "production") {
  // const __dirname = path.resolve();
  // app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "dist", "index.html"))
  );
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
    console.log(`Error connecting mongodb atlas database ${error.message}`);
    process.exit(1);
  }
};

startServer();
