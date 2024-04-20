import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
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
  Link as ChakraLink,
} from '@chakra-ui/react';

import 'boxicons';
import './BusinessForm.module.css';
import { useBackend } from '../../contexts/BackendContext';
import RegisterSuccessPage from '../RegisterBusinessForm/RegisterSuccessPage';

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
  const [businessData, setBusinessData] = useState({});
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
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  const [businessHours, setBusinessHours] = useState('');
  const [checkedAddedInfo, setCheckedAddedInfo] = useState({});
  const [webNotes, setWebNotes] = useState('');
  const [published, setPublished] = useState(false);
  const [webDateInit, setWebDateInit] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [fphPhone, setFPHPhone] = useState('');
  const [vendorType, setVendorType] = useState('');
  const [serviceRequest, setServiceRequest] = useState(false);
  const { backend } = useBackend();
  useEffect(() => {
    if (edit) {
      fillOutPendingData();
    }
  }, [backend]);

  const updateBusinessDataCreate = () => {
    const DUMMY_STRING = 'STRING';
    const DUMMY_DATE = new Date().toISOString().split('T')[0];
    const DUMMY_BOOL = false;
    setBusinessData({
      name: businessName,
      contactName: firstName + ' ' + lastName,
      street: addressLine1 + ' ' + addressLine2,
      zipCode: zip,
      state: state,
      city: city,
      website: website,
      businessHours: businessHours,
      primaryPhone: phone,
      primaryEmail: email,
      findOut: howHeard,
      type: DUMMY_STRING,
      qbVendorName: DUMMY_STRING,
      qbCityStateZip: DUMMY_STRING,
      backupPhone: DUMMY_STRING,
      comments: DUMMY_STRING,
      faxPhone: DUMMY_STRING,
      onboardingStatus: DUMMY_STRING,
      joinDate: DUMMY_DATE,
      inputTypeStatus: DUMMY_STRING,
      vendorType: DUMMY_STRING,
      status: DUMMY_STRING,
      petsOfTheHomelessDiscount: DUMMY_BOOL,
      updatedBy: DUMMY_STRING,
      updatedDateTime: DUMMY_DATE,
      syncToQb: DUMMY_BOOL,
      veterinary: DUMMY_BOOL,
      resource: DUMMY_BOOL,
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
      contactPhone: DUMMY_STRING,
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
      createdBy: DUMMY_DATE,
      createdDate: DUMMY_DATE,
    });
  };

  const updateBusinessDataEdit = () => {
    setBusinessData({
      name: businessName,
      contactName: firstName + ' ' + lastName,
      street: addressLine1 + ' ' + addressLine2,
      zipCode: zip,
      state: state,
      city: city,
      website: website,
      businessHours: businessHours,
      primaryPhone: phone,
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
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (edit) {
      updateBusinessDataEdit();
    } else {
      updateBusinessDataCreate();
    }

    try {
      if (edit) {
        await backend.put(`/business/${id}`, {
          name: businessName,
          contactName: firstName + ' ' + lastName,
          street: addressLine1 + ' ' + addressLine2,
          zipCode: zip,
          state: state,
          city: city,
          website: website,
          businessHours: businessHours,
          primaryPhone: phone,
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
        });
      } else {
        await backend.post('/business', businessData);
      }
      navigate('/AdminDashboard');
    } catch (error) {
      console.error('Error in business registration:', error);
    }
    if (edit) {
      navigate(`/ViewBusiness/${id}`);
    } else {
      setRegistrationSuccess(true);
    }
  };

  const handleHome = () => {
    navigate(`/AdminDashboard`);
  };

  if (registrationSuccess) {
    return <RegisterSuccessPage />;
  }

  // const handleApprove = async () => {
  //   const updatedData = {
  //     ...businessData,
  //     status: 'Active',
  //   };
  //   try {
  //     await backend.put(`/business/${id}`, updatedData);
  //     setRegistrationSuccess(true);
  //     navigate('/AdminDashboard');
  //     toast({
  //       title: 'Business form has been approved',
  //       status: 'warning',
  //       duration: 3000,
  //       isClosable: true,
  //       position: 'bottom-right',
  //     });
  //   } catch (error) {
  //     console.log('Error in approving business:', error);
  //   }
  // };

  // const handleDeny = async () => {
  //   const updatedData = {
  //     ...businessData,
  //     status: 'Denied',
  //   };
  //   try {
  //     await backend.put(`/business/${id}`, updatedData);
  //     setRegistrationSuccess(true);
  //     navigate('/AdminDashboard');
  //     toast({
  //       title: 'Business form has been denied',
  //       status: 'warning',
  //       duration: 3000,
  //       isClosable: true,
  //       position: 'bottom-right',
  //     });
  //   } catch (error) {
  //     console.error('Error in approving business:', error);
  //   }
  // };

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
    setVendorType(business_data.vendorType || '');
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
  };

  const handleCheckboxChange = event => {
    const { name, checked } = event.target;
    setCheckedAddedInfo({ ...checkedAddedInfo, [name]: checked });
  };

  const handleCancel = () => {
    navigate(`/ViewBusiness/${id}`);
  };

  return (
    <ChakraProvider>
      <Flex justify="flex-end" wrap="nowrap" maxW="80%" mx="auto" flexDirection={'column'}>
        <Flex justifyContent={'space-between'} mr="auto" w="1089px" marginTop={4}>
          <Flex gap={1}>
            <ChakraLink onClick={handleHome} color="blue.500" decoration="underline">
              Home{' '}
            </ChakraLink>
            <Text>/ {businessName}</Text>
          </Flex>

          <IconButton icon={<box-icon type="solid" name="bell"></box-icon>} />
        </Flex>
        <Card maxW="100%" w="1089px" h="auto" p={6} mt="10">
          <CardHeader>
            <Flex justify="space-between" align="center" w="full">
              <Flex flexGrow={true} align="center" gap="4">
                <Box>
                  <Input
                    size="lg"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="Business Name"
                  />
                </Box>
              </Flex>
              <Flex>
                <Button variant="outline" colorScheme="gray" rightIcon={<box-icon name="pencil" />}>
                  Editing
                </Button>
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
              <Box flex="4">
                <Card>
                  <Flex alignItems="left">
                    <TableContainer>
                      <Table variant="unstyled">
                        <Thead></Thead>
                        <Tbody>
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
                                  placeholder="First"
                                />
                                <Input
                                  value={lastName}
                                  onChange={e => {
                                    setLastName(e.target.value);
                                  }}
                                  placeholder="Last"
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
                                placeholder="Email Address"
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
                                <Input
                                  value={addressLine1}
                                  onChange={e => {
                                    setAddressLine1(e.target.value);
                                  }}
                                  placeholder="Street"
                                  flex={'1 0 100%'}
                                />
                                <Input
                                  value={city}
                                  onChange={e => {
                                    setCity(e.target.value);
                                  }}
                                  placeholder="City"
                                  flex={'1 0 45%'}
                                />
                                <Spacer />
                                <Input
                                  value={state}
                                  onChange={e => {
                                    setState(e.target.value);
                                  }}
                                  placeholder="State"
                                  flex={'1 0 22%'}
                                />
                                <Spacer />
                                <Input
                                  value={zip}
                                  onChange={e => {
                                    setZip(e.target.value);
                                  }}
                                  placeholder="Zip/Postal"
                                  flex={'1 0 24%'}
                                />
                              </Flex>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <Text fontSize="xs" color="500" as="b">
                                PHONE
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
                                  placeholder=""
                                />
                                <Input
                                  flex={'1 0 80%'}
                                  value={phone}
                                  onChange={e => {
                                    setPhone(e.target.value);
                                  }}
                                  placeholder="Phone Number"
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
                      <Table variant="unstyled">
                        <Tbody>
                          <Tr>
                            <Td>
                              <Flex flexDirection={'column'}>
                                <Text fontSize="xs" color="500" as="b">
                                  Phone for FPOTH Website
                                </Text>
                                <Input
                                  value={fphPhone}
                                  onChange={e => {
                                    setFPHPhone(e.target.value);
                                  }}
                                  placeholder="Phone Number"
                                />
                              </Flex>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <Flex flexDirection={'column'}>
                                <Text fontSize="xs" color="500" as="b">
                                  Notes for Website
                                </Text>
                                <Textarea
                                  value={webNotes}
                                  onChange={e => {
                                    setWebNotes(e.target.value);
                                  }}
                                  placeholder="Web Notes"
                                />
                              </Flex>
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
                              <Select
                                defaultValue={false}
                                value={published}
                                onChange={e => setPublished(e.target.value)}
                              >
                                <option value={true}>Published</option>
                                <option value={false}>Not Published</option>
                              </Select>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>
                              <Flex flexDirection={'column'}>
                                <Text fontSize="xs" color="500" as="b" whiteSpace="normal">
                                  Added to Website (Date & Initials)
                                </Text>
                                <Input
                                  value={webDateInit}
                                  onChange={e => {
                                    setWebDateInit(e.target.value);
                                  }}
                                  placeholder="Date and Initials"
                                />
                              </Flex>
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
                            <Td>
                              <Text fontSize="xs" color="500" as="b">
                                TYPE
                              </Text>
                              <Select
                                placeholder="Select a type"
                                value={vendorType}
                                onChange={e => setVendorType(e.target.value)}
                              >
                                <option value={'school'}>School</option>
                                <option value={'hospital'}>Hospital</option>
                                <option value={'grocery store'}>Grocery Store</option>
                                <option value={'private institution'}>Private Institution</option>
                                <option value={'other'}>Other</option>
                              </Select>
                            </Td>
                            <Td>
                              <Flex justifyContent={'space-between'}>
                                <Text>Valid for Service Request</Text>
                                <Checkbox
                                  value={serviceRequest}
                                  onChange={e => {
                                    setServiceRequest(e.target.value);
                                  }}
                                ></Checkbox>
                              </Flex>
                            </Td>
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
              <Flex flexDirection={'column-reverse'}>
                <Flex gap={4}>
                  <Button onClick={handleCancel}>Cancel</Button>
                  <Button onClick={handleSubmit} colorScheme="teal">
                    Save
                  </Button>
                </Flex>
              </Flex>
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
          ></CardFooter>
        </Card>
      </Flex>
    </ChakraProvider>
  );
};

BusinessForm.propTypes = {
  edit: PropTypes.bool,
};

export default BusinessForm;
