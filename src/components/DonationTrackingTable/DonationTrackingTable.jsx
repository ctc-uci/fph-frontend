import { useBackend } from '../../contexts/BackendContext';
import { useState, useEffect } from 'react';
import DonationSite from './DonationSite';
import { Tabs, TabList, Tab, Button, Box, IconButton, Input, useToast } from '@chakra-ui/react';
import {
  ArrowDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import './DonationTrackingTable.module.css';
import { Table, Thead, Tbody, Tr, Th, TableContainer, Checkbox, Text } from '@chakra-ui/react';
import classes from './DonationTrackingTable.module.css';
import DownloadCSV from '../../utils/downloadCSV';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer';

const DonationTrackingTable = () => {
  const navigate = useNavigate();
  const { backend } = useBackend();
  const { isAdmin } = useAuth();
  const toast = useToast();

  const [donationTrackingTableData, setDonationTrackingTableData] = useState([]);
  const [checkedSet, setCheckedSet] = useState(new Set());
  const [topCheckBox, setTopCheckBox] = useState(false);
  const headers = [
    'Donation Site',
    'Donation ID',
    'Food Bank',
    'Person Reporting',
    'Email',
    'Date',
    'Canned Dog Food',
    'Dry Dog Food',
    'Canned Cat Food',
    'Dry Cat Food',
    'Misc Items',
    'Volunteer Hours',
  ];

  const tabHeaders = ['month', 'quarter', 'year', 'all'];
  const [currentTab, setCurrentTab] = useState('month'); //change to all once all page is implemented
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [currentDonationsNum, setCurrentDonationsNum] = useState(0);
  const [pageLimit, setPageLimit] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const loadInfo = async () => {
    changePage();
    const donationNumResponse = await backend.get(
      `/donation/totalDonations/${currentTab}/?searchTerm=${searchTerm}`,
    );
    setCurrentDonationsNum(donationNumResponse.data[0]['count']);
    setPageLimit(Math.ceil(donationNumResponse.data[0]['count'] / 10));
  };

  const changeTab = async tab => {
    setCurrentTab(tab);
    setCurrentPageNum(1);
    setCheckedSet(new Set());
    setTopCheckBox(false);
  };

  const changePage = async () => {
    const donationResponse = await backend.get(
      `/donation/filter/${currentTab}/?pageNum=${currentPageNum}&searchTerm=${searchTerm}`,
    );
    setDonationTrackingTableData(donationResponse.data);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        loadInfo(currentTab);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getNotifications = async () => {
      try{
        const notificationResponse = await backend.get(`/notification/0`);
        setNotifications(notificationResponse.data);
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const checkIsAdmin = async () => {
      if (!(await isAdmin())) {
        navigate('/BusinessDashboard');
      } else {
        setIsAdminUser(true);
      }
    };

    checkIsAdmin();
    getData();
    if (notifications.length == 0){
      getNotifications();
    }
  }, [currentTab, currentPageNum, searchTerm]);

  const renderDonationTrackingTableData = () => {
    return donationTrackingTableData.map((element, index) => {
      return (
        <DonationSite
          donation_site={element}
          key={index}
          checkSet={checkedSet}
          setCheck={setCheckedSet}
          topCheckBox={topCheckBox}
        />
      );
    });
  };

  const handleCheckBoxes = () => {
    const newCheckboxValue = !topCheckBox;
    setTopCheckBox(newCheckboxValue);
    if (newCheckboxValue) {
      const newCheckedSet = new Set(donationTrackingTableData.map(element => element.donation_id));
      setCheckedSet(newCheckedSet);
    } else {
      const newCheckedSet = new Set();
      setCheckedSet(newCheckedSet);
    }
  };

  const handleDownloadCSV = () => {
    const ids = Array.from(checkedSet);
    try {
      if (ids.length === 0) {
        toast({
          title: 'Downloaded CSV',
          description: "Select a business first",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        DownloadCSV(ids, true);
        const message = `For ${ids.length} ${ids.length > 1 ? `businesses` : ` business`}.`;
        toast({
          title: 'Downloaded CSV',
          description: message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error Downloading CSV',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value.split(' ').join('+'));
    setCurrentPageNum(1);
  };

  return (
    <>
      {isAdminUser && (
        <div className={classes.container}>
          <div className={classes.dttTitleContainer}>
            <Text>Donation Tracking</Text>
            <NotificationsDrawer notificationsData={notifications} />
          </div>
          <div className={classes.tabs}>
            <Tabs isFitted="true" colorScheme="teal">
              <TabList>
                {tabHeaders.map((header, index) => {
                  if (header != 'all')
                    return (
                      <Tab onClick={() => changeTab(header)} key={index}>
                        This {header.substring(0, 1).toUpperCase() + header.substring(1)}
                      </Tab>
                    );
                  else {
                    return (
                      <Tab onClick={() => changeTab('all')} key={index}>
                        All
                      </Tab>
                    );
                  }
                })}
              </TabList>
            </Tabs>
          </div>
          <div className={classes.searchAndCSVContainer}>
            <Input
              placeholder="Search"
              onChange={handleSearch}
              sx={{ width: '222px', backgroundColor: '#FFFFFF' }}
            />
            <Button colorScheme="teal" onClick={handleDownloadCSV} sx={{ width: '172px' }}>
              <ArrowDownIcon sx={{ marginRight: '5px' }} />
              Download CSV
            </Button>
          </div>
          <TableContainer className={classes.roundedTable}>
            <Table style={{ borderCollapse: 'collapse' }}>
              <Thead>
                <Tr>
                  <div className={classes.checkBoxHeader}>
                    <Checkbox isChecked={topCheckBox} onChange={handleCheckBoxes} />
                    <ChevronDownIcon />
                  </div>
                  {headers.map((header, index) => {
                    return <Th key={index}>{header}</Th>;
                  })}
                </Tr>
              </Thead>
              <Tbody>{renderDonationTrackingTableData()}</Tbody>
            </Table>
          </TableContainer>
          <div className={classes.resultNavigation}>
            <Box sx={{ marginRight: '50px' }}>
              {currentDonationsNum > 0 ? (currentPageNum - 1) * 10 + 1 : 0} to{' '}
              {Math.min(currentPageNum * 10, currentDonationsNum)} of {currentDonationsNum}
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
      )}
    </>
  );
};

export default DonationTrackingTable;
