/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  IconButton,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  HStack,
  Tag,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, DownloadIcon, CalendarIcon } from '@chakra-ui/icons';
import { useBackend } from '../../contexts/BackendContext';
import kevinLiu from './kevinLiu.jpg';

const ViewBusiness = ({ id }) => {
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const { backend } = useBackend();

  const fetchBusiness = async () => {
    try {
      console.log(`Fetching business details for ID: ${id}`);
      const response = await backend.get(`/business/${id}`);
      setData(response.data[0]);
      console.log('Response received:', response);

      setBusiness({
        name: response.data.Name,
        email: response.data.email,
        website: response.data.Website,
        location: response.data.location,
      });
    } catch (error) {
      console.error('Error:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ViewBusiness.PropTypes = {
  //   id: PropTypes.number.isRequired,
  // }

  useEffect(() => {
    if (id) {
      fetchBusiness();
    }
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider>
      <Flex justify="flex-end" wrap="nowrap" maxW="80%" mx="auto">
        <Card maxW="75%" w="780px" h="auto" p={8} ml="80">
          <CardHeader>
            <Flex justify="space-between" align="center" w="full">
              <Flex align="center" gap="4">
                <Avatar
                  name={business?.name}
                  src={kevinLiu}
                  boxSize={{ base: '100px', md: '150px', lg: '200px' }}
                />
                <Box>
                  <Heading size="md">{data.name}</Heading>
                  <Heading size="sm">{business?.name}</Heading>
                  <Text>{business?.email}</Text>
                </Box>
              </Flex>
              <Flex>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="Edit menu"
                  icon={<EditIcon boxSize="6" />}
                  mr={4}
                />
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="Delete menu"
                  icon={<DeleteIcon boxSize="6" />}
                />
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex alignItems="left">
              <TableContainer>
                <Table variant="simple">
                  <Thead></Thead>
                  <Tbody>
                    <Tr>
                      <Td>NAME</Td>
                      <Td>{data.contact_name}</Td>
                    </Tr>
                    <Tr>
                      <Td>EMAIL</Td>
                      <Td>{data.primary_email}</Td>
                    </Tr>
                    <Tr>
                      <Td>WEBSITE</Td>
                      <Td>{data.website}</Td>
                    </Tr>
                    <Tr>
                      <Td>LOCATION</Td>
                      <Td>{data.street + ' ' + data.qb_city_state_zip}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </CardBody>
          <Flex direction="row" align="center" w="full" mt={4}>
            <Box mr={12}>
              <b>DONATION FORM STATUS</b>
              <HStack spacing={4} mt={15}>
                <Tag size={'lg'} key={'md'} variant="solid" colorScheme="teal">
                  <DownloadIcon ml={-1} mr={2} />
                  <b>Download CSV</b>
                </Tag>
              </HStack>
              <Text fontWeight={600}>Submitted on</Text>
            </Box>

            <Box>
              <b>SUPPLY REQUEST</b>
              <HStack spacing={4} mt={15}>
                <Tag size={'lg'} key={'md'} variant="outline" colorScheme="gray">
                  <CalendarIcon ml={-1} mr={2} />
                  <b>View Request</b>
                </Tag>
              </HStack>
              <Text fontWeight={600}>Requested on</Text>
            </Box>
          </Flex>
          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              '& > button': {
                minW: '136px',
              },
            }}
          ></CardFooter>
        </Card>
        <Flex justify="center" mt={8}>
          <Card maxW="100%" h="auto" p={8}>
            <Box mt={4} mb={4} px={4}>
              <Text fontWeight="bold" fontSize="lg" mb={4}>
                Donation Form History
              </Text>
            </Box>
            <CardBody>
              <Stack spacing={4} px={4}>
                <Divider />
                <Box>
                  <Text pt="2" fontSize="md" mb={5}>
                    1/12/2024
                  </Text>
                  <Divider />
                </Box>
                <Box>
                  <Text pt="2" fontSize="md" mb={5}>
                    1/28/2024
                  </Text>
                  <Divider />
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default ViewBusiness;
