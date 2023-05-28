import { GettingStartedComponent } from '../pages/Getting Started/GettingStarted'; 
import { AppWrapper } from '../AppWrapper/AppWrapper';

export const GettingStartedRoute = () => {
    return <AppWrapper children={<GettingStartedComponent />} />;
}