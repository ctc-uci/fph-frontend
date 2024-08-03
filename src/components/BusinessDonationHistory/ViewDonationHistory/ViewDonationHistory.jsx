import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Link as ChakraLink,
  Flex,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { useBackend } from '../../../contexts/BackendContext';

const ViewDonationHistory = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { backend } = useBackend();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await backend.get(`/donation/${id}`);
        setData(response.data[0]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDonation();
  }, [id]);

  const handleHome = () => {
    navigate(`/BusinessDonationHistory`);
  };

  return (
    <>
      <Flex justifyContent={'space-between'} p="6" mr="auto" w="1089px">
        <Flex gap={1}>
          <ChakraLink onClick={handleHome} color="blue.500" decoration="underline">
            Donation Tracking{' '}
          </ChakraLink>
          <Text>/ Donation Details</Text>
        </Flex>

        <IconButton icon={<box-icon type="solid" name="bell"></box-icon>} />
      </Flex>

      <Flex align="center" ml="6">
        <Box>
          <Heading size="lg">Donation Details</Heading>
        </Box>
      </Flex>

      <Flex direction="row" ml="6">
        <Box flex="2">
          <Card maxW="100%" w="1089px" h="auto" p={6} mt="10">
            <Flex alignItems="left">
              <TableContainer>
                <Table variant="unstyled">
                  <Thead></Thead>
                  <Tbody>
                    <Tr>
                      <Td>
                        <Text fontSize="xs" color="500" as="b">
                          BUSINESS ID
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="xs" color="500">
                          {data.business_id}
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize="xs" color="500" as="b">
                          DONATION ID
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="xs" color="500">
                          {data.donation_id}
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize="xs" color="500" as="b">
                          FOOD BANK
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="xs" color="500">
                          {data.food_bank_donation}
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize="xs" color="500" as="b">
                          PERSON REPORTING
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="xs" color="500">
                          {data.reporter}
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize="xs" color="500" as="b">
                          EMAIL
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="xs" color="500">
                          {data.email}
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize="xs" color="500" as="b">
                          DATE
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="xs" color="500">
                          {data.date}
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize="xs" color="500" as="b">
                          CANNED DOG FOOD QTY
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="xs" color="500">
                          {data.canned_dog_food_quantity}
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize="xs" color="500" as="b">
                          DRY DOG FOOD QTY
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="xs" color="500">
                          {data.dry_dog_food_quantity}
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize="xs" color="500" as="b">
                          CANNED CAT FOOD QTY
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="xs" color="500">
                          {data.canned_cat_food_quantity}
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize="xs" color="500" as="b">
                          DRY CAT FOOD QTY
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="xs" color="500">
                          {data.dry_cat_food_quantity}
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize="xs" color="500" as="b">
                          MISC ITEMS
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="xs" color="500">
                          {data.misc_items}
                        </Text>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>
                        <Text fontSize="xs" color="500" as="b">
                          VOLUNTEER HOURS
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="xs" color="500">
                          {data.volunteer_hours}
                        </Text>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </Card>
        </Box>
      </Flex>
    </>
  );
};

export default ViewDonationHistory;
