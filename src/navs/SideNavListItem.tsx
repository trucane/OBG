import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom'; 
// import ListSubheader from '@mui/material/ListSubheader';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import LayersIcon from '@mui/icons-material/Layers';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
// import StarBorder from '@mui/icons-material/StarBorder';
// import {SvgIconComponent} from '@mui/icons-material';
// import Icon, {IconTypeMap} from '@mui/material/Icon';
import { SvgIconProps } from '@mui/material/SvgIcon';

interface ListItemProps {
    OptionIcon: ItemValues
    subList?: Array<ItemValues>
    link?: string
}

type ItemValues = {
    icon: React.ReactElement<SvgIconProps>,
    text: string
    link?: string
    to?: string
}


export const SideNavListItem = ({OptionIcon, subList, link}: ListItemProps)  => {
    let navigate = useNavigate()

    const toggleCollapse = () => {
        setOpen(!open)
    }
    
    const handleNavigate = (providedLink: string) => {
        navigate(providedLink)
    }

    const [open, setOpen] = React.useState<boolean>(false);
    return( <React.Fragment>
                <ListItemButton onClick={ () => {
                   OptionIcon.link ? handleNavigate(OptionIcon.link) : toggleCollapse()
                }}>
                    <ListItemIcon>
                        {OptionIcon.icon}
                    </ListItemIcon>
                    <ListItemText primary={OptionIcon.text} />
                </ListItemButton>
                {subList && subList.map((item, indx) => (
                    <Collapse key={indx} in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => {
                                if(item.link){handleNavigate(item.link)}}}>
                                 <ListItemIcon>
                                    { item.to 
                                    ? <a target='_blank' rel="noreferrer"  aria-label={`link to ${item.text}`} style={{textDecoration:'none', color:"inherit"}} href={item.to}>
                                    {item.icon}</a>
                                    : item.icon
                                }
                                </ListItemIcon>
                                <ListItemText>
                                { item.to 
                                    ? <a target='_blank' rel="noreferrer"  aria-label={`link to ${item.text}`} style={{textDecoration:'none', color:"inherit"}} href={item.to}>
                                    {item.text}</a>
                                    : item.text
                                }
                                </ListItemText>
                            </ListItemButton>
                        </List>
                    </Collapse>
                ))}
        </React.Fragment>
    )
}