import JobHistory from "../JobHistory/JobHistory";

const JobHistoryPage = () => {
  return (
    <div className="min-h-[100vh]  bg-mine-shaft-800 font-['Poppins'] px-4 ">
      {/* <Divider size="xs" /> */}
      <div className=" flex">
        <JobHistory />
        
      </div>
    </div>
  );
};

export default JobHistoryPage;
