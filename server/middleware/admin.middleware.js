function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next(); // allow access
  } else {
    res.status(403).send("Access denied. Admins only.");
  }
}

export default isAdmin;