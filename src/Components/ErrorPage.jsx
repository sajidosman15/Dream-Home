
import error from '../Images/404error.gif';
const ErrorPage = () => {

    const design={
        width:'100%',
        height:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column'
    }

    const imageStyle={
        height:'350px',
        width:'40%'
    }
    return (
        <div style={design}>
            {/* <h1>Page Not Found</h1> */}
            <img style={imageStyle} src={error} alt="404 Page Not Found"/>
        </div>
    );
}

export default ErrorPage;