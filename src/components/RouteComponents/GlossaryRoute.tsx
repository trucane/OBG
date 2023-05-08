import { Glossary } from '../pages/Glossary/Glossary';
import { AppWrapper } from '../AppWrapper';

export const GlossaryRoute = () => {
    return <AppWrapper children={<Glossary />} />;
}