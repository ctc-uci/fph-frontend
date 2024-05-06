import { Box, VStack, Text, HStack, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const FourthForm = () => {
  return (
    <Flex height="90vh" justifyContent="center" alignItems="center" bg="#FFFFFF">
      <VStack spacing={8}>
        <Text color={'#359797'} fontSize="5xl" fontWeight="bold">
          Let&apos;s Get You Set Up!
        </Text>
        <Box bg="#F9F8F7" p={4} borderRadius="2vh" maxWidth="110vh" width="full">
          <HStack spacing={4}>
            <Text fontSize="6xl" color="#359797" margin="0vh 5vh 0vh 5vh" fontWeight="bold">
              5
            </Text>
            <Text textAlign="left" fontSize="lg" width="full" lineHeight={'tall'}>
              <Box as="span" fontWeight="bold">
                Report Monthly:
              </Box>{' '}
              Each month log your donations. You will be entered in our quarterly drawing for a $50
              Starbucks gift card.
            </Text>
          </HStack>
        </Box>
        <Box bg="#F9F8F7" p={4} borderRadius="2vh" maxWidth="110vh" width="full">
          <HStack spacing={4}>
            <Text fontSize="6xl" color="#359797" margin="0vh 5vh 0vh 5vh" fontWeight="bold">
              6
            </Text>
            <Text textAlign="left" fontSize="lg" width="full" lineHeight={'tall'}>
              <Box as="span" fontWeight="bold">
                Add this verbiage to your email signature:
              </Box>{' '}
              “We are a Feeding Pets of the Homeless® Donation Site! Please bring by dog or cat
              food, treats or supplies to help!” Feeding Pets of the Homeless® is the first and
              only national animal organization focused completely on feeding and providing
              emergency veterinary care to pets that belong to homeless people.
            </Text>
          </HStack>
        </Box>
        <Box bg="#F9F8F7" p={4} borderRadius="2vh" maxWidth="110vh" width="full">
          <HStack spacing={4}>
            <Text fontSize="6xl" color="#359797" margin="0vh 5vh 0vh 5vh" fontWeight="bold">
              7
            </Text>
            <Text textAlign="left" fontSize="lg" width="full" lineHeight={'tall'}>
              <Box as="span" fontWeight="bold">
                Do not accept cash!
              </Box>{' '}
              Check should be addressed to Feeding Pets of the Homeless® and sent to headquarters.
            </Text>
          </HStack>
        </Box>
        <Box bg="#F9F8F7" p={4} borderRadius="2vh" maxWidth="110vh" width="full">
          <HStack spacing={4}>
            <Text fontSize="6xl" color="#359797" margin="0vh 5vh 0vh 5vh" fontWeight="bold">
              8
            </Text>
            <Text textAlign="left" fontSize="lg" width="full" lineHeight={'tall'}>
              <Box as="span" fontWeight="bold">
                If a donor requests a donation receipt,
              </Box>{' '}
              please use form included in the startup kit and return to us. We will then send an
              official receipt to them from headquarters.
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Flex>
  );
};

FourthForm.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  nextStep: PropTypes.bool.isRequired,
};

export default FourthForm;
