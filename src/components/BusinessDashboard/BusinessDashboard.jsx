import './BusinessDashboard.module.css';
import { useBackend } from '../../contexts/BackendContext';
import { useEffect, useState } from 'react';
// import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

const BusinessDashboard = () => {
  const { backend } = useBackend();
  const [donationData, setDonationData] = useState([]);
  // const [reminderData, setReminderData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await backend.get('/donation/business/totals/1');
        // console.log(response);
        // console.log(response.data);
        setDonationData(response.data[0]);
        // console.log(donationData);
        // const reminderResponse = await backend.get('/notification/1');
        // setReminderData(reminderResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  const calculateTotalPounds = () => {
    console.log(donationData);
    return (
      donationData['canned_dog_food_quantity'] +
      donationData['dry_dog_food_quantity'] +
      donationData['canned_cat_food_quantity'] +
      donationData['dry_cat_food_quantity']
    );
  };

  // const calculateTotalWorth = () => {
  //   return (
  //     donationData['canned_dog_food_data'] * donationData['canned_dog_food_price'] +
  //     donationData['dry_dog_food_data'] * donationData['dry_dog_food_price'] +
  //     donationData['canned_cat_food_data'] * donationData['canned_cat_food_price'] +
  //     donationData['dry_cat_food_data'] * donationData['dry_cat_food_price']
  //   );
  // };

  return (
    <div>
      <h1>Welcome back!</h1>

      <h2>Your Impact</h2>
      <div>
        {/* <Box>$ {calculateTotalWorth()} worth of donations</Box> */}
        <Box>0 pets helped</Box>
        <Box>{calculateTotalPounds()} pounds of pet food donated</Box>
      </div>

      {/* <h2>Reminders</h2>
      <table>
        {donationData.map((message, index) => (
          <tr key={index}>
            <td>{message}</td>
          </tr>
        ))}
      </table> */}
      {/* <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Street</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.name}</Td>
              <Td>{item.street}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table> */}
    </div>
  );
};

export default BusinessDashboard;
