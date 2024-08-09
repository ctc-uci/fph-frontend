import { ChangeEvent, useEffect, useState } from 'react';
import { ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Tab,
  Table,
  TableContainer,
  TabList,
  Tabs,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';
import { pageStyle, pageTitleStyle } from '../../styles/sharedStyles';
import { Donation } from '../../types/donation';
import downloadCSV from '../../utils/downloadCSV';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer';
import { DonationSite } from './DonationSite';

const TABLE_HEADERS = [
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

const TAB_HEADERS = ['month', 'quarter', 'year', 'all'];

export const DonationTrackingTable = () => {
  const { backend } = useBackend();
  const { isAdmin } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [donationTrackingTableData, setDonationTrackingTableData] = useState<Donation[]>([]);
  const [checkedSet, setCheckedSet] = useState<Set<number>>(new Set());
  const [allChecked, setAllChecked] = useState(false);

  const [currentTab, setCurrentTab] = useState('all');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [currentDonationsNum, setCurrentDonationsNum] = useState(0);
  const [pageLimit, setPageLimit] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);

  const changeTab = async (tab: string) => {
    setCurrentTab(tab);
    setCurrentPageNum(1);
    setCheckedSet(new Set());
    setAllChecked(false);
  };

  useEffect(() => {
    const checkIsAdmin = async () => {
      if (!(await isAdmin())) {
        navigate('/BusinessDashboard');
      }
    };

    const getNotifications = async () => {
      try {
        const notificationResponse = await backend.get(`/notification/0`);
        setNotifications(notificationResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    checkIsAdmin();

    try {
      getNotifications();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const donationResponse = await backend.get(
          `/donation/filter/${currentTab}/?pageNum=${currentPageNum}&searchTerm=${searchTerm}`,
        );
        setDonationTrackingTableData(donationResponse.data);

        const donationNumResponse = await backend.get(
          `/donation/totalDonations/${currentTab}/?searchTerm=${searchTerm}`,
        );
        setCurrentDonationsNum(donationNumResponse.data[0]['count']);
        setPageLimit(Math.ceil(donationNumResponse.data[0]['count'] / 10));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [currentTab, currentPageNum, searchTerm]);

  const handleCheckBoxes = () => {
    const newCheckboxValue = !allChecked;
    setAllChecked(newCheckboxValue);
    if (newCheckboxValue) {
      const newCheckedSet = new Set(
        donationTrackingTableData.map((element) => element.donation_id),
      );

      setCheckedSet(newCheckedSet);
    } else {
      const newCheckedSet = new Set<number>();
      setCheckedSet(newCheckedSet);
    }
  };

  const handleDownloadCSV = async () => {
    const ids = Array.from(checkedSet);

    try {
      if (ids.length === 0) {
        return toast({
          title: 'No Businesses Selected',
          description: 'Select a business first',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

      const ok = await downloadCSV(ids, true, backend);

      if (ok) {
        toast({
          title: 'Downloaded CSV',
          description: `For ${ids.length} ${ids.length > 1 ? `businesses` : ` business`}.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw Error;
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

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value.split(' ').join('+'));
    setCurrentPageNum(1);
  };

  return (
    <Flex sx={pageStyle}>
      <HStack sx={{ width: 'full', justifyContent: 'space-between' }}>
        <Heading sx={pageTitleStyle}>Donation Tracking</Heading>
        <NotificationsDrawer notificationsData={notifications} />
      </HStack>

      <Tabs width={'fit-content'} isFitted={true} colorScheme="teal">
        <TabList>
          {TAB_HEADERS.map((header) => (
            <Tab onClick={() => changeTab(header)} key={header} sx={{ whiteSpace: 'nowrap' }}>
              <Text sx={{ textTransform: 'capitalize' }}>{header}</Text>
            </Tab>
          ))}
        </TabList>
      </Tabs>

      <Flex sx={{ justifyContent: 'space-between' }}>
        <Input
          placeholder="Search"
          onChange={handleSearch}
          sx={{ backgroundColor: 'white', width: 'fit-content' }}
        />

        <Button colorScheme="teal" onClick={handleDownloadCSV} sx={{ minWidth: 'fit-content' }}>
          <HStack spacing={2}>
            <Icon as={ArrowDownIcon} />
            <Text>Download CSV</Text>
          </HStack>
        </Button>
      </Flex>

      <TableContainer sx={{ backgroundColor: 'white', borderRadius: 'lg', borderWidth: 1 }}>
        <Table style={{ borderCollapse: 'collapse' }}>
          <Thead>
            <Tr>
              <Th>
                <Checkbox isChecked={allChecked} onChange={handleCheckBoxes} />
              </Th>
              {TABLE_HEADERS.map((header, index) => {
                return <Th key={index}>{header}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {donationTrackingTableData.map((donation) => (
              <DonationSite
                key={donation.donation_id}
                donation={donation}
                checkedSet={checkedSet}
                allChecked={allChecked}
                setCheckedSet={setCheckedSet}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justifyContent="flex-end" alignItems="center">
        <Box padding={2} position="relative">
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
      </Flex>
    </Flex>
  );
};
