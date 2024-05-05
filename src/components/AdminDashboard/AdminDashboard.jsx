import './AdminDashboard.module.css';
import { useBackend } from '../../contexts/BackendContext';
import { useAuth } from '../../contexts/AuthContext.jsx';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer.jsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Stack, Text, Center, Divider } from '@chakra-ui/react';
import BusinessTable from '../BusinessTable/BusinessTable.jsx';
import { BiBuildingHouse, BiDonateHeart, BiFile, BiTime } from 'react-icons/bi';

const AdminDashboard = () => {
  // Created the use states
  const { backend } = useBackend();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [businessDictionary, setBusinessDictionary] = useState([]);
  const [pendingBusinesses, setPendingBusinesses] = useState([]);
  const [notification, setNotifications] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        checkIsAdmin();
        // fetches the business table to be used in pending &total #
        const businessResponse = await backend.get('/business/filter/All');
        setBusinessDictionary(businessResponse.data);
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
    for (const [value] of Object.entries(businessDictionary)) {
      const status = businessDictionary[value].submitted;
      if (status) {
        submittedBusinesses += 1;
      }
    }
    // return uniqueBusiness.length;
    return submittedBusinesses;
  };

  // Counts number of Donation Sites
  const calculateTotalDonationSites = () => {
    return Object.keys(businessDictionary).length;
  };

  // Calculates number of pending applications from businesses
  const calculatePendingBusinesses = () => {
    return pendingBusinesses;
  };

  return (
    <Box>
      <Flex margin="4vh 0 0 20px" justifyContent="space-between" alignItems="center">
        {
          <Stack flexDirection={'row'} justifyContent={'space-between'} width={'98%'}>
            <Text fontSize="30px" color="teal" fontWeight="bold">
              Welcome Back, jits
            </Text>
            <NotificationsDrawer notificationsData={notification} />
          </Stack>
        }
      </Flex>

      <Box>
        <>
          <Flex
            margin="4vh 20px 2vh 20px"
            borderRadius="16px"
            justifyContent="space-around"
            p={5}
            border="1px"
            borderColor="gray.200"
            bg="#FFFFFF"
          >
            <Flex justifyContent="center" alignItems="center">
              {<BiBuildingHouse color="teal" size={30} />}
              {
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
              }
            </Flex>
            {
              <Center height="50px">
                <Divider orientation="vertical" color="#E2E8F0" />
              </Center>
            }
            <Flex justifyContent="center" alignItems="center">
              {<BiDonateHeart color="teal" size={30} />}
              {
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
              }
            </Flex>
            {
              <Center height="50px">
                <Divider orientation="vertical" color="#E2E8F0" />
              </Center>
            }
            <Flex justifyContent="center" alignItems="center">
              {<BiFile color="teal" boxSize={6} />}
              {
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
              }
            </Flex>
            {
              <Center height="50px">
                <Divider orientation="vertical" color="#E2E8F0" />
              </Center>
            }
            <Flex justifyContent="center" alignItems="center">
              {<BiTime color="teal" boxSize={6} />}
              {
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
              }
            </Flex>
          </Flex>
          <BusinessTable />
        </>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
