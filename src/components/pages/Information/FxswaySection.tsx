import { Container,Typography } from '@mui/material';
import { HyperLinkDefinition } from '../../common/HyperLikeDefinition';

export const FxswaySection = () => {


    return(
        
            <Container>
                <Typography component={'h4'} variant="h4">FXS Way</Typography>
                <Typography component={'p'} variant="body1">
                    FXSway is an online <HyperLinkDefinition children={{name: 'forex', path:"/glossary#forex"}} /> and CFD broker that offers trading services on a range of financial instruments, including forex, stocks, cryptocurrencies, indices, and commodities.
                </Typography> <a href='https://fxsway.com/' aria-label="view currency strength from live charts " target="_blank" rel="noreferrer">visit site</a>
            </Container>
        
    )
}