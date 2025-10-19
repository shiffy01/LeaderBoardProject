import React from "react";
import Leaderboard from "./components/LeaderBoard";

const users = [
  { name: "Alice", score: 250, avatarUrl: "https://i.pravatar.cc/150?img=1" },
  { name: "Bob", score: 320, avatarUrl: "https://i.pravatar.cc/150?img=2" },
  { name: "Charlie", score: 180, avatarUrl: "https://i.pravatar.cc/150?img=3" },
  { name: "Diana", score: 400, avatarUrl: "https://i.pravatar.cc/150?img=4" },
];

function App() {
  return <Leaderboard  />;
}

export default App;
