import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PeopleIcon from '@mui/icons-material/People';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LayersIcon from '@mui/icons-material/Layers';
import SchoolIcon from '@mui/icons-material/School';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NoteIcon from '@mui/icons-material/Note';
import UpdateIcon from '@mui/icons-material/Update';
import CalculateIcon from '@mui/icons-material/Calculate';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import ConstructionIcon from '@mui/icons-material/Construction';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CompareIcon from '@mui/icons-material/Compare';
// import FolderCopyIcon from '@mui/icons-material/FolderCopy';
// import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
// import Twitter from '@mui/icons-material/Twitter';
// import Facebook from '@mui/icons-material/Facebook';
import Email from '@mui/icons-material/Email';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
// import StarBorder from '@mui/icons-material/StarBorder';
import {SideNavListItem} from './SideNavListItem'

export const SideNavSectionPrimary = () => (
  <React.Fragment>
    <SideNavListItem 
      OptionIcon={{icon:<DashboardIcon/>,text: 'Dashboard', link:'/dashboard'}}
    />
    <SideNavListItem 
      OptionIcon={{icon:<RecentActorsIcon/>,text: 'Contact'}}
      subList={[
        {icon: <Email/>, text: "Email"},
        // {icon: <Twitter/>, text: "Twitter"},
        // {icon: <Facebook/>, text: "Facebook"},
      ]}
    />
  </React.Fragment>
);
export const SideNavSectionSecondary = () => (
  <React.Fragment>
    <SideNavListItem 
      OptionIcon={{icon:<AssignmentIcon/>,text: 'Getting Started'}}
      subList={[
        {icon: <LayersIcon/>, text: "iGenuis"},
        {icon: <GroupsIcon/>, text: "FXSWAY"},
        {icon: <MoneyOffIcon/>, text: "Demo Account"},
        {icon: <ShowChartIcon/>, text: "MT4"},
        {icon: <GroupsIcon/>, text: "Crypto Wallet"},
      ]}
    />
    <SideNavListItem 
      OptionIcon={{icon:<ConstructionIcon/>,text: 'Tools'}}
      subList={[
        {icon: <NoteIcon/>, text: "Notes"},
        {icon: <CalculateIcon/>, text: "Calculator"},
        {icon: <UpdateIcon/>, text: "Projection"},
        {icon: <MenuBookIcon/>, text: "Bookkeeping "},
      ]}
    />
    <SideNavListItem 
      OptionIcon={{icon:<SchoolIcon/>,text: 'Learning'}}
      subList={[
        {icon: <VideoLibraryIcon/>, text: "OBG Sessions"},
        {icon: <LayersIcon/>, text: "IGenius"},
      ]}
    />
    <SideNavListItem 
      OptionIcon={{icon:<CloudQueueIcon/>,text: 'Sites'}}
      subList={[
        {icon: <BarChartIcon/>, text: "Trading view", link:'/info/tradingview'},
        {icon: <NewspaperIcon/>, text: "Forex Factory", link:'/info/forexfactory'},
        {icon: <CurrencyExchangeIcon/>, text: "FXSWAY", link:'/info/fxsway'},
        {icon: <CompareIcon/>, text: "Live Charts", link:'/info/livecharts'},
      ]}
    />
    <SideNavListItem 
      OptionIcon={{icon:<CalendarIcon/>,text: 'Calendar'}}
    />
  </React.Fragment>
);