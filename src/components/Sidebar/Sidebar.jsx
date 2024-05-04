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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spacer,
  Icon
} from '@chakra-ui/react';
import 'boxicons';
import fphLogo from './fph-logo.png.png';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { BiBuildingHouse, BiPhone, BiEnvelope,} from 'react-icons/bi';


function Sidebar() {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure(); // State management for modal

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
    { name: 'Donation History', path: '/BusinessDonationHistory', icon: 'heart-circle' },
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
  const { logout, isAdmin } = useAuth();

  const authLogout = async () => {
    try {
      logout();
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  const navList = isAdminUser ? adminList : businessList;
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
                {!isAdminUser && (
                  <Link style={{ width: '100%', display: 'block' }}>
                    <Button onClick={onOpen} width="full" marginLeft="3vh" justifyContent="flex-start" variant="ghost" as="footer">
                      <box-icon type="regular" name="help-circle" style={{ marginRight: '0.5rem' }}></box-icon>
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Contact Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex alignItems="center">
                <Box color={'#359797'}>
                  <Icon as={BiBuildingHouse} />
                </Box>
                <Text as='b' ml={2}>Address</Text> {/* Added margin left for spacing */}
              </Flex>
              <Text>710 W Washington St, Carson City, NV 89703</Text>
              <Spacer height="4" />
              <Flex alignItems="center">
                <Box color={'#359797'}>
                  <Icon as={BiPhone} />
                </Box>
                <Text as='b' ml={2}>Phone Number</Text> {/* Added margin left for spacing */}
              </Flex>
              <Text>(775) 841-7463</Text>
              <Spacer height="4" />
              <Flex alignItems="center">
                <Box color={'#359797'}>
                  <Icon as={BiEnvelope} />
                </Box>
                <Text as='b' ml={2}>Email</Text> {/* Added margin left for spacing */}
              </Flex>
              <Text>info@petsofthehomeless.org</Text>
              <br />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    </ChakraProvider>
  );
}

Sidebar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Sidebar;
