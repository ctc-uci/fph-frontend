import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import { Button, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';
import { PENDING_TABLE_HEADERS } from '../../utils/constants';
import propTypes from 'prop-types';

const PendingBusinessTable = ({ goToBusinessForm }) => {
  const { backend } = useBackend();
  const [data, setData] = useState([]);

  const tableHeaders = PENDING_TABLE_HEADERS.map(tableHeader => <th key={tableHeader}>{tableHeader}</th>);
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
