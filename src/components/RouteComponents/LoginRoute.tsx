import { LoginPage } from '../pages/Login/Login'; 
import { AppWrapper } from '../AppWrapper/AppWrapper';

export const LoginRoute = () => {
    return <AppWrapper children={<LoginPage />} />;
};