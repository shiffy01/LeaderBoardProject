import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import type { User } from "../API";

interface EditScoreDialogProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (newScore: number) => void;
}

const EditScoreDialog: React.FC<EditScoreDialogProps> = ({
  open,
  onClose,
  user,
  onSave,
}) => {
  const [score, setScore] = useState<number>(user?.score ?? 0);

  useEffect(() => {
    if (user) setScore(user.score);
  }, [user]);

  const handleSave = () => {
    onSave(score);
    onClose();
  };

  if (!user) return null;

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
        Edit Score for {user.name}
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField
          label="Score"
          type="number"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
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
          onClick={handleSave}
          sx={{
            background: "linear-gradient(90deg, #ffb347, #ffcc33)",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(90deg, #ffcc33, #ffb347)",
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditScoreDialog;
