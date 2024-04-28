import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/react';
import AdminsTable from './AdminsTable.jsx';
import AdminAccount from './AdminAccount.jsx';
import classes from './AdminSettings.module.css';

const AdminSettingsMaster = () => {
  return (
    <div className={classes.container}>
      <div className={classes.ditTitleContainer}>
        <Text>Settings</Text>
      </div>
      <Tabs className={classes.tabs} colorScheme="teal">
        <TabList display="inline-flex">
          <Tab>Admins</Tab>
          <Tab>Account</Tab>
        </TabList>

        <TabPanels>
          <TabPanel padding="16px 0px">
            <AdminsTable />
          </TabPanel>
          <TabPanel>
            <AdminAccount />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default AdminSettingsMaster;
