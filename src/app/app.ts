import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"; // Import cookie-parser

import { UserRoutes } from "./modules/User/user.route";
import { AuthRoutes } from "./modules/Auth/auth.route";
import { ElectricGadgetRoutes } from "./modules/Electric_gadget/electricGadget.route";
import { SaleRoutes } from "./modules/SalesDetails/saleDetails.route";
import { OrderRoutes } from "./modules/Order/order.route";
import { TransactionRoutes } from "./modules/Transaction/transaction.route";

const app: Application = express();

// parsers
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser()); // Use cookie-parser middleware

// Enable CORS for all routes
app.use(
  cors({
    // origin: "https://assignment-6-gilt-nine.vercel.app",
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/gadgets", ElectricGadgetRoutes);
app.use("/api/sales", SaleRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/transaction", TransactionRoutes);

export default app;
