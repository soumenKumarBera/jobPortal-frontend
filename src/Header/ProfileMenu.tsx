import { Menu, Button, Text, Avatar, Switch } from "@mantine/core";
import {
  GearSixIcon,
  MagnifyingGlassIcon,
  ImageIcon,
  ChatCircleIcon,
  TrashIcon,
  SunIcon,
  MoonStarsIcon,
} from "@phosphor-icons/react";
import {
  IconArrowsLeftRight,
  IconFileText,
  IconLogout2,
  IconMoon,
  IconUserCircle,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../Slices/UserSlice";
import { removeJwt } from "../Slices/JwtSlice";

const ProfileMenu = () => {

  const profile = useSelector((state:any) => state.profile);
  const user = useSelector((state: any )=> state.user);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const handelLogout = () => {
    dispatch(removeUser());
    dispatch(removeJwt());

    
    
  };
  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="flex gap-2 items-center cursor-pointer">
          <div className="xs-mx:hidden">{user.name}</div>
          <Avatar src={profile.picture? `data:image/jpeg;base64,${profile.picture}`: "/Avatar.png"} alt="it's me" />
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <Link to="/profile">
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>
        <Menu.Item leftSection={<ChatCircleIcon size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconFileText size={14} />}>Resume</Menu.Item>
        <Menu.Item
          leftSection={<IconMoon size={14} />}
          rightSection={
            <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              size="md"
              color="dark.4"
              onLabel={
                <SunIcon size={16} color="var(--mantine-color-yellow-4)" />
              }
              offLabel={
                <MoonStarsIcon size={16} color="var(--mantine-color-blue-6)" />
              }
            />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<IconLogout2 size={14} />}
          onClick={handelLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
