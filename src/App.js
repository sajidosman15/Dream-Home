import HomePage from './Components/HomePage';
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import UploadAds from './Components/UploadAds';
import PostDetails from './Components/PostDetails';
import { Route, Switch,Redirect } from "react-router";
import Redirects from './Components/Redirect';
import ErrorPage from './Components/ErrorPage';
import MyPost from './Components/MyPost';
import SearchPost from './Components/SearchPost';
import SearchRedirect from './Components/SearchRedirect';
import EditPost from './Components/EditPost';


function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/uploadads' component={UploadAds} />
        <Route exact path='/mypost' component={MyPost} />
        <Route exact path='/Postdetails/:id' render={()=><PostDetails/>} />
        <Route exact path='/editpost/:id' render={()=><EditPost/>} />
        <Route exact path='/redirect/:id' render={()=><Redirects/>} />
        <Route exact path='/searchpost/:division/:district/:upazila/:type/:price' render={()=><SearchPost/>} />
        <Route exact path='/searchredirect/:division/:district/:upazila/:type/:price' render={()=><SearchRedirect/>} />
        <Route exact path='/registration' render={()=><Registration/>} />
        <Route exact path='/error' component={ErrorPage} />
        <Redirect to='/error' />

      </Switch>
    </>
  );
}

export default App;
