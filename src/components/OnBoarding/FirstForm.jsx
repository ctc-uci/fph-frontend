import propTypes from 'prop-types';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Text,
  Image,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import FPH_LOGO from './fph_logo.png';

const FirstForm = ({ formData, handleChange, nextStep }) => {
  return (
    <Box p={5}>
      <Image boxSize="8vh" src={FPH_LOGO} />
      <Text paddingLeft="10vh" marginTop="10vh" fontSize="3xl" fontWeight="bold" color="#359797">
        Become a Donation Site
      </Text>
      <Text paddingLeft="10vh" fontSize="sm">
        To get started, fill out the form below.
      </Text>
      <Flex direction="column" align="stretch" gap={5}>
        <Flex direction="column" gap={4}>
          <FormControl paddingLeft="10vh" paddingRight="10vh" id="business-name">
            <Text fontSize="2xl" marginTop="8vh">
              Business/Org Name{' '}
            </Text>

            <Input
              marginTop="1vh"
              name="businessName"
              type="text"
              value={formData['businessName']}
              onChange={e => {
                handleChange(e);
              }}
            />
          </FormControl>
          <Text paddingLeft="10vh" paddingRight="10vh" marginTop="2vh" fontSize="2xl">
            Person of Contact
          </Text>
          <SimpleGrid rows="2" columns="2">
            <Box paddingLeft="10vh" width="36vh">
              <FormControl id="first-name" flex="1">
                <FormLabel>
                  <Text fontSize="sm">First Name</Text>
                </FormLabel>
                <Input
                  name="personFirstName"
                  type="text"
                  value={formData['personFirstName']}
                  onChange={e => {
                    handleChange(e);
                  }}
                />
              </FormControl>
            </Box>
            <Box paddingRight="10vh" width="36vh">
              <FormControl id="last-name" flex="1">
                <FormLabel fontSize="sm">Last Name</FormLabel>
                <Input
                  name="personLastName"
                  type="text"
                  value={formData['personLastName']}
                  onChange={e => {
                    handleChange(e);
                  }}
                />
              </FormControl>
            </Box>
            <Box paddingLeft="10vh" marginTop="2vh" width="36vh">
              <FormControl id="email" flex="1">
                <FormLabel fontSize="sm">Email</FormLabel>
                <Input
                  name="personEmail"
                  type="text"
                  value={formData['personEmail']}
                  onChange={e => {
                    handleChange(e);
                  }}
                />
              </FormControl>
            </Box>
            <Box paddingRight="10vh" marginTop="2vh" width="36vh">
              <FormControl id="position" flex="1">
                <FormLabel fontSize="sm">Position</FormLabel>
                <Input
                  name="personPosition"
                  type="text"
                  value={formData['personPosition']}
                  onChange={e => {
                    handleChange(e);
                  }}
                />
              </FormControl>
            </Box>
          </SimpleGrid>
          <FormControl paddingLeft="10vh" paddingRight="10vh" marginTop="2vh" id="website" flex="1">
            <Text fontSize="2xl">Business Website</Text>
            <Input
              marginTop="1vh"
              name="website"
              type="text"
              value={formData['website']}
              onChange={e => {
                handleChange(e);
              }}
            />
          </FormControl>
        </Flex>

        <HStack width="auto" justifyContent={'space-between'}>
          {' '}
          <Box></Box>{' '}
          <Box paddingRight="10vh">
            <Button
              background="#319795"
              width="9vh"
              type="submit"
              onClick={nextStep}
              colorScheme="blue"
            >
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
  formData: propTypes.func.isRequired,
};

export default FirstForm;
