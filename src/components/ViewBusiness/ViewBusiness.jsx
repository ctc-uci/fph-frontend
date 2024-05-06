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
  MenuButton,
  Button,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  MenuItemOption,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  MenuOptionGroup,
  useToast
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ArrowForwardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { useBackend } from '../../contexts/BackendContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import 'boxicons';
import PendingBusiness from '../PendingBusiness/PendingBusiness';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer';

const formatDateDFH = dateTimeString => {
  const date = new Date(dateTimeString);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
};

const formatCreatedBy = createdBy => {
  if (!createdBy) {
    return '';
  }

  const nameWords = createdBy.split(' ');
  const initials = nameWords.map(word => word.charAt(0).toUpperCase() + '.');
  return initials.join('');
};

const ViewBusiness = () => {
  const { isAdmin } = useAuth();
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSupplyStatus, setSelectedSupplyStatus] = useState(null);
  const navigate = useNavigate();
  const [donationFormsData, setDonationData] = useState([]);
  const [lastReminder, setLastReminder] = useState('');
  const [lastRequest, setLastRequest] = useState('');
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [notification, setNotification] = useState([]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(donationFormsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, donationFormsData.length);
  const currentPageData = donationFormsData.slice(startIndex, endIndex);

  const { backend } = useBackend();
  const toast = useToast();
  const FPH_ID = 0;

  const fetchBusiness = async () => {
    try {
      const response = await backend.get(`/business/${id}`);
      setData(response.data[0]);
      setSelectedSupplyStatus(response.data[0].supply_request_status);
      const donationForms = await backend.get(`/donation/business/${id}`);
      setDonationData(donationForms.data);

      setBusiness({
        name: response.data.Name,
        email: response.data.email,
        website: response.data.Website,
        location: response.data.location,
      });

      const reminders = await backend.get(`notification/${id}`);
      if (reminders.data.length > 0) {
        setLastReminder(formatDate(reminders.data[0].timestamp.split('T')[0]));
      }

      const requests = await backend.get(`notification/request/${id}`);
      if (requests.data.length > 0) {
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

  const handleDeleteModalClick = () => {
    backend.delete(`/business/${id}`);
    setIsDeleteModalOpen(false);
    navigate('/AdminDashboard');
  };

  const handleEditClick = () => {
    navigate(`/EditBusiness/${id}`);
  };

  const handleHome = () => {
    navigate(`/AdminDashboard`);
  };

  const handleFormClick = id => {
    navigate(`/ViewDonation/${id}`);
  };

  const handlePrevClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handleManualDonationForm = () => {
    navigate(`/BusinessDonationTrackingForm?id=${id}`);
  };

  const handleSupplyStatusChange = async (status) => {
    setSelectedSupplyStatus(status);
    await backend.put(`business/${id}`, { supplyRequestStatus: status});
    if (status === "Sent") {
      const notificationResponse = await backend.get(`/notification/request/${id}`);

      const date = new Date(notificationResponse.data[0].timestamp);
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      const formattedDate = `${month} ${day}`;

      const requestData = {
        businessId: id,
        message: `Supply request submitted from ${formattedDate} has been shipped.`,
        timestamp: new Date().toISOString(),
        beenDismissed: false,
        type: 'Supply Request',
        senderId: FPH_ID
      };

      await backend.post('/notification', requestData);
    }
  };

  const handleSendReminder = async () => {
    try {
      const requestData = {
        businessId: id,
        businessName: data.name,
        senderId: 0,
        message: "Please submit your donation form by the due date!",
        type: 'Not Submitted',
        donationId: null,
      };
      await backend.post('/notification', requestData);
      toast({
        title: 'Success',
        description: `Reminder sent to ${data.name}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error sending reminders:', error);
      toast({
        title: 'Failed',
        description: `Failed to send reminder to ${data.name}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchBusiness();
    }

    const checkIsAdmin = async () => {
      if (!(await isAdmin())) {
        navigate('/BusinessDashboard');
      } else {
        setIsAdminUser(true);
      }
    };

    const fetchNotifications = async () => {
      const response = await backend.get('/notification/0');
      setNotification(response.data);
    }

    checkIsAdmin();
    fetchNotifications();
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider>
      {isAdminUser && (
        <>
          {data.status !== 'Pending' ? (
            <>
              <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Delete business</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>Are you sure? You can’t undo this action afterwards.</ModalBody>
                  <ModalFooter>
                    <Button colorScheme="gray" mr={3} onClick={() => setIsDeleteModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={handleDeleteModalClick}>
                      Delete
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Flex pl={10} pt={10} justify="flex-end" wrap="nowrap" maxW="80%" flexDirection={'column'}>
                <Flex alignItems="center" justifyContent={'space-between'} mr="auto" w="1089px"  pb={'5'}>
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <BreadcrumbLink color="#245F61" onClick={handleHome}>
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                      <BreadcrumbLink href="#">{data.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </Breadcrumb>
                  <NotificationsDrawer notificationsData={notification} />
                </Flex>
                <Card maxW="100%" w="1089px" h="auto" p={6} mt="6">
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
                          onClick={handleEditClick}
                          icon={<box-icon name="pencil"></box-icon>}
                        />
                        <IconButton
                          variant="regular"
                          colorScheme="red"
                          aria-label="Delete menu"
                          icon={<box-icon name="trash" color="#d30000"></box-icon>}
                          onClick={() => setIsDeleteModalOpen(true)}
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
                                        {`${data.street}, ${data.city}, ${data.state} ${data.zip_code}`}
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
                                        {data.primary_phone.replace(
                                          /(\d{3})(\d{3})(\d{4})/,
                                          '$1-$2-$3',
                                        )}
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
                          <CardHeader mb={-6} ml={1}>
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
                                        {data.fph_phone.replace(
                                          /(\d{3})(\d{3})(\d{4})/,
                                          '$1-$2-$3',
                                        )}
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
                                        {`${formatCreatedBy(data.created_by)} ${formatDateDFH(data.web_date_init)}`}
                                      </Text>
                                    </Td>
                                  </Tr>
                                </Tbody>
                              </Table>
                            </TableContainer>
                          </Flex>
                        </Card>
                        <Card marginTop="6" pb="25px">
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
                                              {data.type}
                                            </MenuButton>
                                            <MenuList>
                                              <MenuItem isDisabled={true}>{data.type}</MenuItem>
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
                                <Button size="sm" variant="solid" colorScheme="teal" onClick={handleSendReminder}>
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
                                <Button
                                  size="xs"
                                  colorScheme="teal"
                                  variant="link"
                                  ml="3"
                                  mt="3"
                                  as="b"
                                  cursor="pointer"
                                  onClick={handleManualDonationForm}
                                >
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
                                <Button size="sm" variant="solid" colorScheme="teal" isDisabled={lastRequest === ''} onClick={() => {navigate(`/ViewRequest/${data.id}`)}}>
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
                                <Menu closeOnSelect={false}>
                                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="xs">
                                    {selectedSupplyStatus}
                                  </MenuButton>
                                  <MenuList>
                                  <MenuOptionGroup type="radio" value={selectedSupplyStatus} onChange={handleSupplyStatusChange}>
                                    <MenuItemOption value='Pending' defaultChecked={selectedSupplyStatus === 'Pending'}>
                                      Pending
                                    </MenuItemOption>
                                    <MenuItemOption value='Sent' defaultChecked={selectedSupplyStatus === 'Sent'}>
                                      Sent
                                    </MenuItemOption>
                                  </MenuOptionGroup>
                                  </MenuList>
                                </Menu>
                                </Box>
                              </Flex>
                            </Box>
                          </Flex>
                        </Card>
                        <Card mt="6" ml="6" height="60%">
                          <Flex direction="column" align="left" w="full">
                            <Box mt="6" ml="6" mb="4">
                              <Text fontSize="sm" mb="4" as="b" whiteSpace="normal">
                                DONATION FORM HISTORY
                              </Text>
                              <CardBody pt="0" pl="0">
                                <div>
                                  <Divider height="10px" width="100%" />
                                  {currentPageData.map((item, index) => (
                                    <Box
                                      key={index}
                                      marginBottom="30px"
                                      marginTop="30px"
                                      cursor="pointer"
                                      color="gray.700"
                                      fontWeight="600"
                                      onClick={() => handleFormClick(item.donation_id)}
                                    >
                                      {/* Render the date property of each object */}
                                      <Text fontSize="md" textDecoration="underline">
                                        {formatDateDFH(item.date)}
                                      </Text>
                                      {index !== data.length - 1 && (
                                        <Divider height="20px" width="100%" />
                                      )}
                                    </Box>
                                  ))}
                                </div>
                                <Box ml="90px">
                                  <Flex alignContent={'center'}>
                                    <Box
                                      sx={{
                                        marginRight: '15px',
                                        alignContent: 'center',
                                        fontSize: '14px',
                                        bottom: '1px',
                                        position: 'relative',
                                      }}
                                    >
                                      {currentPageData.length > 0
                                        ? (currentPage - 1) * itemsPerPage + 1
                                        : 0}
                                      -
                                      {Math.min(
                                        currentPage * itemsPerPage,
                                        donationFormsData.length,
                                      )}{' '}
                                      of {donationFormsData.length}
                                    </Box>
                                    <IconButton
                                      aria-label="Back button"
                                      disabled={currentPage <= 1}
                                      onClick={handlePrevClick}
                                      icon={<ChevronLeftIcon />}
                                      backgroundColor={'#00000000'}
                                    />
                                    <IconButton
                                      aria-label="Next button"
                                      disabled={currentPage >= totalPages}
                                      onClick={handleNextClick}
                                      icon={<ChevronRightIcon />}
                                      backgroundColor={'#00000000'}
                                    />
                                  </Flex>
                                </Box>
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
            </>
          ) : (
            <PendingBusiness data={data} handleHome={handleHome} />
          )}
        </>
      )}
    </ChakraProvider>
  );
};

export default ViewBusiness;
