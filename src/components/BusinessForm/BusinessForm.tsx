import { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';
import { pageStyle, pageTitleStyle } from '../../styles/sharedStyles';

const formLabelStyles = {
  minWidth: '150px',
  fontSize: '16px',
  fontWeight: 'bold',
  alignItems: 'center',
};

const ADDITIONAL_INFO_ITEMS = [
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

export const BusinessForm = ({ edit = true }) => {
  const { id } = useParams();
  const { backend } = useBackend();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const deleteDisclosure = useDisclosure();
  const tcDisclosure = useDisclosure();

  const [businessName, setBusinessName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [howHeard, setHowHeard] = useState('');
  const [businessHours, setBusinessHours] = useState('');
  const [checkedAddedInfo, setCheckedAddedInfo] = useState({});
  const [webNotes, setWebNotes] = useState('');
  const [published, setPublished] = useState(false);
  const [webDateInit, setWebDateInit] = useState(new Date());
  const [internalNotes, setInternalNotes] = useState('');
  const [fphPhone, setFPHPhone] = useState('');
  const [vendorType, setVendorType] = useState('');
  const [serviceRequest, setServiceRequest] = useState(false);
  const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState(false);
  const [updatedBy, setUpdatedBy] = useState(null);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
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

  const handleSubmit = async (e) => {
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
        data.createdBy = updatedBy;
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

  const handleDeleteModalClick = async () => {
    try {
      await backend.delete(`/business/${id}`);

      deleteDisclosure.onClose();
      navigate('/AdminDashboard');
    } catch (e) {
      console.error(e);
    }
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

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedAddedInfo({ ...checkedAddedInfo, [name]: checked });
  };

  const handleCancel = () => {
    navigate(edit ? `/ViewBusiness/${id}` : `/AdminDashboard`);
  };

  const handleToggleTerms = () => {
    setTermsAndConditionsAccepted(!termsAndConditionsAccepted);
  };

  return (
    <Flex sx={pageStyle}>
      <Breadcrumb spacing="2">
        <BreadcrumbItem>
          <BreadcrumbLink color="teal" onClick={() => navigate(`/AdminDashboard`)}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {edit ? (
          <BreadcrumbItem>
            <BreadcrumbLink color="teal" onClick={() => navigate(`/ViewBusiness/${id}`)}>
              {businessName || '...'}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : null}

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{edit ? 'Edit Business' : 'Add Business'}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading sx={pageTitleStyle}>{edit ? 'Edit' : 'Add'} Business Form</Heading>

      <Card>
        <CardHeader>
          <Flex justify="space-between" align="center" w="full">
            <Stack spacing={0}>
              <Text fontSize="2xl" fontWeight="700" color="gray.700">
                Donation Site Information
              </Text>
              <Text>
                {edit ? '' : 'Please fill the following form to add a new donation site.'}
              </Text>
            </Stack>

            {edit && (
              <IconButton
                variant="regular"
                colorScheme="red"
                aria-label="Delete menu"
                icon={<BiTrash />}
                onClick={deleteDisclosure.onOpen}
              />
            )}
          </Flex>
        </CardHeader>

        {/* There's a TON of code duplication between this and `EditContactInformation.tsx`*/}
        <CardBody>
          <Stack spacing={4}>
            <Card paddingX={6} paddingY={4}>
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  overflowX: 'scroll',
                }}
              >
                <HStack sx={{ minWidth: '500px' }}>
                  <FormLabel sx={formLabelStyles}>BUSINESS NAME</FormLabel>
                  <Input
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Business Name"
                  />
                </HStack>
                <HStack sx={{ minWidth: '500px' }}>
                  <FormLabel sx={formLabelStyles}>NAME</FormLabel>
                  <Flex gap={4}>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                    />
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                    />
                  </Flex>
                </HStack>
                <HStack sx={{ minWidth: '500px' }}>
                  <FormLabel sx={formLabelStyles}>EMAIL</FormLabel>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                  />
                </HStack>
                <HStack sx={{ minWidth: '500px' }}>
                  <FormLabel sx={formLabelStyles}>WEBSITE</FormLabel>
                  <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="example.com"
                  />
                </HStack>
                <HStack sx={{ minWidth: '500px' }}>
                  <FormLabel sx={formLabelStyles}>LOCATION</FormLabel>
                  <SimpleGrid columns={3} spacing={2} width="100%">
                    <GridItem colSpan={2}>
                      <Input
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        placeholder="Street"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Input
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder="Unit or Apartment Number"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Input
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Input
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="Zip/Postal"
                      />
                    </GridItem>
                  </SimpleGrid>
                </HStack>
                <HStack sx={{ minWidth: '500px' }}>
                  <FormLabel sx={formLabelStyles}>PHONE</FormLabel>

                  <Input
                    type="text"
                    placeholder="(xxx) xxx-xxxx"
                    value={phone}
                    name="phoneNumber"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </HStack>
                <HStack sx={{ minWidth: '500px' }}>
                  <FormLabel sx={formLabelStyles}>BUSINESS HOURS</FormLabel>
                  <Input
                    value={businessHours}
                    onChange={(e) => setBusinessHours(e.target.value)}
                    placeholder="M-F 8:00 am - 10:00 pm"
                  />
                </HStack>
                <HStack sx={{ minWidth: '500px' }}>
                  <FormLabel sx={formLabelStyles}>SOURCE</FormLabel>
                  <Input
                    value={howHeard}
                    onChange={(e) => setHowHeard(e.target.value)}
                    placeholder="LinkedIn, Google, etc."
                  />
                </HStack>
              </FormControl>
            </Card>

            <Card>
              <TableContainer>
                <Table>
                  <Thead />
                  <Tbody>
                    <Tr>
                      <Td colSpan={2}>
                        <Stack>
                          <Text fontSize="xs" color="500" fontWeight={'semibold'}>
                            Additional Information
                          </Text>

                          <SimpleGrid columns={{ base: 1, lg: 2 }} spacingY={2} spacingX={8}>
                            {ADDITIONAL_INFO_ITEMS.map((item, index) => (
                              <Flex key={index} justifyContent={'space-between'}>
                                <Text>{item}</Text>
                                <Checkbox
                                  name={item}
                                  isChecked={checkedAddedInfo[item] || false}
                                  onChange={handleCheckboxChange}
                                />
                              </Flex>
                            ))}
                          </SimpleGrid>
                        </Stack>
                      </Td>
                    </Tr>

                    <Tr>
                      <Td>
                        <Stack>
                          <Text fontSize="xs" color="500" fontWeight={'semibold'}>
                            Type
                          </Text>
                          <Select
                            placeholder="Type"
                            value={vendorType}
                            onChange={(e) => setVendorType(e.target.value)}
                          >
                            <option value={'School'}>School</option>
                            <option value={'hospitHospitalal'}>Hospital</option>
                            <option value={'Grocery store'}>Grocery Store</option>
                            <option value={'Private institution'}>Private Institution</option>
                            <option value={'Other'}>Other</option>
                          </Select>
                        </Stack>
                      </Td>
                      <Td>
                        <Stack spacing={2} display={'flex'} flexDirection={'row'}>
                          <Text>Valid for Service Request?</Text>
                          <Checkbox
                            isChecked={serviceRequest}
                            onChange={() => setServiceRequest(!serviceRequest)}
                          />
                        </Stack>
                      </Td>
                    </Tr>

                    <Tr>
                      <Td colSpan={2}>
                        <Stack>
                          <Text fontSize="xs" color="500" fontWeight={'semibold'}>
                            Internal Notes
                          </Text>
                          <Textarea
                            value={internalNotes}
                            onChange={(e) => {
                              setInternalNotes(e.target.value);
                            }}
                            placeholder="... write some notes"
                          />
                        </Stack>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Card>

            <Flex gap={2} marginX={6}>
              <Checkbox isChecked={termsAndConditionsAccepted} onChange={handleToggleTerms} />
              <Flex gap={1}>
                <Text>Accepted the</Text>
                <Text textDecoration="underline" cursor="pointer" onClick={tcDisclosure.onOpen}>
                  Terms and Conditions
                </Text>
              </Flex>
            </Flex>
          </Stack>
        </CardBody>

        <CardFooter gap={4} justifyContent={'flex-end'}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Tooltip
            label={'Terms and Conditions must be accepted'}
            isDisabled={termsAndConditionsAccepted}
            placement={'left'}
          >
            <Button
              onClick={handleSubmit}
              colorScheme="teal"
              isDisabled={!termsAndConditionsAccepted}
            >
              Save
            </Button>
          </Tooltip>
        </CardFooter>
      </Card>

      <DeleteBusinessModal
        deleteDisclosure={deleteDisclosure}
        handleDelete={handleDeleteModalClick}
      />

      <TermsAndConditionsModal tcDisclosure={tcDisclosure} />
    </Flex>
  );
};

export const AddBusinessForm = () => {
  return <BusinessForm edit={false} />;
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
        <ModalBody>Are you sure? You can't undo this action afterwards.</ModalBody>
        <ModalFooter gap={2}>
          <Button colorScheme="gray" onClick={deleteDisclosure.onClose}>
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

const TermsAndConditionsModal = ({ tcDisclosure }: { tcDisclosure: UseDisclosureReturn }) => {
  return (
    <Modal isOpen={tcDisclosure.isOpen} onClose={tcDisclosure.onClose} size={'2xl'}>
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton onClick={tcDisclosure.onClose} />
          <ModalHeader>
            <Stack direction="row" justifyContent="space-between">
              <Text fontWeight="bold" fontSize="2xl">
                Terms and Conditions
              </Text>
            </Stack>
          </ModalHeader>
          <ModalBody alignItems="center">
            <Text fontSize="xl">
              I hereby acknowledge and agree to serve as a member/volunteer for Feeding Pets of the
              Homeless, 710 West Washington Street, Carson City, NV 89703. I give my consent and
              agree to release, indemnify and hold harmless Feeding Pets of the Homeless (DBA: Pets
              of the Homeless) and all personnel, including but not limited to its officers, agents
              and/or employees, other participants, sponsors, advertisers, I hereby assume all of
              the risks of participating as a volunteer, with respect to any and all injury,
              disability, death or loss or damage of person or property, whether arising from
              negligence of the releases or otherwise, to the fullest extent permitted by law. I
              agree to comply with the guidelines and conditions for participation. See Fundraising
              Policies here:
              http://www.petsofthehomeless.org/fundraising-policy-for-pets-of-the-homeless/ Pets of
              the Homeless reserves the right to terminate this agreement at any time. I also grant
              Feeding Pets of the Homeless the right to use photographs of me at events and
              activities and use the photographs in future advertising including online webpage.{' '}
              <br />
              <br />I acknowledge that all information regarding Pets of the Homeless&apos;
              operations, procedures, contacts, volunteers, recipients and donors is of a
              proprietary nature and should not be disclosed or used for any purposes other than the
              direct benefit of the organization
              <br />
              <br />I HAVE READ THIS RELEASE OF LIABILITY AND FULLY UNDERSTAND ITS TERMS AND
              CONDITIONS.
              <br />
              <br />I acknowledge that I am not authorized to speak to the media. I agree to refer
              all media inquiries to Headquarters, 775-841-7463.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Text fontSize="sm">
              By checking the &quot;I Accept the Terms and Conditions&quot; box and clicking the
              &quot;Save&quot; button on this page, you acknowledge you have read and agree to the
              above.
            </Text>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
