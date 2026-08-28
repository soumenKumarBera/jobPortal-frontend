import { useState } from 'react';
import { Button, Combobox, useCombobox, Text, Box } from '@mantine/core';
import { IconAdjustmentsAlt } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { sortAction } from '../Slices/sortSlice';

const opt = ['Relevance', 'Most Recent', 'Salary (Low to High)', 'Salary (High to Low)'];
  const talentSort = ['Relevance', 'Experience (Low to High)', 'Experience (High to Low)' ]
const Sort = (props:any) => {

  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = props.sort == "job" ? opt.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option> )) :  talentSort.map((item) => (
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>))
  ;

  return (
    <>
    

      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
    
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          dispatch(sortAction.updateSort(val));
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <div onClick= {() => combobox.toggleDropdown()} className = "border border-bright-sun-400 flex items-center px-2 py-1 rounded-xl cursor-pointer gap-2 text-sm xs-mx:text-xs xs-mx:px-1 xsm-mx:my-2">
            {selectedItem } <IconAdjustmentsAlt stroke={2} className="text-bright-sun-400 size-5" />
          </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
}
export default Sort;