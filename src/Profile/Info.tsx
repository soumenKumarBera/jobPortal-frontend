import { ActionIcon, NumberInput } from "@mantine/core";
import {
  IconBriefcase,
  IconCheck,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "../Slices/ProfileSlice";
import { updateProfile } from "../Servicess/ProfileService";
import { error } from "console";
import { useMediaQuery } from "@mantine/hooks";

const Info = (props: any) => {
  const select = fields;

  const [edit, setEdit] = useState(false);

  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handelClick = () => {
    setEdit(!edit);

    if (!edit) {
      setEdit(true);
      //value inpute dekhanor jonne
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
        totalExp: profile.totalExp,
      });
    } else {
      setEdit(false);
    }
  };

  const form = useForm({
    mode: "controlled",
    initialValues: {
      jobTitle: "",
      company: "",
      location: "",
      totalExp: 1,
    },
  });

  const handelSave = () => {
    setEdit(false);

    let update = { ...profile, ...form.getValues() };
    updateProfile(update)
      .then((res) => {
        dispatch(profileAction.changeProfile(res));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const match = useMediaQuery("(max-width: 475px)");

  return (
    <>
      <div className="text-3xl xs-mx:text-2xl font-semibold flex justify-between mt-20 ">
        {user.name}
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
            size={match ? "md" : "lg"}
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
        <>
          <div className="flex gap-10 [&>*]:w-1/2 xs-mx:gap-2 xs-mx:[&>*]:w-full  xs-mx:flex-wrap">
            <SelectInput {...select[0]} form={form} name="jobTitle" />
            <SelectInput {...select[1]} form={form} name="company" />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2 xs-mx:gap-2 xs-mx:[&>*]:w-full  xs-mx:flex-wrap">
            <SelectInput {...select[2]} form={form} name="location" />
            <NumberInput
              label="Experience"
              hideControls
              clampBehavior="strict"
              min={0}
              max={50}
              {...form.getInputProps("totalExp")}
            />
          </div>
        </>
      ) : (
        <>
          <div className="text-xl xs-mx:text-base flex gap-1 items-center  ">
            {" "}
            <IconBriefcase className="h-5 w-5 " stroke={1.5} />{" "}
            {profile.jobTitle}
            &bull; {profile.company}
          </div>
          <div className="flex items-center gap-1 text-mine-shaft-300">
            <IconMapPin className="size-5" stroke={1.5} /> {profile.location}
          </div>
          <div className="flex items-center gap-1 text-mine-shaft-300">
            <IconBriefcase className="size-5" stroke={1.5} />
            Experience {profile.totalExp} Years
          </div>
        </>
      )}
    </>
  );
};

export default Info;
