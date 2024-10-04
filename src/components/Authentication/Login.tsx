import { MouseEvent, useState } from 'react';
import {
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';
import LOGO from './fph_logo.png';

export const Login = () => {
  // React states for input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { backend } = useBackend();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await login({ email, password });

      const response = await backend.get(`/adminUser/${userCredential.user.email}`);
      const user = response.data.at(0);

      console.log(response);

      if (user?.name) {
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
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Flex flex={'row'} justifyContent={'flex-end'} w="100%">
            <ChakraLink
              to={'/ForgotPassword'}
              as={Link}
              color="black.500"
              textDecoration={'underline'}
              fontWeight="semibold"
            >
              Forgot Password?
            </ChakraLink>
          </Flex>

          <Button colorScheme="teal" w="full" disabled={loading} onClick={(e) => handleSubmit(e)}>
            Login
          </Button>

          <Text mt={4}>
            Don't have an account? Sign up as an&nbsp;
            <ChakraLink as={Link} to={'/signupadmin'} color="blue.500" fontWeight="semibold">
              Admin
            </ChakraLink>
            &nbsp;or as a&nbsp;
            <ChakraLink as={Link} to={'/signupbusiness'} color="blue.500" fontWeight="semibold">
              Business
            </ChakraLink>
          </Text>
        </VStack>
      </Box>
    </HStack>
  );
};
