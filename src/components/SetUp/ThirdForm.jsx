import { Box, VStack, Text, HStack, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ThirdForm = () => {
  return (
    <Flex height="90vh" justifyContent="center" alignItems="center" bg="#FFFFFF">
      <VStack spacing={8}>
        <Text color={'#359797'} fontSize="5xl" fontWeight="bold">
          Let's Get You Set Up!
        </Text>
        <Box bg="#F9F8F7" p={4} borderRadius="2vh" maxWidth="110vh" width="full">
          <HStack spacing={4}>
            <Text fontSize="6xl" color="#359797" margin="0vh 5vh 0vh 5vh" fontWeight="bold">
              1
            </Text>
            <Text textAlign="left" fontSize="lg" width="full" lineHeight={'tall'}>
              <Box as="span" fontWeight="bold">
                Visit our website
              </Box>{' '}
              to familiarize yourself with our mission, donation sites and pet food providers in
              your area, and other useful info.
            </Text>
          </HStack>
        </Box>
        <Box bg="#F9F8F7" p={4} borderRadius="2vh" maxWidth="110vh" width="full">
          <HStack spacing={4}>
            <Text fontSize="6xl" color="#359797" margin="0vh 5vh 0vh 5vh" fontWeight="bold">
              2
            </Text>
            <Text textAlign="left" fontSize="lg" width="full" lineHeight={'tall'}>
              <Box as="span" fontWeight="bold">
                Set up a donation bin{' '}
              </Box>{' '}
              in an accessible area around your business. We accept donations of pet food (cat, dog,
              canned & dry, NOT expired) and gently used and new pet supplies, such as leashes,
              collars, bowls, harnesses, beds, etc. Open bags okay, please tape up. We do not accept
              donations of prescription medications. Over the counter medications are okay.
            </Text>
          </HStack>
        </Box>
        <Box bg="#F9F8F7" p={4} borderRadius="2vh" maxWidth="110vh" width="full">
          <HStack spacing={4}>
            <Text fontSize="6xl" color="#359797" margin="0vh 5vh 0vh 5vh" fontWeight="bold">
              3
            </Text>
            <Text textAlign="left" fontSize="lg" width="full" lineHeight={'tall'}>
              <Box as="span" fontWeight="bold">
                Reach out to Pet Food Providers
              </Box>{' '}
              in your area and set up a pick up or drop off schedule for your donations.
            </Text>
          </HStack>
        </Box>
        <Box bg="#F9F8F7" p={4} borderRadius="2vh" maxWidth="110vh" width="full">
          <HStack spacing={4}>
            <Text fontSize="6xl" color="#359797" margin="0vh 5vh 0vh 5vh" fontWeight="bold">
              4
            </Text>
            <Text textAlign="left" fontSize="lg" width="full" lineHeight={'tall'}>
              <Box as="span" fontWeight="bold">
                Spread the word{' '}
              </Box>{' '}
              on social media and let your customers know you have become a Feeding Pets of the
              Homeless® Donation Site.
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Flex>
  );
};

ThirdForm.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  nextStep: PropTypes.bool.isRequired,
};

export default ThirdForm;
