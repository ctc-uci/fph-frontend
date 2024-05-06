import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBackend } from '../../contexts/BackendContext';
import {
  Box,
  Button,
  Card,
  ChakraProvider,
  Flex,
  Table,
  Heading,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from '@chakra-ui/react';

const ViewRequest = () => {
  const { backend } = useBackend();
  const { id } = useParams();
  const navigate = useNavigate();
  const supplyItems = [
    'Get Pet Food Decal',
    'Decal',
    '"Homeless?" Card',
    'Business Card',
    'Donation Site Decal',
    'Donation Site Bin Decal',
    'Donation Envelopes',
    '"Homeless?" Card 2',
  ];
  const items = [
    'Get Pet Food Decal',
    'Decal',
    'Homeless Card',
    'Business Card',
    'Donation Site Decal',
    'Donation Site Bin Decals',
    'Donation Envelopes',
    'Homeless Card 2',
  ];
  const [itemAmounts, setItemAmounts] = useState({});
  const [businessName, setBusinessName] = useState('');
  const [dateRequested, setDateRequested] = useState('');

  function formatDate(dateTimeString) {
    const date = new Date(dateTimeString);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  }

  const fetchRequest = async () => {
    try {
      const response = await backend.get(`/notification/request/${id}`);
      const message = response.data[0].message;
      setItemAmounts(JSON.parse(message));
      setDateRequested(formatDate(response.data[0].timestamp));

      const businessNameResponse = await backend.get(`/business/${response.data[0].sender_id}`);
      setBusinessName(businessNameResponse.data[0].name);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, [id]);

  const handleClick = () => {
    navigate(`/ViewBusiness/${id}`);
  };

  return (
    <ChakraProvider>
      <Box marginLeft={'10%'} marginTop={10}>
        <Flex gap={4} flexDirection={'column'}>
          <Heading size="lg">{businessName}&apos;s Supply Request</Heading>
          <Button onClick={handleClick} colorScheme={'teal'} maxW={200}>
            View business details
          </Button>
        </Flex>
      </Box>
      <Card marginLeft={'10%'} marginTop={10} width={'60%'}>
        <Table variant={'unstyled'} width={'80%'} marginLeft={'10%'} marginTop={4} marginBottom={4}>
          <Thead>
            <Tr>
              <Th>Date Requested</Th>
              {/* <Th>Status</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{dateRequested}</Td>
              {/* <Td>
                            <Select
                                value={status}
                                onChange={e => handleStatusChange(e)}
                                bg={status ? 'teal' : 'orange'}
                              >
                                <option value={true}>Sent</option>
                                <option value={false}>Pending</option>
                              </Select>
                            </Td> */}
            </Tr>
          </Tbody>
        </Table>
      </Card>
      <Card width={'60%'} marginLeft={'10%'} marginTop={10}>
        <Card width={'80%'} margin={'auto'} marginTop={10}>
          <Table>
            <Thead>
              <Tr>
                <Th>Item</Th>
                <Th>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {supplyItems.map(
                (item, index) =>
                  itemAmounts[items[index]] != 0 && (
                    <Tr key={index}>
                      <Td>{item}</Td>
                      <Td>{itemAmounts[items[index]]}</Td>
                    </Tr>
                  )
              )}
            </Tbody>
          </Table>
        </Card>
        <Flex width={'80%'} margin={'auto'} marginTop={4} flexDirection={'column'}>
          <Table variant={'unstyled'}>
            <Thead>
              <Tr>
                <Th>Notes:</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{itemAmounts['Notes']}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
      </Card>
    </ChakraProvider>
  );
};

export default ViewRequest;
