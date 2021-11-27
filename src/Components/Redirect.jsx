import { Redirect } from "react-router";
import { useParams} from 'react-router-dom';
const Redirects=()=>{
    const { id } = useParams();
    return <Redirect to={`/Postdetails/${id}`} />
}

export default Redirects;