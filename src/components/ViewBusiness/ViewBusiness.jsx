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
import { useParams, useNavigate } from 'react-router-dom';

const ViewBusiness = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
        location: response.data.location
      });
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    navigate(`/EditBusiness/${id}`);
  };

  // ViewBusiness.PropTypes = {
  //   id: PropTypes.number.isRequired,
  // }

  useEffect(() => {
    console.log(id);
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
      <Card>
        <Flex justify="flex-end" wrap="nowrap" maxW="80%" mx="auto">
          <Card maxW="75%" w="780px" h="auto" p={8} ml="80">
            <CardHeader>
              <Flex justify="space-between" align="center" w="full">
                <Flex align="center" gap="4">
                  {/* <Avatar
                    name={business?.name}
                    src={kevinLiu}
                    boxSize={{ base: '100px', md: '150px', lg: '200px' }}
                  /> */}
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
          </Card>
          <Card>
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
          </Card>
          <Card>
            <Box>
              <Flex direction="column">
                <Flex direction="row">
                  <Heading size="xs">WEBSITE INFORMATION</Heading>
                  <Text size="xs">Phone for FPOTH Website</Text>
                  <Text size="xs">123-456-7890</Text>
                  <Text size="xs">Notes for Website</Text>
                  <Text size="xs">This is our main website.</Text>
                </Flex>
                <Flex direction="row">
                  <Text size="xs">Publish States</Text>
                  <Text size="xs">Published</Text>
                  <Text size="xs">Added to Website (Date & Initials)</Text>
                  <Text size="xs">A.B. 1/1/24</Text>
                </Flex>
              </Flex>
            </Box>
          </Card>
          <Card>
            <Box>
              <Flex direction="column">
                <Flex direction="row">
                  <Text size="xs">ADDITIONAL INFORMATION</Text>
                  <Text size="xs">Checkbox here for type of business.</Text>
                  <Text size="xs">INTERNAL NOTES</Text>
                  <Text size="xs">Internal notes go here.</Text>
                </Flex>
                <Flex direction="row">
                  <Text size="xs">TYPE</Text>
                  <Text size="xs">Valid for Service Request Checkbox goes here.</Text>
                  <Text size="xs">This will be a dropdown indicating the type of service request.</Text>
                </Flex>
              </Flex>
            </Box>
          </Card>
          <Card>
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
      </Card>
    </ChakraProvider>
  );
};

export default ViewBusiness;
