const fileupload = require("express-fileupload");
const express = require("express");
const routes = require("./routes/index");
const app = express();
const PORT = 5000;
require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer");

// connect to mongoDb Database
require("./config/db").connectDB();

app.use(cors());
app.use(
  express.json({
    limit: "500mb",
  })
);

app.use("/api", routes);
app.use(express.urlencoded({ extended: true }));
app.use(
  fileupload({
    useTempFiles: true,
  })
);

// basic route
app.get("/", (req, res) => {
  res.send("Welcome to Restaurant Website.");
});
app.use("/uploads", express.static("uploads"));

// send mail
app.post("/send-email", (req, res) => {
  const { to, subject, html } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PWD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error sending email.");
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});
