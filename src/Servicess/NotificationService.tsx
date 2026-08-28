
import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const successNotification = ( title: string, message: string) => {

  notifications.show({
          title: title,
          message: message,
          withCloseButton: true,
          icon: <IconCheck size={18} />,
          color: "teal",
          withBorder: true,
          className: "!border-green-500",
        });

}

const errorNotification = ( title: string, message: string) => {

  notifications.show({
          title: title,
          message: message,
          withCloseButton: true,
          icon: <IconX size={18} />,
          color: "red",
          withBorder: true,
          className: "!border-red-500",
        });

}

export {successNotification, errorNotification};


