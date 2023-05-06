import { DashboardComponent } from '../pages/Dashboard/Dashboard';
import { AppWrapper } from '../AppWrapper';

export const DashboardRoute = () => {
    return <AppWrapper children={<DashboardComponent />} />;
};