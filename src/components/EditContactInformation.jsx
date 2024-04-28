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
  useToast,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useBackend } from '../contexts/BackendContext';
import { useAuth } from '../contexts/AuthContext';
import ReferenceGuide from '../components/ReferenceGuide.jsx';

const EditContactInformation = () => {
  const { backend } = useBackend();
  const { currentUser } = useAuth();
  const [toastOpen, setToastOpen] = useState(false);
  const toast = useToast();

  const [businessContactInfo, setBusinessContactInfo] = useState({
    businessName: '',
    phoneNumber: '',
    email: '',
    website: '',
    street: '',
    firstName: '',
    lastName: '',
    zip: '',
    state: '',
    city: '',
    business_hours: '',
  });

  const [initialBusinessContactInfo, setInitialBusinessContactInfo] = useState({
    businessName: '',
    phoneNumber: '',
    email: '',
    website: '',
    street: '',
    firstName: '',
    lastName: '',
    zip: '',
    state: '',
    city: '',
    business_hours: '',
  });

  const [businessId, setBusinessId] = useState(null);
  function showToast() {
    if (!toastOpen) {
      setToastOpen(true);
      toast({
        title: 'Unsaved Changes',
        description: 'You have unsaved changes',
        status: 'warning',
        duration: 9000,
        position: 'bottom-right',
        onCloseComplete: () => setToastOpen(false),
      });
    }
  }

  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;
    setBusinessContactInfo(prevState => ({ ...prevState, [name]: value }));
    showToast();
  };

  const updateContactInfo = async () => {
    try {
      setInitialBusinessContactInfo(businessContactInfo);
      await backend.put(`/business/${businessId}`, {
        name: businessContactInfo.businessName,
        contact_name: `${businessContactInfo.firstName} ${businessContactInfo.lastName}`,
        primary_phone: businessContactInfo.phoneNumber,
        primary_email: businessContactInfo.email,
        website: businessContactInfo.website,
        street: businessContactInfo.street,
        zip_code: businessContactInfo.zip,
        city: businessContactInfo.city,
        state: businessContactInfo.state,
        business_hours: businessContactInfo.business_hours,
      });

      return toast({
        title: 'Saved Changes',
        description: 'Your changes have been saved',
        status: 'success',
        duration: 9000,
        position: 'bottom-right',
        onCloseComplete: () => setToastOpen(false),
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  useEffect(() => {
    const getBusinessContactResponse = async () => {
      try {
        const businessIdResponse = await backend.get(`/businessUser/${currentUser.uid}`);
        const fetchedBusinessId = businessIdResponse.data[0].id;
        setBusinessId(fetchedBusinessId);

        const businessContactResponse = await backend.get(`/business/${fetchedBusinessId}`);
        const businessContact = businessContactResponse.data[0];
        const name = businessContact.contact_name.split(' ');
        const firstName = name[0];
        const lastName = name[1];

        setBusinessContactInfo({
          businessName: businessContact.name,
          phoneNumber: businessContact.contact_phone,
          email: businessContact.primary_email,
          website: businessContact.website,
          street: businessContact.street,
          firstName: firstName,
          lastName: lastName,
          city: businessContact.city,
          state: businessContact.state,
          zip: businessContact.zip_code,
          business_hours: businessContact.business_hours,
        });

        setInitialBusinessContactInfo({
          businessName: businessContact.name,
          phoneNumber: businessContact.contact_phone,
          email: businessContact.primary_email,
          website: businessContact.website,
          street: businessContact.street,
          firstName: firstName,
          lastName: lastName,
          city: businessContact.city,
          state: businessContact.state,
          zip: businessContact.zip_code,
          business_hours: businessContact.business_hours,
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
        <VStack alignItems={'left'} margin={'3%'} width={'100%'}>
          <Box>
            <Heading fontSize="3xl" textAlign={'left'}>
              Settings
            </Heading>
            <Spacer marginBottom={'2%'}></Spacer>
          </Box>
          <Tabs marginBottom={'3%'} colorScheme="teal">
            <TabList width={'250px'}>
              <Tab>Business</Tab>
              <Tab>Reference Guide</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Card width={'65%'}>
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
                      <Input
                        type="text"
                        placeholder="Enter Business Name"
                        width={'70%'}
                        value={businessContactInfo.businessName}
                        onChange={e => {
                          setBusinessContactInfo({
                            ...businessContactInfo,
                            businessName: e.target.value,
                          });
                          showToast();
                        }}
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
                        NAME
                      </FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter First Name"
                        value={businessContactInfo.firstName}
                        name="firstName"
                        width={'34.5%'}
                        onChange={handleChange}
                      />
                      <Input
                        type="text"
                        placeholder="Enter Last Name"
                        value={businessContactInfo.lastName}
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
                        value={businessContactInfo.website}
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
                        value={businessContactInfo.street}
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
                      <Input
                        type="text"
                        placeholder="City"
                        width={'28%'}
                        value={businessContactInfo.city}
                        onChange={e => {
                          setBusinessContactInfo({
                            ...businessContactInfo,
                            city: e.target.value,
                          });
                          showToast();
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="State"
                        width={'18%'}
                        value={businessContactInfo.state}
                        onChange={e => {
                          setBusinessContactInfo({
                            ...businessContactInfo,
                            state: e.target.value,
                          });
                          showToast();
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="Zip Code"
                        width={'21.5%'}
                        value={businessContactInfo.zip}
                        onChange={e => {
                          setBusinessContactInfo({ ...businessContactInfo, zip: e.target.value });
                          showToast();
                        }}
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
                        PHONE
                      </FormLabel>
                      <Input
                        type="text"
                        placeholder="(xxx) xxx-xxxx"
                        value={businessContactInfo.phoneNumber}
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
                      <Input
                        type="text"
                        placeholder="M-F 8:00 am - 10:00 pm"
                        width={'70%'}
                        value={businessContactInfo.business_hours}
                        onChange={e => {
                          setBusinessContactInfo({
                            ...businessContactInfo,
                            business_hours: e.target.value,
                          });
                          showToast();
                        }}
                      />
                    </HStack>
                  </FormControl>
                </Card>
                <Box alignContent={'left'}>
                  <HStack marginBottom={'3%'} marginTop={'2%'} alignItems={'left'}>
                    <Button
                      color="black"
                      bg="gray.100"
                      variant="solid"
                      width={'11%'}
                      marginRight={'1%'}
                      onClick={() => setBusinessContactInfo(initialBusinessContactInfo)}
                    >
                      Undo Changes
                    </Button>
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      width={'6.5%'}
                      onClick={updateContactInfo}
                    >
                      Save
                    </Button>
                  </HStack>
                </Box>
              </TabPanel>
              <ReferenceGuide />
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </>
  );
};

export default EditContactInformation;
