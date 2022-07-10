const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const multer = require("multer");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const passport = require("passport");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const upload = multer({
  storage: multer.memoryStorage(),
});

// rutas

const users = require("./routes/usersRoutes");

const port = process.env.PORT || 3000;

//app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
// app.use(passport.initialize());
// app.use(passport.session());
// require("./config/passport")(passport);
app.disable("x-powered-by");

app.set("port", port);

//llamar rutas
users(app, upload);

server.listen(3000, "192.168.1.38" || "localhost", () => {
  console.log(`Server running port: ${port}`);
});
