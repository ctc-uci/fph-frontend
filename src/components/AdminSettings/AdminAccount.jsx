import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  HStack,
  Box,
  Button,
  FormControl,
  FormLabel,
  Card,
  Input,
  useToast,
} from '@chakra-ui/react';
import classes from './AdminSettings.module.css';
import { ArrowForwardIcon } from '@chakra-ui/icons';

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
        setAdminContactInfo(prevState => ({
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
      console.log(adminContactInfo.firstName);
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
      await resetPassword(adminContactInfo.email);
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

  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;
    setAdminContactInfo(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Card className={classes.roundedTable} alignItems={'left'} width={'65%'}>
        <FormControl margin={'3%'} width={'90%'}>
          <HStack marginBottom={'3%'}>
            <FormLabel
              marginStart={'1.5%'}
              fontSize={'15px'}
              fontWeight={'bold'}
              width={'26%'}
              alignItems={'center'}
            >
              NAME
            </FormLabel>
            <Input
              type="text"
              placeholder="First"
              defaultValue={adminContactInfo.firstName}
              name="firstName"
              width={'34.5%'}
              onChange={(e) => handleChange(e)}
            />
            <Input
              type="text"
              placeholder="Last"
              defaultValue={adminContactInfo.lastName}
              name="lastName"
              width={'34%'}
              onChange={(e) => handleChange(e)}
            />
          </HStack>
          <HStack marginBottom={'3%'}>
            <FormLabel
              marginStart={'1.5%'}
              fontSize={'15px'}
              fontWeight={'bold'}
              width={'26%'}
              alignItems={'center'}
            >
              EMAIL
            </FormLabel>
            <Input
              type="text"
              placeholder="example@email.com"
              value={adminContactInfo.email}
              disabled={true}
              name="email"
              onChange={(e) => handleChange(e)}
              width={'70%'}
            />
          </HStack>
          <HStack>
            <FormLabel
              marginStart={'1.5%'}
              fontSize={'15px'}
              fontWeight={'bold'}
              width={'26%'}
              alignItems={'center'}
              onClick={changePassword}
            >
              PASSWORD
            </FormLabel>
            <Button
              style={{
                backgroundColor: 'transparent',
                padding: '0',
                justifyContent: 'flex-start',
                textAlign: 'right',
              }}
              width={'70%'}
              color={'teal'}
              align
              onClick={changePassword}
            >
              Change Password
              <ArrowForwardIcon style={{ marginLeft: '3px' }} />
            </Button>
          </HStack>
        </FormControl>
      </Card>
      <Box alignContent={'left'}>
        <HStack marginBottom={'3%'} marginTop={'5%'} alignItems={'left'}>
          {/* <Button
            color="black"
            bg="gray.100"
            variant="solid"
            width={'21.5%'}
            marginRight={'1%'}
            onClick={updateContactInfo}
          >
            Undo Changes
          </Button> */}
          <Button colorScheme="teal" variant="solid" width={'11%'} onClick={updateContactInfo}>
            Save
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default AdminAccount;
