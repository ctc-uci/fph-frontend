import { Box, Heading, Text } from '@chakra-ui/react';

const RegisterSuccessPage = () => {
  return (
    <Box>
      <Heading size="2xl" textAlign="center" p={8}>
        FPH
      </Heading>
      <Heading size="3xl" textAlign="center">
        THANK YOU!
      </Heading>
      <Box textAlign="center" p={7}>
        <Text fontSize="xl">Our org will renew ... you will receive confirmation...</Text>
      </Box>
      <Text textAlign="center" fontSize="xl">
        Any question? email fphemail@email.com
      </Text>
      <Box p={7}></Box>
    </Box>
  );
};
export default RegisterSuccessPage;
