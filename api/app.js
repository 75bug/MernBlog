// external imports
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// internal imports
import authRoute from "./routes/auth.js";
import categoryRoute from "./routes/category.js";
import postRoute from "./routes/posts.js";
import userRoute from "./routes/users.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// DB connection
mongoose.set("strictQuery", false);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected successfully!"))
    .catch((err) => console.log(err));

// Multer storage setup
    const storage = multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null,"images")
        }, filename: (req,file,cb) => {
            cb(null, req.body.name);
        },
    });

// Multer configuration
    const upload = multer({storage: storage});
    app.post("/upload", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded");
    });

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "/images")));

// routing setup 
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);

app.listen("3000", () => {
    console.log("Server is running.");
});