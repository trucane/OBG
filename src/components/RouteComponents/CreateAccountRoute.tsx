import { AppWrapper } from '../AppWrapper/AppWrapper';
import { CreateAccount } from '../pages/CreateAccount/createAccount';

export const CreateAccountRoute = () => {
    return <AppWrapper children={<CreateAccount />} />;
};