import { VStack, Text, Image, Flex } from '@chakra-ui/react';
import LOGO from './fph_logo.png';
import PropTypes from 'prop-types';

const SecondForm = () => {
  return (
    <>
      <Flex height="90vh" justifyContent="center" alignItems="center" bg="#FFFFFF">
        <VStack spacing={'4vh'}>
          <Image src={LOGO} boxSize="40vh" />
          <Text color={'#359797'} fontSize="3xl" fontWeight="bold">
            Welcome!
          </Text>
          <Text textAlign="center" width="60vh" fontSize="l">
            Thank you for your interest and signing up to become a Feeding Pets of the Homeless
            Donation Site! Let’s walk through your Donation Site Kit to get you started!
          </Text>
        </VStack>
      </Flex>
    </>
  );
};

SecondForm.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  nextStep: PropTypes.bool.isRequired,
};

export default SecondForm;
