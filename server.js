const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
     cors: {
          origin: "*",
          methods: ["GET", "POST"],
     },
});

const cors = require("cors");
const { ExpressPeerServer } = require("peer");

var remoteVideoStream;

app.use(cors());
app.use(express.json());

app.set("trust proxy", 1);

const { v4: uuId4 } = require("uuid");

app.get("/connect", (req, res) => {
     res.redirect(`${uuId4()}`);
});

// app.get("/:room", (req, res) => {
//      res.json({ roomId: req.params.room });
// });

// io.on("connection", (socket) => {
//      console.log("connection");
//      socket.on("join-room", (roomId, userId) => {
//           console.log("join-room", userId, roomId);
//           socket.join(roomId);

//           // send currently stored media stream to the new viewer
//           const call = peer.call(userId, remoteVideoStream);

//           var clients = io.sockets.adapter.rooms.get(roomId)[0];

//           socket.broadcast.to(roomId).emit("user-connected", userId);

//           socket.on("disconnect", () => {
//                //console.log("disconnect");
//                socket.to(roomId).emit("user-disconnected", userId);
//           });

//           socket.on("change-stream-audio", (userId, isAudioMuted) => {
//                console.log();
//                socket.broadcast
//                     .to(roomId)
//                     .emit("remote-stream-changed-audio", userId, isAudioMuted);
//           });

//           socket.on("change-stream-video", (userId, isVideoMuted) => {
//                socket.broadcast
//                     .to(roomId)
//                     .emit("remote-stream-changed-video", userId, isVideoMuted);
//           });

//           socket.on("change-spotlight", (userId, isUserSpotlighted) => {
//                console.log("spotlighted", userId, isUserSpotlighted);
//                //call spotlighted user

//                // socket.broadcast
//                //      .to(roomId)
//                //      .emit("remote-spotlighted", userId, isUserSpotlighted);
//           });
//      });
// });

/******************************************/

// const peerConfig = {
//      config: {
//           iceServers: [
//                { urls: "stun:stun.l.google.com:19302" },
//                {
//                     urls: "turn:numb.viagenie.ca",
//                     credential: "muazkh",
//                     username: "webrtc@live.com",
//                },
//           ],
//      },
// };

const peerServer = ExpressPeerServer(server, {
     path: "/teloApp",
});

app.use("/peerServer", peerServer);

// const peerJs = require("peerjs-nodejs");
// const peer = new peerJs("server1", peerConfig);

/******************************************/

const PORT = process.env.PORT || 9000;

server.listen(PORT);
