import { Link } from 'react-router-dom';
interface HyperLinkDefinitionProps {
    children: LinkStructure
}

type LinkStructure = {
    name: string,
    path: string,
}



export const HyperLinkDefinition = ({children}: HyperLinkDefinitionProps) => {

    return(
        <Link to={children.path} style={{listStyle: 'none', color: "#E4B337", fontWeight: "bold"}}>{children.name}</Link>
    )
}