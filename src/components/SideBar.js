import Image from 'next/image'
import ClientLogo from '../res/img/cardiff_uni_logo.png'

import { TbDashboard } from 'react-icons/tb'
import SideBarItem from './SideBarItem';

export default function SideBar() {
  return (
    <>
      { /* Side bar */ }
        <nav className="flex bg-cardiff-blue flex-col py-8 pl-8 justify-items-center h-full pb-auto" id="sidebar-nav">
            <SideBarItem name="Dashboard" icon="TbDashboard" path="/dashboard" />
            <SideBarItem name="Reports" icon="TbReportSearch" path="/reports" />
            <SideBarItem name="Energy Flow" icon="FaProjectDiagram" path="/flow" />
            <SideBarItem name="Optimisations" icon="TbBulb" path="/optimisations" />
            <SideBarItem name="Targets" icon="TbTarget" path="/targets" />
            <SideBarItem name="Bill Validation" icon="TbReceipt" path="/bill-validation" />
        </nav>
        <hr></hr>
    </>
  );
}
