import MultinInput from "./MultinInput";
import { dropdownData } from "../Data/JobsData";
import { Button, Collapse, Divider } from "@mantine/core";
import React, { useState } from "react";
import { RangeSlider } from "@mantine/core";
import { useDispatch } from "react-redux";
import { filterAction } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
const SearchBar = () => {
  const matches = useMediaQuery("(max-width: 475px)");
  const [expanded, { toggle }] = useDisclosure(false);
  const [value, setValue] = useState<[number, number]>([1, 100]);

  const dispatch = useDispatch();

  const handelChange = (name: any, value: any) => {
    dispatch(filterAction.updateFilter({ package: value }));
  };

  return (
    <div>
      <div className="flex justify-end">
       {matches && <Button
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
        </Button> }
      </div>

      <Collapse expanded={expanded || !matches}>
        <div className="px-5  xl-mx:!flex-wrap py-8 flex items-center !text-mine-shaft-100 ">
          {dropdownData.map((data, index) => {
            return (
              <React.Fragment>
                <div
                  key={index}
                  className="w-1/5 lg-mx:w-[25%] bs-mx:w-[30%] sm-mx:w-[48%] xsm-mx:w-[100%]"
                >
                  <MultinInput {...data} />
                </div>
                <Divider
                  className="sm-mx:hidden"
                  mr="xs"
                  size="sm"
                  orientation="vertical"
                />
              </React.Fragment>
            );
          })}

          <div className="w-1/5  lg-mx:w-[25%] bs-mx:w-[30%] sm-mx:w-[48%] xl-mx:mt-8 xsm-mx:w-[100%] [&_.mantine-RangeSlider-label]:!translate-y-10">
            <div className="flex mb-1 justify-between">
              <div>Salary</div>
              <div>
                &#8377;{value[0]} LPA - &#8377;{value[1]} LPA
              </div>
            </div>
            <RangeSlider
              onChangeEnd={(e) => handelChange("package", e)}
              size="xs"
              color="bright-sun.4"
              labelTransitionProps={{
                transition: "skew-down",
                duration: 150,
                timingFunction: "linear",
              }}
              value={value}
              min={1}
              max={100}
              onChange={setValue}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};
export default SearchBar;
