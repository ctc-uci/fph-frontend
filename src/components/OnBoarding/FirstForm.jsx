import { useState } from 'react';
import propTypes from 'prop-types';
import { Box, FormControl, FormLabel, Input, Button, Flex, Text } from '@chakra-ui/react';

const FirstForm = ({ handleChange, nextStep }) => {
  const [businessName, changeBusinessName] = useState('');
  const [firstName, changeFirstName] = useState('');
  const [lastName, changeLastName] = useState('');
  const [email, changeEmail] = useState('');
  const [position, changePersonPosition] = useState('');
  const [website, changeWebsite] = useState('');

  return (
    <Box p={5}>
      <Text fontSize="xl" as="b" color="#359797">
        Become a Donation Site
      </Text>
      <Text fontSize="sm">To get started, fill out the form below.</Text>
      <Flex direction="column" align="stretch" gap={5}>
        <Flex direction="column" gap={4}>
          <FormControl id="business-name">
            <FormLabel>
              <Text fontSize="l">Business/Org Name </Text>
            </FormLabel>
            <Input
              name="businessName"
              type="text"
              value={businessName}
              onChange={e => {
                changeBusinessName(e.target.value);
                handleChange(e);
              }}
            />
          </FormControl>
          <Text fontSize="l" as="b">
            Person of Contact
          </Text>
          <Flex gap={4}>
            <FormControl id="first-name" flex="1">
              <FormLabel>
                <Text fontSize="sm">First Name</Text>
              </FormLabel>
              <Input
                name="personFirstName"
                type="text"
                value={firstName}
                onChange={e => {
                  changeFirstName(e.target.value);
                  handleChange(e);
                }}
              />
            </FormControl>
            <FormControl id="last-name" flex="1">
              <FormLabel fontSize="sm">Last Name</FormLabel>
              <Input
                name="personLastName"
                type="text"
                value={lastName}
                onChange={e => {
                  changeLastName(e.target.value);
                  handleChange(e);
                }}
              />
            </FormControl>
            <FormControl id="email" flex="1">
              <FormLabel fontSize="sm">Email</FormLabel>
              <Input
                name="personEmail"
                type="text"
                value={email}
                onChange={e => {
                  changeEmail(e.target.value);
                  handleChange(e);
                }}
              />
            </FormControl>
            <FormControl id="position" flex="1">
              <FormLabel fontSize="sm">Position</FormLabel>
              <Input
                name="personPosition"
                type="text"
                value={position}
                onChange={e => {
                  changePersonPosition(e.target.value);
                  handleChange(e);
                }}
              />
            </FormControl>
            <FormControl id="website" flex="1">
              <FormLabel fontSize="sm">Website</FormLabel>
              <Input
                name="website"
                type="text"
                value={website}
                onChange={e => {
                  changeWebsite(e.target.value);
                  handleChange(e);
                }}
              />
            </FormControl>
          </Flex>
        </Flex>
        <Button type="submit" onClick={nextStep} colorScheme="blue">
          Next
        </Button>
      </Flex>
    </Box>
  );
};

FirstForm.propTypes = {
  handleChange: propTypes.func.isRequired,
  nextStep: propTypes.func.isRequired,
};

export default FirstForm;
