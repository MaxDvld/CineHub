import "dotenv/config";
import express from "express";
import authRoute from "./Routes/auth.route.js";
import filmsRoute from "./Routes/films.route.js"
import roomsRoute from "./Routes/rooms.route.js"
import screeningsRoute from "./Routes/screenings.route.js"
import reservationsRoute from "./Routes/reservations.route.js"
import usersRoute from "./Routes/users.route.js"
import db from "./Config/db.js";
import { checkToken } from "./Middlewares/auth.middleware.js"
import cors from "cors"

const app = express();
app.use(cors({ origin: "http://localhost:5173"}))
app.use(express.json());

app.use("/auth", authRoute);
app.get("/", (req, res) => {
    res.json({ status: "OK" });
});
app.use("/films",checkToken, filmsRoute)
app.use("/rooms", checkToken, roomsRoute)
app.use("/screenings", checkToken, screeningsRoute)
app.use("/reservations", checkToken, reservationsRoute)
app.use("/users", checkToken, usersRoute)
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://127.0.0.1:${PORT}`);
});
