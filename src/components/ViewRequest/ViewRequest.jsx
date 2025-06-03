import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { useBackend } from '../../contexts/BackendContext';

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

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await backend.get(`/notification/request/${id}`);
        const message = response.data[0].message;
        setItemAmounts(JSON.parse(message));
        setDateRequested(formatDate(response.data[0].timestamp));

        const businessNameResponse = await backend.get(`/business/${id}`);
        setBusinessName(businessNameResponse.data[0].name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequest();
  }, [backend, id]);

  const handleClick = () => {
    navigate(`/ViewBusiness/${id}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 8,
        gap: 4,
      }}
    >
      <Flex
        gap={4}
        marginBottom={4}
        width={'100%'}
        flexDirection={'row'}
        justifyContent={'space-between'}
      >
        <Heading size="lg">{businessName}&apos;s Supply Request</Heading>
        <Button onClick={handleClick} colorScheme={'teal'} maxW={200}>
          View business details
        </Button>
      </Flex>

      <Card width={'100%'}>
        <Table variant={'unstyled'}>
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

      <Card width={'100%'}>
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
                ),
            )}
          </Tbody>
        </Table>
      </Card>

      <Card width={'100%'}>
        <Flex marginTop={4} flexDirection={'column'}>
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
    </Box>
  );
};

export default ViewRequest;
