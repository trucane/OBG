import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
}

type ItemValues = {
    icon: React.ReactElement<SvgIconProps>,
    text: string
}


export const SideNavListItem = ({OptionIcon, subList}: ListItemProps)  => {

    const [open, setOpen] = React.useState<boolean>(false);
    return( <React.Fragment>
                <ListItemButton onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                        {OptionIcon.icon}
                    </ListItemIcon>
                    <ListItemText primary={OptionIcon.text} />
                </ListItemButton>
                {subList && subList.map((item, indx) => (
                    <Collapse key={indx} in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </List>
                    </Collapse>
                ))}
        </React.Fragment>
    )
}