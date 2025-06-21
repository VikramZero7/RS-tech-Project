import { RxDashboard } from "react-icons/rx";
import { MdPeopleAlt } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { TbMessage } from "react-icons/tb";

export const menuItem = [
  {
    id: 1,
    menuText: "Dashboard",
    icon: RxDashboard,
    path: "",
  },
  {
    id: 2,
    menuText: "Employee",
    icon: MdPeopleAlt,
    path: "employee",
  },
  {
    id: 3,
    menuText: "Calender",
    icon: FaCalendarDays,
    path: "calender",
  },
  {
    id: 4,
    menuText: "Messages",
    icon: TbMessage,
    path: "messages",
  },
];
