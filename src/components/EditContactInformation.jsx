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
  CardBody,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useBackend } from '../contexts/BackendContext';
import { PropTypes } from 'prop-types';
import { Icon } from '@chakra-ui/react';
import { BiCalendar, BiBone, BiCar, BiCopyAlt, BiConversation } from 'react-icons/bi';
const EditContactInformation = () => {
  const BUSINESS_ID = 1; // hard coded business_id constant for development purposes
  const { backend } = useBackend();
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

  function showToast() {
    if (!toastOpen){
      setToastOpen(true);
      toast({
        title: 'Unsaved Changes',
        description: 'You have unsaved changes',
        status: 'warning',
        duration: 9000,
        position: 'bottom-right',
        onCloseComplete: () => setToastOpen(false)
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
      await backend.put(`/business/${BUSINESS_ID}`, {
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

      return(
        toast({
          title: 'Saved Changes',
          description: "Your changes have been saved",
          status: 'success',
          duration: 9000,
          position: 'bottom-right',
          onCloseComplete: () => setToastOpen(false)
        })
      )
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
        
        console.log("B", businessContactInfo);
        console.log("I", initialBusinessContactInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getBusinessContactResponse();
    
  }, [backend]);


  return (
    <>
      
      <Flex alignContent={'flex-start'}>
        <VStack alignItems={'left'} margin={'4%'} width={'100%'}>
          <Box marginTop={'5%'}>
            <Heading fontSize="3xl" textAlign={'left'}>
              Settings
            </Heading>
            <Spacer marginBottom={'4%'}></Spacer>
          </Box>
          <Tabs marginBottom={'3%'} colorScheme="teal">
            <TabList width={'250px'}>
              <Tab>Business</Tab>
              <Tab>Donation Site Kit</Tab>
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
                          setBusinessContactInfo({ ...businessContactInfo, city: e.target.value });
                          showToast();
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="State"
                        width={'18%'}
                        value={businessContactInfo.state}
                        onChange={e => {
                          setBusinessContactInfo({ ...businessContactInfo, state: e.target.value });
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
                  <HStack marginBottom={'3%'} marginTop={'5%'} alignItems={'left'}>
                    <Button
                      color="black"
                      bg="gray.100"
                      variant="solid"
                      width={'21.5%'}
                      marginRight={'1%'}
                      onClick={() => setBusinessContactInfo(initialBusinessContactInfo)}
                    >
                      Undo Changes
                    </Button>
                    <Button colorScheme="teal" variant="solid" width={'11%'} onClick={updateContactInfo}>
                      Save
                    </Button>
                  </HStack>
                </Box>
              </TabPanel>
              <TabPanel>
                <Card width={'100%'}>
                  <CardBody>
                    <Text padding={'0px 0px 20px 0px'} display={'flex'}>
                      Refer to the following if you have any questions, otherwise contact us at
                      <Text pl={1} textDecoration={'underline'}>info@petsofthehomeless.org</Text>
                    </Text>
                    <Accordion allowToggle borderWidth={'1px'} borderColor={'#E2E8F0'}>
                      <CustomAccordionItem
                        title="Visit Our Website"
                        panelInfo="Visit our website to familiarize yourself with our mission, donation 
                            sites and pet food providers in your area, and other useful info."
                      />
                      <CustomAccordionItem
                        title="Reach out to Pet Food Providers"
                        panelInfo="Reach out to Pet Food Providers in your area and set up a pick up or drop off schedule for your donations."
                      />
                      <CustomAccordionItem
                        title="Set up a donation bin"
                        panelInfo="Set up a donation bin in an accessible area around your business. We accept donations of pet food (cat, dog, canned & dry, NOT expired) and gently used and new pet supplies, such as leashes, collars, bowls, harnesses, beds, etc. Open bags okay, please tape up. We do not accept donations of prescription medications. Over the counter medications are okay."
                      />
                      <CustomAccordionItem
                        title="Spread the word"
                        panelInfo="Spread the word on social media and let your customers know you have become a Feeding Pets of the Homeless® Donation Site."
                      />
                      <CustomAccordionItem
                        title="Report Monthly"
                        panelInfo="Report Monthly: Each month log your donations. You will be entered in our quarterly drawing for a $50 Starbucks gift card."
                      />
                      <CustomAccordionItem
                        title="Add this verbiage to your email signature"
                        panelInfo="Add this verbiage to your email signature: “We are a Feeding Pets of the Homeless® Donation Site! Please bring by dog or cat food, treats or supplies to help!” Feeding Pets of the Homeless® is the first and only national animal organization focused completely on feeding and providing emergency veterinary care to pets that belong to homeless people."
                      />
                      <CustomAccordionItem
                        title="Do not accept cash"
                        panelInfo="Do not accept cash! Check should be addressed to Feeding Pets of the Homeless® and sent to headquarters."
                      />
                      <CustomAccordionItem
                        title="If a donor requests a donation receipt"
                        panelInfo="If a donor requests a donation receipt, please use form included in the startup kit and return to us. We will then send an official receipt to them from headquarters."
                      />
                      <AccordionItem borderColor={"white"}>
                        <Text>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign={'left'}>
                              <Text fontWeight={'700'} fontSize={'16px'}>
                                Tips on how to increase donations
                              </Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </Text>
                        <AccordionPanel pb={4}>
                          <Flex alignItems={'center'} pb={1}>
                            <Icon as={BiCalendar} />
                            <Text>
                              Host events and ask that a donation of pet food be the admittance
                              ticket.
                            </Text>
                          </Flex>
                          <Flex alignItems={'center'} pb={1}>
                            <Icon as={BiBone} />
                            <Text>
                              Offer a service with a donation as the fee for your services. Example:
                              grooming, pet sitting, boarding, etc.
                            </Text>
                          </Flex>
                          <Flex alignItems={'center'} pb={1}>
                            <Icon as={BiCar} />
                            <Text>Fill a truck or police vehicle (popular choice).</Text>
                          </Flex>
                          <Flex alignItems={'center'} pb={1}>
                            <Icon as={BiCopyAlt} />
                            <Text>
                              Print our newsletter or flyer and post it to boards in your community
                              with your business name and address.
                            </Text>
                          </Flex>
                          <Flex alignItems={'center'}>
                            <Icon as={BiConversation} />
                            <Text>We are always open to other suggestions.</Text>
                          </Flex>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </CardBody>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </>
  );
};

const CustomAccordionItem = ({ title, panelInfo }) => (
  <AccordionItem borderTopWidth={'0px'} borderBottomWidth={'1px'} borderColor={'#E2E8F0'}>
    <Text>
      <AccordionButton>
        <Box as="span" flex="1" textAlign={'left'}>
          <Text fontWeight={'700'} fontSize={'16px'}>
            {title}
          </Text>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </Text>
    <AccordionPanel pb={4}>{panelInfo}</AccordionPanel>
  </AccordionItem>
);

CustomAccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  panelInfo: PropTypes.string.isRequired,
};

export default EditContactInformation;
