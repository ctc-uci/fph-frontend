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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react'; // need to import useEffect too
import { useBackend } from '../../contexts/BackendContext';

const AdminAddBusiness = () => {
  const { backend } = useBackend();
  const [donationSiteInformation, setDonationSiteInformation] = useState({
    nameOfCompany: '',
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    streetNumber: '',
    unitNumber: '',
    zip: '',
    state: '',
    city: '',
    country: '',
    phoneAreaCode: '',
    phoneNumber: '',
    numberOfHoursWorked: '',
    howTheyHearAboutUs: '',
  });

  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;

    setDonationSiteInformation(prevState => ({ ...prevState, [name]: value }));
  };

  const addNewBusiness = async () => {
    try {
      await backend.post(`/business/`, {
        type: null,
        name: donationSiteInformation.nameOfCompany,
        street: donationSiteInformation.streetNumber,
        zipCode: donationSiteInformation.zipCode,
        state: donationSiteInformation.state,
        qbVendorName: null,
        qbCityStateZip: `${donationSiteInformation.city} ${donationSiteInformation.state} ${donationSiteInformation.zip}`,
        primaryPhone: `${donationSiteInformation.phoneAreaCode} ${donationSiteInformation.lastName}`,
        backupPhone: null,
        primaryEmail: donationSiteInformation.email,
        comments: null,
        faxPhone: null,
        contactName: `${donationSiteInformation.firstName} ${donationSiteInformation.lastName}`,
        website: donationSiteInformation.website,
        businessHours: null,
        findOut: null,
        onboardingStatus: null,
        joinDate: null,
        inputTypeStatus: null,
        vendorType: null,
        status,
        petsOfTheHomelessDiscount: null,
        updatedBy: null,
        updatedDateTime: null,
        syncToQb: null,
        veterinary: null,
        resource: null,
        food: null,
        donation: null,
        familyShelter: null,
        wellness: null,
        spayNeuter: null,
        financial: null,
        reHome: null,
        erBoarding: null,
        senior: null,
        cancer: null,
        dog: null,
        cat: null,
        fphPhone: null,
        contactPhone: null,
        webNotes: null,
        internalNotes: null,
        published: null,
        shelter: null,
        domesticViolence: null,
        webDateInit: null,
        entQb: null,
        serviceRequest: null,
        inactive: null,
        finalCheck: null,
        createdBy: null,
        createdDate: null,
        city: null,
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
    return;
  };
  /* CHANGE FOR THIS PAGE WHEN WE REACH BACKEND
  const updateContactInfo = async () => {
    try {
      await backend.put(`/business/${BUSINESS_ID}`, {
        business_name: businessContactInfo.businessName,
        contact_name: `${businessContactInfo.firstName} ${businessContactInfo.lastName}`,
        contact_phone: businessContactInfo.phoneNumber,
        primary_email: businessContactInfo.email,
        website: businessContactInfo.website,
        street: businessContactInfo.street,
        zip: businessContactInfo.zip,
        city: businessContactInfo.city,
        state: businessContactInfo.state,
        business_hours: businessContactInfo.business_hours,
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
  }, [backend]);*/

  useEffect(()=>{

  });

  return (
    <>
      <Flex alignContent={'flex-start'}>
        <VStack alignItems={'left'} margin={'4%'} width={'65%'}>
          <Box marginTop={'5%'}>
            <Heading fontSize="3xl" textAlign={'left'}>
              Add Business Form
            </Heading>
            <Spacer marginBottom={'4%'}></Spacer>
          </Box>

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
                  NAME OF COMPANY
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Company"
                  width={'70%'}
                  value={donationSiteInformation.nameOfCompany}
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
                  placeholder="First Name"
                  defaultValue={donationSiteInformation.firstName}
                  name="firstName"
                  width={'34.5%'}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  defaultValue={donationSiteInformation.lastName}
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
                  placeholder="Email"
                  value={donationSiteInformation.email}
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
                  placeholder="Website"
                  defaultValue={donationSiteInformation.website}
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
                  placeholder="Street Number"
                  defaultValue={donationSiteInformation.streetNumber}
                  name="streetNumber"
                  width={'34.5%'}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  placeholder="Unit or Apartment Number"
                  defaultValue={donationSiteInformation.unitNumber}
                  name="unitNumber"
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
                  NUMBER OF HOURS WORKED
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Hours"
                  defaultValue={donationSiteInformation.numberOfHoursWorked}
                  name="numberOfHoursWorked"
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
                  HOW DID THIS BUSINESS HEAR ABOUT US?
                </FormLabel>
                <Input
                  type="text"
                  placeholder="LinkedIn, Google, etc."
                  width={'70%'}
                  value={donationSiteInformation.howTheyHearAboutUs}
                  onChange={handleChange}
                />
              </HStack>
            </FormControl>
          </Card>
          <Box alignContent={'right'}>
            <HStack marginBottom={'3%'} marginTop={'5%'} alignItems={'left'}>
              <Button
                color="black"
                bg="gray.100"
                variant="solid"
                width={'21.5%'}
                marginRight={'1%'}
                onClick={addNewBusiness} // CHANGE THIS TO DO WHAT A CANCEL BUTTON IS SUPPOSED TO DO
              >
                Cancel
              </Button>
              <Button colorScheme="teal" variant="solid" width={'11%'} onClick={addNewBusiness}>
                Submit
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Flex>
    </>
  );
};

export default AdminAddBusiness;
