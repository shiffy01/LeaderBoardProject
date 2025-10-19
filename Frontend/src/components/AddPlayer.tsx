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
  onAdd: (user: Partial<User>) => void; // called when form submitted
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Player</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Score"
          type="number"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          fullWidth
        />
        <TextField
          label="Avatar URL"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPlayerDialog;
