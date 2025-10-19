import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import type { User } from "../API";

interface AddPlayerDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (user: Partial<User>) => void;
}

const AddPlayerDialog: React.FC<AddPlayerDialogProps> = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [score, setScore] = useState<number>(0);
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSubmit = () => {
    if (!name) return;
    onAdd({ name, score, avatarUrl });
    setName("");
    setScore(0);
    setAvatarUrl("");
    onClose();
  };

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ccc",
      },
      "&:hover fieldset": {
        borderColor: "#ffb347",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ffb347",
      },
    },
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          fontWeight: "bold",
          background: "linear-gradient(90deg, #ff8a00, #e52e71)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          textAlign: "center",
        }}
      >
        Add Player
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={textFieldSx}
        />
        <TextField
          label="Score"
          type="number"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          fullWidth
          sx={textFieldSx}
        />
        <TextField
          label="Avatar URL"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          fullWidth
          sx={textFieldSx}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", gap: 2, mb: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            fontWeight: "bold",
            color: "#555",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            background: "linear-gradient(90deg, #ffb347, #ffcc33)",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(90deg, #ffcc33, #ffb347)",
            },
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlayerDialog;
