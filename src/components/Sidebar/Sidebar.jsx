import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ChakraProvider,
  Button,
  VStack,
  Divider,
  Flex,
  Image,
  Box,
  Text,
  HStack,
} from '@chakra-ui/react';
import 'boxicons';
import fphLogo from './fph-logo.png.png';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';

function Sidebar() {
  const { isAdmin } = useAuth();
  const [isAdminUser, setIsAdminUser] = useState(false);
  useEffect(() => {
    const checkIsAdmin = async () => {
      if (await isAdmin()) {
        setIsAdminUser(true);
      }
    };

    checkIsAdmin();
  });

  const businessList = [
    { name: 'Home', path: '/BusinessDashboard', icon: 'home-smile' },
    { name: 'Donation History', path: '/BusinessDonationTrackingForm', icon: 'heart-circle' },
    { name: 'Supply Request', path: '/ContactUs', icon: 'package' },
    { name: 'Settings', path: '/EditContactInformation', icon: 'cog' },
  ];

  const adminList = [
    { name: 'Home', path: '/AdminDashboard', icon: 'home-smile' },
    { name: 'Donation Tracking', path: '/DonationTrackingTable', icon: 'building-house' },
    { name: 'Donation Items', path: '/DonationItemsTable', icon: 'heart-circle' },
    { name: 'Settings', path: '/AdminUsers', icon: 'cog' },
  ];

  const navigate = useNavigate();
  const { logout } = useAuth();

  const authLogout = async () => {
    try {
      logout();
      if (isAdminUser) {
        navigate('/LoginAdmin');
      } else {
        navigate('/LoginBusiness');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const navList = isAdminUser ? adminList : businessList;
  return (
    <ChakraProvider>
      <Flex width="40vh">
        <VStack>
          <HStack marginLeft="1vh" marginTop="1vh">
            <Image
              borderRadius="full"
              boxSize="7.5vh"
              src={fphLogo}
              alt="FPH Logo"
              style={{ position: 'relative', top: '0', left: '0' }}
            />
            <Text color="teal" fontWeight="bold">
              Feeding Pets of the Homeless
            </Text>
          </HStack>
          <Divider marginLeft="1vh" marginTop="1vh" marginBottom="1vh" borderColor={'#CAC6BE'} />

          {navList.map(item => (
            <Link to={item.path} key={item.name} style={{ width: '100%', display: 'block' }}>
              <Button width="full" justifyContent="flex-start" variant="ghost">
                {/* Make sure box-icon is a valid component */}
                <box-icon type="regular" name={item.icon} style={{ marginRight: '1vh' }}></box-icon>
                {item.name}
              </Button>
            </Link>
          ))}

          {!isAdmin && (
            <Link to={'/ContactUs'} style={{ width: '100%', display: 'block' }}>
              <Button width="full" justifyContent="flex-start" variant="ghost">
                <box-icon type="regular" name="help-circle"></box-icon>
                Contact Us
              </Button>
            </Link>
          )}

          <Box
            as="footer"
            py="4"
            textAlign="left"
            marginLeft="3"
            borderTop="1px solid"
            borderColor={'#CAC6BE'}
            position="fixed"
            bottom="0"
            left="0"
            width="20%"
          >
            <Text fontSize="0.8rem">Laura Brown</Text>
            <Text fcolor={'#CAC6BE'} fontSize="0.8rem">
              laurabrown@fph.com
            </Text>
            <box-icon
              type="regular"
              color={'#857A6D'}
              style={{ marginLeft: '30vh', cursor: 'pointer' }}
              name="log-out"
              onClick={authLogout}
            ></box-icon>
          </Box>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}

Sidebar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Sidebar;
