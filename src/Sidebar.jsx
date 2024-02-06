import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Sidebar({ isAdmin }) {
  const businessList = [
    { name: 'Dashboard', path: '/BusinessDashboard' },
    { name: 'Donation Tracking Form', path: '/BusinessDonationTrackingForm' },
    { name: 'Business Onboarding', path: '/BusinessOnboardingForm' },
    { name: 'Business Notification Center', path: '/BusinessNotificationCenter' },
    { name: 'Settings', path: '/EditContactInformation' },
  ];

  const adminList = [
    { name: 'Dashboard', path: '/AdminDashboard' },
    { name: 'All Businesses', path: '/AdminAllBusinesses' },
    { name: 'Manage Forms', path: '/AdminManageForms' },
    { name: 'Team Management', path: '/AdminTeamManagement' },
    { name: 'Settings', path: '/EditContactInformation' },
  ];

  const navList = isAdmin ? adminList : businessList;
  return (
    <>
      <nav>
        <ul>
          {navList.map(item => {
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

Sidebar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Sidebar;
