import './AdminDashboard.module.css';

import { useBackend } from '../../contexts/BackendContext';
import { useAuth } from '../../contexts/AuthContext.jsx';
import NotificationsDrawer from './NotificationsDrawer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import AdminFilterBusinesses from '../AdminFilterBusinesses/AdminFilterBusinesses.jsx';

const AdminDashboard = () => {
  // Created the use states
  const { backend } = useBackend();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [donationData, setDonationData] = useState([]);
  const [businessDictionary, setBusinessDictionary] = useState([]);
  const [notification, setNotifications] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // fetches the business table to be used in pending &total #
        const businessResponse = await backend.get('/business');
        setBusinessDictionary(businessResponse.data);
        // fetches donation table data
        const donationResponse = await backend.get('/donation/');
        setDonationData(donationResponse.data);

        const notificationResponse = await backend.get(`/notification/0`);
        setNotifications(notificationResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const checkIsAdmin = async () => {
      if (!(await isAdmin())) {
        setIsAdminUser(true);
        navigate('/BusinessDashboard');
      }
    };

    checkIsAdmin();
    getData();
  }, []);

  // Counts number of donation forms submitted by unique businesses
  const calculateTotalDonationForms = () => {
    const uniqueBusiness = [];
    for (const [value] of Object.entries(donationData)) {
      const businessId = value['business_id'];
      if (uniqueBusiness.includes(businessId) == false) {
        uniqueBusiness.push(businessId);
      }
    }

    return uniqueBusiness.length;
  };

  // Counts number of Donation Sites
  const calculateTotalDonationSites = () => {
    return Object.keys(businessDictionary).length;
  };

  const calculatePendingBusinesses = () => {
    var pendingBusinesses = 0;
    for (const [value] of Object.entries(businessDictionary)) {
      const pendingStatus = businessDictionary[value].status;
      if (pendingStatus == 'Pending') {
        pendingBusinesses += 1;
      }
    }
    return pendingBusinesses;
  };

  return (
    <>
      {isAdminUser && (
        <div>
          <h1>Welcome back, Jit!</h1>

          <div>
            <>
              <Box>{calculateTotalDonationSites()} Current donation sites</Box>
              <Box>{calculateTotalDonationForms()} donation forms submitted</Box>
              <Box>
                {calculateTotalDonationSites() - calculateTotalDonationForms()} donation forms not
                submitted
              </Box>
              <Box>{calculatePendingBusinesses()} applications pending </Box>
              <AdminFilterBusinesses />
              <NotificationsDrawer notificationsData={notification} />
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
