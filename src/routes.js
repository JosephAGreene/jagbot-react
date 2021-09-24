// Import Icons
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import BuildIcon from '@material-ui/icons/Build';
import {FaRobot } from 'react-icons/fa';
import HomeIcon from '@material-ui/icons/Home';
import { FiCommand } from 'react-icons/fi';
import { FaUserSecret} from 'react-icons/fa';
import { GoMegaphone } from 'react-icons/go';
import { FaUserCog } from 'react-icons/fa';
import GavelIcon from '@material-ui/icons/Gavel';

// Import Components
import Stash from "./views/Stash.js";
import Content from "./views/Content.js";
import CreateBot from "./views/CreateBot.js";
import Modules from "./views/Modules.js";
import CustomCommands from './views/modules/CustomCommands.js';
import CustomCommandSingle from './views/modules/CustomCommandSingle.js';
import CustomCommandOptioned from './views/modules/CustomCommandOptioned.js';
import CustomCommandRandom from './views/modules/CustomCommandRandom.js';
import AutoModeration from './views/modules/AutoModeration.js';
import AutoModBannedWords from './views/modules/AutoModBannedWords.js';
import AutoModInviteLinks from './views/modules/AutoModInviteLinks.js';
import AutoModMassCaps from './views/modules/AutoModMassCaps.js';
import AutoModMassMentions from './views/modules/AutoModMassMentions.js';
import Announcements from './views/modules/Announcements.js';
import AnnouncementsJoin from './views/modules/AnnouncementsJoin.js';

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
      { path: 'develop/moderation', name: 'Moderation', icon: <GavelIcon />, component: Content },
      { path: 'develop/automoderation', name: 'Auto Moderation', icon: <FaUserSecret />, api: "bot", component: AutoModeration },
      { path: 'develop/customcommands', name: 'Custom Commands', icon: <FiCommand />, api: "bot", component: CustomCommands },
      { path: 'develop/announcements', name: 'Announcements', icon: <GoMegaphone />, api: "bot", component: Announcements },
      { path: 'develop/autorole', name: 'Auto Role', icon: <FaUserCog />, component: Content},
    ],
  },
  {
    name: 'Develop', 
    path: 'develop', 
    internal: true,  // Denotes internal routes, will not automatically display on any visible navigation
    children: [
      { path: 'develop/automoderation/bannedwords', api: "bot", component: AutoModBannedWords },
      { path: 'develop/automoderation/invitelinks', api: "bot", component: AutoModInviteLinks },
      { path: 'develop/automoderation/masscaps', api: "bot", component: AutoModMassCaps },
      { path: 'develop/automoderation/massmentions', api: "bot", component: AutoModMassMentions },
      { path: 'develop/customcommands/single', api: "bot", component: CustomCommandSingle },
      { path: 'develop/customcommands/optioned', api: "bot", component: CustomCommandOptioned },
      { path: 'develop/customcommands/random', api: "bot", component: CustomCommandRandom },
      { path: 'develop/announcements/join', api: "bot", component: AnnouncementsJoin },
    ]
  }
];

export default routes;