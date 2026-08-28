import Profile from "../Profile/Profile";

import { profile } from "../Data/TalentData";



const ProfilePage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-800 font-['poppins'] ">
      <div>
       <Profile {...profile}/>
        
      </div>
    </div>
  );
};
export default ProfilePage;
