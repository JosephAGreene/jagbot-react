// Import Icons
import PeopleIcon from '@material-ui/icons/People';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import BuildIcon from '@material-ui/icons/Build';
import {FaRobot } from 'react-icons/fa';
import HomeIcon from '@material-ui/icons/Home';

// Import Components
import Garage from "./views/garage.js";
import Content from "./views/content.js";
import Content2 from "./views/content2.js";
import CreateBot from "./views/createBot.js";
import Modules from "./views/modules.js";

const routes = [
  {
    name: 'hidden', // Do not display header/name
    path: 'garage',
    children: [
      { path: 'garage/mybots', name: 'Stashed Bots', icon: <FaRobot />, component: Garage },
      { path: 'garage/createbot', name: 'Build New Bot', icon: <BuildIcon />, component: CreateBot},
    ],
  },
  {
    name: 'Documentation',
    path: "garage",
    children: [
      { path: 'garage/documentation/analytics', name: 'Analytics', icon: <SettingsIcon />, component: Content },
      { path: 'garage/documentation/performance', name: 'Performance', icon: <TimerIcon />, component: Content2 },
      { path: 'garage/documentation/testlab', name: 'Test Lab', icon: <PhonelinkSetupIcon />, component: Content2 },
    ],
  },
  {
    name: 'hidden', // Do not display header/name
    path: 'develop',
    children: [
      { path: 'develop/modules', name: 'Modules', icon: <HomeIcon />, component: Modules },
      { path: 'develop/settings', name: 'Settings', icon: <SettingsIcon />, component: Content2 },
    ]
  },
  {
    name: "Develop",
    path: 'develop',
    children: [
      { path: 'develop/content', name: 'Content', icon: <PeopleIcon />, component: Content },
      { path: 'develop/hosting', name: 'Hosting', icon: <PublicIcon />, component: Content2 },
      { path: 'develop/functions', name: 'Functions', icon: <SettingsEthernetIcon />, component: Content2 },
      { path: 'develop/mlkit', name: 'ML KIT', icon: <SettingsInputComponentIcon />, component: Content2},
    ],
  },
];

export default routes;