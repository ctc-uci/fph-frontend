import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  HStack,
  Flex,
  Image,
  useToast,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import PropTypes from 'prop-types';
import LOGO from './fph_logo.png';

const ForgotPassword = () => {
  // React states for input fields
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();
  // TODO: Setup Error Alert
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const toast = useToast();
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
    } catch {
      toast({
        title: 'Email Not Found',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }

    setLoading(false);
  };

  return (
    <HStack spacing={0} h="100vh">
      <Flex justifyContent="center" alignItems="center" w="50%" bg="#F9F8F7">
        <Image src={LOGO} boxSize="50vh" />
      </Flex>
      <Box w="50%" bg="#FFFFFF">
        <VStack spacing={4} align="stretch" height="100vh" justifyContent="center" paddingX="10vh">
          <Heading alignSelf="flex-start" marginBottom="0vh" color="#319795">Forgot Password?</Heading>
          <Text alignSelf="flex-start" marginBottom="2vh">Enter your email below to receive a link to change your password.</Text>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </FormControl>
          <Button colorScheme="teal" w="full" disabled={loading} onClick={e => handleSubmit(e)}>
            Send Link
          </Button>
        </VStack>
      </Box>
    </HStack>
  );
};

ForgotPassword.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default ForgotPassword;
