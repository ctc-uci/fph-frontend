import { useEffect, useState } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useToast,
} from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';

// duplicated from EditContactInformation
const formLabelStyles = {
  minWidth: '150px',
  fontSize: '16px',
  fontWeight: 'bold',
  alignItems: 'center',
};

const AdminAccount = () => {
  const toast = useToast();
  const { backend } = useBackend();
  const { currentUser, resetPassword } = useAuth();
  const [adminContactInfo, setAdminContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: currentUser.email,
  });

  useEffect(() => {
    const getName = async () => {
      try {
        const response = await backend.get(`/adminuser/${currentUser.email}`);
        const newName = response.data[0].name;
        const [firstName, lastName] = newName.split(' ');
        setAdminContactInfo((prevState) => ({
          ...prevState,
          firstName: firstName,
          lastName: lastName,
        }));
      } catch (error) {
        console.error('Error fetching admin user data:', error);
      }
    };

    getName();
  }, [backend, currentUser]);

  const updateContactInfo = async () => {
    try {
      await backend.put(`/adminuser/${adminContactInfo.email}`, {
        name: adminContactInfo.firstName + ' ' + adminContactInfo.lastName,
      });

      toast({
        title: 'Success',
        description: 'Your changes have been saved.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Your changes were not saved.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const changePassword = async () => {
    try {
      await resetPassword({ email: adminContactInfo.email });
      toast({
        title: 'Password reset email sent successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error.message);
      toast({
        title: 'Password reset email was not sent',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    var value = event.target.value;
    setAdminContactInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Box display={'flex'} flexDirection={'column'} gap={4}>
      <Card paddingX={6} paddingY={4} marginTop={3}>
        <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <HStack>
            <FormLabel sx={formLabelStyles}>NAME</FormLabel>
            <Input
              type="text"
              placeholder="First"
              defaultValue={adminContactInfo.firstName}
              name="firstName"
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Last"
              defaultValue={adminContactInfo.lastName}
              name="lastName"
              onChange={handleChange}
            />
          </HStack>
          <HStack>
            <FormLabel sx={formLabelStyles}>EMAIL</FormLabel>
            <Input
              type="text"
              placeholder="example@email.com"
              value={adminContactInfo.email}
              disabled={true}
              name="email"
              onChange={handleChange}
            />
          </HStack>
          <HStack>
            <FormLabel sx={formLabelStyles} onClick={changePassword}>
              PASSWORD
            </FormLabel>
            <Button
              style={{
                backgroundColor: 'transparent',
                justifyContent: 'flex-start',
                textAlign: 'right',
              }}
              variant={'link'}
              color={'teal'}
              align
              onClick={changePassword}
            >
              Change Password
              <ArrowForwardIcon />
            </Button>
          </HStack>
        </FormControl>
      </Card>
      <Box>
        <Button colorScheme="teal" variant="solid" onClick={updateContactInfo}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AdminAccount;
