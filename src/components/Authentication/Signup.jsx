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
  Text,
  Link,
} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import PropTypes from 'prop-types'; // Import PropTypes

const Signup = ({ isAdmin }) => {
  // React states for input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuth();
  // TODO: Setup Error Alert
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      if (isAdmin) {
        navigate('/AdminDashboard');
      } else {
        navigate('/BusinessDashboard');
      }
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  };

  return (
    <Box p={8}>
      {error}
      <VStack spacing={4}>
        {isAdmin ? (
          <Heading>Create Admin Account</Heading>
        ) : (
          <Heading>Create Donation Site</Heading>
        )}
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </FormControl>
        <FormControl id="confirm-password">
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" w="full" disabled={loading} onClick={e => handleSubmit(e)}>
          Create Account
        </Button>

        <Text mt={4} textAlign="center">
          Already have an account?{' '}
          <Link
            to={isAdmin ? '/LoginAdmin' : '/LoginBusiness'}
            color="blue.500"
            fontWeight="semibold"
          >
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
