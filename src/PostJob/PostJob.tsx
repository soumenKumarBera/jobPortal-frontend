import { content, fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import { NumberInput, TagsInput, Textarea } from "@mantine/core";
import TextEditor from "./TextEditor";

import { Text, Avatar, Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../Servicess/jobService";
import {
  errorNotification,
  successNotification,
} from "../Servicess/NotificationService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PostJob = () => {
  const {id} =  useParams();
  const [editorData, setEditorData] = useState(content);
  const select = fields;
  const navigate = useNavigate();

  const profile = useSelector((state: any) => state.profile);

  useEffect(() =>{
    window.scrollTo(0, 0);

    if(id != "0"){
      getJob(id).then((res) =>{
        form.setValues(res);
        setEditorData(res.description);

      }).catch((err) => {
        console.log(err);
      })

    }else {
      form.reset();
      setEditorData(content);
    }



  },[id]);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      jobTitle: "",
      company: "",
      experience: "",
      jobType: "",
      location: "",
      packageOffered: "",
      skillsRequired: [],
      about: "",
      description: content,
    },

    validate: {
      jobTitle: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      experience: isNotEmpty("Experience is required"),
      jobType: isNotEmpty("Job Type is required"),
      location: isNotEmpty("Location is required"),
      packageOffered: isNotEmpty("Package is required"),
      skillsRequired: isNotEmpty("Skills are required"),
      about: isNotEmpty("About is required"),
    },
  });

  const handelPost = () => {
    form.validate();

    if (!form.isValid()) {
      return;
    }

    postJob({ ...form.getValues(), id,  postedBy: profile.id, jobStatus: "ACTIVE" })
      .then((res) => {
        console.log("confrom");
        successNotification("Success", "Job Posted SucessFully");
        navigate(`/posted-job/${res.id}`);
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Error", err.response.data.errorMessage);
      });
  };

  const handelDraft = () => {
    console.log(form.getValues());
    postJob({ ...form.getValues(), id, postedBy: profile.id, jobStatus: "DRAFT" })
      .then((res) => {
        console.log("confrom");
        successNotification("Success", "Job Saved as Draft SucessFully");
        navigate(`/posted-job/${res.id}`);
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Error", err.response.data.errorMessage);
      });
  };

  return (
    <div className="px-16 mx-auto pt-5 pb-10 bs-mx:px-10 xs-mx:px-5">
      <div className="text-2xl font-semibold mb-5">Post a Job</div>

      <div className="flex flex-col gap-5 ">
        <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:w-full sm-mx:flex-wrap">
          <SelectInput form={form} name="jobTitle" {...select[0]} />
          <SelectInput form={form} name="company" {...select[1]} />
        </div>
        <div className="flex gap-10  md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:w-full sm-mx:flex-wrap">
          <SelectInput form={form} name="experience" {...select[2]} />
          <SelectInput form={form} name="jobType" {...select[3]} />
        </div>
        <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:w-full sm-mx:flex-wrap">
          <SelectInput form={form} name="location" {...select[4]} />
          <NumberInput
            label="Salary"
            withAsterisk
            placeholder="Enter Salary"
            hideControls
            min={1}
            max={300}
            clampBehavior="strict"
            {...form.getInputProps("packageOffered")}
          />
        </div>

        <TagsInput
          withAsterisk
          label="Skills"
          placeholder="Enter skill"
          clearable
          acceptValueOnBlur
          splitChars={[",", " ", "|"]}
          {...form.getInputProps("skillsRequired")}
        />

        <Textarea
          {...form.getInputProps("about")}
          withAsterisk
          label="About"
          // onChange={(e) => setDece(e.currentTarget.value)}
          autosize
          minRows={2}
          placeholder="Enter about job..."
        />

        <div className="[&_button[data-active = 'true']]:!text-bright-sun-400 [&_button[data-active = 'true']]:!bg-bright-sun-400/2">
          <div className="text-sm font-medium">
            Job Description <span className="text-red-500">*</span>
          </div>

          <TextEditor form={form} data={editorData} name="description" />
        </div>

        <div className="flex gap-4 justify-around">
          <Button
            variant="light"
            className="!text-bright-sun-300"
            color="orange"
            onClick={handelPost}
          >
            Publish Job
          </Button>
          <Button
            variant="outline"
            className="!text-bright-sun-300"
            color="orange"
            onClick={handelDraft}
          >
            Save as Draft{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
