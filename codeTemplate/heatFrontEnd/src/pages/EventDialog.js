import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from "@mui/material";

const EventDialog = ({ open, handleCloseDialog, event }) => {
  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      {event && (
        <>
          <DialogTitle style={{ textAlign: "center", fontSize: "24px" }}>{event.title}</DialogTitle>
          <DialogContent>
            {event.start && (
              <Typography variant="body1">Start Date: {event.start}</Typography>
            )}
            {event.end && (
              <Typography variant="body1">End Date: {event.end}</Typography>
            )}
            {event.type && (
              <Typography variant="body1">Type: {event.type}</Typography>
            )}
            {event.weight && (
              <Typography variant="body1">Weight: {event.weight}%</Typography>
            )}
            {event.summary && (
              <Typography variant="body1">
                Summary:{" "}
                {event.summary.startsWith("http") ? (
                  <a href={event.summary} target="_blank" rel="noreferrer">
                    {event.summary.slice(0, 40) + (event.summary.length > 40 ? "..." : "")}
                  </a>
                ) : (
                    event.summary.length > 20 ? (
                        event.summary.split(" ").slice(0, 20).join(" ") + "..."
                        ) : (
                            event.summary
                        )
                )}
              </Typography>
            )}
            {event.feedback && (
              <Typography variant="body1">
                Feedback:{" "}
                {event.feedback.startsWith("http") ? (
                  <a href={event.feedback} target="_blank" rel="noreferrer">
                    {event.feedback.slice(0, 40) + (event.feedback.length > 40 ? "..." : "")}
                  </a>
                ) : (
                    event.feedback.length > 20 ? (
                        event.feedback.split(" ").slice(0, 20).join(" ") + "..."
                        ) : (
                            event.feedback
                        )
                )}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default EventDialog;