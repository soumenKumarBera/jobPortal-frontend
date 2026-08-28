import { Divider } from '@mantine/core';
import SearchBar from '../findTalrnt/SearchBar';
import Talents from '../findTalrnt/Talents';

const FindTalentPage = () => {
  return (
    <div className = "min-h-[100vh] bg-mine-shaft-800 font-['Poppins']">
       <Divider size="xs" mx="md" />
      <SearchBar />
      <Divider size="xs" mx="md" />
      <Talents/>
      
    
      
    </div>
  );
};

export default FindTalentPage;