import SelectInput from "./SelectInput";
import { TextInput, TagsInput } from "@mantine/core";

import fields from "../Data/Profile";
import { useState } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { Checkbox, Button } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Servicess/ProfileService";
import { profileAction } from "../Slices/ProfileSlice";
import { successNotification } from "../Servicess/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const CertInput = (props: any) => {


  const select = fields;
  const [issueDate, setIssueDate] = useState<Date | null>(new Date());

  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
      certificateId: "",
    },

    validate: {
      name: isNotEmpty("Name is required"),
      issuer: isNotEmpty("Issuer is required"),
      certificateId: isNotEmpty("EcrtificateId is required"),
    },
  });

  const handelClickSave = () => {
    form.validate();
    if (!form.isValid()) return;

    let cert = [...profile.certifications];
    cert.push(form.getValues());
    cert[cert.length - 1].issueDate = new Date(
      cert[cert.length - 1].issueDate,
    ).toISOString();

    const update = { ...profile, certifications: cert };
    props.setEdit(false);
    updateProfile(update)
      .then((res) => {
        dispatch(profileAction.changeProfile(res));
        successNotification("Sucess", `Certifications Add Successfully`);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold"> Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2 xs-mx:gap-2 xs-mx:[&>*]:w-full  xs-mx:flex-wrap">
        <TextInput
          {...form.getInputProps("name")}
          label="Title"
          withAsterisk
          placeholder="Enter Title"
        />
        <SelectInput {...select[1]} form={form} name="issuer" />
      </div>

      <div className="flex gap-10 [&>*]:w-1/2 xs-mx:gap-2 xs-mx:[&>*]:w-full  xs-mx:flex-wrap">
        <MonthPickerInput
          {...form.getInputProps("issueDate")}
          withAsterisk
          label="End date"
          placeholder="Pick date"
          maxDate={new Date()}
        />

        <TextInput
          {...form.getInputProps("certificateId")}
          label=" Certificate ID"
          withAsterisk
          placeholder="Enter Certificate ID"
        />
      </div>

      <div className="flex gap-5">
        <Button variant="outline" color="green.8" onClick={handelClickSave}>
          Save
        </Button>
        <Button
          color="red.8"
          variant="light"
          onClick={() => props.setEdit(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CertInput;
