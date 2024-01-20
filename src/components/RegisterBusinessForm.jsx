import { useState } from 'react';
import PropTypes from 'prop-types';
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
} from '@chakra-ui/react';
import { useBackend } from '../contexts/BackendContext';
import RegisterSuccessPage from './RegisterSuccessPage';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TimeInput = ({ label, value, onChange }) => (
  <Stack direction="row" align="center">
    <FormLabel mb="0">{label}</FormLabel>
    <Select
      value={value.hour}
      onChange={(e) => onChange({ ...value, hour: e.target.value })}
      w="auto"
    >
      {[...Array(12).keys()].map((h) => (
        <option key={h} value={h + 1}>
          {h + 1}
        </option>
      ))}
    </Select>
    <Select
      value={value.minute}
      onChange={(e) => onChange({ ...value, minute: e.target.value })}
      w="auto"
    >
      {['00', '15', '30', '45'].map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </Select>
    <Select
      value={value.ampm}
      onChange={(e) => onChange({ ...value, ampm: e.target.value })}
      w="auto"
    >
      {['AM', 'PM'].map((ampm) => (
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
};

const RegisterBusinessForm = () => {
  // State for each form field
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

  const handleTimeChange = (day, period, value) => {
    setBusinessHours({ ...businessHours, [day]: { ...businessHours[day], [period]: value } });
  };

  const handleZipChange = e => {
    setZip(e.target.value);
  };

  const { backend } = useBackend();
  const handleSubmit = async e => {
    e.preventDefault();

    const businessData = {
      businessName,
      owner: { firstName, lastName },
      address: { line1: addressLine1, line2: addressLine2, city, state, zip, country },
      website,
      businessHours,
      contact: { phone, email },
      howHeard,
    };

    try {
      const response = await backend.post('/business', businessData);
      console.log('Business registration successful:', response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Error in business registration:', error);
    }
    setRegistrationSuccess(true);
  };

  if (registrationSuccess) {
    return <RegisterSuccessPage />;
  }

  return (
    <Box p={5}>
      <Flex direction="column" align="stretch" gap={5}>
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
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={4}>
            <FormControl id="business-name">
              <FormLabel>Business/Org Name</FormLabel>
              <Input
                type="text"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
              />
            </FormControl>
            <Flex gap={4}>
              <FormControl id="first-name" flex="1">
                <FormLabel>First Name</FormLabel>
                <Input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </FormControl>
              <FormControl id="last-name" flex="1">
                <FormLabel>Last Name</FormLabel>
                <Input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
              </FormControl>
            </Flex>
            <FormControl id="address-line1">
              <FormLabel>Address Line 1</FormLabel>
              <Input
                type="text"
                value={addressLine1}
                onChange={e => setAddressLine1(e.target.value)}
              />
            </FormControl>
            <FormControl id="address-line2">
              <FormLabel>Address Line 2</FormLabel>
              <Input
                type="text"
                value={addressLine2}
                onChange={e => setAddressLine2(e.target.value)}
              />
            </FormControl>
            <Flex gap={4}>
              <FormControl id="city" flex="1">
                <FormLabel>City</FormLabel>
                <Input type="text" value={city} onChange={e => setCity(e.target.value)} />
              </FormControl>
              <FormControl id="state" flex="1">
                <FormLabel>State</FormLabel>
                <Input type="text" value={state} onChange={e => setState(e.target.value)} />
              </FormControl>
            </Flex>
            <Flex gap={4}>
              <FormControl id="zip_code" flex="1">
                <FormLabel>Zip Code</FormLabel>
                <Input type="text" value={zip} onChange={handleZipChange} />
              </FormControl>
              <FormControl id="country" flex="1">
                <FormLabel>Country</FormLabel>
                <Input type="text" value={country} onChange={e => setCountry(e.target.value)} />
              </FormControl>
            </Flex>
            <FormControl id="website">
              <FormLabel>Website</FormLabel>
              <Input type="url" value={website} onChange={e => setWebsite(e.target.value)} />
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
                  />
                  <TimeInput
                    label="To"
                    value={businessHours[day].end}
                    onChange={value => handleTimeChange(day, 'end', value)}
                  />
                </Flex>
              ))}
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Phone</FormLabel>
              <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
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
            <Button type="submit" colorScheme="blue">
              Register
            </Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};

export default RegisterBusinessForm;
