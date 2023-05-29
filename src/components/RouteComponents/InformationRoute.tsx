import { Information } from '../pages/Information/Information';
import { AppWrapper } from '../AppWrapper/AppWrapper';

export const InformationRoute = () => {
    return <AppWrapper children={<Information />} />;
};