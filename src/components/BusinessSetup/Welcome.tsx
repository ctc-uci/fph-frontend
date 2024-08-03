import { Center, Image, Text, VStack } from '@chakra-ui/react';

import LOGO from '../../../public/fph_logo_no_bg.png';

export const Welcome = () => {
  return (
    <Center bg="white" flexGrow={1}>
      <VStack>
        <Image src={LOGO} width={350} />
        <VStack width={750}>
          <Text color="teal" fontSize="3xl" fontWeight="bold">
            Welcome!
          </Text>
          <Text textAlign="center" fontSize="l">
            Thank you for your interest and signing up to become a Feeding Pets of the Homeless
            Donation Site! Let’s walk through your Donation Site Kit to get you started!
          </Text>
        </VStack>
      </VStack>
    </Center>
  );
};
