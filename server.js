const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const skillRoutes = require("./routes/skillRoutes");
const Message = require("./models/Message");

const app = express();
app.use(express.json());
app.use(cors());

// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/auth", authRoutes);
app.use("/skills", skillRoutes);

// LOAD OLD MESSAGES
app.get("/messages", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: 1 });
  res.json(messages);
});

// SOCKET.IO
const http = require("http");
const { Server } = require("socket.io");
const { notDeepEqual } = require("assert/strict");

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("User connected");



socket.on("sendMessage", async (msg) => {

  const message = new Message({
    text: msg.text,
    username: msg.username,
    sender: msg.sender
  });

  await message.save();

  io.emit("receiveMessage", message);

});

  





  

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server running");
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
