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
    } catch {
      setError('Failed to sign in');
    }

    setLoading(false);
  };

  return (
    <Box p={8}>
      {error}
      <VStack spacing={4}>
        {isAdmin ? <Heading>Admin Login</Heading> : <Heading>Donation Site Login</Heading>}
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" w="full" disabled={loading} onClick={e => handleSubmit(e)}>
          Login
        </Button>

        <Text mt={4} textAlign="center">
          Don&apos;t have an account?{' '}
          <Link
            to={isAdmin ? '/SignupAdmin' : '/SignupBusiness'}
            color="blue.500"
            fontWeight="semibold"
          >
            Sign Up
          </Link>
        </Text>
        <Link to={'/ForgotPassword'} color="blue.500" fontWeight="semibold">
          Forgot Password?
        </Link>
      </VStack>
    </Box>
  );
};

Login.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Login;
