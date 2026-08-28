import { Indicator, Menu, Notification, Stack } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getNotification, readNotification } from "../Servicess/NotiServices";
import { error } from "console";
import { notifications } from "@mantine/notifications";
import { isTokenExpired } from "../Servicess/AuthService";

const NotiMenu = () => {
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
   const token = useSelector((state: any) => state.jwt);

  const [opened, setOpened] = useState(false);
  const [notification, setNotification] = useState<any>([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if(!isTokenExpired(token)){
getNotification(user.profileId)
      .then((res) => {
        console.log(res);
        setNotification(res);
      })
      .catch((error) => {
        console.log(error);
      });
    }else{
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    
    }
    
  }, [user]);

  const unread = (index: any) => {
    let noti = [...notification];

    noti = noti.filter((noti: any, i: number) => i != index);

    setNotification(noti);

    readNotification(notification[index].id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="flex gap-2 items-center cursor-pointer">
          <Indicator disabled = {notification <= 0} processing color="bright-sun.4" size={9} offset={5}>
            <IconBell stroke={2} />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown className="mt-5" onChange={() => setOpened(true)}>
        {/* <Link to="/profile">
          <Menu.Item  > */}
        <div className="flex flex-col gap-1">
          {notification.map((noti: any, index: any) => (
            <Notification
            onClick={() =>{ navigate(noti.route);setOpened(false); unread(index)}}
              key={index}
              className=" hover:bg-mine-shaft-900 cursor-pointer p-2 "
              color="teal"
              title={noti.action}
              onClose={() => unread(index)}
            >
              {noti.message}
            </Notification>
          ))}

          {notification.length == 0 && (
            <div className="text-center text-mine-shaft-300 p-2">
              {" "}
              No Notification
            </div>
          )}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotiMenu;
