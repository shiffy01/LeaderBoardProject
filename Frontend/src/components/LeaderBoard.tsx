// import React, { useEffect, useState } from "react";
// import { Box, Typography, Button } from "@mui/material";
// import TopUsers from "./TopUsers";
// import LeaderboardTable from "./LeaderBoardTable";
// import AddPlayerDialog from "./AddPlayer";
// import { getTopUsers, type User as APIUser, addUser } from "../API";

// const Leaderboard: React.FC = () => {
//   const [users, setUsers] = useState<APIUser[]>([]);
//   const [loadedCount, setLoadedCount] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const fetchUsers = async (count: number) => {
//     setLoading(true);
//     const data = await getTopUsers(count);
//     setUsers(data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchUsers(loadedCount);
//   }, [loadedCount]);

//   const handleAddPlayer = async (newUser: Partial<APIUser>) => {
//     try {
//       await addUser(newUser);
//       fetchUsers(loadedCount);
//     } catch (err) {
//       console.error("Failed to add user:", err);
//     }
//   };

//   const sortedUsers = [...users].sort((a, b) => b.score - a.score);
//   const top3 = sortedUsers.slice(0, 3);

//   return (
//     <Box sx={{ maxWidth: 750, mx: "auto", mt: 5, px: 2 }}>
//       {/* Title */}
//       <Box sx={{ textAlign: "center", mb: 3 }}>
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: "bold",
//             background: "linear-gradient(90deg, #ff8a00, #e52e71)",
//             WebkitBackgroundClip: "text",
//             color: "transparent",
//           }}
//         >
//           Top Cats
//         </Typography>
//       </Box>

//       {/* Top 3 Users */}
//       <TopUsers users={top3} />

//       {/* Add Player Button below top 3 */}
//       <Box sx={{ textAlign: "center", mb: 4 }}>
//         <Button
//   variant="contained"
//   onClick={() => setDialogOpen(true)}
//   sx={{
//     background: "linear-gradient(90deg, #ffb347, #ffcc33)",
//     color: "#fff",
//     fontWeight: "bold",
//     "&:hover": {
//       background:"linear-gradient(90deg, #ffcc33, #ffb347)",
//     },
//   }}
// >
//   Add Player
// </Button>
//       </Box>

//       {/* Full Leaderboard Table */}
//       <LeaderboardTable users={sortedUsers} />

//       {/* Load More Button */}
//       <Box sx={{ textAlign: "center", mb: 5 }}>
//        <Button
//   variant="contained"
//   color="primary"
//   onClick={() => setLoadedCount((prev) => prev + 10)}
//   disabled={loading}
//   sx={{
//     background: "linear-gradient(90deg, #ffb347, #ffcc33)",
//     color: "#fff",
//     fontWeight: "bold",
//     "&:hover": {
//       background: "linear-gradient(90deg, #ffcc33,  #ffb347)",
//     },
//   }}
// >
//   {loading ? "Loading..." : "Load More"}
// </Button>


//       </Box>

//       {/* Add Player Dialog */}
//       <AddPlayerDialog
//         open={dialogOpen}
//         onClose={() => setDialogOpen(false)}
//         onAdd={handleAddPlayer}
//       />
//     </Box>
//   );
// };

// export default Leaderboard;
import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import TopUsers from "./TopUsers";
import LeaderboardTable from "./LeaderBoardTable";
import AddPlayerDialog from "./AddPlayer";
import EditScoreDialog from "./EditScoreDialog"; // ✅ new import
import { getTopUsers, type User as APIUser, addUser, updateUser } from "../API"; // ✅ includes updateUser

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<APIUser[]>([]);
  const [loadedCount, setLoadedCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // For editing scores
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<APIUser | null>(null);

  const fetchUsers = async (count: number) => {
    setLoading(true);
    const data = await getTopUsers(count);
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(loadedCount);
  }, [loadedCount]);

  const handleAddPlayer = async (newUser: Partial<APIUser>) => {
    try {
      await addUser(newUser);
      fetchUsers(loadedCount);
    } catch (err) {
      console.error("Failed to add user:", err);
    }
  };

  // Handle opening the edit dialog
  const handleEditClick = (user: APIUser) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  // Save edited score
 const handleSaveScore = async (newScore: number) => {
  if (!selectedUser) return;
  console.log(">>> Editing user:", selectedUser); // 👈 ADD THIS
  try {
    await updateUser(selectedUser._id, { score: newScore });
    fetchUsers(loadedCount);
  } catch (err) {
    console.error("Failed to update score:", err);
  }
};


  const sortedUsers = [...users].sort((a, b) => b.score - a.score);
  const top3 = sortedUsers.slice(0, 3);

  return (
    <Box sx={{ maxWidth: 750, mx: "auto", mt: 5, px: 2 }}>
      {/* Title */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #ff8a00, #e52e71)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Top Players
        </Typography>
      </Box>

      {/* Top 3 Users */}
      <TopUsers users={top3} />

      {/* Add Player Button below top 3 */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => setDialogOpen(true)}
          sx={{
            background: "linear-gradient(90deg, #ffb347, #ffcc33)",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(90deg, #ffcc33, #ffb347)",
            },
          }}
        >
          Add Player
        </Button>
      </Box>

      {/* Full Leaderboard Table */}
      <LeaderboardTable users={sortedUsers} onEdit={handleEditClick} />

      {/* Load More Button */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setLoadedCount((prev) => prev + 10)}
          disabled={loading}
          sx={{
            background: "linear-gradient(90deg, #ffb347, #ffcc33)",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(90deg, #ffcc33,  #ffb347)",
            },
          }}
        >
          {loading ? "Loading..." : "Load More"}
        </Button>
      </Box>

      {/* Add Player Dialog */}
      <AddPlayerDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={handleAddPlayer}
      />

      {/* Edit Score Dialog */}
      <EditScoreDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        user={selectedUser}
        onSave={handleSaveScore}
      />
    </Box>
  );
};

export default Leaderboard;
