// import React from "react";
// import { TableRow, TableCell, Avatar, Box } from "@mui/material";

// interface LeaderboardRowProps {
//   rank: number;
//   user: {
//     name: string;
//     score: Number
//     avatarUrl?: string;
//   };
// }

// const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ rank, user }) => {
//   return (
//     <TableRow>
//       <TableCell>{rank}</TableCell>
//       <TableCell>
//         <Box display="flex" alignItems="center">
//           <Avatar src={user.avatarUrl} sx={{ width: 32, height: 32, mr: 1 }} />
//           {user.name}
//         </Box>
//       </TableCell>
// <TableCell>{String(user.score)}</TableCell>
//     </TableRow>
//   );
// };

// export default LeaderboardRow;
import React from "react";
import { TableRow, TableCell, Avatar, Box, Button } from "@mui/material";

interface LeaderboardRowProps {
  rank: number;
  user: {
    _id?: string; // assuming your API users have an _id or id
    name: string;
    score: number;
    avatarUrl?: string;
  };
  onEdit: (user: any) => void; // callback from parent
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ rank, user, onEdit }) => {
  return (
    <TableRow>
      <TableCell>{rank}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Avatar src={user.avatarUrl} sx={{ width: 32, height: 32, mr: 1 }} />
          {user.name}
        </Box>
      </TableCell>
      <TableCell>{user.score}</TableCell>
      <TableCell align="right">
        <Button
          variant="outlined"
          size="small"
          onClick={() => onEdit(user)}
          sx={{
            borderColor: "#ffb347",
            color: "#ff8a00",
            "&:hover": { backgroundColor: "rgba(255,179,71,0.1)" },
          }}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default LeaderboardRow;
