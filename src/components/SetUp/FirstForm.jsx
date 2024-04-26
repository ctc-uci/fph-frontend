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
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import LOGO from './fph_logo.png';
import { useAuth } from '../../contexts/AuthContext';
import PropTypes from 'prop-types'; // Import PropTypes

const FirstForm = ({ admin, nextStep }) => {
  const { isAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      setLoading(true);
      
      if (admin) {
        if (await isAdmin({email: email})) {
          await signup(email, password);
          navigate('/AdminDashboard');
        }
        else {
          throw new Error('Email has not been added as an admin yet. Please contact the site owner.');
        }
      }else{
        await signup(email, password);
        nextStep();
      }
    } catch (err) {
      console.log(err);
      var message = '';
      if (err.message == 'Firebase: Error (auth/invalid-email).'){
        message = 'Invalid Email';
      }
      else if (err.message == 'Password should be at least 6 characters (auth/weak-password).'){
        message = 'Weak Password';
      }
      else if (err.message == 'Firebase: Error (auth/email-already-in-use).'){
        message = 'Email Already In Use';
      }
      else {
        message = err.message;
      }
      toast({
        title: 'Create Account Failed',
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
          {admin ? (
            <Heading alignSelf="flex-start" marginBottom="3vh" color="#319795">
              Create Admin Account
            </Heading>
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
              onClick={() => {
                navigate('/Login');
              }}
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
  admin: PropTypes.bool.isRequired,
  nextStep: PropTypes.bool.isRequired,
};

export default FirstForm;
