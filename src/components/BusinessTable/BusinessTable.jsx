import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Checkbox,
  Button,
  Th,
} from '@chakra-ui/react';

const BusinessTable = () => {
  const { backend } = useBackend();
  const [data, setData] = useState([]);
  const TABLE_HEADERS = [
    'Id',
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
  const [checkedItems, setCheckedItems] = useState(new Array(TABLE_HEADERS.length).fill(false));

  const handleCheckboxChange = index => {
    setCheckedItems(prev => {
      const newCheckedItems = [...prev];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  const handleSelectAllChange = () => {
    setCheckedItems(prev => {
      const allChecked = prev.every(Boolean);
      return prev.map(() => !allChecked);
    });
  };

  const handleSendReminders = async () => {
    const selectedBusinessIds = data.filter((_, index) => checkedItems[index]).map(item => item.id);

    for (let i = 0; i < selectedBusinessIds.length; i++) {
      try {
        const requestData = {
          business_id: selectedBusinessIds[i],
          message: 'Message', 
          timestamp: new Date().toISOString(),
          been_dismissed: false,
        };

        await backend.post('/notification', requestData);

        const response = await backend.get('/business');
        setData(response.data);
      } catch (error) {
        console.error('Error sending reminders:', error);
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await backend.get('/business');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Button colorScheme="blue" onClick={handleSendReminders}>
        Send Reminders
      </Button>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            {/* Add an empty header for the checkbox column */}
            <Th key="checkbox">
              <Checkbox
                isChecked={checkedItems.every(Boolean)}
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
                  key={index}
                  isChecked={checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                ></Checkbox>
              </Td>
              {Object.keys(item).map(key => (
                <Td key={key}>
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
