import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IconButton, Button } from '@chakra-ui/react';
import {ChevronLeftIcon} from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

// Navbar is a container with a single button for Contact Us

function Navbar({ showContactUs, title, showSettings, excelDownload, backButton}) { // what is title
  const navigate = useNavigate();
  const businessList = [
    { name: 'Contact Us', path: '/ContactUs' },
    { name: 'Settings', path: '/EditContactInformation'},
    { name: 'Excel Download', path: '/Download'}, // Download not made yet
    { name: 'Back Button', path: '/Home'},
  ];

  //const navList = isAdmin ? adminList : businessList;
  //console.log(navList);

  const navList = businessList.filter(item => {
    if (item.name === 'Contact Us' && showContactUs)
      return true;
    if (item.name === 'Settings' && showSettings)
      return true;
    if (item.name === 'Excel Download' && excelDownload)
      return true;
    if (item.name === 'Back Button' && backButton)
      return true;
    return false;
  });

    console.log(navList);

  return (
    <>
      <nav>
      <IconButton aria-label='Back button' icon={<ChevronLeftIcon />} onClick={() => navigate('/Home')} />
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
