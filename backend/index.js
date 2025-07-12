import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { firebaseStoreDB,auth, storage,realtimeDB,adminSdk} from "./firebaseAdmin.js";
import routerBoard from "./routers/routerBoard.js"
import routerCart from "./routers/routerCart.js";
import routerInvite from "./routers/routerInvite.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(cors());
app.use("/boards",routerBoard)
app.use("/boards/:boardsId/carts", routerCart);
app.use("/boards/", routerInvite)

app.get("/", (req, res) => {
  res.status(200).send("<h1> Đã thành công Kết nối Firebase</h1>");
});

app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
    console.log(`Truy cập: http://localhost:${PORT}`);
});