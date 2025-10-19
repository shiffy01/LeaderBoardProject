import React from "react";
import { Box, Card, Typography, Avatar } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import type { User } from "../API";

interface TopUsersProps {
  users: User[];
}

const crownColors = ["#FFD700", "#C0C0C0", "#CD7F32"];

const TopUsers: React.FC<TopUsersProps> = ({ users }) => {
  const podiumOrder = users.length === 3 ? [1, 0, 2] : users.map((_, i) => i);

  const sizes = [150, 180, 150]; 
  const avatarSizes = [60, 80, 60];
  const crownSizes = [32, 40, 32];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 2,
        mb: 4,
      }}
    >
      {podiumOrder.map((i, index) => {
        const user = users[i];
        if (!user) return null;

        return (
          <Box key={i} sx={{ textAlign: "center", position: "relative" }}>
            <EmojiEventsIcon
              sx={{
                position: "absolute",
                top: -crownSizes[index] / 2,
                left: "50%",
                transform: "translateX(-50%)",
                color: crownColors[i],
                fontSize: crownSizes[index],
              }}
            />
            <Card
              sx={{
                width: sizes[index],
                py: 2,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src={user.avatarUrl}
                sx={{
                  width: avatarSizes[index],
                  height: avatarSizes[index],
                  mb: 1,
                  border: "2px solid #eee",
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {user.name}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Score: {user.score}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                #{i + 1}
              </Typography>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
};

export default TopUsers;
