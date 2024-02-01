import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';

// Navbar is a container with a single button for Contact Us

function Navbar({ isAdmin }) {
  const businessList = [
    { name: 'Contact Us', path: '/ContactUs' },
  ];

  const adminList = [ ];

  const navList = isAdmin ? adminList : businessList;
  console.log(navList);
  return (
    <>
      <nav>
        <Button>
          <Link to={businessList[ 0 ].path}>{businessList[ 0 ].name}</Link>
        </Button>

        {/* <ul>
          {navList.map(item => {
            console.log(item);
            return (
              <li key={item.path}>
                <Link to={item.path}>{item.name}</Link>
              </li> //uh oh
            );
          })}
        </ul> */}

      </nav>
    </>
  );
}

Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Navbar;
