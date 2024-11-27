"use client";

import { Button } from "@mui/material";
import {
  NotificationsProvider,
  useNotifications,
} from "@toolpad/core/useNotifications";

const CopyBtn = () => {
  const notifications = useNotifications();

  return (
    <NotificationsProvider>
      <Button
        variant="text"
        onClick={() => {
          notifications.show("Consider yourself notified!", {
            severity: "info",
            autoHideDuration: 3000,
          });
        }}
      >
        Copy Data
      </Button>
    </NotificationsProvider>
  );
};

export default CopyBtn;
