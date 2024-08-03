import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import propTypes from 'prop-types';

import FPH_LOGO from './fph_logo.png';

const SecondForm = ({ formData, handleChange, prevStep, nextStep }) => {
  return (
    <Box p={5}>
      <Image boxSize="8vh" src={FPH_LOGO} />
      <Text paddingLeft="10vh" marginTop="10vh" fontSize="3xl" fontWeight="bold" color="#359797">
        Become a Donation Site
      </Text>
      <Text paddingLeft="10vh" fontSize="sm">
        To get started, fill out the form below.
      </Text>
      <Stack direction="column">
        <Box>
          <Flex direction="column" align="stretch" gap={5}>
            <Flex direction="column" gap={4}>
              <Box paddingLeft="10vh" marginTop="8vh" textAlign="left">
                <Text fontSize="xl">Business Address</Text>
              </Box>
              <FormControl paddingLeft="10vh" paddingRight="10vh" id="business-address-1">
                <FormLabel fontSize="small">Address Line 1</FormLabel>
                <Input
                  name="businessAddress1"
                  type="text"
                  value={formData['businessAddress1']}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </FormControl>
              <Flex gap={4}>
                <FormControl
                  paddingLeft="10vh"
                  paddingRight="10vh"
                  id="business-address-2"
                  flex="1"
                >
                  <FormLabel fontSize="small">Address Line 2</FormLabel>
                  <Input
                    name="businessAddress2"
                    type="text"
                    value={formData['businessAddress2']}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </FormControl>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <Box>
          <SimpleGrid rows="2" columns="2">
            <FormControl paddingLeft="10vh" id="city" flex="1">
              <FormLabel fontSize="small">City</FormLabel>
              <Input
                width="95%"
                name="city"
                type="text"
                value={formData['city']}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </FormControl>
            <FormControl paddingRight="10vh" id="state" flex="1">
              <FormLabel fontSize="small">State</FormLabel>
              <Input
                maxLength="2"
                style={{ textTransform: 'uppercase' }}
                width="95%"
                name="state"
                type="text"
                value={formData['state']}
                onChange={(e) => {
                  const upperCaseValue = e.target.value.toUpperCase();
                  handleChange({ ...e, target: { name: e.target.name, value: upperCaseValue } });
                }}
              />
            </FormControl>
            <FormControl paddingLeft="10vh" id="postal-code" flex="1">
              <FormLabel marginTop="2vh" fontSize="small">
                Postal Code
              </FormLabel>
              <Input
                maxLength="6"
                width="95%"
                name="postalCode"
                type="text"
                value={formData['postalCode']}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </FormControl>
            <FormControl paddingRight="10vh" id="country" flex="1">
              <FormLabel fontSize="small" marginTop="2vh">
                Country
              </FormLabel>
              <Input
                width="95%"
                name="country"
                type="text"
                value={formData['country']}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </FormControl>
          </SimpleGrid>

          <HStack marginTop="2vh" width="auto" justifyContent={'space-between'}>
            {' '}
            <Box paddingLeft="10vh">
              <Button
                color="#319795"
                variant="outline"
                width="9vh"
                type="submit"
                onClick={prevStep}
                colorScheme="teal"
              >
                Back
              </Button>
            </Box>{' '}
            <Box paddingRight="10vh">
              <Button
                background="#319795"
                width="9vh"
                type="submit"
                onClick={nextStep}
                colorScheme="teal"
              >
                Next
              </Button>
            </Box>
          </HStack>
        </Box>
      </Stack>
    </Box>
  );
};

SecondForm.propTypes = {
  handleChange: propTypes.func.isRequired,
  nextStep: propTypes.func.isRequired,
  prevStep: propTypes.func.isRequired,
  formData: propTypes.func.isRequired,
};

export default SecondForm;
