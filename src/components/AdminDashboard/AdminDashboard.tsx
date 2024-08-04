import { useEffect, useState } from 'react';
import { Box, Center, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { BiBuildingHouse, BiDonateHeart, BiFile, BiTime } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext.jsx';
import { useBackend } from '../../contexts/BackendContext.jsx';
import { pageStyle } from '../../styles/sharedStyles';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer.jsx';
import { BusinessTable } from './BusinessTable/BusinessTable';

export const AdminDashboard = () => {
  const { backend } = useBackend();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [pendingBusinesses, setPendingBusinesses] = useState([]);
  const [notification, setNotifications] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const businessResponse = await backend.get('/business');
        setBusinesses(businessResponse.data);

        const numPending = await backend.get('/business/totalBusinesses?tab=Pending');
        setPendingBusinesses(numPending.data[0]['count']);

        const notificationResponse = await backend.get(`/notification/0`);
        setNotifications(notificationResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const checkIsAdmin = async () => {
      if (!(await isAdmin())) {
        navigate('/BusinessDashboard');
      }
    };

    checkIsAdmin();
    getData();
  }, []);

  // Counts number of donation forms submitted by unique businesses
  const calculateTotalDonationForms = () => {
    // const uniqueBusiness = [];
    // for (const [value] of Object.entries(donationData)) {
    //   const businessId = value['business_id'];
    //   if (uniqueBusiness.includes(businessId) == false) {
    //     uniqueBusiness.push(businessId);
    //   }
    // }
    var submittedBusinesses = 0;
    for (const [value] of Object.entries(businesses)) {
      const status = businesses[value].submitted;
      if (status) {
        submittedBusinesses += 1;
      }
    }
    // return uniqueBusiness.length;
    return submittedBusinesses;
  };

  // Counts number of Donation Sites
  const calculateTotalDonationSites = () => {
    return Object.keys(businesses).length;
  };

  // Calculates number of pending applications from businesses
  const calculatePendingBusinesses = () => {
    return pendingBusinesses;
  };

  return (
    <Flex sx={pageStyle}>
      <Stack flexDirection={'row'} justifyContent={'space-between'} paddingY={4}>
        <Heading color="teal" fontWeight="bold">
          Welcome Back, jits
        </Heading>
        <NotificationsDrawer notificationsData={notification} />
      </Stack>

      <Flex
        borderRadius={8}
        justifyContent="space-around"
        p={4}
        borderWidth={1}
        borderColor="gray.200"
        bg="white"
      >
        <Flex justifyContent="center" alignItems="center">
          <BiBuildingHouse color="teal" size={30} />

          <div className="vstack">
            <div style={{ marginLeft: '12px' }}>
              <Box>
                <Text fontSize={25} fontWeight={500}>
                  {calculateTotalDonationSites()}
                </Text>
              </Box>
              <Box>
                <Text color="gray" mt={-2}>
                  Current Donation Sites
                </Text>
              </Box>
            </div>
          </div>
        </Flex>

        <Center height="50px">
          <Divider orientation="vertical" color="#E2E8F0" />
        </Center>

        <Flex justifyContent="center" alignItems="center">
          <BiDonateHeart color="teal" size={30} />

          <div className="vstack">
            <div style={{ marginLeft: '12px' }}>
              <Box>
                <Text fontSize={25} fontWeight={500}>
                  {calculateTotalDonationForms()}
                </Text>
              </Box>
              <Box>
                <Text color="gray" mt={-2}>
                  Donation Forms Submitted
                </Text>
              </Box>
            </div>
          </div>
        </Flex>

        <Center height="50px">
          <Divider orientation="vertical" color="#E2E8F0" />
        </Center>

        <Flex justifyContent="center" alignItems="center">
          <BiFile color="teal" size={30} />

          <div className="vstack">
            <div style={{ marginLeft: '12px' }}>
              <Box>
                <Text fontSize={25} fontWeight={500}>
                  {calculateTotalDonationSites() - calculateTotalDonationForms()}
                </Text>
              </Box>
              <Text color="gray" mt={-2}>
                Donation Forms Not Submitted
              </Text>
            </div>
          </div>
        </Flex>

        <Center height="50px">
          <Divider orientation="vertical" color="#E2E8F0" />
        </Center>

        <Flex justifyContent="center" alignItems="center">
          <BiTime color="teal" size={30} />

          <div className="vstack">
            <div style={{ marginLeft: '12px' }}>
              <Box>
                <Text fontSize={25} fontWeight={500}>
                  {calculatePendingBusinesses()}
                </Text>
              </Box>
              <Text color="gray" mt={-2}>
                Pending Applications
              </Text>
            </div>
          </div>
        </Flex>
      </Flex>

      <BusinessTable />
    </Flex>
  );
};