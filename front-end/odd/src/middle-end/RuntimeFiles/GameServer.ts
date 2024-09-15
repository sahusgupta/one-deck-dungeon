const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

class GameServer {
  private app;
  private server;
  private io;
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new Server(this.server);

    this.app.get("/", (req: any, res: any) => {
      res.sendFile(join(__dirname, "index.html"));
    });

    this.io.on("connection", (socket: any) => {
      console.log("a user connected");
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

      socket.on("chat message", (msg: any) => {
        this.io.emit("chat message", msg);
      });
    });

    this.server.listen(3000, "192.168.0.103", () => {
      //try changing up this line to specify IP for communication
      console.log("server running at http://localhost:3000");
    });
  }

  public sync() : void {

  }
}
