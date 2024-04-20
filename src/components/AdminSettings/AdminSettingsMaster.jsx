import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import AdminsTable from './AdminsTable.jsx';
import AdminAccount from './AdminAccount.jsx';

const AdminSettingsMaster = () => {
  return (
    <>
      <h1>Settings</h1>
      <Tabs>
        <TabList>
          <Tab>Admins</Tab>
          <Tab>Account</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AdminsTable />
          </TabPanel>
          <TabPanel>
            <AdminAccount />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default AdminSettingsMaster;
