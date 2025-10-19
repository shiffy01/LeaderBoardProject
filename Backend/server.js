const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const User = require("./models/User");

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// GET top N users
app.get("/users", async (req, res) => {
  try {
    const n = parseInt(req.query.n) || 10;

    const users = await User.find()
      .sort({ score: -1 }) 
      .limit(n);

    console.log(`Fetched top ${n} users:`, users);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  console.log("PUT /users/:id →", id);
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      console.log("❌ User not found for ID:", id);
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// get 'range' users above and below a specific user
app.get("/users/:id/around", async (req, res) => {
  try {
    const id = req.params.id;
    const range = parseInt(req.query.range) || 5;

    const targetUser = await User.findById(id);
    if (!targetUser) return res.status(404).json({ message: "User not found" });

    const above = await User.find({ score: { $gt: targetUser.score } })
      .sort({ score: 1 }) 
      .limit(range);

    const below = await User.find({ score: { $lt: targetUser.score } })
      .sort({ score: -1 }) 
      .limit(range);

    res.json({ above, user: targetUser, below });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected:", mongoose.connection.name))
.catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
