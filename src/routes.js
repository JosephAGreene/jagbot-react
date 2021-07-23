// Import Icons
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import BuildIcon from '@material-ui/icons/Build';
import {FaRobot } from 'react-icons/fa';
import HomeIcon from '@material-ui/icons/Home';
import { FiCommand } from 'react-icons/fi';

// Import Components
import Stash from "./views/Stash.js";
import Content from "./views/Content.js";
import CreateBot from "./views/CreateBot.js";
import Modules from "./views/Modules.js";
import CustomCommands from './views/CustomCommands.js';

const routes = [
  {
    name: 'hidden', // Do not display header/name
    path: 'stash',
    children: [
      { path: 'stash/mybots', name: 'Stashed Bots', icon: <FaRobot />, component: Stash },
      { path: 'stash/createbot', name: 'Build New Bot', icon: <BuildIcon />, component: CreateBot},
    ],
  },
  {
    name: 'Documentation',
    path: "stash",
    children: [
      { path: 'stash/documentation/analytics', name: 'Analytics', icon: <SettingsIcon />, component: Content },
      { path: 'stash/documentation/performance', name: 'Performance', icon: <TimerIcon />, component: Content },
      { path: 'stash/documentation/testlab', name: 'Test Lab', icon: <PhonelinkSetupIcon />, component: Content },
    ],
  },
  {
    name: 'hidden', // Do not display header/name
    path: 'develop',
    children: [
      { path: 'develop/modules', name: 'Modules', icon: <HomeIcon />, component: Modules },
      { path: 'develop/settings', name: 'Settings', icon: <SettingsIcon />, component: Content },
    ]
  },
  {
    name: "Develop",
    path: 'develop',
    children: [
      { path: 'develop/customcommands', name: 'Custom Commands', icon: <FiCommand />, component: CustomCommands },
      { path: 'develop/hosting', name: 'Hosting', icon: <PublicIcon />, component: Content },
      { path: 'develop/functions', name: 'Functions', icon: <SettingsEthernetIcon />, component: Content },
      { path: 'develop/mlkit', name: 'ML KIT', icon: <SettingsInputComponentIcon />, component: Content},
    ],
  },
  {
    name: 'Develop', 
    path: 'develop', 
    internal: true,  // Denotes internal routes, will not automatically display on any visible navigation
    children: [
      { path: 'develop/customcommands/single', component: Content },
    ]
  }
];

export default routes;