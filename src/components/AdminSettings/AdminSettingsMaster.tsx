import { useEffect, useState } from 'react';
import { Flex, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { useBackend } from '../../contexts/BackendContext';
import { pageStyle, pageTitleStyle } from '../../styles/sharedStyles.js';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer';
import AdminAccount from './AdminAccount';
import AdminsTable from './AdminsTable';

export const AdminSettingsMaster = () => {
  const { backend } = useBackend();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await backend.get('/notification/0');
      setNotifications(response.data);
    };

    fetchNotifications();
  }, []);

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
