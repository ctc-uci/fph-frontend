import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackend } from '../../contexts/BackendContext';
import { BiEnvelope } from 'react-icons/bi';
import { ArrowDownIcon } from '@chakra-ui/icons';
import DownloadCSV from '../../utils/downloadCSV';
import { FaPlus } from 'react-icons/fa6';
import 'boxicons'
import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Td, 
  Checkbox, 
  Button, 
  Th, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalFooter, 
  ModalBody, 
  ModalCloseButton, 
  Heading,
  Text,
  useDisclosure,
  Input,
  Card,
  Badge,
  Flex,
  Box,
  IconButton,
  Tabs,
  Tab,
  TabList,
  useToast,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import DropZone from '../BusinessTable/DropZone';
import PropTypes from 'prop-types';

const BusinessTable = () => {
  const navigate = useNavigate();
  const { backend } = useBackend();
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState('');
  const [pageLimit, setPageLimit] = useState(1);
  const [currentBusinessNum, setCurrentBusinessNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [currentTab, setCurrentTab] = useState('All');
  const [selectedBusinessIds, setSelectedBusinessIds] = useState(new Set());
  const toast = useToast();

  const TABLE_HEADERS = [
    'Business Name',
    'Location',
    'Email',
    'Form Status',
    'Last Submitted',
  ];

  const PENDING_HEADERS = [
    'Business Name',
    'Location',
    'Email',
    'Residential Status',
    'Application Sent',
  ]

  const [headers, setHeaders] = useState(TABLE_HEADERS);
  
  const changeTab = async tab => {
    setCurrentTab(tab);
    setSelectedBusinessIds(new Set());
    setCurrentPageNum(1);
    setSearch('');
  };

  function formatDateDFH(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  }

  function getStatusBadge(status, submitted, notified) {
    if (status === 'Pending'){
      return (
        <Badge colorScheme="yellow" px="2">
          <box-icon type="regular" name="time-five" size="xs" mr="10px"></box-icon>
          Pending
        </Badge>
      );
    }
    if (submitted){
      return (
        <Badge colorScheme="green" px="2">
          <Flex gap={1}>
            <box-icon type="regular" name="check" size="xs" color="green"></box-icon>
            <Text>Submitted</Text>
          </Flex>
        </Badge>
      );
    }
    if (notified) {
      return (
        <Badge colorScheme="yellow" px="2">
          <Flex gap={1}>
            <box-icon type="regular" name="time-five" size="xs"></box-icon>
            <Text>Reminder Sent</Text>
          </Flex>
        </Badge>
      );
    }
    return (
      <Badge colorScheme="gray" px="2">
        <Flex gap={1}>
          <box-icon type="regular" name="x" size="xs"></box-icon>
          <Text>Not Submitted</Text>
        </Flex>    
      </Badge>
    );
  }

  const handleClick = () => {
    navigate('/AddBusiness');
  };

  const handleCheckboxChange = businessId => {
    setSelectedBusinessIds(prevSelectedIds => {
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
    setSelectedBusinessIds(prevSelectedIds => {
      const newSelectedIds = new Set(prevSelectedIds);
      const allBusinessIds = data.map(business => business.id);

      if (newSelectedIds.size === allBusinessIds.length) {
        // If all are selected, unselect all
        newSelectedIds.clear();
      } else {
        // Otherwise, select all
        allBusinessIds.forEach(id => newSelectedIds.add(id));
      }

      return newSelectedIds;
    });
  };

  const handleSendReminders = async () => {
    for (const businessId of selectedBusinessIds) {
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
    const message = `To ${selectedBusinessIds.size} ${(selectedBusinessIds.size > 1) ? `businesses` : ` business`}.`;
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
    var headers = [];
    for (var i = 0; i < TABLE_HEADERS.length; i++) {
      headers.push(TABLE_HEADERS[i].toLowerCase().replace(' ', '_'));
    }
    try {
      DownloadCSV(ids, 'business');
      const message = `For ${ids.length} ${(ids.length > 1) ? `businesses` : ` business`}.`;
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
      })
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
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const searchTerm = search.replace(' ', '+');
        const businessResponse = await backend.get(
          `/business/filter/${currentTab}?pageLimit=10&pageNum=${currentPageNum}&searchTerm=${searchTerm}`,
        );
        const businessCountResponse = await backend.get(`/business/totalBusinesses?tab=${currentTab}&searchTerm=${searchTerm}`);
        setPageLimit(Math.ceil(businessCountResponse.data[0]['count'] / 10));
        setCurrentBusinessNum(businessCountResponse.data[0]['count']);
        setData(businessResponse.data);
        if (currentTab === 'Pending') {
          setHeaders(PENDING_HEADERS);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [data, currentBusinessNum, pageLimit, search, currentTab, currentPageNum, backend]);

  const handleRowClick = async id => {
    navigate(`/ViewBusiness/${id}`);
  };

  return (
    <Box mr='20px' ml='20px' mb='30px'>
      <Tabs colorScheme='teal'>
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
      <Box>
        <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Box>
            <Input
              width="222px"
              height="40px"
              size="sm"
              placeholder="Search"
              backgroundColor="white"
              marginRight={4}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <Button
              width="161px"
              height="40px"
              colorScheme="teal"
              variant="outline"
              leftIcon={<FaPlus />}
              onClick={handleClick}
            >
              Add Business
            </Button>
          </Box>
          <Box>
            <Button
              colorScheme="teal"
              onClick={handleSendReminders}
              marginRight={4}
              fontSize={'0.9rem'}
              isDisabled={currentTab === 'Submitted' || selectedBusinessIds.size === 0}
            >
              <BiEnvelope style={{ marginRight: '5px' }} />
              Send Reminder
            </Button>
            <Button
              colorScheme="teal"
              onClick={handleDownloadCSV}
              sx={{ width: '172px' }}
              fontSize={'0.9rem'}
              isDisabled={currentTab === 'NotSubmitted' || selectedBusinessIds.size === 0}
            >
              <ArrowDownIcon sx={{ marginRight: '5px' }} />
              Download CSV
            </Button>
          </Box>
        </Box>
      <Card mb="20px" mt="20px">
      <Button onClick={onOpen}>Upload CSV</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader marginBottom={0}>
              <Heading size={'md'}>Upload existing data</Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontFamily={'Inter'}>Transfer all business information into your new portal.</Text>
              <DropZone onClose={onClose} />
            </ModalBody>
            <ModalFooter>
              
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Table variant="simple" colorScheme="facebook">
          <Thead>
            <Tr>
              <Th key="checkbox" w={'5%'}>
                <Checkbox
                  isChecked={selectedBusinessIds.size > 0 && selectedBusinessIds.size === data.length}
                  onChange={handleSelectAllChange}
                ></Checkbox>
              </Th>
              {headers.map((header, index) => (
                <Th key={index} w={'19%'}>{header}</Th>
              ))}
            </Tr>
          </Thead>
          {data.length == 0 ? (
            <h1>Loading ...</h1>
          ) : (
            <Tbody>
              {data && data.map((item, index) => (
                  <Tr key={index}>
                    <Td key="checkbox">
                      <Checkbox
                        isChecked={selectedBusinessIds.has(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      ></Checkbox>
                    </Td>
                    <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>{item.name}</Td>
                    <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>{item.city}, {item.state}</Td>
                    <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>{item.primary_email}</Td>
                    {currentTab === 'Pending' ? (
                      <>
                        <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>{getResidentialStatusBadge(item.residential)}</Td>
                        <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>{formatDateDFH(item.join_date)}</Td>
                      </>
                      
                    )
                    : (
                      <>
                        <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>{getStatusBadge(item.status, item.submitted, item.notified)}</Td>
                        <Td onClick={() => handleRowClick(item.id)} cursor={'pointer'}>{formatDateDFH(item.max_date)}</Td>
                      </>
                    )}
                  </Tr>
                ))}
              </Tbody>
            )}
          </Table>
      </Card>
      <Flex gap={4} justifyContent={'flex-end'} alignItems={'center'}>
        <Box>
          {(currentPageNum - 1) * 10 + 1} to {Math.min(currentPageNum * 10, currentBusinessNum)} of{' '}
          {currentBusinessNum}
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
      </Flex>
    </Box>
  </Box>
  
  
  );
};

BusinessTable.propTypes = {
  tab: PropTypes.string,
  ids: PropTypes.set,
  setIds: PropTypes.func,
};

export default BusinessTable;
