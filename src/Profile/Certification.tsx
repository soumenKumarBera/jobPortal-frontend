import { ActionIcon } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconPencil,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import CertCard from "./CertCard";
import CertInput from "./CertInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";

const Certificate = () => {
  const [edit, setEdit] = useState(false);
  const [addCert, setAddCert] = useState(false);
  const profile = useSelector((state: any) => state.profile);

  const handelClick = () => {
    setEdit(!edit);
  };
  const match = useMediaQuery("(max-width: 475px)");

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-5 flex justify-between">
        Certicication
        <div className=" flex gap-2">
          <ActionIcon
            aria-label="Settings"
            size="lg"
            variant="subtle"
            onClick={() => setAddCert(true)}
          >
            <IconPlus className="h-4/5 w-4/5 " />
          </ActionIcon>

          <ActionIcon
            aria-label="Settings"
            size={match ? "md" : "lg"}
            onClick={handelClick}
            color={edit ? "red.8" : ""}
            variant="subtle"
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5 " />
            ) : (
              <IconPencil className="h-4/5 w-4/5 " />
            )}
          </ActionIcon>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {profile.certifications?.map((cert: any, index: any) => (
          <CertCard key={index} index={index} edit={edit} {...cert} />
        ))}

        {addCert && <CertInput setEdit={setAddCert} />}
      </div>
    </div>
  );
};

export default Certificate;
