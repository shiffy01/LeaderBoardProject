// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import LeaderboardRow from "./LeaderBoardRow";
// import type { User } from "../API";

// interface LeaderboardTableProps {
//   users: User[];
// }

// const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ users }) => {
//   return (
//     <TableContainer
//       component={Paper}
//       sx={{ borderRadius: 3, boxShadow: "0px 6px 20px rgba(0,0,0,0.1)", mb: 2 }}
//     >
//       <Table>
//         <TableHead>
//           <TableRow
//             sx={{
//               background: "linear-gradient(90deg, #ff8a00, #e52e71)",
//               "& th": { color: "#fff", fontWeight: "bold" },
//             }}
//           >
//             <TableCell>Rank</TableCell>
//             <TableCell>User</TableCell>
//             <TableCell>Score</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map((user, index) => (
//             <LeaderboardRow key={index} rank={index + 1} user={user} />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default LeaderboardTable;
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import LeaderboardRow from "./LeaderBoardRow";
import type { User } from "../API";

interface LeaderboardTableProps {
  users: User[];
  onEdit: (user: User) => void;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ users, onEdit }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 3, boxShadow: "0px 6px 20px rgba(0,0,0,0.1)", mb: 2 }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: "linear-gradient(90deg, #ff8a00, #e52e71)",
              "& th": { color: "#fff", fontWeight: "bold" },
            }}
          >
            <TableCell>Rank</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Score</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <LeaderboardRow key={index} rank={index + 1} user={user} onEdit={onEdit} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaderboardTable;
