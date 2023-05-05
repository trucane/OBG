import { DashboardComponent } from '../Dashboard/Dashboard';
import { AppWrapper } from '../AppWrapper';

export const DashboardRoute = () => {
    return <AppWrapper children={<DashboardComponent />} />;
};