import { Redirect } from "react-router";
import { useParams} from 'react-router-dom';


const SearchRedirect = () => {
    const { division, district, upazila, type, price } = useParams();
    return <Redirect to={`/searchpost/${division}/${district}/${upazila}/${type}/${price}`} />
}

export default SearchRedirect;