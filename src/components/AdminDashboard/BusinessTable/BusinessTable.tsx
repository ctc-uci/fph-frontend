import { useEffect, useState } from 'react';
import { ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon, Icon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Input,
  Stack,
  Tab,
  Table,
  TabList,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { BiCheck, BiEnvelope, BiPlus, BiTimeFive, BiX } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { useBackend } from '../../../contexts/BackendContext';
import DownloadCSV from '../../../utils/downloadCSV';
import BusinessTableModal from './BusinessTableModal';

const TABLE_HEADERS = ['Business Name', 'Location', 'Email', 'Form Status', 'Last Submitted'];

const PENDING_HEADERS = [
  'Business Name',
  'Location',
  'Email',
  'Residential Status',
  'Application Sent',
];

export const BusinessTable = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { backend } = useBackend();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [pageLimit, setPageLimit] = useState(1);
  const [currentBusinessNum, setCurrentBusinessNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [currentTab, setCurrentTab] = useState('All');
  const [selectedBusinessIds, setSelectedBusinessIds] = useState<Set<string>>(new Set());

  const [headers, setHeaders] = useState(TABLE_HEADERS);

  const changeTab = async (tab: string) => {
    setCurrentTab(tab);
    setSelectedBusinessIds(new Set());
    setCurrentPageNum(1);
    setSearch('');
  };

  function formatDateDFH(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };

    return date.toLocaleDateString('en-US', options);
  }

  function getStatusBadge(status, submitted, notified) {
    if (status === 'Pending') {
      return (
        <Badge colorScheme="yellow" px="2">
          <Icon as={BiTimeFive} />
          Pending
        </Badge>
      );
    }
    if (submitted) {
      return (
        <Badge colorScheme="green" px="2">
          <Flex gap={1}>
            <Icon as={BiCheck} />
            <Text>Submitted</Text>
          </Flex>
        </Badge>
      );
    }
    if (notified) {
      return (
        <Badge colorScheme="yellow" px="2">
          <Flex gap={1}>
            <Icon as={BiTimeFive} />
            <Text>Reminder Sent</Text>
          </Flex>
        </Badge>
      );
    }
    return (
      <Badge colorScheme="gray" px="2">
        <Flex gap={1}>
          <Icon as={BiX} />
          <Text>Not Submitted</Text>
        </Flex>
      </Badge>
    );
  }

  const handleClick = () => {
    navigate('/AddBusiness');
  };

  const handleCheckboxChange = (businessId) => {
    setSelectedBusinessIds((prevSelectedIds) => {
      const newSelectedIds = new Set(prevSelectedIds);
      if (newSelectedIds.has(businessId)) {
        newSelectedIds.delete(businessId);
      } else {
        newSelectedIds.add(businessId);
      }
      return newSelectedIds;
    });
  };

  const handleSelectAllChange = () => {
    setSelectedBusinessIds((prevSelectedIds) => {
      const newSelectedIds = new Set(prevSelectedIds);
      const allBusinessIds = data.map((business) => business.id);

      if (newSelectedIds.size === allBusinessIds.length) {
        // If all are selected, unselect all
        newSelectedIds.clear();
      } else {
        // Otherwise, select all
        allBusinessIds.forEach((id) => newSelectedIds.add(id));
      }

      return newSelectedIds;
    });
  };

  const handleSendReminders = async () => {
    for (const businessId of selectedBusinessIds) {
      // ! FIX ME
      try {
        const requestData = {
          businessId: businessId,
          message: 'Reminder To Submit Donation Form',
          timestamp: new Date().toISOString(),
          beenDismissed: false,
          type: 'Not Submitted',
        };

        await backend.post('/notification', requestData);
      } catch (error) {
        console.error('Error sending reminders:', error);
      }
    }
    const message = `To ${selectedBusinessIds.size} ${
      selectedBusinessIds.size > 1 ? `businesses` : ` business`
    }.`;
    toast({
      title: 'Reminder Sent',
      description: message,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDownloadCSV = () => {
    const ids = Array.from(selectedBusinessIds);
    let headers = [];
    for (var i = 0; i < TABLE_HEADERS.length; i++) {
      headers.push(TABLE_HEADERS[i].toLowerCase().replace(' ', '_'));
    }
    try {
      DownloadCSV(ids);
      const message = `For ${ids.length} ${ids.length > 1 ? `businesses` : ` business`}.`;
      toast({
        title: 'Downloaded CSV',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error Downloading CSV',
        description: error.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getResidentialStatusBadge = (status) => {
    if (status === 'Pending') {
      return (
        <Badge colorScheme="orange" px="2">
          <Flex gap={1}>
            <Text>Pending</Text>
          </Flex>
        </Badge>
      );
    }
    if (status === 'Residential') {
      return (
        <Badge colorScheme="green" px="2">
          <Flex gap={1}>
            <Text>Residential</Text>
          </Flex>
        </Badge>
      );
    }
    return (
      <Badge colorScheme="red" px="2">
        <Flex gap={1}>
          <Text>Non-Residential</Text>
        </Flex>
      </Badge>
    );
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const searchTerm = search.replace(' ', '+');
        const businessResponse = await backend.get(
          `/business/filter/search/?currentTab=${currentTab}&pageLimit=10&pageNum=${currentPageNum}&searchTerm=${searchTerm}`,
        );

        const businessCountResponse = await backend.get(
          `/business/filter/searchCount?currentTab=${currentTab}&searchTerm=${searchTerm}`,
        );

        console.log(businessResponse);

        if (
          true ||
          (currentTab === 'All' && search === '' && businessCountResponse.data[0]['count'] === 0)
        ) {
          onOpen();
        }

        setPageLimit(Math.ceil(businessCountResponse.data[0]['count'] / 10));
        setCurrentBusinessNum(businessCountResponse.data[0]['count']);
        setData(businessResponse.data);

        if (currentTab === 'Pending') {
          setHeaders(PENDING_HEADERS);
        } else {
          setHeaders(TABLE_HEADERS);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [search, currentTab, currentPageNum, backend]);

  const handleRowClick = async (id: string) => {
    navigate(`/ViewBusiness/${id}`);
  };

  return (
    <>
      <Tabs colorScheme="teal" sx={{ width: 'fit-content' }}>
        <TabList>
          <Tab onClick={() => changeTab('All')}>All</Tab>
          <Tab onClick={() => changeTab('Submitted')}>Submitted</Tab>
          <Tab onClick={() => changeTab('NotSubmitted')}>Not Submitted</Tab>
          <Tab onClick={() => changeTab('Pending')}>Pending Application</Tab>
        </TabList>
      </Tabs>

      <Stack spacing={4}>
        <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <HStack>
            <Input
              placeholder="Search"
              backgroundColor="white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Tooltip label="Add Business" display={{ base: 'flex', xl: 'none' }}>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={handleClick}
                sx={{ minWidth: 'fit-content' }}
              >
                <HStack spacing={2}>
                  <Icon as={BiPlus} />
                  <Text display={{ base: 'none', xl: 'flex' }}>Add Business</Text>
                </HStack>
              </Button>
            </Tooltip>
          </HStack>

          <HStack>
            <Tooltip label="Send Reminder" display={{ base: 'flex', xl: 'none' }}>
              <Button
                colorScheme={currentTab === 'Submitted' ? 'gray' : 'teal'}
                onClick={handleSendReminders}
                isDisabled={currentTab === 'Submitted' || selectedBusinessIds.size === 0}
              >
                <HStack spacing={2}>
                  <Icon as={BiEnvelope} />
                  <Text display={{ base: 'none', xl: 'flex' }}>Send reminder</Text>
                </HStack>
              </Button>
            </Tooltip>

            <Tooltip label="Download CSV" display={{ base: 'flex', xl: 'none' }}>
              <Button
                colorScheme={currentTab === 'NotSubmitted' ? 'gray' : 'teal'}
                onClick={handleDownloadCSV}
                isDisabled={currentTab === 'NotSubmitted' || selectedBusinessIds.size === 0}
              >
                <HStack spacing={2}>
                  <Icon as={ArrowDownIcon} />
                  <Text display={{ base: 'none', xl: 'flex' }}>Download CSV</Text>
                </HStack>
              </Button>
            </Tooltip>
          </HStack>
        </Box>

        <Card>
          <Table>
            <Thead>
              <Tr>
                <Th key="checkbox">
                  <Checkbox
                    isChecked={
                      selectedBusinessIds.size > 0 && selectedBusinessIds.size === data.length
                    }
                    onChange={handleSelectAllChange}
                  />
                </Th>
                {headers.map((header, index) => (
                  <Th key={index} w={'19%'}>
                    {header}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {data &&
                data.map((item, index) => (
                  <Tr key={index}>
                    <Td key="checkbox">
                      <Checkbox
                        isChecked={selectedBusinessIds.has(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      ></Checkbox>
                    </Td>
                    <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>
                      {item.name}
                    </Td>
                    <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>
                      {item.city}, {item.state}
                    </Td>
                    <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>
                      {item.primary_email}
                    </Td>
                    {currentTab === 'Pending' ? (
                      <>
                        <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>
                          {getResidentialStatusBadge(item.residential)}
                        </Td>
                        <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>
                          {formatDateDFH(item.join_date)}
                        </Td>
                      </>
                    ) : (
                      <>
                        <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>
                          {getStatusBadge(item.status, item.submitted, item.notified)}
                        </Td>
                        <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>
                          {formatDateDFH(item.max_date)}
                        </Td>
                      </>
                    )}
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Card>

        <HStack justifyContent={'flex-end'}>
          <Box>
            {(currentPageNum - 1) * 10 + 1} to {Math.min(currentPageNum * 10, currentBusinessNum)}{' '}
            of {currentBusinessNum}
          </Box>
          <IconButton
            aria-label="Back button"
            isDisabled={currentPageNum <= 1}
            variant={'ghost'}
            icon={<ChevronLeftIcon />}
            onClick={() => setCurrentPageNum(currentPageNum - 1)}
          />
          <IconButton
            aria-label="Next button"
            isDisabled={currentPageNum >= pageLimit}
            variant={'ghost'}
            icon={<ChevronRightIcon />}
            onClick={() => setCurrentPageNum(currentPageNum + 1)}
          />
        </HStack>
      </Stack>

      <BusinessTableModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
