const safeMethods = new Set(["GET", "HEAD", "OPTIONS"]);

const getTrustedOrigins = () =>
  new Set(
    ["http://localhost:5173", "http://127.0.0.1:5173", process.env.FRONTEND_URL].filter(Boolean)
  );

const getRequestOrigin = (req) => {
  const origin = req.headers.origin;
  if (origin) return origin;
  const referer = req.headers.referer;
  if (!referer) return null;

  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
};

const validateOrigin = (req, res, next) => {
  if (safeMethods.has(req.method)) {
    return next();
  }

  const requestOrigin = getRequestOrigin(req);
  const trustedOrigins = getTrustedOrigins();
  if (!requestOrigin) {
    return res.status(403).json({
      success: false,
      message: "Missing request origin.",
    });
  }

  if (trustedOrigins.has(requestOrigin)) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Invalid request origin.",
  });
};

export default validateOrigin;
