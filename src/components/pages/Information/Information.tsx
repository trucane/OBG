import { TradingViewSection } from './TradingViewSection';
import { ForexFactorySection } from './ForexFactorySection';
import { LiveChartsSection } from './LiveChartsSection';
import { FxswaySection } from './FxswaySection';







export const Information = () => {


    return(
        <>
        <h1>Information</h1>
            <ForexFactorySection/>
            <FxswaySection/>
            <LiveChartsSection/>
            <TradingViewSection />
        </>
    )
}