import { GeneralButton } from "~/components";
import {
  ChartBarIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  userImage: string;
  userName: string;
  userJob: string;
}
const Sidebar = ({ userImage, userName, userJob }: SidebarProps) => {
  return (
    <>
      <div className={`flex items-center space-x-2`}>
        <img className={`h-16 w-auto rounded-full`} src={userImage} />
        <div>
          <h1 className={`text-lg leading-6 text-gray-900`}>{userName}</h1>
          <h2 className={`text-xs text-gray-600`}>{userJob}</h2>
        </div>
      </div>

      <div className={`w-full border-b`} />
      <div className={`flex h-full items-center justify-center`}>
        <div className={`flex w-full flex-col space-y-2`}>
          <GeneralButton style={`secondary`} className={`w-full`}>
            <div className={`flex items-center space-x-2`}>
              <UserIcon className={`w-4`} />
              <h1>Personas</h1>
            </div>
          </GeneralButton>
          <GeneralButton style={`secondary`} className={`w-full`}>
            <div className={`flex items-center space-x-2`}>
              <ChartBarIcon className={`w-4`} />
              <h1>Certificaciones</h1>
            </div>
          </GeneralButton>
          <GeneralButton style={`secondary`} className={`w-full`}>
            <div className={`flex items-center space-x-2`}>
              <UserGroupIcon className={`w-4`} />
              <h1>Forja</h1>
            </div>
          </GeneralButton>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
