import SelectInput from "./SelectInput";
import { Textarea, TagsInput } from "@mantine/core";

import fields from "../Data/Profile";
import { useEffect, useState } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { Checkbox, Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { title } from "process";
import { data } from "react-router-dom";
import { updateProfile } from "../Servicess/ProfileService";
import { profileAction } from "../Slices/ProfileSlice";
import { successNotification } from "../Servicess/NotificationService";

const ExpInput = (props: any) => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const select = fields;

  useEffect(() => {
    if (!props.add) {
      form.setValues({
        title: props.title,
        company: props.company,
        location: props.location,
        startDate: new Date(props.startDate),
        endDate: new Date(props.endDate),
        working: props.working,
        description: props.description,
      });
    }
  }, []);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      title: "",
      company: "",
      location: "",
      startDate: new Date(),
      endDate: new Date(),
      working: false,
      description: "",
    },

    validate: {
      title: isNotEmpty("Titlr is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("Location is required"),
      description: isNotEmpty("Description is required"),
    },
  });

  const handelSave = () => {
    form.validate();
    if (!form.isValid()) return;

    let exp = [...profile.experiences];
    if (props.add) {
      exp.push(form.getValues());
      exp[exp.length - 1].startDate = new Date(
        exp[exp.length - 1].startDate,
      ).toISOString();
      exp[exp.length - 1].endDate = new Date(
        exp[exp.length - 1].endDate,
      ).toISOString();
    } else {
      exp[props.index] = form.getValues();
      exp[props.index].startDate = new Date(
        exp[props.index].startDate,
      ).toISOString();
      exp[props.index].endDate = new Date(
        exp[props.index].endDate,
      ).toISOString();
    }

    const update = { ...profile, experiences: exp };
    props.setEdit(false);
    updateProfile(update)
      .then((res) => {
        dispatch(profileAction.changeProfile(res));
        successNotification(
          "Sucess",
          `Experiences ${props.add ? "Add" : "Updated"} Successfully`,
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">
        {" "}
        {props.add ? "New" : "Edit"} Experience
      </div>
      <div className="flex gap-10 [&>*]:w-1/2 xs-mx:gap-2 xs-mx:[&>*]:w-full  xs-mx:flex-wrap">
        <SelectInput {...select[0]} form={form} name="title" />
        <SelectInput {...select[1]} form={form} name="company" />
      </div>
      <SelectInput {...select[2]} form={form} name="location" />
      <Textarea
        {...form.getInputProps("description")}
        withAsterisk
        label="Summary"
        // onChange={(e) => setDece(e.currentTarget.value)}
        autosize
        minRows={2}
        placeholder="Enter about yoursself..."
      />
      <div className="flex gap-10 [&>*]:w-1/2 xs-mx:gap-2 xs-mx:[&>*]:w-full  xs-mx:flex-wrap">
        <MonthPickerInput
          {...form.getInputProps("startDate")}
          withAsterisk
          label="Start date"
          placeholder="Pick date"
          maxDate={form.getValues().endDate || undefined}
          // minDate={new Date()}
        />
        <MonthPickerInput
          {...form.getInputProps("endDate")}
          withAsterisk
          label="End date"
          placeholder="Pick date"
          minDate={form.getValues().startDate || undefined}
          disabled={form.getValues().working}
        />
      </div>
      <Checkbox
        checked={form.getValues().working}
        onClick={(event) =>
          form.setFieldValue("working", event.currentTarget.checked)
        }
        label="Currently working here"
      />

      <div className="flex gap-5">
        <Button variant="outline" color="green.8" onClick={handelSave}>
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

export default ExpInput;
