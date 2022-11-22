import Image from 'next/image'
import ClientLogo from '../res/img/cardiff_uni_logo.png'

import { TbDashboard } from 'react-icons/tb'
import SideBarItem from './SideBarItem';

export default function SideBar() {
  return (
    <>
      { /* Side bar */ }
        <nav className="flex bg-cardiff-blue flex-col py-8 pl-8 justify-items-center h-full">
            <SideBarItem name="Dashboard" icon="TbDashboard" />
            <SideBarItem name="Reports" icon="TbReportSearch" />
            <SideBarItem name="Energy Flow" icon="FaProjectDiagram" />
            <SideBarItem name="Optimisations" icon="TbBulb" />
            <SideBarItem name="Targets" icon="TbTarget" />
            <SideBarItem name="Bill Validation" icon="TbReceipt" />
        </nav>
        <hr></hr>
    </>
  );
}
