import './AdminDashboard.module.css';

import { useBackend } from '../../contexts/BackendContext';
import { useEffect, useState } from 'react';
import { Box, Button, IconButton, Container } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

const AdminDashboard = () => {
  // Created the use states
  const { backend } = useBackend();
  const [donationData, setDonationData] = useState([]);
  const [businessDictionary, setBusinessDictionary] = useState([]);
  const [totalSites, setTotalSites] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // fetches the business table to be used in pending &total #
        const businessResponse = await backend.get('/business');
        setBusinessDictionary(businessResponse.data);
        // fetches total amount of businesses
        const totalSitesResponse = await backend.get('/business/totalSites');
        setTotalSites(totalSitesResponse.data[0]["count"]);
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
    const uniqueBusiness = [];
    for (const [key, value] of Object.entries(donationData)) {
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
    for (const [key, value] of Object.entries(businessDictionary)) {
      console.log(key);
      const pendingStatus = value['status'];
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
           <Box>{totalSites} Current donation sites</Box>
          <Box>{calculateTotalDonationForms()} donation forms submitted</Box>
          <Box>
            {totalSites - calculateTotalDonationForms()} donation forms not
            submitted
          </Box>
          <Box>{calculatePendingBusinesses()} applications pending </Box>
          <Container>
            <Button>Submitted</Button>
            <Button>Not Submitted</Button>
          </Container>
          <IconButton aria-label="Back button" icon={<ChevronLeftIcon/>}/>
          <IconButton aria-label="Next button" icon={<ChevronRightIcon/>}/>
        </>
      </div>
    </div>
  );
};

export default AdminDashboard;
