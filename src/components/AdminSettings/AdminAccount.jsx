import { useState } from 'react';
// import { useBackend } from '../../contexts/BackendContext';
import { HStack, Box, Button, FormControl, FormLabel, Card, Input } from '@chakra-ui/react';
import classes from './AdminSettings.module.css';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const AdminAccount = () => {
  const [businessContactInfo, setBusinessContactInfo] = useState({});

  const updateContactInfo = () => {
    setBusinessContactInfo();
  };

  const handleChange = () => {};

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
              defaultValue={businessContactInfo.firstName}
              name="firstName"
              width={'34.5%'}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Last"
              defaultValue={businessContactInfo.lastName}
              name="lastName"
              width={'34%'}
              onChange={handleChange}
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
              value={businessContactInfo.email}
              name="email"
              onChange={handleChange}
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
            >
              Change Password
              <ArrowForwardIcon style={{ marginLeft: '3px' }} />
            </Button>
          </HStack>
        </FormControl>
      </Card>
      <Box alignContent={'left'}>
        <HStack marginBottom={'3%'} marginTop={'5%'} alignItems={'left'}>
          <Button
            color="black"
            bg="gray.100"
            variant="solid"
            width={'21.5%'}
            marginRight={'1%'}
            onClick={updateContactInfo}
          >
            Undo Changes
          </Button>
          <Button colorScheme="teal" variant="solid" width={'11%'} onClick={updateContactInfo}>
            Save
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default AdminAccount;
