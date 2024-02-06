import { useBackend } from '../../contexts/BackendContext';
import { useState, useEffect } from 'react';
import {
  Flex,
  Text,
  Stack,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';

const EditContactInformation = () => {
  // how will id be passed in?
  const { backend } = useBackend();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [website, setWebsite] = useState();
  const [address, setAddress] = useState();
  const [businessName, setBusinessName] = useState();
  const [formData, setFormData] = useState(null);

  const updateForm = () => {
    setFormData({
      id: 0, // hard-code right now
      name: businessName,
      primary_phone: phoneNumber,
      primary_email: email,
      website: website,
      street: address,
      contact_name: name,
    });
  };

  const getBusinessInfo = async () => {
    const result = await backend.get('/business/0');
    setName(result.data[0].contact_name);
    setPhoneNumber(result.data[0].primary_phone);
    setEmail(result.data[0].primary_email);
    setWebsite(result.data[0].website);
    setAddress(result.data[0].street);
    setBusinessName(result.data[0].name);
  };

  useEffect(() => {
    const saveBusinessInfo = async () => {
      try {
        if (formData) {
          const result = await backend.put('/business/0', formData);
          console.log(result);
        }
      } catch (err) {
        console.log(err);
      }
    };
    saveBusinessInfo();
  }, [formData]);

  // useEffect(() => {
  //   console.log(firstName, lastName, phoneNumber, email, website, address);
  // }, );

  useEffect(() => {
    getBusinessInfo();
  }, []);

  // We made first name and last name into just name since its stored as only name in db. we can change it p easily tho if u want and just split the name by a whitespace.

  return (
    <>
      <Flex>
        <Stack>
          <Box>
            <Text>Contact Information</Text>
            <Text>Full Name</Text>
            <InputGroup>
              <InputLeftElement></InputLeftElement>
              <Input
                placeholder={name ? name : 'Enter Full Name'}
                onChange={e => setName(e.target.value)}
              ></Input>
            </InputGroup>
            {/* <InputGroup>
                      <Input placeholder='Enter Last Name' onChange={(e) => setLastName(e.target.value)}></Input>
                    </InputGroup> */}

            <Text>Phone Number</Text>
            <InputGroup>
              <InputLeftElement>
                <PhoneIcon></PhoneIcon>
              </InputLeftElement>
              <Input
                placeholder={phoneNumber ? phoneNumber : '(xxx) xxx-xxxx'}
                onChange={e => setPhoneNumber(e.target.value)}
              ></Input>
            </InputGroup>
            <Text>Email</Text>
            <InputGroup>
              <InputLeftElement>@</InputLeftElement>
              <Input
                placeholder={email ? email : 'example@email.com'}
                onChange={e => setEmail(e.target.value)}
              ></Input>
            </InputGroup>
            <Text>Website Link</Text>
            <InputGroup>
              <InputLeftElement></InputLeftElement>
              <Input
                placeholder={website ? website : 'example.com'}
                onChange={e => setWebsite(e.target.value)}
              ></Input>
            </InputGroup>
            <Text>Address</Text>
            <InputGroup>
              <InputLeftElement></InputLeftElement>
              <Input
                placeholder={address ? address : '123 Address Lane'}
                onChange={e => setAddress(e.target.value)}
              ></Input>
            </InputGroup>
          </Box>
          <Button onClick={updateForm}>Save</Button>
        </Stack>
        <Box>
          Business Information
          <Text>{businessName}</Text>
          <Text>Update</Text>
        </Box>
      </Flex>
    </>
  );
};

export default EditContactInformation;
