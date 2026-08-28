import { useState } from "react";
import { successNotification } from "../Servicess/NotificationService";
import { updateProfile } from "../Servicess/ProfileService";
import { profileAction } from "../Slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

const Skills = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const [skill, setSkill] = useState(profile.skills);
  const match = useMediaQuery("(max-width: 475px)");

  const handelClick = () => {
    if (!edit) {
      setEdit(true);
      //value inpute dekhanor jonne
      setSkill(profile.skills);
    } else {
      setEdit(false);
    }
  };

  const handelSave = async () => {
    setEdit(false);
    const update = { ...profile, skills: skill };

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
        Skill
        <div className="flex gap-2">
          {edit && (
            <ActionIcon
              aria-label="Settings"
              color="green.8"
              variant="subtle"
              size={match ? "md" : "lg"}
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
        <TagsInput
          value={skill}
          onChange={setSkill}
          placeholder="Add Skill"
          splitChars={[",", " ", "|"]}
        />
      ) : (
        <div className=" flex gap-2 flex-wrap">
          <div className="bg-bright-sun-300 bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 text-sm font-medium">
            React
          </div>
          {profile.skills?.map((skill: any, index: number) => (
            <div
              key={index}
              className="bg-bright-sun-300 bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1 text-sm font-medium"
            >
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;
