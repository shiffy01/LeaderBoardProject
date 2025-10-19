
import React from "react";
import { TableRow, TableCell, Avatar, Box, Button } from "@mui/material";

interface LeaderboardRowProps {
  rank: number;
  user: {
    _id?: string;
    name: string;
    score: number;
    avatarUrl?: string;
  };
  onEdit: (user: any) => void;
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
