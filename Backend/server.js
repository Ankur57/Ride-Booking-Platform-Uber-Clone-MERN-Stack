const dotenv = require("dotenv");
dotenv.config();

const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const connectToDb = require("./db/db");
const { initializeSocket } = require("./socket");

const port = process.env.PORT || 4000;
const server = http.createServer(app);
mongoose.set("bufferCommands", false);

async function startServer() {
  try {
    await connectToDb();
    console.log("MongoDB connected");

    initializeSocket(server);

    server.listen(port, () => {
      console.log("Server running on port", port);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

startServer();
