const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Example app listening on port " + PORT);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to database: ", { error });
  });

app.use(express.json());

app.post("/signup", async (req, res) => {
  const inputUser = req.body;
  console.log(inputUser);

  // check if user already exists
  const existingUser = await User.findOne({ email: inputUser?.email });
  if (existingUser) {
    return res.status(400).send({ userDetails: existingUser, error: "User already exists with this email" });
  }

  const user = new User(inputUser);
  const error = user.validateSync();

  if (error) {
    return res.status(400).send(error);
  }

  await user.save(user);
  res.send("User created");
});
