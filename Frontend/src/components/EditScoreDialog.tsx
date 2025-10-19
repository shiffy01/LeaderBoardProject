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

  React.useEffect(() => {
    if (user) setScore(user.score);
  }, [user]);

  const handleSave = () => {
    onSave(score);
    onClose();
  };

  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Score for {user.name}</DialogTitle>
      <DialogContent>
        <TextField
          label="Score"
          type="number"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          fullWidth
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditScoreDialog;
