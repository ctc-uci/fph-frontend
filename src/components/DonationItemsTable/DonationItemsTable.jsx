import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import { Link, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const DonationItemsTable = () => {
  const { backend } = useBackend();
  const [data, setData] = useState([]);
  const TABLE_HEADERS = ['Category', 'Id', 'Name', 'Quantity Type', 'Price'];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await backend.get('/value/filter/all');
        setData(response.data);
      } catch (error) {
        console.error('Error getting donation items:', error);
        setData([]);
      }
    };
    getData();
  }, [backend]);

  const handleCategoryChange = category => {
    return async () => {
      try {
        const response = await backend.get(`/value/filter/${category}`);
        setData(response.data);
      } catch (error) {
        console.error('Error getting donation items:', error);
      }
    };
  };

  return (
    <div>
      <Link colorScheme="blue" onClick={handleCategoryChange('all')}>
        All
      </Link>
      <Link colorScheme="blue" onClick={handleCategoryChange('Food')}>
        Food
      </Link>
      <Link colorScheme="blue" onClick={handleCategoryChange('Misc.')}>
        Misc.
      </Link>
      <Table variant="striped">
        <Thead>
          <Tr>
            {TABLE_HEADERS.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              {Object.keys(item).map(key => (
                <Td key={key}>
                  {typeof item[key] === 'boolean' ? (item[key] ? 'True' : 'False') : item[key]}
                </Td>
              ))}
              <Td>
                <EditIcon /> <DeleteIcon color="red" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default DonationItemsTable;
