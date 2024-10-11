import { MouseEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import LOGO from '../../../public/fph_logo_no_bg.png';
import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';

interface SetUpFirstFormProps {
  admin: boolean;
  nextStep: () => void;
}

export const SetupSignup = ({ admin, nextStep }: SetUpFirstFormProps) => {
  const { currentUser, signup, logout } = useAuth();
  const { backend } = useBackend();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setUp = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const idFromUrl = urlParams.get('id');

      setId(idFromUrl ?? '');
      await logout(); // ! this is frankly incredible terrible code
    };

    setUp();
  }, []);

  useEffect(() => {
    const createUser = async () => {
      try {
        await backend.post('/businessUser', { id: id, uid: currentUser.uid });
        nextStep();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (currentUser) {
      createUser();
    }
  }, [currentUser]);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      setLoading(true);

      if (admin) {
        const response = await backend.get(`/adminUser/${email}`);
        const user = response.data.at(0);

        if (user) {
          await signup({ email, password });
          navigate('/AdminDashboard');
          return;
        } else {
          throw new Error(
            'Email has not been added as an admin yet. Please contact the site owner.',
          );
        }
      }

      if (!admin && id) {
        try {
          const business = await backend.post(`/business/${id}`);

          if (!business) {
            toast({
              title: 'Business ID could not be validated',
              description: 'The provided business ID was not valid',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        } catch (error) {
          console.error('Error validating business id:', error);

          toast({
            title: 'Business ID could not be validated',
            description: 'The provided business ID was not valid',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });

          throw Error(`Error validating business id: ${error}`);
        }

        await signup({ email, password });
      }

      toast({
        title: 'Business Not Found',
        description: 'You need to apply to become a donation site on the FPH website first!',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);

      let message = '';
      if (err.message == 'Firebase: Error (auth/invalid-email).') {
        message = 'Invalid Email';
      } else if (err.message == 'Password should be at least 6 characters (auth/weak-password).') {
        message = 'Weak Password';
      } else if (err.message == 'Firebase: Error (auth/email-already-in-use).') {
        message = 'Email Already In Use';
      } else {
        message = err.message;
      }

      toast({
        title: 'Create Account Failed',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
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
            />
          </FormControl>
          <Button
            marginTop="3vh"
            bg="#319795"
            color="white"
            variant="solid"
            w="full"
            disabled={loading}
            onClick={handleSubmit}
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
