import { useState } from 'react';
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
  HStack,
  Image,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import LOGO from './fph_logo.png';
import { useAuth } from '../../contexts/AuthContext';
import PropTypes from 'prop-types'; // Import PropTypes

const FirstForm = ({ isAdmin, nextStep }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuth();
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
        nextStep();
      } else {
        nextStep();
      }
    } catch {
      setError('Failed to create an account');
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
          {isAdmin ? (
            <Heading alignSelf="flex-start" marginBottom="3vh" color="#319795">Create Admin Account</Heading>
          ) : (
            <Heading alignSelf="flex-start" marginBottom="3vh" color="#319795">
              Create Donation Site Account
            </Heading>
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
          <Button
            marginTop="3vh"
            bg="#319795"
            color="white"
            variant="solid"
            w="full"
            disabled={loading}
            onClick={e => handleSubmit(e)}
          >
            Create Account
          </Button>
          <Text mt={4} alignSelf="flex-start">
            Already have an account?{' '}
            <Link
              onClick={() => {isAdmin ? navigate('/LoginAdmin') : navigate('/LoginBusiness')}}
              color="#319795"
              fontWeight="semibold"
            >
              Log In
            </Link>
          </Text>
        </VStack>
      </Box>
    </HStack>
  );
};

FirstForm.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  nextStep: PropTypes.bool.isRequired,
};

export default FirstForm;
