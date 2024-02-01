import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Sidebar({ isAdmin }) {
  const businessList = [
    { name: 'Dashboard', path: '/BusinessDashboard' },
    { name: 'Donation Tracking Form', path: '/BusinessDonationTrackingForm' },
    { name: 'Business Onboarding', path: '/BusinessOnboardingForm' },
    { name: 'Business Notification Center', path: '/BusinessNotificationCenter' },
  ];

  const adminList = [
    { name: 'Dashboard', path: '/AdminDashboard' },
    { name: 'All Businesses', path: '/AdminAllBusinesses' },
    { name: 'Manage Forms', path: '/AdminManageForms' },
    { name: 'Team Management', path: '/AdminTeamManagement' },
  ];

  const navList = isAdmin ? adminList : businessList;
  console.log(navList);
  return (
    <>
      <nav>
        <ul>
          {navList.map(item => {
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

Sidebar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Sidebar;
