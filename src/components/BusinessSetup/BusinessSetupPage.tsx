import { useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { InformationFirst } from './InformationFirst';
import { InformationSecond } from './InformationSecond';
import { SetupSignup } from './SetupSignup';
import { Tips } from './Tips';
import { Welcome } from './Welcome';

export const BusinessSetupPage = ({ isAdmin }: { isAdmin: boolean }) => {
  const navigate = useNavigate();
  const steps = [
    { title: 'First', description: 'Contact Info' },
    { title: 'Second', description: 'Date & Time' },
    { title: 'Third', description: 'Select Rooms' },
    { title: 'Fourth', description: 'Fourth' },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const stepsComponents = [
    <SetupSignup admin={isAdmin} nextStep={nextStep} />,
    <Welcome />,
    <InformationFirst />,
    <InformationSecond />,
    <Tips />,
  ];

  return (
    <Flex sx={{ flexDirection: 'column', height: '100vh' }}>
      {stepsComponents[activeStep]}
      {activeStep !== 0 ? (
        <Box
          justifyContent={'center'}
          position={'fixed'}
          bottom={6}
          left={'50%'}
          transform={'auto'}
          translateX={'-50%'}
        >
          <Flex justifyContent="space-between" alignItems="center" gap={4}>
            {steps.map((_, index) => (
              <Box
                p={2}
                width={200}
                bg={index === activeStep - 1 ? '#D9D9D9' : '#F5F5F5'}
                color={index === activeStep - 1 ? 'white' : 'black'}
                borderRadius="md"
                borderWidth={1.5}
                borderColor={'teal'}
                key={index}
              />
            ))}

            <Button
              colorScheme="teal"
              onClick={() => {
                if (activeStep < stepsComponents.length - 1) {
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
              {activeStep < stepsComponents.length - 1 ? 'Next' : 'Finish'}
            </Button>
          </Flex>
        </Box>
      ) : null}
    </Flex>
  );
};
