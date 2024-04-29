import './AdminFilterBusinesses.module.css';
import BusinessTable from '../BusinessTable/BusinessTable.jsx';
import { useBackend } from '../../contexts/BackendContext';
import { useEffect, useState } from 'react';
import { Box, IconButton, Tabs, TabList, Tab } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

const AdminFilterBusinesses = () => {
  // Created the use states
  const { backend } = useBackend();
  //const [donationData, setDonationData] = useState([]);
  const [currentBusinessNum, setCurrentBusinessNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [currentTab, setCurrentTab] = useState('All');
  const [pageLimit, setPageLimit] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      loadInfo(currentTab, searchTerm);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [currentTab, currentPageNum, searchTerm]);

  const changeTab = async tab => {
    setCurrentTab(tab);
    setCurrentPageNum(1);
    setSearchTerm('');
  };

  const loadInfo = async ( tab, search ) => {
    const businessNumResponse = await backend.get(`/business/totalBusinesses/?tab=${tab}&searchTerm=${searchTerm, search}`);
    setCurrentBusinessNum(businessNumResponse.data[0]['count']);
    console.log(businessNumResponse.data[0]['count']);
    setPageLimit(Math.ceil(businessNumResponse.data[0]['count'] / 10));
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
              changeTab('Submitted');
            }}
          >
            Submitted
          </Tab>
          <Tab
            onClick={() => {
              changeTab('NotSubmitted');
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
      <BusinessTable tab={currentTab} currentPageNum={currentPageNum} />
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
