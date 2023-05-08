import { Information } from '../pages/Information/Information';
import { AppWrapper } from '../AppWrapper';

export const InformationRoute = () => {
    return <AppWrapper children={<Information />} />;
};