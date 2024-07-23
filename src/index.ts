import { rateLimit } from "express-rate-limit";
import express, { Express, Request, Response } from "express";

const app: Express = express();

const customKeyGenerator = (req: Request) => {
  return req.params.id; // 요청 URL의 :id 파라미터 값 사용
};

const limiter = rateLimit({
  windowMs: 10 * 1000, // 1 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  keyGenerator: customKeyGenerator, // Custom key generator function.
});

// Apply the rate limiting middleware to all requests.
// app.use(limiter);
app.get("/user/:id", limiter, (req: Request, res: Response) => {
  console.log("Hello World! id: " + req.params.id);
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
