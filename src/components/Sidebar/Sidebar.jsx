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

function Sidebar({ isAdmin }) {
  const businessList = [
    { name: 'Home', path: '/BusinessDashboard', icon: 'home-smile' },
    { name: 'Donation History', path: '/BusinessDonationTrackingForm', icon: 'heart-circle' },
    { name: 'Supply Request', path: '/ContactUs', icon: 'package' },
    { name: 'Settings', path: '/EditContactInformation', icon: 'cog' },
  ];

  const adminList = [
    { name: 'Home', path: '/AdminDashboard', icon: 'home-smile' },
    { name: 'Donation Tracking', path: '/AdminDashboard', icon: 'building-house' },
    { name: 'Donation Items', path: '/AdminDashboard', icon: 'heart-circle' },
    { name: 'Settings', path: '/EditContactInformation', icon: 'cog' },
  ];

  const navList = isAdmin ? adminList : businessList;
  return (
    <ChakraProvider>
      <>
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
            <Divider marginLeft="1vh" marginTop="1vh" marginBttom="1vh" borderColor={'#CAC6BE'} />

            {navList.map(item => {
              return (
                <Button key={item.path} width="full" justifyContent="left" variant="ghost">
                  <box-icon
                    type="regular"
                    style={{ marginRight: '1vh' }}
                    name={item.icon}
                  ></box-icon>
                  <Link to={item.path}>{item.name}</Link>
                </Button>
              );
            })}

            {!isAdmin && (
              <Button key={'contact'} width="full" justifyContent="left" variant="ghost">
                <box-icon type="regular" name="help-circle"></box-icon>
                <Link to={'/ContactUs'}>Contact Us</Link>
              </Button>
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
                style={{ marginLeft: '30vh' }}
                name="log-out"
              ></box-icon>
            </Box>
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
