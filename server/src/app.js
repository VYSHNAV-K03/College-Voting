const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.use(express.urlencoded({ extended: false })); //form data to parse
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(bodyParser.json());

const AuthRoute = require("./routes/auth");
const getStudentInfo = require("./routes/getStudentInfo");
const mailSendRoute = require("./routes/mailsend");
const simpleRoute = require("./routes/simple_routes");
const jobRoutes = require('./routes/jobRoute');
const electionRoutes = require("./routes/electionRoutes");
const voteRoutes = require("./routes/voteRoute");


app.use("/api", AuthRoute);
app.use("/api/student", getStudentInfo);
app.use("/api/mailsend", mailSendRoute);
app.use("/api/simple", simpleRoute);
app.use('/api/jobs', jobRoutes);
app.use("/api/election", electionRoutes);
app.use("/api/vote", voteRoutes);



app.get("/kdsjs", (req, res) => {});

app.use("/uploads", express.static(path.join("uploads")));

require("./db/conn");

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.use(express.static(path.join("client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
