import { Divider } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { Text, Avatar, Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Company from "../CompanyProfile/Company";
import SimilarCompany from "../CompanyProfile/SimilarCompany";

const CompanyPage = () => {
  const navigate = useNavigate();

  const handelNavigate = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/jobs");
  };

  return (
    <div className="min-h-[100vh] bg-mine-shaft-800 font-['Poppins'] px-4">
      <div className="my-4 inline-block" onClick={handelNavigate}>
        <Button
          variant="light"
          leftSection={<IconArrowLeft />}
          className="!text-bright-sun-300"
          color="orange"
        >
          Back
        </Button>
      </div>
      {/* <Divider size="xs" /> */}
      <div className="flex justify-between">
        <Company />
        <SimilarCompany />
      </div>
    </div>
  );
};

export default CompanyPage;
