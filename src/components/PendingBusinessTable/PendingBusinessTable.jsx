import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import { Button, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';
import propTypes from 'prop-types';

const PendingBusinessTable = ({ goToBusinessForm }) => {
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
    'Application',
  ];

  const tableHeaders = TABLE_HEADERS.map(tableHeader => <th key={tableHeader}>{tableHeader}</th>);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await backend.get('/business/order/status/desc');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>HEHE</h1>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>{tableHeaders}</Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              {Object.keys(item).map(key => (
                <Td key={key}>
                  {typeof item[key] === 'boolean' ? (item[key] ? 'True' : 'False') : item[key]}
                </Td>
              ))}
              <Td key="Application">
                <Button onClick={() => goToBusinessForm(item)}>View Application</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

PendingBusinessTable.propTypes = {
  goToBusinessForm: propTypes.func.isRequired,
};

export default PendingBusinessTable;
