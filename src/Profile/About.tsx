import { ActionIcon, Textarea } from "@mantine/core";
import {
  IconCheck,
  IconDeviceFloppy,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Servicess/ProfileService";
import { useDidUpdate, useMediaQuery } from "@mantine/hooks";
import { profileAction } from "../Slices/ProfileSlice";
import { successNotification } from "../Servicess/NotificationService";

const About = () => {
  const match = useMediaQuery("(max-width: 475px)");

  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const [about, setAbout] = useState("");

  const handelClick = () => {
    if (!edit) {
      setEdit(true);
      //value inpute dekhanor jonne
      setAbout(profile.about);
    } else {
      setEdit(false);
    }
  };

  const handelSave = async () => {
    setEdit(false);
    const update = { ...profile, about };

    updateProfile(update)
      .then((res) => {
        dispatch(profileAction.changeProfile(res));
        successNotification("Sucess", "Profile Updated Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About
        <div className="flex gap-2">
          {edit && (
            <ActionIcon
              aria-label="Settings"
              color="green.8"
              variant="subtle"
              size="lg"
              onClick={handelSave}
            >
              <IconCheck className="h-4/5 w-4/5  " />
            </ActionIcon>
          )}
          <ActionIcon
            aria-label="Settings"
            variant="subtle"
            color={edit ? "red.8" : ""}
            size="lg"
            onClick={handelClick}
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5 " />
            ) : (
              <IconPencil className="h-4/5 w-4/5 " />
            )}
          </ActionIcon>
        </div>
      </div>

      {edit ? (
        <Textarea
          value={about}
          onChange={(e) => setAbout(e.currentTarget.value)}
          autosize
          minRows={2}
          placeholder="Enter about yoursself..."
        />
      ) : (
        <div className="text-sm xs-mx:text-xs text-mine-shaft-300 text-justify">
          {profile.about}
        </div>
      )}
    </div>
  );
};

export default About;
