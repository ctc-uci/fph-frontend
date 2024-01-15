import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ isAdmin }) {
    const adminList = [
        {name: 'Dashboard', path: '/admin-dashboard'},
        {name: 'All Businesses', path: '/all-businesses'},
        {name: 'Manage Forms', path: '/manage-forms'},
        {name: 'Team Management', path: '/team-management'},
    ]

    const businessList = [
        {name: 'Dashboard', path: '/business-dashboard'},
        {name: 'Donation Tracking', path: '/donation-tracking'},
    ]

    const navList = isAdmin ? adminList : businessList;

    return (
        <>
            <nav>
                <ul>
                    {navList.map((item) => (
                        <li key={item.name}>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

Navbar.propTypes = {
    isAdmin: PropTypes.bool,
}

export default Navbar;