import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Paper,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import PinIcon from "@mui/icons-material/PushPin";

const NotesManager = () => {
  // States for managing notes, the current note input, and edit mode
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Function to save or update the note
  const handleSaveNote = () => {
    if (isEditing) {
      // Update existing note
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = currentNote;
      setNotes(updatedNotes);
      setIsEditing(false);
    } else {
      // Add new note
      setNotes([...notes, currentNote]);
    }
    setCurrentNote({ title: "", description: "" }); // Reset input fields after save
  };

  // Function to handle note editing
  const handleEditNote = (index) => {
    setCurrentNote(notes[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  // Function to delete a note
  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  // Function to toggle pinning of a note (just for illustration)
  const handlePinNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].pinned = !updatedNotes[index].pinned;
    setNotes(updatedNotes);
  };

  return (
    <Paper sx={{ padding: 3, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Title of the app */}
      <Typography variant="h4" align="center" gutterBottom>
        Notes Manager
      </Typography>

      {/* Input fields for creating/editing a note */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Note Title"
            variant="outlined"
            fullWidth
            value={currentNote.title}
            onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Note Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={currentNote.description}
            onChange={(e) =>
              setCurrentNote({ ...currentNote, description: e.target.value })
            }
          />
        </Grid>
      </Grid>

      {/* Button to save or add a note */}
      <Box display="flex" justifyContent="center" sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveNote}
          startIcon={isEditing ? <SaveIcon /> : null}
        >
          {isEditing ? "Save Note" : "Add Note"}
        </Button>
      </Box>

      {/* Display notes */}
      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 4 }}>
        {notes.map((note, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {note.title}
                </Typography>
                <Typography variant="body2">{note.description}</Typography>
              </CardContent>
              <Box display="flex" justifyContent="space-between" sx={{ padding: 1 }}>
                {/* Pin button */}
                <IconButton
                  color={note.pinned ? "primary" : "default"}
                  onClick={() => handlePinNote(index)}
                >
                  <PinIcon />
                </IconButton>

                {/* Edit and Delete buttons */}
                <Box>
                  <IconButton onClick={() => handleEditNote(index)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteNote(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default NotesManager;
