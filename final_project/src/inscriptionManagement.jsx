import NavbarUnLoged from './navbar_unloged';
import NavbarLoged from './navbar_loged';

function InscriptionManagement({isAuthenticated}) {
    return (<>
    {isAuthenticated ? (<NavbarLoged/>):(<NavbarUnLoged/>)}
    <p>InscriptionManagement</p>
    </>
    )
};

export default InscriptionManagement;