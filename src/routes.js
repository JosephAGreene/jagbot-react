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
import CreateBot from "./views/createBot.js";

const routes = [
  {
    id: 'Develop',
    children: [
      { path: 'content', name: 'Content', icon: <PeopleIcon />, component: Content },
      { path: 'createbot', name: 'Create Bot', icon: <DnsRoundedIcon />, component: CreateBot},
      { path: 'storage', name: 'Storage', icon: <PermMediaOutlinedIcon />, component: Content2 },
      { path: 'hosting', name: 'Hosting', icon: <PublicIcon />, component: Content2 },
      { path: 'functions', name: 'Functions', icon: <SettingsEthernetIcon />, component: Content2 },
      { path: 'mlkit', name: 'ML KIT', icon: <SettingsInputComponentIcon />, component: Content2},
    ],
  },
  {
    id: 'Quality',
    children: [
      { path: 'analytics', name: 'Analytics', icon: <SettingsIcon />, component: Content },
      { path: 'performance', name: 'Performance', icon: <TimerIcon />, component: Content2 },
      { path: 'testlab', name: 'Test Lab', icon: <PhonelinkSetupIcon />, component: Content2 },
    ],
  },
];

export default routes;