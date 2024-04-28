// import { useEffect, useState } from 'react';
// import { useBackend } from '../../contexts/BackendContext';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Card,
  Input,
} from '@chakra-ui/react';
import classes from './AdminSettings.module.css';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const AdminAccount = () => {
  return (
    <>
      <Card className={classes.roundedTable}>
        <FormControl>
          <Flex>
            <FormLabel>Name</FormLabel>
            <Input></Input>
            <Input></Input>
          </Flex>

          <Flex>
            <FormLabel>Email</FormLabel>
            <Input></Input>
          </Flex>

          <Flex>
            <FormLabel>Password</FormLabel>
            <Button sx={{ backgroundColor: "transparent"}}>Change Password
              <ArrowForwardIcon />
            </Button>
          </Flex>
        </FormControl>
      </Card>

      <Flex>
        <Button>Undo Changes</Button>
        <Button>Save</Button>
      </Flex>
    </>
  );
};

export default AdminAccount;
