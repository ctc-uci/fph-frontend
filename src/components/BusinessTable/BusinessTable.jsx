import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import { Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';
import ViewBusiness from '../ViewBusiness/ViewBusiness';

const BusinessTable = () => {
  const { backend } = useBackend();
  const [data, setData] = useState([]);
  const [selectedBusinessId, setBusinessId] = useState(null);
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

  // in our handle row click, set our selected business id to 'id' of the business

  // create a conditioanl that will return our viewbusiness page based on the id that we have selected.

  const tableHeaders = TABLE_HEADERS.map(tableHeader => <th key={tableHeader}>{tableHeader}</th>);
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

  const handleRowClick = async id => {
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
  }

  return (
    <div>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>{tableHeaders}</Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index} onClick={() => handleRowClick(item.id)}>
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
