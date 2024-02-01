import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';

// Navbar is a container with a single button for Contact Us

function Navbar({ showContactUs, title, showSettings, excelDownload, backButton}) {
  const businessList = [
    { name: 'Contact Us', path: '/ContactUs' },
    { name: 'Settings', path: '/EditContactInformation'},
    { name: 'Excel Download', path: '/Download'}, // Download not made yet
    { name: 'Back Button', path: '/Home'},
  ];

  //const navList = isAdmin ? adminList : businessList;
  //console.log(navList);
  return (
    <>
      <nav>
        <Button>
          <Link to={businessList[ 0 ].path}>{businessList[ 0 ].name}</Link>
        </Button>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Navbar;
