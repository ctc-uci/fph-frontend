import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Select,
  Stack,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  useToast,
  IconButton,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useBackend } from '../../contexts/BackendContext';
import RegisterSuccessPage from '../RegisterBusinessForm/RegisterSuccessPage';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TimeInput = ({ label, value, onChange, isReadOnly }) => (
  <Stack direction="row" align="center">
    <FormLabel mb="0">{label}</FormLabel>
    <Select
      value={value.hour}
      onChange={e => onChange({ ...value, hour: e.target.value })}
      w="auto"
      disabled={isReadOnly}
    >
      {[...Array(12).keys()].map(h => (
        <option key={h} value={h + 1}>
          {h + 1}
        </option>
      ))}
    </Select>
    <Select
      value={value.minute}
      onChange={e => onChange({ ...value, minute: e.target.value })}
      w="auto"
      disabled={isReadOnly}
    >
      {['00', '15', '30', '45'].map(m => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </Select>
    <Select
      value={value.ampm}
      onChange={e => onChange({ ...value, ampm: e.target.value })}
      w="auto"
      disabled={isReadOnly}
    >
      {['AM', 'PM'].map(ampm => (
        <option key={ampm} value={ampm}>
          {ampm}
        </option>
      ))}
    </Select>
  </Stack>
);

TimeInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.shape({
    hour: PropTypes.string.isRequired,
    minute: PropTypes.string.isRequired,
    ampm: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
};

const BusinessForm = ({ pending, pendingData, setBackButtonClicked }) => {
  // State for each form field
  const { status } = useParams();
  const [businessName, setBusinessName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [howHeard, setHowHeard] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [businessHours, setBusinessHours] = useState(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          start: { hour: '9', minute: '00', ampm: 'AM' },
          end: { hour: '5', minute: '00', ampm: 'PM' },
        },
      }),
      {},
    ),
  );

  useEffect(() => {
    if (pending) {
      fillOutPendingData();
      navigate(`/AdminDashboard/${status}/${pendingData.id}`);
    }
  });

  const handleTimeChange = (day, period, value) => {
    setBusinessHours({ ...businessHours, [day]: { ...businessHours[day], [period]: value } });
  };

  const handleZipChange = e => {
    setZip(e.target.value);
  };

  const { backend } = useBackend();
  const handleSubmit = async e => {
    e.preventDefault();

    const DUMMY_STRING = 'STRING';
    const DUMMY_DATE = new Date().toISOString().split('T')[0];
    const DUMMY_BOOL = false;

    const businessData = {
      name: businessName,
      contactName: firstName + ' ' + lastName,
      street: addressLine1 + ' ' + addressLine2,
      zipCode: zip,
      state: state,
      city: city,
      website: website,
      businessHours: JSON.stringify(businessHours),
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
      food: DUMMY_BOOL,
      donation: DUMMY_BOOL,
      familyShelter: DUMMY_BOOL,
      wellness: DUMMY_BOOL,
      spayNeuter: DUMMY_BOOL,
      financial: DUMMY_BOOL,
      reHome: DUMMY_BOOL,
      erBoarding: DUMMY_BOOL,
      senior: DUMMY_BOOL,
      cancer: DUMMY_BOOL,
      dog: DUMMY_BOOL,
      cat: DUMMY_BOOL,
      fphPhone: DUMMY_STRING,
      contactPhone: DUMMY_STRING,
      webNotes: DUMMY_STRING,
      internalNotes: DUMMY_STRING,
      published: DUMMY_BOOL,
      shelter: DUMMY_BOOL,
      domesticViolence: DUMMY_BOOL,
      webDateInit: DUMMY_DATE,
      entQb: DUMMY_BOOL,
      serviceRequest: DUMMY_BOOL,
      inactive: DUMMY_BOOL,
      finalCheck: DUMMY_BOOL,
      createdBy: DUMMY_DATE,
      createdDate: DUMMY_DATE,
    };

    try {
      await backend.post('/business', businessData);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Error in business registration:', error);
    }
    setRegistrationSuccess(true);
  };

  if (!pending && registrationSuccess) {
    return <RegisterSuccessPage />;
  }

  const handleApprove = async () => {
    const updatedData = {
      ...pendingData,
      status: 'Active',
    };
    console.log({ businessId: pendingData.id });
    try {
      await backend.put(`/business/${pendingData.id}`, updatedData);
      setRegistrationSuccess(true);
      navigate('/AdminDashboard');
      toast({
        title: 'Business form has been approved',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    } catch (error) {
      console.log('Error in approving business: error');
    }
  };

  const handleDeny = async () => {
    const updatedData = {
      ...pendingData,
      status: 'Denied',
    };
    console.log({ businessId: pendingData.id });
    try {
      await backend.put(`/business/${pendingData.id}`, updatedData);
      setRegistrationSuccess(true);
      navigate('/AdminDashboard');
      toast({
        title: 'Business form has been denied',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    } catch (error) {
      console.error('Error in approving business:', error);
    }
  };

  const fillOutPendingData = () => {
    console.log('Pending Check', pendingData);
    setBusinessName(pendingData.name ? pendingData.name : '');
    if (pendingData.contact_name === null) {
      setFirstName('');
      setLastName('');
    } else {
      setFirstName(pendingData.contact_name.split(' ')[0]);
      setLastName(
        pendingData.contact_name.split(' ')[1] ? pendingData.contact_name.split(' ')[1] : '',
      );
    }
    if (pendingData.street === null) {
      setAddressLine1('');
      setAddressLine2('');
    } else {
      setAddressLine1(pendingData.street.split(' ')[0]);
      setAddressLine2(pendingData.street.split(' ')[1] ? pendingData.street.split(' ')[1] : '');
    }

    setCity(pendingData.city ? pendingData.city : '');
    setState(pendingData.state ? pendingData.state : '');
    setZip(pendingData.zip_code ? pendingData.zip_code : '');
    setCountry('USA');
    setWebsite(pendingData.website ? pendingData.website : '');
    setPhone(pendingData.primary_phone ? pendingData.primary_phone : '');
    setEmail(pendingData.primary_email ? pendingData.primary_email : '');
    setHowHeard(pendingData.find_out ? pendingData.find_out : '');
  };

  return (
    <Box p={5}>
      <Flex direction="column" align="stretch" gap={5}>
        {pending ? (
          <>
            <IconButton
              icon={<ChevronLeftIcon />}
              boxSize="8"
              sx={{ backgroundColor: 'rgb(225,225,225)', borderRadius: '5px' }}
              onClick={() => {
                setBackButtonClicked(true);
                navigate(`/AdminDashboard/${status}`);
              }}
            />
            <Flex justifyContent="space-between">
              <Heading as="h1" size="lg" textAlign="center">
                BUSINESS NAME
              </Heading>
            </Flex>
          </>
        ) : (
          <>
            <Flex justifyContent="space-between">
              <Heading as="h1" size="lg" textAlign="center">
                BUSINESS DONOR
              </Heading>
            </Flex>
            <Box textAlign="left" paddingLeft={8}>
              <Text fontSize="2xl">FPH</Text>
            </Box>
            <Box>
              <Heading as="h2" size="lg" textAlign="center" paddingBottom={4}>
                WHY JOIN?
              </Heading>
              <UnorderedList textAlign="center" paddingLeft={40} paddingRight={40}>
                <ListItem>Some inspiring reason to join the platform...</ListItem>
                <ListItem>Another compelling argument...</ListItem>
                <ListItem>More information about benefits...</ListItem>
              </UnorderedList>
            </Box>
          </>
        )}
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={4}>
            <FormControl id="business-name">
              <FormLabel>Business/Org Name</FormLabel>
              <Input
                type="text"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                isReadOnly={pending}
              />
            </FormControl>
            <Flex gap={4}>
              <FormControl id="first-name" flex="1">
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  isReadOnly={pending}
                />
              </FormControl>
              <FormControl id="last-name" flex="1">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  isReadOnly={pending}
                />
              </FormControl>
            </Flex>
            <FormControl id="address-line1">
              <FormLabel>Address Line 1</FormLabel>
              <Input
                type="text"
                value={addressLine1}
                onChange={e => setAddressLine1(e.target.value)}
                isReadOnly={pending}
              />
            </FormControl>
            <FormControl id="address-line2">
              <FormLabel>Address Line 2</FormLabel>
              <Input
                type="text"
                value={addressLine2}
                onChange={e => setAddressLine2(e.target.value)}
                isReadOnly={pending}
              />
            </FormControl>
            <Flex gap={4}>
              <FormControl id="city" flex="1">
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  isReadOnly={pending}
                />
              </FormControl>
              <FormControl id="state" flex="1">
                <FormLabel>State</FormLabel>
                <Input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  isReadOnly={pending}
                />
              </FormControl>
            </Flex>
            <Flex gap={4}>
              <FormControl id="zip_code" flex="1">
                <FormLabel>Zip Code</FormLabel>
                <Input type="text" value={zip} onChange={handleZipChange} isReadOnly={pending} />
              </FormControl>
              <FormControl id="country" flex="1">
                <FormLabel>Country</FormLabel>
                <Input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  isReadOnly={pending}
                />
              </FormControl>
            </Flex>
            <FormControl id="website">
              <FormLabel>Website</FormLabel>
              <Input
                type="url"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                isReadOnly={pending}
              />
            </FormControl>
            <FormControl id="business-hours">
              <FormLabel>Business Hours</FormLabel>
              {daysOfWeek.map(day => (
                <Flex key={day} justify="space-between" align="center">
                  <Box flexBasis="100px">{day}</Box>
                  <TimeInput
                    label="From"
                    value={businessHours[day].start}
                    onChange={value => handleTimeChange(day, 'start', value)}
                    isReadOnly={pending}
                  />
                  <TimeInput
                    label="To"
                    value={businessHours[day].end}
                    onChange={value => handleTimeChange(day, 'end', value)}
                    isReadOnly={pending}
                  />
                </Flex>
              ))}
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Phone</FormLabel>
              <Input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                isReadOnly={pending}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                isReadOnly={pending}
              />
            </FormControl>
            <FormControl id="how-heard">
              <FormLabel>How did you hear about us?</FormLabel>
              <Select value={howHeard} onChange={e => setHowHeard(e.target.value)}>
                <option value="internet">Internet</option>
                <option value="friend">Friend</option>
                <option value="advertisement">Advertisement</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>
            {pending ? (
              <>
                <Button onClick={() => handleApprove()} colorScheme="blue">
                  Approve
                </Button>
                <Button onClick={() => handleDeny()} colorScheme="blue">
                  Deny
                </Button>
              </>
            ) : (
              <Button type="submit" colorScheme="blue">
                Register
              </Button>
            )}
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};

BusinessForm.propTypes = {
  pending: PropTypes.bool.isRequired,
  pendingData: PropTypes.object,
  setBackButtonClicked: PropTypes.func.isRequired,
};

export default BusinessForm;
