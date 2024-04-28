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
  Badge
} from '@chakra-ui/react';
import DropZone from '../BusinessTable/DropZone';



const BusinessTable = businessData => {
  const navigate = useNavigate();
  const { backend } = useBackend();
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const TABLE_HEADERS = [
    'Business Name',
    'Location',
    'Email',
    'Form Status',
    'Last Submitted',
  ];
  const tableHeaders = TABLE_HEADERS.map(tableHeader => <th key={tableHeader}>{tableHeader}</th>);
  const [selectedBusinessIds, setSelectedBusinessIds] = useState(new Set());

  function formatDateDFH(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  }

  function getStatusBadge(status) {
    switch (status) {
      case 'Pending':
        return (
          <Badge colorScheme="yellow" px="2">
            <box-icon type="regular" name="time-five" size="xs" mr="10px"></box-icon>
            Pending
          </Badge>
        );
      case 'Active':
        return (
          <Badge colorScheme="green" px="2">
            <box-icon type="regular" name="check" size="xs" color="green"></box-icon>
            Submitted
          </Badge>
        );
      default:
        return (
          <Badge colorScheme="gray" px="2">
            <box-icon type="regular" name="x" size="xs" mr="5px"></box-icon>
            Not Submitted
          </Badge>
        );
    }
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
          business_id: businessId,
          message: 'Message',
          timestamp: new Date().toISOString(),
          been_dismissed: false,
        };

        await backend.post('/notification', requestData);
      } catch (error) {
        console.error('Error sending reminders:', error);
      }
    }
  };




  const handleDownloadCSV = () => {
    const ids = Array.from(selectedBusinessIds);
    var headers = [];
    for (var i = 0; i < TABLE_HEADERS.length; i++) {
      headers.push(TABLE_HEADERS[i].toLowerCase().replace(' ', '_'));
    }
    DownloadCSV(headers, ids, 'business');
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setData(businessData['businessData']);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [businessData]);

  const handleRowClick = async id => {
    navigate(`/ViewBusiness/${id}`);
  };

  return businessData['businessData'].length == 0 ? (
    <h1>Loading ...</h1>
  ) : (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div style={{ margin: '0 20px' }}>
          <Input
            width="222px"
            height="40px"
            size="sm"
            placeholder="Search"
            backgroundColor="white"
            marginRight={4}
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
        </div>
        <div style={{ margin: '0 20px' }}>
          <Button
            colorScheme="teal"
            onClick={handleSendReminders}
            marginRight={4}
            fontSize={'0.9rem'}
          >
            <BiEnvelope style={{ marginRight: '5px' }} />
            Send Reminder
          </Button>
          <Button
            colorScheme="teal"
            onClick={handleDownloadCSV}
            sx={{ width: '172px' }}
            fontSize={'0.9rem'}
          >
            <ArrowDownIcon sx={{ marginRight: '5px' }} />
            Download CSV
          </Button>
        </div>
      </div>
      <Card ml="20px" mr="20px" mb="20px" mt="20px">
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
      <Button colorScheme="blue" onClick={handleSendReminders}>
        Send Reminders
      </Button>
      <Button colorScheme="teal" onClick={handleDownloadCSV} sx={{ width: '172px' }}>
        <ArrowDownIcon sx={{ marginRight: '5px' }} />
        Download CSV
      </Button>
      <Table variant="simple" colorScheme="facebook">
        <Thead>
          <Tr>
            <Th key="checkbox">
              <Checkbox
                isChecked={selectedBusinessIds.size > 0 && selectedBusinessIds.size === data.length}
                onChange={handleSelectAllChange}
              ></Checkbox>
            </Th>
            {tableHeaders.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>
          <Tbody>
          {data.map((item, index) => (
              <Tr key={index} onClick={() => handleRowClick(item.id)}>
                <Td key="checkbox">
                  <Checkbox
                    isChecked={selectedBusinessIds.has(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  ></Checkbox>
                </Td>
                <Td>{item.name}</Td>
                <Td>{item.city}, {item.state}</Td>
                <Td>{item.primary_email}</Td>
                <Td>{getStatusBadge(item.status)}</Td>
                <Td>{formatDateDFH(item.join_date)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
    </div>
  );
};

export default BusinessTable;
