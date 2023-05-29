import { DashboardComponent } from '../pages/Dashboard/Dashboard';
import { AppWrapper } from '../AppWrapper/AppWrapper';

export const DashboardRoute = () => {
    return <AppWrapper children={<DashboardComponent />} />;
};