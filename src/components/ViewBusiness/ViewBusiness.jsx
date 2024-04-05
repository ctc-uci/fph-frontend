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
  Checkbox,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { ChevronDownIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  ChevronLeftIcon,
} from '@chakra-ui/icons';
import { useBackend } from '../../contexts/BackendContext';
import { useParams, useNavigate } from 'react-router-dom';
import 'boxicons';

function formatDateDFH(dateTimeString) {
  const date = new Date(dateTimeString);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
}

const ViewBusiness = ({ setBackButtonClicked }) => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [donationFormsData, setDonationData] = useState([]);
  const [lastReminder, setLastReminder] = useState('');
  const [lastRequest, setLastRequest] = useState('');

  const { backend } = useBackend();

  const fetchBusiness = async () => {
    try {
      const response = await backend.get(`/business/${id}`);
      setData(response.data[0]);
      const donationForms = await backend.get(`/donation/business/${id}`);
      setDonationData(donationForms.data);

      setBusiness({
        name: response.data.Name,
        email: response.data.email,
        website: response.data.Website,
        location: response.data.location,
      });

      const reminders = await backend.get(`notification/${id}`);
      if (reminders.data) {
        setLastReminder(formatDate(reminders.data[0].timestamp.split('T')[0]));
      }

      const requests = await backend.get(`notification/request/${id}`);
      if (requests.data) {
        setLastRequest(formatDate(requests.data[0].timestamp.split('T')[0]));
      }

      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = dateString => {
    const parts = dateString.split('-');
    const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;

    return formattedDate;
  };

  const handleEditClick = () => {
    navigate(`/EditBusiness/${id}`);
  };

  const handleHome = () => {
    navigate(`/AdminDashboard`);
  };

  // ViewBusiness.PropTypes = {
  //   id: PropTypes.number.isRequired,
  // }

  useEffect(() => {
    if (id) {
      fetchBusiness();
      navigate(`/AdminDashboard/${status}/${id}`);
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
      <Flex justify="flex-end" wrap="nowrap" maxW="80%" mx="auto" flexDirection={'column'}>
        <Flex justifyContent={'space-between'} mr="auto" w="1089px" marginTop={4}>
          <Flex gap={1}>
            <ChakraLink onClick={handleHome} color="blue.500" decoration="underline">
              Home{' '}
            </ChakraLink>
            <Text>/ {data.name}</Text>
          </Flex>

          <IconButton icon={<box-icon type="solid" name="bell"></box-icon>} />
        </Flex>
        <Card maxW="100%" w="1089px" h="auto" p={6} mt="10">
          <CardHeader>
            <IconButton
              icon={<ChevronLeftIcon />}
              boxSize="8"
              sx={{ backgroundColor: 'rgb(225,225,225)', borderRadius: '5px' }}
              onClick={() => {
                setBackButtonClicked(true);
                navigate(`/AdminDashboard/${status}`);
              }}
            />
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
                  onClick={handleEditClick}
                  icon={<box-icon name="pencil"></box-icon>}
                />
                <IconButton
                  variant="regular"
                  colorScheme="red"
                  aria-label="Delete menu"
                  icon={<box-icon name="trash" color="#d30000"></box-icon>}
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
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b">
                                PHONE
                              </Text>
                            </Td>
                            <Td>
                              <Text fontSize="xs" color="500">
                                {data.primary_phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
                              </Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b">
                                BUSINESS HOURS
                              </Text>
                            </Td>
                            <Td>
                              <Text fontSize="xs" color="500">
                                {data.business_hours}
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
                                {data.fph_phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
                              </Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b">
                                Notes for Website
                              </Text>
                              <Text fontSize="xs" color="500" whiteSpace="normal">
                                {data.web_notes}
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
                                {data.published ? 'Published' : 'Not Published'}
                              </Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b" whiteSpace="normal">
                                Added to Website (Date & Initials)
                              </Text>
                              <Text fontSize="xs" color="500" whiteSpace="normal">
                                {formatDateDFH(data.web_date_init)}
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
                                {data.food && <p>Pet Food Donation Site</p>}
                                {data.donation && <p>Donation Site</p>}
                                {data.shelter && <p>Shelter</p>}
                                {data.family_shelter && <p>Families Only Shelter</p>}
                                {data.wellness && <p>Wellness Clinics</p>}
                                {data.spay_neuter && <p>Spay Neuter</p>}
                                {data.financial && <p>Financial Assistance</p>}
                                {data.re_home && <p>Rehome Foster</p>}
                                {data.sync_to_qb && <p>Entered in QB</p>}
                                {data.inactive && <p>Inactive</p>}
                                {data.final_check && <p>Final Check</p>}
                                {data.er_boarding && <p>ER Boarding</p>}
                                {data.senior && <p>Senior Citizens Only</p>}
                                {data.cancer && <p>Cancer Specific</p>}
                                {data.dog && <p>Dog Specific</p>}
                                {data.cat && <p>Cat Specific</p>}
                              </Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b" whiteSpace="normal">
                                Internal Notes
                              </Text>
                              <Text fontSize="xs" color="500" whiteSpace="normal">
                                {data.internal_notes}
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
                              <Flex align="center">
                                <Text fontSize="xs" color="500">
                                  Valid for Service Request
                                </Text>
                                <Checkbox
                                  isChecked={data.service_request}
                                  readOnly
                                  ml={6}
                                ></Checkbox>
                              </Flex>
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
                                      color="grey"
                                    >
                                      {data.vendor_type}
                                    </MenuButton>
                                    <MenuList>
                                      <MenuItem isDisabled={true}>{data.vendor_type}</MenuItem>
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
                      <Text fontSize="xs" as="b">
                        DONATION FORM STATUS
                      </Text>
                      <HStack spacing={4} mt={15}>
                        <Button size="sm" variant="solid" colorScheme="teal">
                          <box-icon name="envelope" size="14px" color="#ffffff"></box-icon>
                          <Text fontSize="sm" ml="2">
                            Send reminder
                          </Text>
                        </Button>
                      </HStack>
                      <Text fontSize="10px" mt="1">
                        {lastReminder != '' && `Last reminder sent on ${lastReminder}`}
                      </Text>
                      <Divider w="225px" mt="2"></Divider>
                      <Flex direction="row">
                        <Text fontSize="xs" as="b" mt="3">
                          OR
                        </Text>
                        <Button size="xs" colorScheme="teal" variant="link" ml="3" mt="3" as="b">
                          Manually submit form <ArrowForwardIcon />
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                </Card>
                <Card ml="6" mt="6">
                  <Flex direction="row" align="left" w="full">
                    <Box mt="3" ml="6" mb="4" mr="3">
                      <Text fontSize="xs" as="b">
                        SUPPLY REQUEST
                      </Text>
                      <HStack spacing={4} mt={15}>
                        <Button size="sm" variant="solid" colorScheme="teal">
                          <box-icon name="package" size="14px" color="#ffffff"></box-icon>
                          <Text fontSize="sm" ml="2">
                            View request
                          </Text>
                        </Button>
                      </HStack>
                      <Text fontSize="10px" mt="1">
                        {lastRequest != '' && `Requested on ${lastRequest}`}
                      </Text>
                      <Divider w="225px" mt="2"></Divider>
                      <Flex direction="row">
                        <Text fontSize="xs" as="b" mt="3">
                          STATUS
                        </Text>
                        <Box mt="2" ml="3">
                          <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="xs">
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
                <Card mt="6" ml="6" height="60%">
                  <Flex direction="row" align="left" w="full">
                    <Box mt="6" ml="6" mb="4">
                      <Text fontSize="xs" mb="4" as="b" whiteSpace="normal">
                        DONATION FORM HISTORY
                      </Text>
                      <CardBody>
                        <div>
                          {donationFormsData.map((item, index) => (
                            <div key={index} style={{ marginBottom: '15px' }}>
                              {/* Render the date property of each object */}
                              <p style={{ fontSize: 'small' }}>{formatDateDFH(item.date)}</p>
                              {index !== data.length - 1 && <Divider height="20px" width="150%" />}
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Box>
                  </Flex>
                </Card>
              </Box>
            </Flex>
          </CardBody>
          <CardFooter
            justify="flex-end"
            flexWrap="wrap"
            sx={{
              '& > button': {
                minW: '136px',
              },
            }}
          >
            <Flex direction="column">
              <Text fontSize="xs" color="gray">
                Created by {data.created_by} {formatDateDFH(data.created_date)}
              </Text>
              <Text fontSize="xs" color="gray">
                Updated by {data.updated_by} {formatDateDFH(data.updated_date_time)}
              </Text>
            </Flex>
          </CardFooter>
        </Card>
      </Flex>
    </ChakraProvider>
  );
};

export default ViewBusiness;
