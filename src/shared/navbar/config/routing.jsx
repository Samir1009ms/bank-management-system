import { RxDashboard } from "react-icons/rx";
import { IoAnalyticsOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import { RiAccountCircleLine } from "react-icons/ri";
import { TbSettings } from "react-icons/tb";
import { BiHelpCircle } from "react-icons/bi";
import s from "../design/style.module.scss";
import { Theme } from "../../../components/theme/theme"
import { BsCreditCard } from "react-icons/bs";

export const routing = [

  {
    link: "/",
    text: "dashboard",
    icon: <RxDashboard className={s.icon} />,
  },

  // {
  //   link: "/analytics",
  //   text: "analytics",
  //   icon: <IoAnalyticsOutline className={s.icon} />,
  // },
  {
    link: "/card",
    text: "Card",
    icon: <BsCreditCard className={s.icon} />,
  },
  {
    link: "/wallet",
    text: "wallet",
    icon: <IoWalletOutline className={s.icon} />,
  },
  {
    link: "/history",
    text: "history",
    icon: <RiAccountCircleLine className={s.icon} />,
  },
  {
    text: "settings",
    icon: <TbSettings className={s.icon} />,
  },
  //   {
  //     text: "security",
  //     icon: <MdOutlineSecurity className={s.icon} />,
  //   },
]

export const mod = [
  {
    text: "help",
    icon: <BiHelpCircle className={s.icon} />,
  },
  {
    icon: <Theme></Theme>
  },
]