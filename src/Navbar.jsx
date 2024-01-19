import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ isAdmin }) {
    const businessList = [
        {'name' : 'Dashboard', 'path' : '/BusinessDashboard'},
        {'name' : 'Donation Tracking', 'path' : '/BusinessDonationTracking'},
    ];

    const adminList = [
        {'name' : 'Dashboard', 'path': '/AdminDashboard'},
        {'name' : 'All Businesses', 'path': '/AdminAllBusinesses'},
        {'name' : 'Manage Forms', 'path' : '/AdminManageForms'},
        {'name' : 'Team Management', 'path' : '/AdminTeamManagement'},
    ];

    const navList = isAdmin ? adminList : businessList;
    console.log(navList);
    return (
        <>
            <nav>
                <ul>
                    {navList.map((item) => {
                        console.log(item);
                        return (
                            <li key={item.path}>
                                <Link to={item.path}>{item.name}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}

Navbar.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
}

export default Navbar;