/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { Table, Tbody, Tr, Td } from '@chakra-ui/react';
import { useBackend } from '../../../contexts/BackendContext';

const ViewDonationHistory = ({ id }) => {
  const [data, setData] = useState([]);
  const { backend } = useBackend();

  const fetchDonation = async () => {
    try {
      const response = await backend.get(`/donation/${id}`);
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDonation();
    }
  }, [id]);

  return (
    <div>
      <Table variant="striped" colorScheme="teal">
        <Tbody>
          {data.map((item, index) =>
            Object.entries(item).map(([key, value]) => (
              <Tr key={`${index}-${key}`}>
                <Td fontWeight="bold">{key}</Td>
                <Td>{value}</Td>
              </Tr>
            )),
          )}
        </Tbody>
      </Table>
    </div>
  );
};

export default ViewDonationHistory;
