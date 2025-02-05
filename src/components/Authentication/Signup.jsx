import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

const Signup = ({ isAdmin }) => {
  // React states for input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    toast({
      title: 'Login Failed',
      description: error,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }, [error, toast]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
        return setError('Passwords do not match');
      }

      try {
        setLoading(true);
        await signup({ email, password });
        if (isAdmin) {
          navigate('/AdminDashboard');
        } else {
          navigate('/BusinessDashboard');
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    },
    [confirmPassword, email, isAdmin, navigate, password, signup],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleSubmit(e);
      }
    },
    [handleSubmit],
  );

  return (
    <Box p={8}>
      <VStack spacing={4}>
        {isAdmin ? (
          <Heading>Create Admin Account</Heading>
        ) : (
          <Heading>Create Donation Site</Heading>
        )}
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <FormControl id="confirm-password">
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </FormControl>
        <Button colorScheme="blue" w="full" disabled={loading} onClick={(e) => handleSubmit(e)}>
          Create Account
        </Button>

        <Text mt={4} textAlign="center">
          Already have an account?{' '}
          <Link to={'/login'} color="blue.500" fontWeight="semibold">
            Log In
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

Signup.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Signup;
