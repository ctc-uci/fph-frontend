import './AdminFilterBusinesses.module.css';
import BusinessTable from '../BusinessTable/BusinessTable.jsx';
import BusinessTablePending from '../BusinessTablePending/BusinessTablePending.jsx';

import { useBackend } from '../../contexts/BackendContext';
import { useEffect, useState } from 'react';
import { Box, IconButton, Tabs, TabList, Tab } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate, Outlet } from 'react-router-dom';

const AdminFilterBusinesses = () => {
  // Created the use states
  const { backend } = useBackend();
  //const [donationData, setDonationData] = useState([]);
  const [businessDictionary, setBusinessDictionary] = useState([]);
  const [currentBusinessNum, setCurrentBusinessNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [currentTab, setCurrentTab] = useState('All'); //change to all once all page is implemented
  const [pageLimit, setPageLimit] = useState(1);
  const [tabName, setTabName] = useState('Submitted');
  const navigation = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('re-rendered');
        loadInfo(currentTab);
        navigation(`/AdminDashboard/${tabName}`);
        console.log(businessDictionary);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [currentTab, currentPageNum, tabName]);

  const changeTab = async (tab, tabName) => {
    setCurrentTab(tab);
    setCurrentPageNum(1);
    setTabName(tabName);
    // Load data based on the selected tab
    // if (tab === 'All') {
    //   const activeData = await loadInfo('Active'); // Load data for active businesses
    //   const pendingData = await backend.get(`/business/?businessLimit=10&pageNum=1&tab=Pending`);
    //   setBusinessDictionary(prevData => [...prevData, ...pendingData.data]); // Append pending businesses to existing data
    //   setBusinessDictionary(prevData => [...prevData, ...activeData.data])
    //   setCurrentBusinessNum(setBusinessDictionary.length);
    //   setPageLimit(1);
    // }
    // else {
    await loadInfo(tab); // Load data based on the selected tab
    // }
  };

  const loadInfo = async tab => {
    changePage();
    if (tab === 'All') {
      const businessResponseActive = await backend.get(
        `/business/?businessLimit=10&pageNum=${currentPageNum}&tab=Active`,
      );
      const businessResponsePending = await backend.get(
        `/business/?businessLimit=10&pageNum=${currentPageNum}&tab=Pending`,
      );
      setBusinessDictionary([...businessResponseActive.data, ...businessResponsePending.data]);
      setCurrentBusinessNum(
        businessResponseActive.data.length + businessResponsePending.data.length,
      );
      setPageLimit(currentBusinessNum);
    } else {
      const businessResponse = await backend.get(
        `/business/?businessLimit=10&pageNum=${currentPageNum}&tab=${tab}`,
      );
      setBusinessDictionary(businessResponse.data);
      setCurrentBusinessNum(businessResponse.data.length); // Update business count based on the data received
      setPageLimit(1); // Set a default page limit, you may need to calculate this based on the total count of businesses
    }
  };

  const changePage = async () => {
    const businessResponse = await backend.get(
      `/business/?businessLimit=10&pageNum=${currentPageNum}&tab=${currentTab}`,
    );
    setBusinessDictionary(businessResponse.data);
  };

  return (
    <div>
      <Outlet />
      <Tabs>
        <TabList>
          <Tab onClick={() => changeTab('All', 'All')}>All</Tab>
          <Tab onClick={() => changeTab('Active', 'Submitted')}>Submitted</Tab>
          <Tab onClick={() => changeTab('Pending', 'NotSubmitted')}>Not Submitted</Tab>
          <Tab onClick={() => changeTab('Pending', 'Pending')}>Pending</Tab>
        </TabList>
      </Tabs>

      {currentTab == 'Active' ? (
        <BusinessTable businessData={businessDictionary} />
      ) : (
        <BusinessTablePending businessData={businessDictionary} />
      )}
      <Box>
        {(currentPageNum - 1) * 10 + 1} to {Math.min(currentPageNum * 10, pageLimit)} of {pageLimit}
      </Box>
      <IconButton
        aria-label="Back button"
        isDisabled={currentPageNum <= 1}
        icon={<ChevronLeftIcon />}
        onClick={() => setCurrentPageNum(prevPageNum => prevPageNum - 1)} // Update currentPageNum for going back
      />
      <IconButton
        aria-label="Next button"
        isDisabled={currentPageNum >= pageLimit}
        icon={<ChevronRightIcon />}
        onClick={() => setCurrentPageNum(prevPageNum => prevPageNum + 1)} // Update currentPageNum for going forward
      />
    </div>
  );
};

export default AdminFilterBusinesses;
