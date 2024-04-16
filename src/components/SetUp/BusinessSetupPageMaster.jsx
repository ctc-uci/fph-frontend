import { useState } from 'react';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import ThirdForm from './ThirdForm';
import FourthForm from './FourthForm';
import { useNavigate } from 'react-router-dom';
import FifthForm from './FifthForm';
import { Box, Flex } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import propTypes from 'prop-types';

const BusinessSetupPageMaster = ({ isAdmin }) => {
  const navigate = useNavigate();
  const steps = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Date & Time' },
    { title: 'Third', description: 'Select Rooms' },
    { title: 'Fourth', description: 'Fourth' },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setActiveStep(prevState => prevState + 1);
    setStep(prevState => prevState + 1);
  };

  const stepsComponents = [
    <FirstForm key={0} isAdmin={isAdmin} nextStep={nextStep} />,
    <SecondForm key={1} />,
    <ThirdForm key={2} nextStep={nextStep} />,
    <FourthForm key={3} nextStep={nextStep} />,
    <FifthForm key={4} nextStep={nextStep} />,
  ];

  return (
    <div>
      {step === 0 ? (
        stepsComponents[step]
      ) : (
        <>
          {stepsComponents[step]}
          <Flex bg="#FFFFFF" justifyContent="center" alignItems="center" height="10vh">
            <Flex justifyContent="space-between" width="80%" alignItems="center" bg="#FFFFFF">
              {steps.map((step, index) => (
                <Flex key={index} direction="column" align="center" flex="1">
                  <Box
                    p={2}
                    bg={index === activeStep - 1 ? '#D9D9D9' : '#F5F5F5'}
                    color={index === activeStep - 1 ? 'white' : 'black'}
                    borderRadius="md"
                    mb={2}
                    width="25vh"
                  ></Box>
                  {index < steps.length - 1 && (
                    <Box flex="1" width="2px" bg={index < activeStep ? 'teal.500' : 'gray.300'} />
                  )}
                </Flex>
              ))}
              <Button
                marginLeft="3%"
                width="6%"
                mb={3}
                colorScheme="teal"
                size="sm"
                onClick={() => {
                  if (step < 4) {
                    nextStep();
                  } else {
                    if (isAdmin) {
                      navigate('/AdminDashboard');
                    } else {
                      navigate('/BusinessDashboard');
                    }
                  }
                }}
              >
                {step < 4 ? 'Next' : 'Finish'}
              </Button>
            </Flex>
          </Flex>
        </>
      )}
    </div>
  );
};

BusinessSetupPageMaster.propTypes = {
  isAdmin: propTypes.func.isRequired,
};

export default BusinessSetupPageMaster;
