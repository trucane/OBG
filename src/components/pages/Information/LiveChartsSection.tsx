import { Container,Typography } from '@mui/material';

export const LiveChartsSection = () => {


    return(
        
            <Container>
                <Typography component={'h4'} variant="h4">Live Charts</Typography>
                <Typography component={'p'} variant="body1">
                    <a href='https://www.livecharts.co.uk/currency-strength.php' aria-label="view currency strength from live charts " target="_blank" rel="noreferrer">Live Charts</a> is a currency strength meter that gives you a quick visual guide to which currencies are currently strong, and which ones are weak. The meter measures the strength of all forex cross pairs and applies calculations on them to determine the overall strength for each individual currency. 
                </Typography>
            </Container>
        
    )
}