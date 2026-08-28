import { searchFields } from "../Data/TalentData";
import { Button, Collapse, Divider } from "@mantine/core";
import { useState } from "react";
import { RangeSlider } from "@mantine/core";
import MultinInput from "../Findjobs/MultinInput";
import { IconUserCircle } from "@tabler/icons-react";
import { Input } from "@mantine/core";
import { useDispatch } from "react-redux";
import { filterAction } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
const SearchBar = () => {
  const matches = useMediaQuery("(max-width: 475px)");
  const [expanded, { toggle }] = useDisclosure(false);

  const [value, setValue] = useState<[number, number]>([0, 50]);

  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const handelChange = (name: any, event: any) => {
    if (name == "exp") dispatch(filterAction.updateFilter({ exp: event }));
    else {
      dispatch(filterAction.updateFilter({ name: event.target.value }));
      setName(event.target.value);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        {matches && (
          <Button
            onClick={toggle}
            variant="outline"
            m="xs"
            radius="lg"
            className="align"
            autoContrast
            color="bright-sun.4"
          >
            {" "}
            {expanded ? "Close" : "Filters"}
          </Button>
        )}
      </div>

      <Collapse expanded={expanded || !matches}>
        <div className="px-5 py-8 flex items-center !text-mine-shaft-100 xl-mx:!flex-wrap">
          <div className="flex items-center lg-mx:w-[25%] bs-mx:w-[30%] sm-mx:w-[48%] xsm-mx:w-[100%] xsm-mx:pb-2">
            <div>
              <IconUserCircle
                stroke={2}
                className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2 size-8"
              />
            </div>
            <Input
              defaultValue={name}
              onChange={(e) => handelChange("name", e)}
              className="mr-2 [&_input]:!text-mine-shaft-300"
              variant="unstyled"
              placeholder="Talent Name"
            />
          </div>

          <Divider mr="xs" size="sm" orientation="vertical" className="sm-mx:hidden" />
          {searchFields.map((data, index) => (
            <>
              <div key={index} className="w-1/5 lg-mx:w-[25%] bs-mx:w-[30%] sm-mx:w-[48%] xsm-mx:w-[100%] xsm-mx:pb-2">
                <MultinInput {...data} />
              </div>
              <Divider mr="xs" size="sm" orientation="vertical" className="sm-mx:hidden" />
            </>
          ))}

          <div className="w-1/5 [&_.mantine-RangeSlider-label]:!translate-y-10 lg-mx:w-[25%] bs-mx:w-[30%] sm-mx:w-[48%] xl-mx:mt-8 xsm-mx:w-[100%] ">
            <div className="flex justify-between">
              <div>Experience (Year)</div>
              <div>
                {value[0]} - {value[1]}
              </div>
            </div>
            <RangeSlider
              onChangeEnd={(e) => handelChange("exp", e)}
              size="xs"
              color="bright-sun.4"
              labelTransitionProps={{
                transition: "skew-down",
                duration: 150,
                timingFunction: "linear",
              }}
              min={1}
              max={50}
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};
export default SearchBar;
