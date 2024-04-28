import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackend } from '../../contexts/BackendContext';
import { Table, Thead, Tbody, Tr, Td, Checkbox, Button, Th, Input } from '@chakra-ui/react';
import { BiEnvelope } from 'react-icons/bi';
import { ArrowDownIcon } from '@chakra-ui/icons';
import DownloadCSV from '../../utils/downloadCSV';
import { FaPlus } from 'react-icons/fa6';

const BusinessTable = businessData => {
  const navigate = useNavigate();
  const { backend } = useBackend();
  const [data, setData] = useState([]);
  // const [selectedBusinessId, setBusinessId] = useState(null);

  const handleClick = () => {
    navigate('/AddBusiness');
  };

  const TABLE_HEADERS = [
    'id',
    'Type',
    'Name',
    'Street',
    'Zipcode',
    'State',
    'Qb Vendor Name',
    'Qb City State Zip',
    'Primary Phone',
    'Backup Phone',
    'Primary Email',
    'Comments',
    'Fax phone',
    'Contact name',
    'Website',
    'Business hours',
    'Find out',
    'Onboarding status',
    'Join date',
    'Input type status',
    'Vendor type',
    'Status',
    'Pets of the homeless discount',
    'Updated by',
    'Updated date time',
    'Sync to qb',
    'Veterinary',
    'Ressoure',
    'Food',
    'Donation',
    'Family shelter',
    'Wellness',
    'Spray neuter',
    'Financial',
    'Re home',
    'Er boarding',
    'Senior',
    'Cancer',
    'Dog',
    'Cat',
    'Fph phone',
    'Contact phone',
    'Web notes',
    'Internal notes',
    'Published',
    'Shelter',
    'Domestic Violence',
    'Web Date Init',
    'Ent Qb',
    'Service Request',
    'Inactive',
    'Final Check',
    'Created By',
    'Created Date',
    'City',
  ];
  const tableHeaders = TABLE_HEADERS.map(tableHeader => <th key={tableHeader}>{tableHeader}</th>);
  const [selectedBusinessIds, setSelectedBusinessIds] = useState(new Set());

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
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
        <div style={{margin: '0 10px'}}>
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
        <div style={{margin: '0 10px'}}>
          <Button colorScheme="teal" onClick={handleSendReminders} marginRight={4} fontSize={'0.9rem'}>
            <BiEnvelope style={{marginRight: '5px'}}/>
            Send Reminder
          </Button>
          <Button colorScheme="teal" onClick={handleDownloadCSV} sx={{ width: '172px' }} fontSize={'0.9rem'}>
            <ArrowDownIcon sx={{ marginRight: '5px' }} />
            Download CSV
          </Button>
        </div>
      </div>

      <Table variant="simple" colorScheme='facebook'>
        <Thead>
          <Tr>
            {/* Add an empty header for the checkbox column */}
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
            <Tr key={index}>
              {/* Add a Checkbox for each row in the checkbox column */}
              <Td key="checkbox">
                <Checkbox
                  isChecked={selectedBusinessIds.has(item.id)}
                  onChange={() => handleCheckboxChange(item.id)} // .append, .add
                ></Checkbox>
              </Td>
              {Object.keys(item).map(key => (
                <Td key={key} onClick={() => handleRowClick(item.id)}>
                  {typeof item[key] === 'boolean' ? (item[key] ? 'True' : 'False') : item[key]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default BusinessTable;