import React from "react";
import { Tooltip, Typography } from "@mui/material";

const EventPopover = ({ event }) => {
  return (
    <Tooltip title={event.title}>
      <Typography>{event.title}</Typography>
    </Tooltip>
  );
};

export default EventPopover;
