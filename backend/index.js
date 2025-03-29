import express from "express";
import cors from "cors";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 6060;

app.use(cors());
app.use(express.json());

const checkJwt = jwt.expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_DOMAIN}.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: ["RS256"],
});

app.get("/api/messages/protected", checkJwt, (req, res) => {
  try {
    res.json({ message: "This is a secure message from the API. 🎉" });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).send("Server error");
  }
});


app.listen(port, () => {
  console.log(`API запущено на http://localhost:${port}`);
});
