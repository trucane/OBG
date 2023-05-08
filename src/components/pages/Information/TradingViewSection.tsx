import { Container, Typography } from '@mui/material';



export const TradingViewSection = () => {


    return(
        
            <Container>
                <Typography component={'h4'} variant="h4">TradingView</Typography>
                <Typography component={'p'} variant="body1"><a href='https://www.tradingview.com/' aria-label="Link to Trading View platform " target="_blank" rel="noreferrer">TradingView</a> is a charting platform and social network that is used by retail traders and institutional investors to analyze financial assets.

        These financial instruments include stocks, currencies, indices, forex, futures, bonds, or even cryptocurrencies.

        At their most basic form, TradingView charts offer a high-level overview of an asset’s performance over a certain amount of time. This includes the open, high, low, and close price for each candlestick.

        On top of that, TradingView has developed its own scripting language called Pine Script, which enables users to customize the tool.

        What sets TradingView apart is the social component that is native to its chart tool. Users can follow other traders, publish their own charts and investment theses, or even live stream themselves while analyzing charts.

        On top of that, TradingView also shares various financial news and updates, such as a financial calendar for earnings updates.

        The TradingView platform can be accessed by visiting its website as well as by downloading its desktop or mobile application (available on Android and iOS devices).</Typography>
            </Container>
        
    )
}