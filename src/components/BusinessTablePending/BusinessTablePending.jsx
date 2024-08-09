import { useEffect, useState } from 'react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { BiEnvelope } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { useBackend } from '../../contexts/BackendContext';
import downloadCSV from '../../utils/downloadCSV';
import { BusinessForm } from '../BusinessForm/BusinessForm.1';
import ViewBusiness from '../ViewBusiness/ViewBusiness';

const BusinessTablePending = (businessData) => {
  const { backend } = useBackend();
  const [data, setData] = useState([]);
  const [selectedBusinessId, setBusinessId] = useState(null);
  const [pendingData, setPendingData] = useState([]);
  const navigate = useNavigate();
  const [sendRemindersClicked, setSendRemindersClicked] = useState(false);
  console.log(sendRemindersClicked);

  //   const [selectedApplication, setSelectedApplication] = useState(new Set());
  const TABLE_HEADERS = [
    'Business Name',
    'Location',
    'Email',
    'Form Status',
    'Last Submitted',
    'Application',
  ];
  const tableHeaders = TABLE_HEADERS.map((tableHeader) => <th key={tableHeader}>{tableHeader}</th>);
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

  // Changes style based on status of application
  function getStatusBadge(status) {
    switch (status) {
      case 'Pending':
        return (
          <Badge colorScheme="gray" px="2">
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
          <Badge colorScheme="red" px="2">
            <box-icon type="regular" name="x" size="xs" mr="5px" color="red"></box-icon>
            Not Submitted
          </Badge>
        );
    }
  }

  // Handles click for when Add Business button is clicked on AdminDashboard
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

  const handleDownloadCSV = () => {
    const ids = Array.from(selectedBusinessIds);
    var headers = [];
    for (var i = 0; i < TABLE_HEADERS.length; i++) {
      headers.push(TABLE_HEADERS[i].toLowerCase().replace(' ', '_'));
    }
    downloadCSV(headers, ids, 'business');
  };

  const handleSendReminders = async () => {
    setSendRemindersClicked(true);
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

  const handleViewApplication = async (businessId) => {
    try {
      const response = await backend.get(`/business/${businessId}`);
      setPendingData(response);
      // setSelectedApplication(businessId);
    } catch (error) {
      console.error('Error while fetching  application', error);
    }
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

  const handleRowClick = async (id) => {
    try {
      setBusinessId(id);
      const response = await backend.get(`/business/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error while fetching business', error);
    }
  };

  if (selectedBusinessId) {
    return <ViewBusiness id={selectedBusinessId} />;
  } else if (pendingData.length !== 0) {
    return <BusinessForm pending={true} pendingData={pendingData.data[0]} />;
  }
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
        <Table variant="simple">
          <Thead>
            <Tr>
              {/* Add an empty header for the checkbox column */}
              <Th key="checkbox">
                <Checkbox
                  isChecked={
                    selectedBusinessIds.size > 0 && selectedBusinessIds.size === data.length
                  }
                  onChange={handleSelectAllChange}
                ></Checkbox>
              </Th>
              {tableHeaders.map((header, index) => (
                <Th key={index} style={{ whiteSpace: 'nowrap' }}>
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index} onClick={() => handleRowClick(item.id)}>
                {/* Add a Checkbox for each row in the checkbox column */}
                <Td key="checkbox">
                  <Checkbox
                    isChecked={selectedBusinessIds.has(item.id)}
                    onChange={() => handleCheckboxChange(item.id)} // .append, .add
                  ></Checkbox>
                </Td>
                <Td>{item.name}</Td>
                <Td>
                  {item.city}, {item.state}
                </Td>
                <Td>{item.primary_email}</Td>
                <Td>{getStatusBadge(item.status)}</Td>
                {/* Not correct date to use? */}
                <Td>{formatDateDFH(item.join_date)}</Td>
                <Td key="Application">
                  <Button size="xs" onClick={() => handleViewApplication(item.id)}>
                    View Application
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Card>
    </div>
  );
};

export default BusinessTablePending;
