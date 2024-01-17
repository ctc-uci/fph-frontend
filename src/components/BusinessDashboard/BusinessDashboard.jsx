import './BusinessDashboard.module.css';
import { useBackend } from '../../contexts/BackendContext';
import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

const BusinessDashboard = () => {
  const { backend } = useBackend();
  const [donationData, setDonationData] = useState([]);

  // *************************************************************************
  // CHANGE LATER: right now just making one big request for all of the
  // rows in the fair_market_value table since it is just full of dummy data.
  // Later, when actual data or more accurate dummy data is used, change the
  // request to efficiently pull the prices of dry and canned dog and cat food
  // *************************************************************************
  const [priceData, setPriceData] = useState([]);

  const [reminderData, setReminderData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // ***********************************************************************
        // CHANGE LATER: right now business is hardcoded to be business with id 1
        // in the future will have to change (add parameter to component)
        // so that we can display the dashboard for various businesses
        // ***********************************************************************
        const donationResponse = await backend.get('/donation/business/totals/1');
        setDonationData(donationResponse.data[0]);

        const priceResponse = await backend.get('/value');
        setPriceData(priceResponse.data);

        const reminderResponse = await backend.get('/notification/1');
        setReminderData(reminderResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  const calculateTotalPounds = () => {
    return (
      donationData['canned_dog_food_quantity'] +
      donationData['dry_dog_food_quantity'] +
      donationData['canned_cat_food_quantity'] +
      donationData['dry_cat_food_quantity']
    );
  };

  const calculateTotalWorth = () => {
    // ***********************************************************************
    // CHANGE LATER: Right now the prices are just the first four rows of the
    // fair_market_value table, thus if the table has less than four tables
    // this function will break
    // ***********************************************************************
    return (
      donationData['canned_dog_food_quantity'] * priceData[0]['price'] +
      donationData['dry_dog_food_quantity'] * priceData[1]['price'] +
      donationData['canned_cat_food_quantity'] * priceData[2]['price'] +
      donationData['dry_cat_food_quantity'] * priceData[3]['price']
    );
  };

  return (
    <div>
      <h1>Welcome back!</h1>

      <h2>Your Impact</h2>
      <div>
        <Box>$ {calculateTotalWorth()} worth of donations</Box>
        <Box>0 pets helped</Box>
        <Box>{calculateTotalPounds()} pounds of pet food donated</Box>
      </div>

      <Table>
        <Thead>
          <Tr>
            <Th>Reminders</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reminderData.map((reminder, index) => (
            <Tr key={index}>
              <Td>{reminder['message']}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default BusinessDashboard;
