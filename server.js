import express from "express";
import cors from "cors";
import movies from "./api/movies.route.js";

const app = express(); //create server

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//INITIAL ROUTES
app.use("/api/v1/movies", movies);
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
