import { useEffect, useState } from 'react';
import {
  ArrowForwardIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  CardHeader,
  Link as ChakraLink,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  UseDisclosureReturn,
  useToast,
} from '@chakra-ui/react';
import { BiEnvelope, BiPackage, BiPencil, BiTrash } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';

import { useBackend } from '../../contexts/BackendContext';
import { pageStyle, pageTitleStyle } from '../../styles/sharedStyles';
import { Business } from '../../types/business';
import { Donation } from '../../types/donation';
import PendingBusiness from '../PendingBusiness/PendingBusiness';

const formatDateDFH = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
};

const formatCreatedBy = (createdBy: string) => {
  if (!createdBy) {
    return '';
  }

  const nameWords = createdBy.split(' ');
  const initials = nameWords.map((word) => word.charAt(0).toUpperCase() + '.');
  return initials.join('');
};

export const ViewBusiness = () => {
  const { backend } = useBackend();
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const deleteDisclosure = useDisclosure();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [businessData, setBusinessData] = useState<Business>();

  const [selectedSupplyStatus, setSelectedSupplyStatus] = useState(null);
  const [donationData, setDonationData] = useState<Donation[]>([]);
  const [lastReminder, setLastReminder] = useState('');
  const [lastRequest, setLastRequest] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(donationData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, donationData.length);
  const currentPageDonationData = donationData.slice(startIndex, endIndex);

  const FPH_ID = 0;

  const fetchBusiness = async () => {
    try {
      const response = await backend.get(`/business/${id}`);
      setBusinessData(response.data[0]);
      setSelectedSupplyStatus(response.data[0].supply_request_status);

      const donationForms = await backend.get(`/donation/business/${id}`);
      console.log(donationForms.data);
      setDonationData(donationForms.data);

      const reminders = await backend.get(`notification/${id}`);
      if (reminders.data.length > 0) {
        setLastReminder(formatDate(reminders.data[0].timestamp.split('T')[0]));
      }

      const requests = await backend.get(`notification/request/${id}`);
      console.log(requests);
      if (requests.data.length > 0) {
        setLastRequest(formatDate(requests.data[0].timestamp.split('T')[0]));
      }

      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const parts = dateString.split('-');
    const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;

    return formattedDate;
  };

  const handleDeleteModalClick = async () => {
    await backend.delete(`/business/${id}`);
    navigate('/AdminDashboard');
  };

  const handleEditClick = () => {
    navigate(`/EditBusiness/${id}`);
  };

  const handleClickHome = () => {
    navigate(`/AdminDashboard`);
  };

  const handleFormClick = (id: number) => {
    navigate(`/ViewDonation/${id}`);
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleManualDonationForm = () => {
    navigate(`/BusinessDonationTrackingForm?id=${id}`);
  };

  const handleSupplyStatusChange = async (status: string | string[]) => {
    setSelectedSupplyStatus(status);
    await backend.put(`business/${id}`, { supplyRequestStatus: status });
    if (status === 'Sent') {
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
        senderId: FPH_ID,
      };

      await backend.post('/notification', requestData);
    }
  };

  const handleSendReminder = async () => {
    try {
      const requestData = {
        businessId: id,
        businessName: businessData.name,
        senderId: 0,
        message: 'Please submit your donation form by the due date!',
        type: 'Not Submitted',
        donationId: null as unknown,
      };
      await backend.post('/notification', requestData);
      toast({
        title: 'Success',
        description: `Reminder sent to ${businessData.name}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error sending reminders:', error);
      toast({
        title: 'Failed',
        description: `Failed to send reminder to ${businessData.name}`,
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
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (businessData.status === 'Pending') {
    return <PendingBusiness data={businessData} handleHome={handleClickHome} />;
  }

  console.log(businessData);

  const businessTable = [
    { label: 'NAME', value: businessData.contact_name },
    { label: 'EMAIL', value: businessData.primary_email },
    { label: 'BUSINESS ID', value: businessData.id },
    { label: 'WEBSITE', value: businessData.website },
    {
      label: 'LOCATION',
      value: `${businessData.street.trim() || 'N/A'}, ${businessData.city.trim() || 'N/A'}, ${businessData.state.trim() || 'N/A'} ${businessData.zip_code.trim() || 'N/A'}`,
    },
    {
      label: 'PHONE',
      value: businessData.primary_phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
    },
    { label: 'BUSINESS HOURS', value: businessData.business_hours },
  ];

  const websiteDetails = [
    {
      title: 'Phone for FPOTH Website',
      content: businessData.fph_phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
    },
    {
      title: 'Notes for Website',
      content: businessData.web_notes,
    },
    {
      title: 'Publish Status',
      content: businessData.published ? 'Published' : 'Not Published',
    },
    {
      title: 'Added to Website (Date & Initials)',
      content: `${formatCreatedBy(businessData.created_by)} ${formatDateDFH(businessData.web_date_init)}`,
    },
  ];

  const getBusinessTypes = (businessData: Business) => {
    return [
      businessData.food && 'Pet Food Donation Site',
      businessData.donation && 'Donation Site',
      businessData.shelter && 'Shelter',
      businessData.family_shelter && 'Families Only Shelter',
      businessData.wellness && 'Wellness Clinics',
      businessData.spay_neuter && 'Spay Neuter',
      businessData.financial && 'Financial Assistance',
      businessData.re_home && 'Rehome Foster',
      businessData.sync_to_qb && 'Entered in QB',
      businessData.inactive && 'Inactive',
      businessData.final_check && 'Final Check',
      businessData.er_boarding && 'ER Boarding',
      businessData.senior && 'Senior Citizens Only',
      businessData.cancer && 'Cancer Specific',
      businessData.dog && 'Dog Specific',
      businessData.cat && 'Cat Specific',
    ]
      .filter(Boolean)
      .join(' | ');
  };

  console.log(businessData);
  const additionalInformation = [
    {
      title: 'Internal Notes',
      content: businessData.internal_notes,
    },
    {
      title: 'Type',
      content: getBusinessTypes(businessData),
    },
    {
      title: 'Created By',
      content: `${businessData.created_by || 'N/A'} on ${formatDateDFH(businessData.created_date) || 'N/A'}`,
    },
    {
      title: 'Updated By',
      content: `${businessData.updated_by || 'N/A'} on ${formatDateDFH(businessData.updated_date_time) || 'N/A'}`,
    },
  ];

  return (
    <>
      <Flex sx={pageStyle}>
        <Breadcrumb spacing="2">
          <BreadcrumbItem>
            <BreadcrumbLink color="#245F61" onClick={handleClickHome}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{businessData.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Heading sx={pageTitleStyle}>Business Information</Heading>

        <Card>
          <CardHeader>
            <Flex justify="space-between" align="center" w="full">
              <Flex align="center" gap="4">
                <Box>
                  <Heading size="md">{businessData.name}</Heading>
                  <Text>{businessData.primary_email}</Text>
                </Box>
              </Flex>

              <Flex>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="Edit menu"
                  onClick={handleEditClick}
                  icon={<BiPencil />}
                />
                <IconButton
                  variant="regular"
                  colorScheme="red"
                  aria-label="Delete menu"
                  icon={<BiTrash />}
                  onClick={deleteDisclosure.onOpen}
                />
              </Flex>
            </Flex>
          </CardHeader>

          <CardBody>
            <Flex direction={{ base: 'column', xl: 'row' }} gap={4}>
              <Flex sx={{ flex: 2, flexDirection: 'column', gap: 4 }}>
                <Card>
                  <TableContainer>
                    <Table>
                      <Thead />
                      <Tbody>
                        <Tr>
                          <Td>
                            <Text fontSize="xs" color="500" fontWeight={'semibold'}>
                              Business Details
                            </Text>
                          </Td>
                        </Tr>
                        {businessTable.map((item) => (
                          <Tr key={item.label}>
                            <Td width={300}>
                              <Text color="500" fontWeight={'semibold'}>
                                {item.label}
                              </Text>
                            </Td>
                            <Td>
                              {item.label === 'BUSINESS ID' ? (
                                // <ChakraLink as={Link} to={`/signupbusiness?id=${item.value}`}>
                                <Tooltip
                                  label={`Copy Business Signup Link to Clipboard: ${window.location.origin}/signupbusiness?id=${item.value}`}
                                  width={'fit-content'}
                                >
                                  <Text
                                    color="500"
                                    fontWeight={'semibold'}
                                    textDecoration={'underline'}
                                    cursor="pointer"
                                    width={'fit-content'}
                                    onClick={() => {
                                      const link = `${window.location.origin}/signupbusiness?id=${item.value}`;
                                      navigator.clipboard.writeText(link);

                                      toast({
                                        title: 'Business signup link copied!',
                                        description: `Copied to clipboard: ${link}`,
                                        status: 'success',
                                        duration: 3000,
                                        isClosable: true,
                                      });
                                    }}
                                  >
                                    {item.value}
                                  </Text>
                                </Tooltip>
                              ) : (
                                // </ChakraLink>
                                <Text color="500">{item.value}</Text>
                              )}
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Card>

                <Card>
                  <TableContainer>
                    <Table>
                      <Thead />
                      <Tbody>
                        <Tr>
                          <Td>
                            <Text fontSize="xs" color="500" fontWeight={'semibold'}>
                              Site Details
                            </Text>
                          </Td>
                        </Tr>
                        {websiteDetails.map((detail, index) => (
                          <Tr key={index}>
                            <Td width={300}>
                              <Text color="500" fontWeight="semibold">
                                {detail.title}
                              </Text>
                            </Td>
                            <Td>
                              <Text
                                color="500"
                                whiteSpace={detail.title.includes('Notes') ? 'normal' : 'nowrap'}
                              >
                                {detail.content}
                              </Text>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Card>

                <Card>
                  <TableContainer>
                    <Table>
                      <Thead />
                      <Tbody>
                        <Tr>
                          <Td>
                            <Text fontSize="xs" color="500" fontWeight={'semibold'}>
                              Additional Information
                            </Text>
                          </Td>
                        </Tr>
                        {additionalInformation.map((detail, index) => (
                          <Tr key={index}>
                            <Td width={300}>
                              <Text color="500" fontWeight="semibold">
                                {detail.title}
                              </Text>
                            </Td>
                            <Td>
                              <Text color="500" whiteSpace="normal">
                                {detail.content}
                              </Text>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Card>
              </Flex>

              <Flex sx={{ flex: 1, flexDirection: 'column', gap: 4 }}>
                <Card>
                  <Flex sx={{ padding: 3, flexDirection: 'column', gap: 2 }}>
                    <Text sx={{ fontWeight: 'semibold', fontSize: 'xs' }}>
                      Donation Form Status
                    </Text>

                    <Stack spacing={1}>
                      <Button
                        size="sm"
                        colorScheme="teal"
                        onClick={handleSendReminder}
                        sx={{ display: 'flex', gap: 2, width: 'fit-content' }}
                      >
                        <Icon as={BiEnvelope} />
                        <Text fontSize="sm">Send reminder</Text>
                      </Button>
                      <Text fontSize="xs">
                        {lastReminder != '' && `Last reminder sent on ${lastReminder}`}
                      </Text>
                    </Stack>

                    <Divider />

                    <Flex flexDirection="row" alignItems={'center'}>
                      <Text fontSize="sm" fontWeight={'semibold'}>
                        OR&nbsp;
                      </Text>
                      <Button
                        size="sm"
                        colorScheme="teal"
                        variant="link"
                        cursor="pointer"
                        onClick={handleManualDonationForm}
                      >
                        Manually submit form <ArrowForwardIcon />
                      </Button>
                    </Flex>
                  </Flex>
                </Card>

                <Card>
                  <Flex sx={{ padding: 3, flexDirection: 'column', gap: 2 }}>
                    <Text sx={{ fontWeight: 'semibold', fontSize: 'xs' }}>Supply Request</Text>

                    <Stack spacing={1}>
                      <Button
                        size="sm"
                        colorScheme="teal"
                        isDisabled={lastRequest === ''}
                        sx={{ display: 'flex', gap: 2, width: 'fit-content' }}
                        onClick={() => {
                          navigate(`/ViewRequest/${businessData.id}`);
                        }}
                      >
                        <Icon as={BiPackage} />
                        <Text fontSize="sm">View request</Text>
                      </Button>
                      <Text fontSize="xs">
                        {lastRequest != '' && `Requested on ${lastRequest}`}
                      </Text>
                    </Stack>

                    <Divider />

                    <Flex flexDirection="row" alignItems={'center'} gap={2}>
                      <Text fontSize="sm" fontWeight={'semibold'}>
                        Status:
                      </Text>
                      <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="sm">
                          {selectedSupplyStatus}
                        </MenuButton>
                        <MenuList>
                          <MenuOptionGroup
                            type="radio"
                            value={selectedSupplyStatus}
                            onChange={handleSupplyStatusChange}
                          >
                            <MenuItemOption
                              value="Pending"
                              defaultChecked={selectedSupplyStatus === 'Pending'}
                            >
                              Pending
                            </MenuItemOption>
                            <MenuItemOption
                              value="Sent"
                              defaultChecked={selectedSupplyStatus === 'Sent'}
                            >
                              Sent
                            </MenuItemOption>
                          </MenuOptionGroup>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Flex>
                </Card>

                <Card>
                  <Flex sx={{ padding: 3, flexDirection: 'column', gap: 2 }}>
                    <Text sx={{ fontWeight: 'semibold', fontSize: 'xs' }}>
                      Donation Form History
                    </Text>
                    <Divider />
                    <Stack spacing={2}>
                      {currentPageDonationData.map((item, index) => (
                        <Button
                          key={index}
                          variant={'link'}
                          onClick={() => handleFormClick(item.donation_id)}
                          sx={{ width: '100%' }}
                        >
                          <Stack spacing={2} sx={{ width: '100%', alignItems: 'start' }}>
                            <Text fontSize="md" textDecoration="underline">
                              {formatDateDFH(item.date)} - {item.reporter}
                            </Text>
                            {index !== currentPageDonationData.length - 1 && <Divider />}
                          </Stack>
                        </Button>
                      ))}

                      <HStack sx={{ justifyContent: 'flex-end' }}>
                        <Box>
                          {(currentPage - 1) * 10 + 1} to{' '}
                          {Math.min(currentPage * itemsPerPage, donationData.length)} of{' '}
                          {donationData.length}
                        </Box>
                        <IconButton
                          aria-label="Back button"
                          isDisabled={currentPage <= 1}
                          icon={<ChevronLeftIcon />}
                          onClick={handlePrevClick}
                        />
                        <IconButton
                          aria-label="Next button"
                          isDisabled={currentPage >= totalPages}
                          icon={<ChevronRightIcon />}
                          onClick={handleNextClick}
                        />
                      </HStack>
                    </Stack>
                  </Flex>
                </Card>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Flex>

      <DeleteBusinessModal
        deleteDisclosure={deleteDisclosure}
        handleDelete={handleDeleteModalClick}
      />
    </>
  );
};

const DeleteBusinessModal = ({
  deleteDisclosure,
  handleDelete,
}: {
  deleteDisclosure: UseDisclosureReturn;
  handleDelete: () => unknown;
}) => {
  return (
    <Modal isOpen={deleteDisclosure.isOpen} onClose={deleteDisclosure.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete business</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure? You can’t undo this action afterwards.</ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={deleteDisclosure.onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
