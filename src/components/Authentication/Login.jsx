import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Link,
  useToast,
  HStack,
  Flex,
  Image,
} from '@chakra-ui/react';
import LOGO from './fph_logo.png';
import { useAuth } from '../../contexts/AuthContext';
import PropTypes from 'prop-types';

const Login = ({ isAdmin }) => {
  // React states for input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  // TODO: Setup Error Alert
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      if (isAdmin) {
        navigate('/AdminDashboard');
      } else {
        navigate('/BusinessDashboard');
      }
    } catch (err) {
      var message = '';
      if (err.message == 'Firebase: Error (auth/invalid-email).') {
        message = 'Invalid Email';
      } else if (err.message == 'Firebase: Error (auth/missing-password).') {
        message = 'Missing Password';
      } else {
        message = 'Incorrect Password or Email';
      }
      toast({
        title: 'Login Failed',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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
          <Heading alignSelf="flex-start" marginBottom="3vh" color="#319795">
            Log in
          </Heading>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </FormControl>
          <Flex flex={'row'} justifyContent={'flex-end'} w="100%">
            <Link
              to={'/ForgotPassword'}
              color="black.500"
              textDecoration={'underline'}
              fontWeight="semibold"
            >
              Forgot Password?
            </Link>
          </Flex>
          <Button colorScheme="teal" w="full" disabled={loading} onClick={e => handleSubmit(e)}>
            Login
          </Button>
        </VStack>
      </Box>
    </HStack>
  );
};

Login.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Login;
