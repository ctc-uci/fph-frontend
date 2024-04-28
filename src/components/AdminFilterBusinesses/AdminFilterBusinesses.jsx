import './AdminFilterBusinesses.module.css';
import BusinessTable from '../BusinessTable/BusinessTable.jsx';
import BusinessTablePending from '../BusinessTablePending/BusinessTablePending.jsx';
import { useBackend } from '../../contexts/BackendContext';
import { useEffect, useState } from 'react';
import { Box, IconButton, Tabs, TabList, Tab } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

const AdminFilterBusinesses = () => {
  // Created the use states
  const { backend } = useBackend();
  //const [donationData, setDonationData] = useState([]);
  const [businessDictionary, setBusinessDictionary] = useState([]);
  const [currentBusinessNum, setCurrentBusinessNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [currentTab, setCurrentTab] = useState('All'); //change to all once all page is implemented
  const [pageLimit, setPageLimit] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        loadInfo(currentTab);
        console.log(businessDictionary);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [currentTab, currentPageNum]);

  const changeTab = async tab => {
    setCurrentTab(tab);
    setCurrentPageNum(1);
    //loadInfo(tab);
  };

  const loadInfo = async tab => {
    changePage();
    const businessNumResponse = await backend.get(`/business/totalBusinesses/?tab=${tab}`);
    setCurrentBusinessNum(businessNumResponse.data[0]['count']);
    console.log(businessNumResponse.data[0]['count']);
    setPageLimit(Math.ceil(businessNumResponse.data[0]['count'] / 10));
  };

  const changePage = async () => {
    const businessResponse = await backend.get(
      `/business/?businessLimit=10&pageNum=${currentPageNum}&tab=${currentTab}`,
    );
    setBusinessDictionary(businessResponse.data);
  };

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab
            onClick={() => {
              changeTab('All');
            }}
          >
            All
          </Tab>
          <Tab
            onClick={() => {
              changeTab('Active');
            }}
          >
            Submitted
          </Tab>
          <Tab
            onClick={() => {
              changeTab('Pending');
            }}
          >
            Not Submitted
          </Tab>
          <Tab
            onClick={() => {
              changeTab('Pending');
            }}
          >
            Pending
          </Tab>
        </TabList>
      </Tabs>

      {currentTab !== 'Pending' && currentTab !== 'All' ? (
        <BusinessTable businessData={businessDictionary} />
      ) : (
        <BusinessTablePending businessData={businessDictionary} />
      )}
      <div style={{ width: '95%', display: 'flex', justifyContent: 'end' }}>
        <Box>
          {(currentPageNum - 1) * 10 + 1} to {Math.min(currentPageNum * 10, currentBusinessNum)} of{' '}
          {currentBusinessNum}
        </Box>
        <IconButton
          aria-label="Back button"
          isDisabled={currentPageNum <= 1}
          icon={<ChevronLeftIcon />}
          onClick={() => setCurrentPageNum(currentPageNum - 1)}
        />
        <IconButton
          aria-label="Next button"
          isDisabled={currentPageNum >= pageLimit}
          icon={<ChevronRightIcon />}
          onClick={() => setCurrentPageNum(currentPageNum + 1)}
        />
      </div>
    </div>
  );
};

export default AdminFilterBusinesses;
