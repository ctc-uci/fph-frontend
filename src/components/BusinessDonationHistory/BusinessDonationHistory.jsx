/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import { Table, Thead, Tbody, Tr, Td, Button, Th } from '@chakra-ui/react';
import ViewDonationHistory from './ViewDonationHistory/ViewDonationHistory';

const BusinessDonationHistory = () => {
  const { backend } = useBackend();
  const [data, setData] = useState([]);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const TABLE_HEADERS = ['reporter', 'food_bank_donation', 'date', 'action'];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await backend.get('/donation');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  const handleButtonClick = async id => {
    try {
      setSelectedDonationId(id);
      const response = await backend.get(`/donation/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error while fetching donation data', error);
    }
  };

  if (selectedDonationId) {
    return <ViewDonationHistory id={selectedDonationId} />;
  }

  return (
    <div>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            {TABLE_HEADERS.map(header => (
              <Th key={header}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.reporter}</Td>
              <Td>{item.food_bank_donation}</Td>
              <Td>{item.date}</Td>
              <Td>
                <Button onClick={() => handleButtonClick(item.donation_id)}>Details</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default BusinessDonationHistory;
