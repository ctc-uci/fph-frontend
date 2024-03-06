import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Link,
} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import PropTypes from 'prop-types';

const ForgotPassword = () => {
  // React states for input fields
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();
  // TODO: Setup Error Alert
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your inbox for further instructions');
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);
  };

  return (
    <Box p={8}>
      {message}
      {error}
      <VStack spacing={4}>
        <Heading>Reset Password</Heading>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" w="full" disabled={loading} onClick={e => handleSubmit(e)}>
          Reset Password
        </Button>
        <Link to={'/LoginBusiness'} color="blue.500" fontWeight="semibold">
          Log In
        </Link>
      </VStack>
    </Box>
  );
};

ForgotPassword.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default ForgotPassword;
