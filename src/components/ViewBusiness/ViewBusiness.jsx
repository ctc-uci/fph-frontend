/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
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
  Divider,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';
import { useBackend } from '../../contexts/BackendContext';
import { useParams } from 'react-router-dom';
import 'boxicons';

const ViewBusiness = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  // const navigate = useNavigate();

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
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleEditClick = () => {
  //   navigate(`/EditBusiness/${id}`);
  // };

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
      <Flex justify="flex-end" wrap="nowrap" maxW="80%" mx="auto">
        <Card maxW="100%" w="1089px" h="auto" p={6} mt="10">
          <CardHeader>
            <Flex justify="space-between" align="center" w="full">
              <Flex align="center" gap="4">
                <Box>
                  <Heading size="lg">{data.name}</Heading>
                  <Heading size="sm">{business?.name}</Heading>
                  <Text>{business?.email}</Text>
                </Box>
              </Flex>
              <Flex>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="Edit menu"
                  icon={<box-icon name='pencil'></box-icon>}
                />
                <IconButton
                  variant="regular"
                  colorScheme="red"
                  aria-label="Delete menu"
                  icon={<box-icon name='trash' color='#d30000' ></box-icon>}
                />
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction="row">
              <Box flex="2">
                <Card>
                  <Flex alignItems="left">
                    <TableContainer>
                      <Table variant="unstyled">
                        <Thead></Thead>
                        <Tbody>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b">
                                {' '}
                                NAME{' '}
                              </Text>
                            </Td>
                            <Td>
                              <Text fontSize="xs" color="500">
                                {data.contact_name}
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
                                {data.primary_email}
                              </Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b">
                                WEBSITE
                              </Text>
                            </Td>
                            <Td>
                              <Text fontSize="xs" color="500">
                                {data.website}
                              </Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b">
                                LOCATION
                              </Text>
                            </Td>
                            <Td>
                              <Text fontSize="xs" color="500">
                                {data.street + ' ' + data.qb_city_state_zip}
                              </Text>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Flex>
                </Card>
                <Card marginTop="6">
                  <CardHeader>
                    <Text fontSize="xs" color="500" as="b">
                      WEBSITE INFORMATION
                    </Text>
                  </CardHeader>
                  <Flex alignItems="left" mb="3">
                    <TableContainer flex="1" mr="4">
                      <Table variant="unstyled" spacing>
                        <Tbody>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b">
                                Phone for FPOTH Website
                              </Text>
                              <Text fontSize="xs" color="500">
                                775-841-7463
                              </Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b">
                                Notes for Website
                              </Text>
                              <Text fontSize="xs" color="500" whiteSpace="normal">
                                This is our main website, we have several other websites.
                              </Text>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                    <TableContainer flex="1" mr="4">
                      <Table variant="unstyled">
                        <Tbody>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b">
                                Publish Status
                              </Text>
                              <Text fontSize="xs" color="500">
                                Published
                              </Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b" whiteSpace="normal">
                                Added to Website (Date & Initials)
                              </Text>
                              <Text fontSize="xs" color="500" whiteSpace="normal">
                                A.B. 1/1/24
                              </Text>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Flex>
                </Card>
                <Card marginTop="6">
                  <Flex alignItems="left">
                    <TableContainer flex="1" mr="3">
                      <Table variant="unstyled">
                        <Tbody>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b">
                                ADDITIONAL INFORMATION
                              </Text>
                              <Text fontSize="xs" color="500" whiteSpace="normal">
                                Pet Food Provider Site
                              </Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b" whiteSpace="normal">
                                Internal Notes
                              </Text>
                              <Text fontSize="xs" color="500" whiteSpace="normal">
                                Remember Justine prefers to be called Justy.
                              </Text>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                    <TableContainer flex="1" mr="4">
                      <Table variant="unstyled">
                        <Tbody>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b">
                                TYPE
                              </Text>
                              <Text fontSize="xs" color="500">
                                Valid for Service Request
                              </Text>
                              <Menu>
                                {({ isOpen }) => (
                                  <>
                                    <MenuButton
                                      isActive={isOpen}
                                      as={Button}
                                      rightIcon={<ChevronDownIcon />}
                                      variant="outline"
                                      size="xs"
                                      style={{ width: '90%' }}
                                    >
                                      Type
                                    </MenuButton>
                                    <MenuList>
                                      <MenuItem>Pins</MenuItem>
                                      <MenuItem>Flyers</MenuItem>
                                    </MenuList>
                                  </>
                                )}
                              </Menu>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Flex>
                </Card>
              </Box>
              <Box flex="1">
                <Card ml="6">
                  <Flex direction="row" align="left" w="full">
                    <Box mt="3" ml="6" mb="4" mr="3">
                      <Text fontSize="xs" as="b">DONATION FORM STATUS</Text>
                      <HStack spacing={4} mt={15}>
                        <Button size="sm" variant="solid" colorScheme="teal">
                          <box-icon name="envelope" size="14px" color="#ffffff"></box-icon>
                          <Text fontSize="sm" ml="2">Send reminder</Text>
                        </Button>
                      </HStack>
                      <Text fontSize="10px" mt="1">Last reminder sent on 12/3/2023</Text>
                      <Divider w="225px" mt="2"></Divider>
                      <Flex direction="row">
                        <Text fontSize="xs" as="b" mt="3">OR</Text>
                        <Button size="xs" colorScheme="teal" variant="link" ml="3" mt="3" as="b">Manually submit form <ArrowForwardIcon/></Button>
                      </Flex>
                    </Box>
                  </Flex>
                </Card>
                <Card ml="6" mt="6">
                  <Flex direction="row" align="left" w="full">
                    <Box mt="3" ml="6" mb="4" mr="3">
                      <Text fontSize="xs" as="b">SUPPLY REQUEST</Text>
                      <HStack spacing={4} mt={15}>
                        <Button size="sm" variant="solid" colorScheme="teal">
                          <box-icon name="package" size="14px" color="#ffffff"></box-icon>
                          <Text fontSize="sm" ml="2">View request</Text>
                        </Button>
                      </HStack>
                      <Text fontSize="10px" mt="1">Requested on 1/15/2024</Text>
                      <Divider w="225px" mt="2"></Divider>
                      <Flex direction="row">
                        <Text fontSize="xs" as="b" mt="3">STATUS</Text>
                        <Box mt="2" ml="3">
                        <Menu>
                          <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} size="xs">
                            Status
                          </MenuButton>
                          <MenuList>
                            <MenuItem>Pending</MenuItem>
                            <MenuItem>Sent</MenuItem>
                          </MenuList>
                        </Menu>
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                </Card>
                <Card mt="6" ml="6" height="40vh">
                  <Flex direction="row" align="left" w="full">
                    <Box mt="6" ml="6" mb="4">
                      <Text fontSize="xs" mb="4" as="b" whiteSpace="normal">
                        DONATION FORM HISTORY
                      </Text>
                      <CardBody>

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

                    </CardBody>
                    </Box>

                  </Flex>
                </Card>
              </Box>
            </Flex>
          </CardBody>
          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              '& > button': {
                minW: '136px',
              },
            }}
          >
          </CardFooter>
        </Card>
      </Flex>
    </ChakraProvider>
  );
};

export default ViewBusiness;
