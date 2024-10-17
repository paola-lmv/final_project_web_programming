import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';

function Forecast({isAuthenticated}) {
    return (<>
    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <p>forecast</p>
    </>
    )
};

export default Forecast;