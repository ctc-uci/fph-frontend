import { useState } from 'react';
import propTypes from 'prop-types';
import { Box, FormControl, FormLabel, Input, Button, Flex, Text, Image, HStack, SimpleGrid } from '@chakra-ui/react';
import FPH_LOGO from './fph_logo.png';

const FirstForm = ({ handleChange, nextStep }) => {
  const [businessName, changeBusinessName] = useState('');
  const [firstName, changeFirstName] = useState('');
  const [lastName, changeLastName] = useState('');
  const [email, changeEmail] = useState('');
  const [position, changePersonPosition] = useState('');
  const [website, changeWebsite] = useState('');

  return (
    <Box p={5}>
      <Image boxSize='8vh' src={FPH_LOGO} />
      <Text fontSize="xl" as="b" color="#359797">
        Become a Donation Site
      </Text>
      <Text fontSize="sm">To get started, fill out the form below.</Text>
      <Flex direction="column" align="stretch" gap={5}>
        <Flex direction="column" gap={4}>
          <FormControl marginTop='-5vh' padding='6vh' id="business-name">

              <FormLabel fontSize="xl" marginTop='5vh'>Business/Org Name </FormLabel>

            <Input marginTop='1vh'
              name="businessName"
              type="text"
              value={businessName}
              onChange={e => {
                changeBusinessName(e.target.value);
                handleChange(e);
              }}
            />
          </FormControl>
          <FormLabel marginTop='-10vh' padding='6vh' fontSize="xl">
            Person of Contact
          </FormLabel>
          <SimpleGrid marginTop='-2vh' rows='2' columns='2'>


          <Box padding='6vh' marginTop='-10vh'>
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
            </Box><Box padding='6vh' marginTop='-10vh'>
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
            </Box><Box padding='6vh' marginTop='-10vh'>
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
            </Box><Box padding='6vh' marginTop='-10vh'>
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
            </Box>
            </SimpleGrid>
            <FormControl padding='6vh' marginTop='-10vh' id="website" flex="1">
              <FormLabel fontSize="xl">Business Website</FormLabel>
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

        <HStack padding='6vh' width='auto' justifyContent={'space-between'}>
          {' '}
          <Box>

          </Box>{' '}
          <Box>
            <Button marginTop='-15vh' background='#319795' width='9vh' type="submit" onClick={nextStep} colorScheme="blue">
              Next
            </Button>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};

FirstForm.propTypes = {
  handleChange: propTypes.func.isRequired,
  nextStep: propTypes.func.isRequired,
};

export default FirstForm;
