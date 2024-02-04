import { FormControl, FormLabel, Input, Heading, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useBackend } from '../contexts/BackendContext';
const EditContactInformation = () => {
  const BUSINESS_ID = 1; // hard coded business_id constant for development purposes
  const { backend } = useBackend();

  const [businessContactInfo, setBusinessContactInfo] = useState({
    phoneNumber: '',
    email: '',
    website: '',
    street: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;

    setBusinessContactInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const updateContactInfo = async () => {
    try {
      await backend.put(`/business/${BUSINESS_ID}`, {
        contact_name: `${businessContactInfo.firstName} ${businessContactInfo.lastName}`,
        contact_phone: businessContactInfo.phoneNumber,
        primary_email: businessContactInfo.email,
        website: businessContactInfo.website,
        street: businessContactInfo.street,
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  useEffect(() => {
    const getBusinessContactResponse = async () => {
      try {
        const businessContactResponse = await backend.get(`/business/${BUSINESS_ID}`);
        const businessContact = businessContactResponse.data[0];
        const name = businessContact.contact_name.split(' ');
        const firstName = name[0];
        const lastName = name[1];

        setBusinessContactInfo({
          phoneNumber: businessContact.contact_phone,
          email: businessContact.primary_email,
          website: businessContact.website,
          street: businessContact.street,
          firstName: firstName,
          lastName: lastName,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getBusinessContactResponse();
  }, [backend]);
  return (
    <>
      <Heading as="h1" size="lg">
        Settings
      </Heading>
      <FormControl>
        <Heading as="h2" size="md">
          Contact Information
        </Heading>
        <FormLabel>Full Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter First Name"
          defaultValue={businessContactInfo.firstName}
          name="firstName"
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Enter Last Name"
          defaultValue={businessContactInfo.lastName}
          name="lastName"
          onChange={handleChange}
        />
        <FormLabel> Phone Number </FormLabel>
        <Input
          type="text"
          placeholder="(xxx) xxx-xxxx"
          defaultValue={businessContactInfo.phoneNumber}
          name="phoneNumber"
          onChange={handleChange}
        />
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          placeholder="example@email.com"
          value={businessContactInfo.email}
          name="email"
          onChange={handleChange}
        />
        <FormLabel>Website Link</FormLabel>
        <Input
          type="text"
          placeholder="example.com"
          defaultValue={businessContactInfo.website}
          name="website"
          onChange={handleChange}
        />
        <FormLabel>Address</FormLabel>
        <Input
          type="text"
          placeholder="123 Address Lane"
          defaultValue={businessContactInfo.street}
          name="street"
          onChange={handleChange}
        />
        <Button colorScheme="teal" variant="solid" onClick={updateContactInfo}>
          Save
        </Button>
      </FormControl>
    </>
  );
};

export default EditContactInformation;
