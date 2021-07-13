// Icons
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup'

// Components
import Content from "./views/content.js";
import Content2 from "./views/content2.js";

const routes = [
  {
    id: 'Develop',
    children: [
      { id: 'content', icon: <PeopleIcon />, component: Content, active: true },
      { id: 'content2', icon: <DnsRoundedIcon />, component: Content2 },
      { id: 'Storage', icon: <PermMediaOutlinedIcon />, component: Content2 },
      { id: 'Hosting', icon: <PublicIcon />, component: Content2 },
      { id: 'Functions', icon: <SettingsEthernetIcon />, component: Content2 },
      { id: 'ML Kit', icon: <SettingsInputComponentIcon />, component: Content2},
    ],
  },
  {
    id: 'Quality',
    children: [
      { id: 'Analytics', icon: <SettingsIcon />, component: Content },
      { id: 'Performance', icon: <TimerIcon />, component: Content2 },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon />, component: Content2 },
    ],
  },
];

export default routes;