import { rateLimit } from "express-rate-limit";

export const applyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many apply attempts. Please try again later.",
  },
});

export const jobsReadLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 90,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again shortly.",
  },
});
