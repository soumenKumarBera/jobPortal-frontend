import Jobs from "../Findjobs/Jobs";
import SearchBar from "../Findjobs/SearchBar";
import { Divider } from '@mantine/core';


const FindJobsPage = () => {

  return (
    <div className = "min-h-[100vh] bg-mine-shaft-800 font-['Poppins']">
       <Divider size="xs" mx="md" />
      <SearchBar />
       <Divider size="xs"  mx="md"/>
      <Jobs />
      
    </div>
  );
}

export default FindJobsPage;