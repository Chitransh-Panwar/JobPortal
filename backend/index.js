import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import externalJobRoute from "./routes/externalJob.route.js";
import validateOrigin from "./middlewares/validateOrigin.js";
import path from "path";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
};

// CORS must run before any origin validation.
app.use(cors(corsOptions));

// validateOrigin should run AFTER CORS so the request has the proper headers,
// and it should not block same-origin requests (where Origin may be missing).
app.use(validateOrigin);

const PORT = process.env.PORT || 3000;
const _dirname = path.resolve();

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/external-jobs", externalJobRoute);

// Serve frontend (if built)
const distPath = path.join(_dirname, "frontend", "dist");
app.use(express.static(distPath));

app.get("*", (req, res, next) => {
  // If frontend is not built (e.g. backend-only deploy), don't crash with ENOENT.
  // Let API routes handle their paths; otherwise return a helpful message.
  if (req.path.startsWith("/api/")) return next();

  const indexHtmlPath = path.resolve(distPath, "index.html");
  res.sendFile(indexHtmlPath, (err) => {
    if (err) {
      return res.status(200).send(
        "Frontend not built. Run `npm run build` (builds frontend/dist) or deploy a separate static frontend."
      );
    }
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
