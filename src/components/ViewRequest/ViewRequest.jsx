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
  const [requests, setRequests] = useState([]);
  const [businessName, setBusinessName] = useState('');

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
        const formattedRequests = response.data.map((request) => ({
          items: JSON.parse(request.message),
          date: formatDate(request.timestamp),
        }));
        setRequests(formattedRequests);

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
        <Heading size="lg">{businessName}&apos;s Supply Requests</Heading>
        <Button onClick={handleClick} colorScheme={'teal'} maxW={200}>
          View business details
        </Button>
      </Flex>

      {requests.map((request, requestIndex) => (
        <Card
          key={requestIndex}
          width={'100%'}
          display="flex"
          flexDirection="column"
          gap={4}
          padding={4}
        >
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
                  <Td>{request.date}</Td>
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
                  <Th width="50%">Item</Th>
                  <Th width="50%">Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.entries(request.items).map(
                  ([item, amount]) =>
                    item !== 'Notes' &&
                    amount !== 0 && (
                      <Tr key={item}>
                        <Td width="50%">{item}</Td>
                        <Td width="50%">{amount}</Td>
                      </Tr>
                    ),
                )}
              </Tbody>
            </Table>
          </Card>

          {request.items['Notes'] && (
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
                      <Td>{request.items['Notes']}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Flex>
            </Card>
          )}
        </Card>
      ))}
    </Box>
  );
};

export default ViewRequest;
