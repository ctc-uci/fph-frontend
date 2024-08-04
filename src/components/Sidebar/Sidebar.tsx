import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  BiBuildingHouse,
  BiCog,
  BiHeartCircle,
  BiHelpCircle,
  BiHomeSmile,
  BiLogOut,
  BiPackage,
  BiUser,
} from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';
import { ContactInformationModal } from './ContactInformationModal';
import fphLogo from '/fph_logo.png';

export const Sidebar = () => {
  const { backend } = useBackend();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure(); // State management for modal

  useEffect(() => {
    const checkIsAdmin = async () => {
      if (await isAdmin()) {
        setIsAdminUser(true);
      }
    };

    checkIsAdmin();
  }, []);

  useEffect(() => {
    getBusinessName();
  }, [backend]);

  const businessList = [
    { name: 'Home', path: '/BusinessDashboard', icon: BiHomeSmile },
    { name: 'Donation History', path: '/BusinessDonationHistory', icon: BiHeartCircle },
    { name: 'Supply Request', path: '/ContactUs', icon: BiPackage },
    { name: 'Account', path: '/EditContactInformation', icon: BiUser },
  ];

  const adminList = [
    { name: 'Home', path: '/AdminDashboard', icon: BiHomeSmile },
    { name: 'Donation Tracking', path: '/DonationTrackingTable', icon: BiBuildingHouse },
    { name: 'Donation Items', path: '/DonationItemsTable', icon: BiHeartCircle },
    { name: 'Settings', path: '/AdminSettings', icon: BiCog },
  ];

  const navigate = useNavigate();
  const { logout, isAdmin, currentUser } = useAuth();
  const [businessName, setBusinessName] = useState();

  const getBusinessName = async () => {
    const businessIdResponse = await backend.get(`/businessUser/${currentUser.uid}`);
    const businessContactResponse = await backend.get(`/business/${businessIdResponse.data[0].id}`);
    const businessName = businessContactResponse.data[0].name;
    setBusinessName(businessName);
  };

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
    <>
      <Flex
        sx={{
          width: '250px',
          minWidth: '250px',
          paddingX: '16px',
          paddingTop: '32px',
          paddingBottom: '24px',
          overflowY: 'scroll',
        }}
      >
        <VStack justifyContent={'space-between'} minHeight={500} width="100%">
          <Flex flexDirection="column">
            <HStack>
              <Image
                borderRadius="full"
                src={fphLogo}
                alt="FPH Logo"
                sx={{ width: 50, height: 50 }}
              />

              {/* fix me */}
              <Text color="teal" fontWeight="bold">
                {isAdminUser ? 'Feeding Pets of the Homeless' : businessName}
              </Text>
            </HStack>

            <Divider borderWidth="1px" my="24px" borderColor={'#CAC6BE'} />

            <VStack>
              {navList.map((item) => {
                return (
                  <Link to={item.path} key={item.name} style={{ width: '100%', display: 'block' }}>
                    <Button width="full" justifyContent="flex-start" variant="ghost" gap={2}>
                      <Icon as={item.icon} sx={{ width: 6, height: 6 }} />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </VStack>
          </Flex>

          <Flex flexDirection="column" w="100%">
            <VStack>
              {!isAdminUser && (
                <Button
                  onClick={onOpen}
                  width="full"
                  justifyContent="flex-start"
                  variant="ghost"
                  as="footer"
                  gap={2}
                >
                  <Icon as={BiHelpCircle} sx={{ width: 6, height: 6 }} />
                  <Text as="p">Contact Us</Text>
                </Button>
              )}

              <HStack
                as="footer"
                py="4"
                textAlign="left"
                borderTop="1px solid"
                borderColor={'#CAC6BE'}
                justifyContent={'space-between'}
                width="100%"
                paddingBottom={0}
              >
                <Box>
                  <Text fontSize="0.8rem">{currentUser?.displayName}</Text>
                  <Text color={'#857A6D'} fontSize="0.8rem">
                    {currentUser?.email}
                  </Text>
                </Box>

                <IconButton
                  variant={'ghost'}
                  color={'#857A6D'}
                  style={{ cursor: 'pointer' }}
                  aria-label="log-out"
                  icon={<BiLogOut />}
                  onClick={authLogout}
                />
              </HStack>
            </VStack>
          </Flex>
        </VStack>
      </Flex>

      <ContactInformationModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
