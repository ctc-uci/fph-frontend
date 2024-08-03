import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Flex,
  Text,
  IconButton,
  ChakraProvider,
  Card,
  CardHeader,
  CardBody,
  TableContainer,
  Td,
  Tr,
  Thead,
  Tbody,
  Table,
  CardFooter,
  Input,
  Spacer,
  Textarea,
  Select,
  Checkbox,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Stack,
} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import 'boxicons';
import './BusinessForm.module.css';
import { useBackend } from '../../contexts/BackendContext';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer';
import classes from './BusinessForm.module.css';

const BusinessForm = ({ edit = true }) => {
  // State for each form field
  const additionalInfoItems = [
    'Pet Food Provider Site',
    'Entered in QB',
    'Donation Site',
    'Inactive',
    'Shelter',
    'Final Check',
    'Domestic Violence Shelter',
    'ER Boarding',
    'Families Only Shelter',
    'Senior Citizens Only',
    'Wellness Clinics',
    'Cancer Specific',
    'Spay Neuter',
    'Dog Specific',
    'Financial Assistance',
    'Cat Specific',
    'Rehome Foster',
  ];
  const { id } = useParams();
  const { isAdmin, currentUser } = useAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [website, setWebsite] = useState('');
  const [countrycode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [howHeard, setHowHeard] = useState('');
  const navigate = useNavigate();
  const [businessHours, setBusinessHours] = useState('');
  const [checkedAddedInfo, setCheckedAddedInfo] = useState({});
  const [webNotes, setWebNotes] = useState('');
  const [published, setPublished] = useState(false);
  const [webDateInit, setWebDateInit] = useState(new Date());
  const [internalNotes, setInternalNotes] = useState('');
  const [fphPhone, setFPHPhone] = useState('');
  const [vendorType, setVendorType] = useState('');
  const [serviceRequest, setServiceRequest] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [termsAndConditionsIsOpened, setTermsAndConditionsIsOpened] = useState(false);
  const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState(false);
  const [updatedBy, setUpdatedBy] = useState(null);
  const { backend } = useBackend();
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const checkIsAdmin = async () => {
      if (!(await isAdmin())) {
        navigate('/BusinessDashboard');
      } else {
        setIsAdminUser(true);
      }
    };

    checkIsAdmin();

    const fetchNotifications = async () => {
      const response = await backend.get('/notification/0');
      setNotification(response.data);
    };

    if (notification.length === 0) {
      fetchNotifications();
    }

    if (edit) {
      fillOutPendingData();
    }

    const getAdminUser = async () => {
      try {
        const adminUserResponse = await backend.get(`adminUser/${currentUser.email}`);
        setUpdatedBy(adminUserResponse.data[0].name);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser) {
      getAdminUser();
    }
  }, [backend]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const parsedPhone = phone.replace(/-/g, '');

      const data = {
        name: businessName,
        contactName: firstName + ' ' + lastName,
        street: addressLine1 + ' ' + addressLine2,
        zipCode: zip,
        state: state,
        city: city,
        website: website,
        businessHours: businessHours,
        primaryPhone: parsedPhone,
        primaryEmail: email,
        findOut: howHeard,
        food: checkedAddedInfo['Pet Food Provider Site'],
        donation: checkedAddedInfo['Donation Site'],
        familyShelter: checkedAddedInfo['Family Shelter'],
        wellness: checkedAddedInfo['Wellness Clinics'],
        spayNeuter: checkedAddedInfo['Spay Neuter'],
        financial: checkedAddedInfo['Financial Assistance'],
        reHome: checkedAddedInfo['Rehome Foster'],
        erBoarding: checkedAddedInfo['ER Boarding'],
        senior: checkedAddedInfo['Senior Citzens Only'],
        cancer: checkedAddedInfo['Cancer Specific'],
        dog: checkedAddedInfo['Dog Specific'],
        cat: checkedAddedInfo['Cat Specific'],
        fphPhone: fphPhone,
        webNotes: webNotes,
        internalNotes: internalNotes,
        published: published,
        shelter: checkedAddedInfo['Shelter'],
        domesticViolence: checkedAddedInfo['Domestic Violence'],
        webDateInit: webDateInit,
        entQb: checkedAddedInfo['Entered In QB'],
        serviceRequest: serviceRequest,
        inactive: checkedAddedInfo['Inactive'],
        finalCheck: checkedAddedInfo['Final Check'],
        type: vendorType,
        status: 'Active',
        onboardingStatus: 'Active',
        updatedDateTime: new Date(),
        updatedBy: updatedBy,
      };
      if (edit) {
        await backend.put(`/business/${id}`, data);
      } else {
        await backend.post('/business', data);
      }

      if (edit) {
        navigate(`/ViewBusiness/${id}`);
      } else {
        navigate('/AdminDashboard');
      }
    } catch (error) {
      console.error('Error in business registration:', error);
    }
  };

  const handleHome = () => {
    navigate(`/AdminDashboard`);
  };

  const handleDeleteModalClick = () => {
    backend.delete(`/business/${id}`);
    setIsDeleteModalOpen(false);
    navigate('/AdminDashboard');
  };

  const fillOutPendingData = async () => {
    const business = await backend.get(`/business/${id}`);
    const business_data = business.data[0];
    setBusinessName(business_data.name ? business_data.name : '');
    if (business_data.contact_name === null) {
      setFirstName('');
      setLastName('');
    } else {
      setFirstName(business_data.contact_name.split(' ')[0]);
      setLastName(business_data.contact_name.split(' ')[1] || '');
    }
    if (business_data.street === null) {
      setAddressLine1('');
      setAddressLine2('');
    } else {
      setAddressLine1(business_data.street.split(' ')[0]);
      setAddressLine2(business_data.street.split(' ')[1] || '');
    }

    setCity(business_data.city || '');
    setState(business_data.state || '');
    setZip(business_data.zip_code || '');
    setWebsite(business_data.website || '');
    setPhone(business_data.primary_phone || '');
    setEmail(business_data.primary_email || '');
    setHowHeard(business_data.find_out || '');
    setWebNotes(business_data.web_notes || '');
    setPublished(business_data.published || false);
    setWebDateInit(business_data.web_date_init || '');
    setBusinessHours(business_data.business_hours || '');
    setVendorType(business_data.type || '');
    setCheckedAddedInfo({
      ...checkedAddedInfo,
      ['Pet Food Provider Site']: business_data.food,
      ['Donation Site']: business_data.donation,
      ['Shelter']: business_data.shelter,
      ['Domestic Violence Shelter']: business_data.domestic_violence,
      ['Families Only Shelter']: business_data.family_shelter,
      ['Wellness Clinics']: business_data.wellness,
      ['Spay Neuter']: business_data.spay_neuter,
      ['Financial Assistance']: business_data.financial,
      ['Rehome Foster']: business_data.re_home,
      ['Entered in QB']: business_data.ent_qb,
      ['Inactive']: business_data.inactive,
      ['Final Check']: business_data.final_check,
      ['ER Boarding']: business_data.er_boarding,
      ['Senior Citizens Only']: business_data.senior,
      ['Cancer Specific']: business_data.cancer,
      ['Dog Specific']: business_data.dog,
      ['Cat Specific']: business_data.cat,
    });
    setFPHPhone(business_data.fph_phone || '');
    setServiceRequest(business_data.service_request || false);
  };

  const handleCheckboxChange = event => {
    const { name, checked } = event.target;
    setCheckedAddedInfo({ ...checkedAddedInfo, [name]: checked });
  };

  const handleCancel = () => {
    navigate(`/ViewBusiness/${id}`);
  };

  const handleToggleTerms = () => {
    setTermsAndConditionsAccepted(!termsAndConditionsAccepted);
  };

  return (
    <ChakraProvider>
      {isAdminUser && (
        <>
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
            <Modal isOpen={termsAndConditionsIsOpened} isCentered>
              <ModalOverlay>
                <ModalContent width="80%" maxWidth="800px" top="5vw">
                  <ModalHeader>
                    &nbsp;
                    <Stack direction="row" justifyContent="space-between">
                      <Text fontWeight="bold" fontSize="2xl">
                        Terms and Conditions&nbsp;
                      </Text>

                      <ModalCloseButton
                        onClick={() => {
                          setTermsAndConditionsIsOpened(false);
                        }}
                      />
                    </Stack>
                  </ModalHeader>
                  <ModalBody alignItems="center" overflow={'scroll'}>
                    <Text fontSize="xl">
                      I hereby acknowledge and agree to serve as a member/volunteer for Feeding Pets
                      of the Homeless, 710 West Washington Street, Carson City, NV 89703. I give my
                      consent and agree to release, indemnify and hold harmless Feeding Pets of the
                      Homeless (DBA: Pets of the Homeless) and all personnel, including but not
                      limited to its officers, agents and/or employees, other participants,
                      sponsors, advertisers, I hereby assume all of the risks of participating as a
                      volunteer, with respect to any and all injury, disability, death or loss or
                      damage of person or property, whether arising from negligence of the releases
                      or otherwise, to the fullest extent permitted by law. I agree to comply with
                      the guidelines and conditions for participation. See Fundraising Policies
                      here:
                      http://www.petsofthehomeless.org/fundraising-policy-for-pets-of-the-homeless/
                      Pets of the Homeless reserves the right to terminate this agreement at any
                      time. I also grant Feeding Pets of the Homeless the right to use photographs
                      of me at events and activities and use the photographs in future advertising
                      including online webpage. <br />
                      <br />I acknowledge that all information regarding Pets of the Homeless&apos;
                      operations, procedures, contacts, volunteers, recipients and donors is of a
                      proprietary nature and should not be disclosed or used for any purposes other
                      than the direct benefit of the organization
                      <br />
                      <br />I HAVE READ THIS RELEASE OF LIABILITY AND FULLY UNDERSTAND ITS TERMS AND
                      CONDITIONS.
                      <br />
                      <br />I acknowledge that I am not authorized to speak to the media. I agree to
                      refer all media inquiries to Headquarters, 775-841-7463.
                    </Text>
                    <Text fontsize="sm" marginTop="5vh">
                      By checking the &quot;I Accept the Terms and Conditions&quot; box and clicking
                      the &quot;Save&quot; button on this page, you acknowledge you have read and
                      agree to the above.
                    </Text>
                  </ModalBody>
                </ModalContent>
              </ModalOverlay>
            </Modal>
          </>
          <Flex
            pl={10}
            pt={10}
            justify="flex-end"
            wrap="nowrap"
            maxW="93%"
            flexDirection={'column'}
          >
            <Flex justifyContent={'space-between'} mr="auto" w="1089px" marginTop={4}>
              <Breadcrumb spacing="1">
                <BreadcrumbItem>
                  <BreadcrumbLink color="#245F61" onClick={handleHome}>
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{edit ? businessName : 'Add Business'}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>

              <NotificationsDrawer notificationsData={notification} />
            </Flex>
            <Heading size="lg" className={classes.titleText}>
              Add Business Form
            </Heading>
            <Card maxW="100%" w="100%" h="auto" p={6} mt="5" flex={1}>
              <CardHeader>
                <Flex justify="space-between" align="center" w="full">
                  <Flex flexGrow={true} alignItems="flex-start" gap="4" flexDirection="column">
                    <Text fontSize="2xl" fontWeight="700" color="gray.700">
                      Donation Site Information
                    </Text>
                    <Text>
                      {edit ? '' : 'Please fill the following form to add a new donation site.'}
                    </Text>
                  </Flex>
                  {edit && (
                    <Flex>
                      <Button
                        variant="outline"
                        colorScheme="gray"
                        rightIcon={<box-icon name="pencil" />}
                      >
                        Editing
                      </Button>
                      <IconButton
                        variant="regular"
                        colorScheme="red"
                        aria-label="Delete menu"
                        icon={<box-icon name="trash" color="#d30000"></box-icon>}
                        onClick={() => setIsDeleteModalOpen(true)}
                      />
                    </Flex>
                  )}
                </Flex>
              </CardHeader>
              <CardBody>
                <Flex direction="row">
                  <Box flex="4" w="100">
                    <Card>
                      <Flex alignItems="left">
                        <TableContainer>
                          <Table variant="unstyled">
                            <Thead></Thead>
                            <Tbody>
                              <Tr w="100%">
                                <Td>
                                  <Text fontSize="xs" color="500" as="b">
                                    NAME OF BUSINESS
                                  </Text>
                                </Td>
                                <Td>
                                  <Input
                                    value={businessName}
                                    onChange={e => setBusinessName(e.target.value)}
                                    placeholder="Business"
                                  />
                                </Td>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Text fontSize="xs" color="500" as="b">
                                    NAME
                                  </Text>
                                </Td>
                                <Td>
                                  <Flex gap={4}>
                                    <Input
                                      value={firstName}
                                      onChange={e => {
                                        setFirstName(e.target.value);
                                      }}
                                      placeholder="First Name"
                                    />
                                    <Input
                                      value={lastName}
                                      onChange={e => {
                                        setLastName(e.target.value);
                                      }}
                                      placeholder="Last Name"
                                    />
                                  </Flex>
                                </Td>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Text fontSize="xs" color="500" as="b">
                                    EMAIL
                                  </Text>
                                </Td>
                                <Td>
                                  <Input
                                    value={email}
                                    onChange={e => {
                                      setEmail(e.target.value);
                                    }}
                                    placeholder="Email"
                                  />
                                </Td>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Text fontSize="xs" color="500" as="b">
                                    WEBSITE
                                  </Text>
                                </Td>
                                <Td>
                                  <Input
                                    value={website}
                                    onChange={e => {
                                      setWebsite(e.target.value);
                                    }}
                                    placeholder="Website"
                                  />
                                </Td>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Text fontSize="xs" color="500" as="b">
                                    LOCATION
                                  </Text>
                                </Td>
                                <Td>
                                  <Flex flexFlow={'row wrap'} gap={2}>
                                    <Flex gap={4}>
                                      <Input
                                        value={addressLine1}
                                        onChange={e => {
                                          setAddressLine1(e.target.value);
                                        }}
                                        w="42vw"
                                        placeholder="Street"
                                      />
                                      <Input
                                        value={addressLine2}
                                        onChange={e => {
                                          setAddressLine2(e.target.value);
                                        }}
                                        placeholder="Unit or Apartment Number"
                                      />
                                    </Flex>
                                    <Flex gap={4}>
                                      <Flex gap={4}>
                                        <Input
                                          value={city}
                                          onChange={e => {
                                            setCity(e.target.value);
                                          }}
                                          placeholder="City"
                                        />
                                        <Input
                                          value={state}
                                          onChange={e => {
                                            setState(e.target.value);
                                          }}
                                          placeholder="State"
                                        />
                                      </Flex>
                                      <Flex>
                                        <Input
                                          value={zip}
                                          onChange={e => {
                                            setZip(e.target.value);
                                          }}
                                          placeholder="Zip/Postal"
                                        />
                                      </Flex>
                                    </Flex>
                                  </Flex>
                                </Td>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Text fontSize="xs" color="500" as="b">
                                    NUMBER OF CONTACT
                                  </Text>
                                </Td>
                                <Td>
                                  <Flex gap={4}>
                                    <Input
                                      flex={'1 0 15%'}
                                      value={countrycode}
                                      onChange={e => {
                                        setCountryCode(e.target.value);
                                      }}
                                      placeholder="+1"
                                    />
                                    <Input
                                      flex={'1 0 80%'}
                                      value={phone}
                                      onChange={e => {
                                        setPhone(e.target.value);
                                      }}
                                      placeholder="000-000-0000"
                                    />
                                  </Flex>
                                </Td>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Text fontSize="xs" color="500" as="b">
                                    BUSINESS HOURS
                                  </Text>
                                </Td>
                                <Td>
                                  <Input
                                    value={businessHours}
                                    onChange={e => {
                                      setBusinessHours(e.target.value);
                                    }}
                                    placeholder="Business Hours"
                                  />
                                </Td>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Flex flexDirection="column">
                                    <Text fontSize="xs" color="500" as="b">
                                      HOW DID THIS BUSINESS
                                    </Text>
                                    <Text fontSize="xs" color="500" as="b">
                                      HEAR OF US?
                                    </Text>
                                  </Flex>
                                </Td>
                                <Td>
                                  <Input
                                    value={howHeard}
                                    onChange={e => {
                                      setHowHeard(e.target.value);
                                    }}
                                    placeholder="LinkedIn, Google, etc."
                                  />
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
                                </Td>
                              </Tr>
                              <Tr>
                                <Td colSpan={2}>
                                  <Flex flexDirection={'row'} flexWrap={'wrap'} gap={2}>
                                    {additionalInfoItems.map((item, index) => (
                                      <Flex
                                        key={index}
                                        justifyContent={'space-between'}
                                        flex={'1 0 34%'}
                                        maxWidth={'49%'}
                                      >
                                        <Text>{item}</Text>
                                        <Checkbox
                                          name={item}
                                          isChecked={checkedAddedInfo[item] || false}
                                          onChange={handleCheckboxChange}
                                        />
                                      </Flex>
                                    ))}
                                  </Flex>
                                </Td>
                              </Tr>
                              <Tr>
                                <Flex alignItems="center">
                                  <Td>
                                    <Text fontSize="xs" color="500" as="b">
                                      TYPE
                                    </Text>
                                    <Select
                                      placeholder="Type"
                                      value={vendorType}
                                      onChange={e => setVendorType(e.target.value)}
                                      w="20vw"
                                    >
                                      <option value={'School'}>School</option>
                                      <option value={'hospitHospitalal'}>Hospital</option>
                                      <option value={'Grocery store'}>Grocery Store</option>
                                      <option value={'Private institution'}>
                                        Private Institution
                                      </option>
                                      <option value={'Other'}>Other</option>
                                    </Select>
                                  </Td>
                                  <Td>
                                    <Flex gap={10} mt={2}>
                                      <Text>Valid for Service Request</Text>
                                      <Checkbox
                                        isChecked={serviceRequest}
                                        onChange={() => setServiceRequest(!serviceRequest)}
                                      ></Checkbox>
                                    </Flex>
                                  </Td>
                                </Flex>
                              </Tr>
                              <Tr>
                                <Td>
                                  <Text fontSize="xs" color="500" as="b" whiteSpace="normal">
                                    Internal Notes
                                  </Text>
                                  <Textarea
                                    value={internalNotes}
                                    onChange={e => {
                                      setInternalNotes(e.target.value);
                                    }}
                                    placeholder="Internal Notes"
                                  />
                                </Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Flex>
                    </Card>
                  </Box>
                  <Spacer maxW={'sm'}></Spacer>
                </Flex>
              </CardBody>
              <Flex gap={2} ml="1vw">
                <Checkbox isChecked={termsAndConditionsAccepted} onChange={handleToggleTerms} />
                <Flex gap={1}>
                  <Text>Accepted the</Text>
                  <Text
                    textDecoration="underline"
                    cursor="pointer"
                    onClick={() => {
                      setTermsAndConditionsIsOpened(true);
                    }}
                  >
                    Terms and Conditions
                  </Text>
                </Flex>
              </Flex>
              <Flex gap={4} ml="auto" mr="1vw">
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  onClick={handleSubmit}
                  colorScheme="teal"
                  isDisabled={!termsAndConditionsAccepted}
                >
                  Save
                </Button>
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
          </Flex>
        </>
      )}
    </ChakraProvider>
  );
};

BusinessForm.propTypes = {
  edit: PropTypes.bool,
};

const AddBusinessForm = () => {
  return <BusinessForm edit={false} />;
};

export { AddBusinessForm, BusinessForm };
