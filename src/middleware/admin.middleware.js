import jwt from "jsonwebtoken"
export const adminVerify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: "No token provided" });
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, "secretKey");
        if (decoded.rule !== 'admin') {
          return res.status(403).json({ message: "Unauthorized" });
        }
        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}