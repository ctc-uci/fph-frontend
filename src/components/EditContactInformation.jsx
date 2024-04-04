import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  Flex,
  VStack,
  Box,
  Spacer,
  Card,
  HStack,
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react';
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
  };

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
      <Flex alignContent={'flex-start'}>
        <VStack alignItems={'left'} margin={'4%'} width={'65%'}>
          <Box marginTop={'5%'}>
            <Heading fontSize="3xl" textAlign={'left'}>
              Settings
            </Heading>
            <Spacer marginBottom={'4%'}></Spacer>
          </Box>
          <Tabs marginBottom={'3%'} colorScheme="teal">
            <TabList>
              <Tab>Business</Tab>
              <Tab>Donation Site Kit</Tab>
            </TabList>
          </Tabs>
          <Card width={'100%'}>
            <FormControl margin={'5%'} width={'90%'}>
              <HStack marginBottom={'3%'}>
                <FormLabel
                  marginStart={'1.5%'}
                  fontSize={'15px'}
                  fontWeight={'bold'}
                  width={'26%'}
                  alignItems={'center'}
                >
                  BUSINESS NAME
                </FormLabel>
                <Input type="text" placeholder="Enter Business Name" width={'70%'} />
              </HStack>
              <HStack marginBottom={'3%'}>
                <FormLabel
                  marginStart={'1.5%'}
                  fontSize={'15px'}
                  fontWeight={'bold'}
                  width={'26%'}
                  alignItems={'center'}
                >
                  NAME
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter First Name"
                  defaultValue={businessContactInfo.firstName}
                  name="firstName"
                  width={'34.5%'}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  placeholder="Enter Last Name"
                  defaultValue={businessContactInfo.lastName}
                  name="lastName"
                  width={'34%'}
                  onChange={handleChange}
                />
              </HStack>
              <HStack marginBottom={'3%'}>
                <FormLabel
                  marginStart={'1.5%'}
                  fontSize={'15px'}
                  fontWeight={'bold'}
                  width={'26%'}
                  alignItems={'center'}
                >
                  EMAIL
                </FormLabel>
                <Input
                  type="text"
                  placeholder="example@email.com"
                  value={businessContactInfo.email}
                  name="email"
                  onChange={handleChange}
                  width={'70%'}
                />
              </HStack>
              <HStack marginBottom={'3%'}>
                <FormLabel
                  marginStart={'1.5%'}
                  fontSize={'15px'}
                  fontWeight={'bold'}
                  width={'26%'}
                  alignItems={'center'}
                >
                  WEBSITE
                </FormLabel>
                <Input
                  type="text"
                  placeholder="example.com"
                  defaultValue={businessContactInfo.website}
                  name="website"
                  onChange={handleChange}
                  width={'70%'}
                />
              </HStack>
              <HStack marginBottom={'3%'}>
                <FormLabel
                  marginStart={'1.5%'}
                  fontSize={'15px'}
                  fontWeight={'bold'}
                  width={'26%'}
                  alignItems={'center'}
                >
                  LOCATION
                </FormLabel>
                <Input
                  type="text"
                  placeholder="123 Address Lane"
                  defaultValue={businessContactInfo.street}
                  name="street"
                  onChange={handleChange}
                  width={'70%'}
                />
              </HStack>
              <HStack marginBottom={'3%'}>
                <FormLabel
                  marginStart={'1.5%'}
                  fontSize={'15px'}
                  fontWeight={'bold'}
                  width={'26%'}
                  alignItems={'center'}
                ></FormLabel>
                <Input type="text" placeholder="City" width={'28%'} />
                <Input type="text" placeholder="State" width={'18%'} />
                <Input type="text" placeholder="Zip Code" width={'21.5%'} />
              </HStack>
              <HStack marginBottom={'3%'}>
                <FormLabel
                  marginStart={'1.5%'}
                  fontSize={'15px'}
                  fontWeight={'bold'}
                  width={'26%'}
                  alignItems={'center'}
                >
                  PHONE
                </FormLabel>
                <Input
                  type="text"
                  placeholder="(xxx) xxx-xxxx"
                  defaultValue={businessContactInfo.phoneNumber}
                  name="phoneNumber"
                  onChange={handleChange}
                  width={'70%'}
                />
              </HStack>
              <HStack marginBottom={'1%'}>
                <FormLabel
                  marginStart={'1.5%'}
                  fontSize={'15px'}
                  fontWeight={'bold'}
                  width={'26%'}
                  alignItems={'center'}
                >
                  BUSINESS HOURS
                </FormLabel>
                <Input type="text" placeholder="M-F 8:00 am - 10:00 pm" width={'70%'} />
              </HStack>
            </FormControl>
          </Card>
          <Box alignContent={'left'}>
            <HStack marginBottom={'3%'} marginTop={'5%'} alignItems={'left'}>
              <Button
                color="black"
                bg="gray.100"
                variant="solid"
                width={'21.5%'}
                marginRight={'1%'}
                onClick={updateContactInfo}
              >
                Undo Changes
              </Button>
              <Button colorScheme="teal" variant="solid" width={'11%'} onClick={updateContactInfo}>
                Save
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export default EditContactInformation;
