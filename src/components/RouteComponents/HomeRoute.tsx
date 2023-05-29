import { Home } from '../pages/Home/Home';
import { AppWrapper } from '../AppWrapper/AppWrapper';

export const HomeRoute = () => {
    return <AppWrapper children={<Home />} />;
};