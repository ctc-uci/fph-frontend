import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react';

import { useAuth } from '../contexts/AuthContext.jsx';
import { useBackend } from '../contexts/BackendContext.jsx';
import { pageStyle, pageTitleStyle } from '../styles/sharedStyles.js';
import { CreateNotificationArgs } from '../types/notification.js';
import { ReferenceGuide } from './ReferenceGuide';

const formLabelStyles = {
  minWidth: '150px',
  fontSize: '16px',
  fontWeight: 'bold',
  alignItems: 'center',
};

export const EditContactInformation = () => {
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
  const FPH_ID = 0;

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

  const handleChange = (event) => {
    const name = event.target.name;
    var value = event.target.value;
    setBusinessContactInfo((prevState) => ({ ...prevState, [name]: value }));
    showToast();
  };

  const updateContactInfo = async () => {
    try {
      const formattedPhoneNumber = businessContactInfo.phoneNumber.replace(/-/g, '');
      setInitialBusinessContactInfo(businessContactInfo);

      const updatePromise = backend.put(`/business/${businessId}`, {
        name: businessContactInfo.businessName,
        contact_name: `${businessContactInfo.firstName} ${businessContactInfo.lastName}`,
        primary_phone: formattedPhoneNumber,
        primary_email: businessContactInfo.email,
        website: businessContactInfo.website,
        street: businessContactInfo.street,
        zip_code: businessContactInfo.zip,
        city: businessContactInfo.city,
        state: businessContactInfo.state,
        business_hours: businessContactInfo.business_hours,
      });

      const notification: CreateNotificationArgs = {
        businessId: FPH_ID,
        senderId: businessId,
        message: 'Edited their business information.',
        type: 'Edited Information',
        timestamp: new Date().toLocaleString('en-US', {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
        businessName: businessContactInfo.businessName,
        donationId: null,
      };
      const notificationPromise = backend.post('/notification', notification);

      await Promise.all([updatePromise, notificationPromise]);

      setToastOpen(false);

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

      toast({
        title: 'Error',
        description: 'There was an error updating your changes. Please try again.',
        status: 'error',
        duration: 9000,
        position: 'bottom-right',
      });
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

        let formattedPhoneNumber = '';
        if (businessContact.primary_phone !== '') {
          formattedPhoneNumber =
            businessContact.primary_phone.slice(0, 3) +
            '-' +
            businessContact.primary_phone.slice(3, 6) +
            '-' +
            businessContact.primary_phone.slice(6);
        }

        setBusinessContactInfo({
          businessName: businessContact.name,
          phoneNumber: formattedPhoneNumber,
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
          phoneNumber: formattedPhoneNumber,
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
    <Flex sx={pageStyle}>
      <Heading sx={pageTitleStyle}>Settings</Heading>

      <Tabs colorScheme="teal">
        <TabList width={'250px'} marginBottom={6}>
          <Tab>Business</Tab>
          <Tab>Reference Guide</Tab>
        </TabList>

        <TabPanels>
          <TabPanel display={'flex'} flexDirection={'column'} padding={0} gap={4}>
            <Card paddingX={6} paddingY={4}>
              <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <HStack>
                  <FormLabel sx={formLabelStyles}>BUSINESS NAME</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Business Name"
                    value={businessContactInfo.businessName}
                    onChange={(e) => {
                      setBusinessContactInfo({
                        ...businessContactInfo,
                        businessName: e.target.value,
                      });
                      showToast();
                    }}
                  />
                </HStack>
                <HStack>
                  <FormLabel sx={formLabelStyles}>NAME</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter First Name"
                    value={businessContactInfo.firstName}
                    name="firstName"
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    placeholder="Enter Last Name"
                    value={businessContactInfo.lastName}
                    name="lastName"
                    onChange={handleChange}
                  />
                </HStack>
                <HStack>
                  <FormLabel sx={formLabelStyles}>EMAIL</FormLabel>
                  <Input
                    type="text"
                    placeholder="example@email.com"
                    value={businessContactInfo.email}
                    name="email"
                    onChange={handleChange}
                  />
                </HStack>
                <HStack>
                  <FormLabel sx={formLabelStyles}>WEBSITE</FormLabel>
                  <Input
                    type="text"
                    placeholder="example.com"
                    value={businessContactInfo.website}
                    name="website"
                    onChange={handleChange}
                  />
                </HStack>
                <HStack>
                  <FormLabel sx={formLabelStyles}>LOCATION</FormLabel>
                  <Input
                    type="text"
                    placeholder="123 Address Lane"
                    value={businessContactInfo.street}
                    name="street"
                    onChange={handleChange}
                  />
                </HStack>
                <HStack>
                  <FormLabel sx={formLabelStyles}>CITY</FormLabel>
                  <Input
                    type="text"
                    placeholder="City"
                    value={businessContactInfo.city}
                    onChange={(e) => {
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
                    value={businessContactInfo.state}
                    onChange={(e) => {
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
                    value={businessContactInfo.zip}
                    onChange={(e) => {
                      setBusinessContactInfo({ ...businessContactInfo, zip: e.target.value });
                      showToast();
                    }}
                  />
                </HStack>
                <HStack>
                  <FormLabel sx={formLabelStyles}>PHONE</FormLabel>
                  <Input
                    type="text"
                    placeholder="(xxx) xxx-xxxx"
                    value={businessContactInfo.phoneNumber}
                    name="phoneNumber"
                    onChange={handleChange}
                  />
                </HStack>
                <HStack>
                  <FormLabel sx={formLabelStyles}>BUSINESS HOURS</FormLabel>
                  <Input
                    type="text"
                    placeholder="M-F 8:00 am - 10:00 pm"
                    value={businessContactInfo.business_hours}
                    onChange={(e) => {
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
              <HStack alignItems={'left'}>
                <Button
                  color="black"
                  bg="gray.100"
                  variant="solid"
                  onClick={() => setBusinessContactInfo(initialBusinessContactInfo)}
                >
                  Undo Changes
                </Button>

                <Button colorScheme="teal" variant="solid" onClick={updateContactInfo}>
                  Save
                </Button>
              </HStack>
            </Box>
          </TabPanel>

          <TabPanel padding={0}>
            <ReferenceGuide />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
