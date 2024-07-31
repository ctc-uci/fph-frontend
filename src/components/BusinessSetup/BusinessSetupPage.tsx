import { useState } from 'react';
import { SetupSignup } from './SetupSignup';
import { Welcome } from './Welcome';
import { Information } from './Information';
import FourthForm from './FourthForm';
import { useNavigate } from 'react-router-dom';
import FifthForm from './FifthForm';
import { Box, Flex } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

export const BusinessSetupPage = ({ isAdmin }) => {
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
    <SetupSignup admin={isAdmin} nextStep={nextStep} />,
    <Welcome />,
    <Information />,
    <FourthForm nextStep={nextStep} />,
    <FifthForm nextStep={nextStep} />,
  ];

  return (
    <Flex sx={{ flexDirection: 'column', height: '100vh' }}>
      {stepsComponents[step]}
      {step !== 0 ? (
        <Flex bg="white" justifyContent={'center'} paddingBottom={16}>
          <Flex justifyContent="space-between" alignItems="center" gap={4}>
            {steps.map((_, index) => (
              <Box
                p={2}
                width={200}
                bg={index === activeStep - 1 ? '#D9D9D9' : '#F5F5F5'}
                color={index === activeStep - 1 ? 'white' : 'black'}
                borderRadius="md"
                key={index}
              />
            ))}

            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => {
                if (step < stepsComponents.length - 1) {
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
              {step < stepsComponents.length - 1 ? 'Next' : 'Finish'}
            </Button>
          </Flex>
        </Flex>
      ) : null}
    </Flex>
  );
};
