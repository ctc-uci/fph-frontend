import './AdminDashboard.module.css';
import { useBackend } from '../../contexts/BackendContext';
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

const BusinessDashboard = () => {
  // Created the use states
  const { backend } = useBackend();
  const [donationData, setDonationData] = useState([]);
  const [businessDictionary, setBusinessDictionary] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // fetches the business table to be used in pending &total #
        const businessResponse = await backend.get('/business');
        setBusinessDictionary(businessResponse.data);

        // fetches donation table data
        const donationResponse = await backend.get('/donation/');
        setDonationData(donationResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  // Counts number of donation forms submitted by unique businesses
  const calculateTotalDonationForms = () => {
    const uniqueBusiness = new Set();
    for (const value of Object.values(donationData)) {
      const businessId = value['business_id'];
      uniqueBusiness.add(businessId)
    }
    return uniqueBusiness.size;
  };

  // Counts number of Donation Sites
  const calculateTotalDonationSites = () => {
    return Object.keys(businessDictionary).length;
  };

  const calculatePendingBusinesses = () => {
    var pendingBusinesses = 0;
    for (const value of Object.values(businessDictionary)) {
      const pendingStatus = value['onboarding_status'];
      if (pendingStatus == 'Pending') {
        pendingBusinesses += 1;
      }
    }
    return pendingBusinesses;
  };

  return (
    <div>
      <h1>Welcome back, Jit!</h1>
      <div>
        <>
          <Box>{calculateTotalDonationSites()} Current donation sites</Box>
          <Box>{calculateTotalDonationForms()} Donation forms submitted</Box>
          <Box>
            {calculateTotalDonationSites() - calculateTotalDonationForms()} Donation forms not
            submitted
          </Box>
          <Box>{calculatePendingBusinesses()} Applications pending </Box>
        </>
      </div>
    </div>
  );
};

export default BusinessDashboard;
