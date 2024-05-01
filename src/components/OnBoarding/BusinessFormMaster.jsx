import { useState } from 'react';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import ThirdForm from './ThirdForm';
import FourthForm from './FourthForm';
import { useBackend } from '../../contexts/BackendContext';
import { Box, Text, SimpleGrid, Stack, Image, Flex } from '@chakra-ui/react';
import propTypes from 'prop-types';
import ICON1 from './icon1.png';
import ICON2 from './icon2.png';
import ICON3 from './icon3.png';
import ICON4 from './icon4.png';

const BusinessFormMaster = ({ setFormOpen }) => {
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

    const DUMMY_STRING = '';
    const PENDING_STATUS = 'Pending';
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
      onboardingStatus: PENDING_STATUS,
      joinDate: DUMMY_DATE,
      inputTypeStatus: DUMMY_STRING,
      vendorType: DUMMY_STRING,
      status: PENDING_STATUS,
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

    const notification_data = {
      businessId: 0,
      message: `New Donation Site Application from ${formData['businessName']}`,
      timestamp: new Date().toLocaleString('en-US', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
      type: 'New Application',
      beenDismissed: false,
    };

    try {
      if (formData['termsAndConditionsAccepted'] === true) {
        await backend.post('/business', businessData);
        await backend.post('/notification', notification_data);
        nextStep();
      }
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
    <FirstForm key={0} formData={formData} handleChange={handleChange} nextStep={nextStep} />,
    <SecondForm
      key={1}
      formData={formData}
      handleChange={handleChange}
      nextStep={nextStep}
      prevStep={prevStep}
    />,
    <ThirdForm
      key={2}
      formData={formData}
      handleChange={handleChange}
      nextStep={nextStep}
      prevStep={prevStep}
      handleSubmit={handleSubmit}
      setFormData={setFormData}
    />,
    <FourthForm
      key={3}
      handleChange={handleChange}
      nextStep={nextStep}
      prevStep={prevStep}
      setFormOpen={setFormOpen}
    />,
  ];

  return (
    <div>
      {step < 3 ? (
        <>
          <Box>
            <SimpleGrid columns={2}>
              <Stack flex="100%" bg={'#F9F8F7'} height={'100vh'} justifyContent="center">
                <Box>
                  <Flex width="100%" justifyContent="center" alignItems="center">
                    <Text fontSize="3xl" fontWeight="bold" color="#359797">
                      Make an Impact
                    </Text>
                  </Flex>
                </Box>
                <Box>
                  <SimpleGrid
                    columns={2}
                    flexDirection={'column'}
                    spacing={'6vh'}
                    marginTop={'5vh'}
                  >
                    <Box
                      width="25vh"
                      borderRadius="lg"
                      borderWidth="2px"
                      display={'flex'}
                      bg="white"
                      height="22vh"
                      marginLeft={'18vh'}
                      justifyContent={'center'}
                    >
                      <Stack alignItems="center" direction="column">
                        <Box marginTop="3.5vh">
                          {' '}
                          <Image boxSize="8vh" src={ICON1} />
                        </Box>
                        <Box>
                          <Text fontSize="xl" color="#2D3748" fontWeight="bold">
                            29,357
                          </Text>
                        </Box>
                        <Box>
                          <Text marginTop={'-1vh'} fontSize="sm">
                            pets helped
                          </Text>
                        </Box>
                      </Stack>
                    </Box>
                    <Box
                      width="25vh"
                      borderRadius="lg"
                      borderWidth="2px"
                      bg="white"
                      height="22vh"
                      marginLeft={'2vh'}
                    >
                      <Stack alignItems="center" direction="column">
                        <Box marginTop="3.5vh">
                          {' '}
                          <Image boxSize="8vh" src={ICON2} />
                        </Box>
                        <Box>
                          <Text fontSize="xl" color="#2D3748" fontWeight="bold">
                            $5,217,665
                          </Text>
                        </Box>
                        <Box width="15vh">
                          <Text textAlign="center" marginTop={'-1vh'} fontSize="sm">
                            to veterinary care, pet food, & crates
                          </Text>
                        </Box>
                      </Stack>
                    </Box>
                    <Box
                      width="25vh"
                      borderRadius="lg"
                      borderWidth="2px"
                      bg="white"
                      height="22vh"
                      marginLeft={'18vh'}
                    >
                      <Stack alignItems="center" direction="column">
                        <Box marginTop="3.5vh">
                          {' '}
                          <Image boxSize="8vh" src={ICON3} />
                        </Box>
                        <Box>
                          <Text fontSize="xl" color="#2D3748" fontWeight="bold">
                            2,143,740 lbs
                          </Text>
                        </Box>
                        <Box>
                          <Text marginTop={'-1vh'} fontSize="sm">
                            pet food collected
                          </Text>
                        </Box>
                      </Stack>
                    </Box>
                    <Box
                      width="25vh"
                      borderRadius="lg"
                      borderWidth="2px"
                      borderColor="#E2E8F0"
                      bg="white"
                      height="22vh"
                      marginLeft={'2vh'}
                    >
                      <Stack alignItems="center" direction="column">
                        <Box marginTop="3.5vh">
                          {' '}
                          <Image boxSize="8vh" src={ICON4} />
                        </Box>
                        <Box>
                          <Text fontSize="xl" color="#2D3748" fontWeight="bold">
                            204
                          </Text>
                        </Box>
                        <Box>
                          <Text marginTop={'-1vh'} fontSize="sm">
                            donation sites nationwide
                          </Text>
                        </Box>
                      </Stack>
                    </Box>
                  </SimpleGrid>
                </Box>
              </Stack>
              <Box sx={{ backgroundColor: 'white' }}>{stepsComponents[step]}</Box>
            </SimpleGrid>
          </Box>
        </>
      ) : (
        <>{stepsComponents[3]}</>
      )}
    </div>
  );
};

BusinessFormMaster.propTypes = {
  setFormOpen: propTypes.func.isRequired,
};

export default BusinessFormMaster;
