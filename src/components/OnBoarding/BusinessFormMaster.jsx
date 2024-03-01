import { useState } from 'react';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import ThirdForm from './ThirdForm';
import FourthForm from './FourthForm';
import { useBackend } from '../../contexts/BackendContext';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';

const BusinessFormMaster = () => {
  const { backend } = useBackend();
  const [formData, setFormData] = useState({
    businessName: '',
    personFirstName: '',
    personLastName: '',
    personEmail: '',
    personPosition: '',
    businessWebsite: '',
    businessAddress1: '',
    businessAddress2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    businessHours: '',
    phoneNumber: '',
    heardAbout: '',
    termsAndConditionsAccepted: false,
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const DUMMY_STRING = 'STRING';
    const DUMMY_DATE = new Date().toISOString().split('T')[0];
    const DUMMY_BOOL = false;

    const businessData = {
      name: formData['businessName'],
      contactName: formData['personFirstName'] + ' ' + formData['personLastName'],
      street: formData['businessAddress1'] + ' ' + formData['businessAddress2'],
      zipCode: formData['postalCode'],
      state: formData['state'],
      city: formData['city'],
      website: formData['website'],
      businessHours: JSON.stringify(formData['businessHours']),
      primaryPhone: formData['phoneNumber'],
      primaryEmail: formData['email'],
      findOut: formData['heardAbout'],
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
      if (formData['termsAndConditionsAccepted'] === false)
        await backend.post('/business', businessData);
      nextStep();
    } catch (error) {
      console.error('Error in business registration:', error);
    }
  };

  const [step, setStep] = useState(0);

  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const nextStep = () => {
    setStep(prevState => prevState + 1);
  };

  const prevStep = () => {
    setStep(prevState => prevState - 1);
  };

  const stepsComponents = [
    <FirstForm key={0} handleChange={handleChange} nextStep={nextStep} />,
    <SecondForm key={1} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />,
    <ThirdForm
      key={2}
      handleChange={handleChange}
      nextStep={nextStep}
      prevStep={prevStep}
      handleSubmit={handleSubmit}
    />,
    <FourthForm key={3} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />,
  ];

  return (
    <div>
      {step < 4 ? (
        <>
          <SimpleGrid columns={2}>
            <Box bg={'#F9F8F7'} height={'100vh'}>
              <Text
                fontSize="3xl"
                fontWeight="bold"
                color="#359797"
                marginTop={'20vh'}
                marginLeft={'24vh'}
                justifyContent={'center'}
              >
                Make an Impact
              </Text>
              <SimpleGrid columns={2} flexDirection={'column'} spacing={5} marginTop={'5vh'}>
                <Box
                  borderRadius="lg"
                  borderWidth="2px"
                  display={'flex'}
                  bg="white"
                  height="20vh"
                  marginLeft={'5vh'}
                  justifyContent={'center'}
                >
                  <Text></Text>
                </Box>
                <Box
                  borderRadius="lg"
                  borderWidth="2px"
                  bg="white"
                  height="20vh"
                  marginRight={'5vh'}
                >
                  <Text></Text>
                </Box>
                <Box
                  borderRadius="lg"
                  borderWidth="2px"
                  bg="white"
                  height="20vh"
                  marginLeft={'5vh'}
                >
                  <Text></Text>
                </Box>
                <Box
                  borderRadius="lg"
                  borderWidth="2px"
                  borderColor="#E2E8F0"
                  bg="white"
                  height="20vh"
                  marginRight={'5vh'}
                >
                  <Text></Text>
                </Box>
              </SimpleGrid>
            </Box>
            <Box>
              <div>{stepsComponents[step]}</div>
            </Box>
          </SimpleGrid>
        </>
      ) : (
        <>{stepsComponents[3]}</>
      )}
    </div>
  );
};

export default BusinessFormMaster;
