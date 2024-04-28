import { Link } from 'react-router-dom';
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
import { useNavigate } from 'react-router-dom';

function Sidebar({ isAdmin }) {
  const businessList = [
    { name: 'Home', path: '/BusinessDashboard', icon: 'home-smile' },
    { name: 'Donation History', path: '/BusinessDonationTrackingForm', icon: 'heart-circle' },
    { name: 'Supply Request', path: '/ContactUs', icon: 'package' },
    { name: 'Account', path: '/EditContactInformation', icon: 'user' },
  ];

  const adminList = [
    { name: 'Home', path: '/AdminDashboard', icon: 'home-smile' },
    { name: 'Donation Tracking', path: '/DonationTrackingTable', icon: 'building-house' },
    { name: 'Donation Items', path: '/DonationItemsTable', icon: 'heart-circle' },
    { name: 'Settings', path: '/AdminSettings', icon: 'cog' },
  ];

  const navigate = useNavigate();
  const { logout } = useAuth();

  const authLogout = async () => {
    try {
      logout();
      if (isAdmin) {
        navigate('/LoginAdmin');
      } else {
        navigate('/LoginBusiness');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const navList = isAdmin ? adminList : businessList;
  return (
    <ChakraProvider>
      <>
        <Flex width="35vh">
          <VStack marginLeft="-2vh" justifyContent={'space-between'}>
            <Flex flexDirection="column">
              <HStack marginTop="3vh">
                <Image
                  marginLeft="3vh"
                  marginRight="2vh"
                  borderRadius="full"
                  boxSize="6.5vh"
                  src={fphLogo}
                  alt="FPH Logo"
                />
                <Text color="teal" width="13vh" fontWeight="bold">
                  Feeding Pets of the Homeless
                </Text>
              </HStack>
              <Divider
                borderWidth="1.5px"
                width="30vh"
                marginTop="2vh"
                marginLeft="3vh"
                marginBottom="1vh"
                borderColor={'#CAC6BE'}
              />

              {navList.map(item => (
                <Link to={item.path} key={item.name} style={{ width: '100%', display: 'block' }}>
                  <Button
                    marginLeft="2vh"
                    marginTop="0.8vh"
                    width="full"
                    justifyContent="flex-start"
                    variant="ghost"
                  >
                    {/* Make sure box-icon is a valid component */}
                    <box-icon
                      type="regular"
                      name={item.icon}
                      style={{ marginRight: '1vh' }}
                    ></box-icon>
                    {item.name}
                  </Button>
                </Link>
              ))}
            </Flex>
            <Flex width="35vh" flexDirection="column">
              <VStack>
                {!isAdmin && (
                  <Link to={'/ContactUs'} style={{ width: '100%', display: 'block' }}>
                    <Button
                      width="full"
                      marginLeft="3vh"
                      justifyContent="flex-start"
                      variant="ghost"
                      as="footer"
                    >
                      <box-icon
                        type="regular"
                        name="help-circle"
                        style={{ marginRight: '0.5rem' }}
                      ></box-icon>
                      Contact Us
                    </Button>
                  </Link>
                )}

                <HStack
                  width="30vh"
                  as="footer"
                  py="4"
                  textAlign="left"
                  marginLeft="3vh"
                  borderTop="2px solid"
                  borderColor={'#CAC6BE'}
                  bottom="0"
                  left="0"
                  justifyContent={'space-between'}
                >
                  <Box>
                    <Text fontSize="0.8rem">Laura Brown</Text>
                    <Text fcolor={'#CAC6BE'} fontSize="0.8rem">
                      laurabrown@fph.com
                    </Text>
                  </Box>
                  <box-icon
                    type="regular"
                    color={'#857A6D'}
                    style={{ cursor: 'pointer' }}
                    name="log-out"
                    onClick={authLogout}
                  ></box-icon>
                </HStack>
              </VStack>
            </Flex>
          </VStack>
        </Flex>
      </>
    </ChakraProvider>
  );
}

Sidebar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Sidebar;
