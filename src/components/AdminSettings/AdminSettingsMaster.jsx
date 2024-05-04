import { useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/react';
import AdminsTable from './AdminsTable.jsx';
import AdminAccount from './AdminAccount.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import classes from './AdminSettings.module.css';

const AdminSettingsMaster = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsAdmin = async () => {
      if (!(await isAdmin())) {
        navigate('/BusinessDashboard');
      }
    };
    checkIsAdmin();
  }, [isAdmin, navigate]);

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
