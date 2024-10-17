import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';

function Login({isAuthenticated}) {

    return (<>
    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <p>login</p>
    
    
    </>
    )
};

export default Login;