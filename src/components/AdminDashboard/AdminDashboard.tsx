import { useEffect, useState } from 'react';
import { Flex, Heading, Stack } from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';
import { pageStyle } from '../../styles/sharedStyles';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer';
import { AdminTotals } from './AdminTotals.js';
import { BusinessTable } from './BusinessTable/BusinessTable';

export const AdminDashboard = () => {
  const { backend } = useBackend();
  const { currentUser } = useAuth();

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

    getData();
  }, []);

  return (
    <Flex sx={pageStyle}>
      <Stack flexDirection={'row'} justifyContent={'space-between'} paddingY={4}>
        <Heading color="teal" fontWeight="bold">
          Welcome Back{currentUser.displayName ? `,${currentUser.displayName}` : '!'}
        </Heading>
        <NotificationsDrawer notificationsData={notification} />
      </Stack>

      <AdminTotals businesses={businesses} pendingBusinesses={pendingBusinesses} />

      <BusinessTable />
    </Flex>
  );
};
