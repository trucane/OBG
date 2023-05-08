import { Container,Typography } from '@mui/material';



export const ForexFactorySection = () => {
    return(
        
            <Container>
                <Typography component={'h4'} variant="h4">Forex Factory</Typography>
                <Typography component={'p'} variant="body1">
                    <a href='https://www.forexfactory.com' aria-label="Link to Forex Factory platform " target="_blank" rel="noreferrer">Forex Factory</a> is entirely focused on curating forex-market information for traders. The nature of this information is primarily real-time (i.e., what's happening right now), and the scope ranges from economic data to analysis from members.
                </Typography>
            </Container>
        
    )
}