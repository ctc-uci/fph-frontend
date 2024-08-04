import { useEffect, useState } from 'react';
import { Flex, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext.jsx';
import { useBackend } from '../../contexts/BackendContext.jsx';
import { pageStyle, pageTitleStyle } from '../../styles/sharedStyles.js';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer.jsx';
import AdminAccount from './AdminAccount.jsx';
import AdminsTable from './AdminsTable.jsx';

export const AdminSettingsMaster = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const { backend } = useBackend();

  useEffect(() => {
    const checkIsAdmin = async () => {
      if (!(await isAdmin())) {
        navigate('/BusinessDashboard');
      }
    };

    const fetchNotifications = async () => {
      const response = await backend.get('/notification/0');
      setNotifications(response.data);
    };

    checkIsAdmin();
    fetchNotifications();
  }, [isAdmin, navigate]);

  return (
    <Flex sx={pageStyle}>
      <HStack sx={{ width: 'full', justifyContent: 'space-between' }}>
        <Heading sx={pageTitleStyle}>Settings</Heading>
        <NotificationsDrawer notificationsData={notifications} />
      </HStack>

      <Tabs colorScheme="teal">
        <TabList display="inline-flex">
          <Tab>Admins</Tab>
          <Tab>Account</Tab>
        </TabList>

        <TabPanels>
          <TabPanel padding={0}>
            <AdminsTable />
          </TabPanel>
          <TabPanel padding={0}>
            <AdminAccount />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
