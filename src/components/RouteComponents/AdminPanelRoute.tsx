import { AdminPanel } from '../Admin/pages/AdminPanel/AdminPanel';
import { AppWrapper } from '../AppWrapper';

export const AdminPanelRoute = () => {
    return <AppWrapper children={<AdminPanel />} />;
};