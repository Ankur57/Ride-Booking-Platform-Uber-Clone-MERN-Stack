const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const connectToDb = require("./db/db");
const { initializeSocket } = require("./socket");

const port = process.env.PORT || 4000;
const server = http.createServer(app);

// Optional but recommended (prevents buffering surprises)
mongoose.set("bufferCommands", false);

connectToDb()
  .then(() => {
    console.log("MongoDB connected");

    // Initialize sockets ONCE, after DB is ready
    initializeSocket(server);

    server.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
