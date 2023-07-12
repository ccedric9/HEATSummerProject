import React from "react";
import { Popover, Typography } from "@mui/material";

const EventPopover = ({ event, anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Typography sx={{ p: 2 }}>
        <strong>Title:</strong> {event.title}
      </Typography>
      <Typography sx={{ p: 2 }}>
        <strong>Start Date:</strong> {event.start}
      </Typography>
      <Typography sx={{ p: 2 }}>
        <strong>End Date:</strong> {event.end}
      </Typography>
      <Typography sx={{ p: 2 }}>
        <strong>Summary:</strong> {event.summary}
      </Typography>
      {/* Add more event details here */}
    </Popover>
  );
};

export default EventPopover;
