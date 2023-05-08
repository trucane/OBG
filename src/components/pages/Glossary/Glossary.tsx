import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';

interface Props {
    name: string,
    definition: string,
    example?: string
}

const glossary = [
    {
        name: 'forex',
        definition: "Trading forex involves the buying of one currency and simultaneous selling of another",
    },
    {
        name: 'pip',
        definition: "The unit of measurement to express the change in value between two currencies",
        example: 'If EUR/USD moves from 1.1050 to 1.1051, that .0001 USD rise in value is ONE PIP.'
    },
    {
        name: 'lot', 
        definition: "A standard lot represents 100,000 units of any currency",
    },
    {
        name: 'mini lot', 
        definition: "A standard lot represents 10,000 units of any currency",
    },
    {
        name: 'micro lot', 
        definition: "A standard lot represents 1,000 units of any currency",
    },
]

export const Glossary = () => {

    return (
    <List
        sx={{
        width: '100%',
        position: 'relative',
        '& ul': { padding: 0 },
        }}
        >
        <ul>
            {glossary.sort((a,b) => a.name > b.name ? 1 : -1).map((item:Props, i) => (
                <ListItem key={i} id={item.name.replace(/\s/g, '').toLowerCase()}>
                    <ListItemText
                        primary={
                            <Typography variant="h4">{`${item.name}`}</Typography>
                            }
                        secondary={
                            <React.Fragment>
                                <Typography variant="body1" sx={{fontSize: "30px"}}>{`${item.definition}`}</Typography>
                                {item.example && (
                                <Typography variant="subtitle1"  sx={{fontSize: "30px"}}>{`${item.example}`}</Typography>
                                )}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            ))}
        </ul>
    </List>
);
}