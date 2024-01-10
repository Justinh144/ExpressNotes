import express from "express";
import fs from "fs";
import htmlRoutes from "./routes/html-routes.js";
import apiRoutes from "./routes/api-routes.js";

// Sets up the express app
const app = express();
const PORT = process.env.PORT || 1337;

// Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public/assets", express.static(__dirname + "/public/assets"));

// Routes
htmlRoutes(app);
apiRoutes(app);

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log(`PORT ${PORT}`);
});