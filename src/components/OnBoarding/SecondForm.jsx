import { useState } from 'react';
import propTypes from 'prop-types';
import { Box, FormControl, FormLabel, Input, Button, Flex, Text, HStack } from '@chakra-ui/react';

const SecondForm = ({ handleChange, prevStep, nextStep }) => {
  const [businessAddress1, changeBusinessAddress1] = useState('');
  const [businessAddress2, changeBusinessAddress2] = useState('');
  const [city, changeCity] = useState('');
  const [state, changeState] = useState('');
  const [postalCode, changePostalCode] = useState('');
  const [country, changeCountry] = useState('');

  return (
    <Box p={5}>
      <Flex direction="column" align="stretch" gap={5}>
        <Flex direction="column" gap={4}>
          <Box textAlign="left" paddingLeft={8}>
            <Text fontSize="2xl">Business Address</Text>
          </Box>
          <FormControl id="business-address-1">
            <FormLabel>Address Line 1</FormLabel>
            <Input
              name="businessAddress1"
              type="text"
              value={businessAddress1}
              onChange={e => {
                changeBusinessAddress1(e.target.value);
                handleChange(e);
              }}
            />
          </FormControl>
          <Flex gap={4}>
            <FormControl id="business-address-2" flex="1">
              <FormLabel>Address Line 2</FormLabel>
              <Input
                name="businessAddress2"
                type="text"
                value={businessAddress2}
                onChange={e => {
                  changeBusinessAddress2(e.target.value);
                  handleChange(e);
                }}
              />
            </FormControl>
            <FormControl id="city" flex="1">
              <FormLabel>City</FormLabel>
              <Input
                name="city"
                type="text"
                value={city}
                onChange={e => {
                  changeCity(e.target.value);
                  handleChange(e);
                }}
              />
            </FormControl>
            <FormControl id="state" flex="1">
              <FormLabel>State</FormLabel>
              <Input
                name="state"
                type="text"
                value={state}
                onChange={e => {
                  changeState(e.target.value);
                  handleChange(e);
                }}
              />
            </FormControl>
            <FormControl id="postal-code" flex="1">
              <FormLabel>Postal Code</FormLabel>
              <Input
                name="postalCode"
                type="text"
                value={postalCode}
                onChange={e => {
                  changePostalCode(e.target.value);
                  handleChange(e);
                }}
              />
            </FormControl>
            <FormControl id="country" flex="1">
              <FormLabel>Country</FormLabel>
              <Input
                name="country"
                type="text"
                value={country}
                onChange={e => {
                  changeCountry(e.target.value);
                  handleChange(e);
                }}
              />
            </FormControl>
          </Flex>
        </Flex>
        <HStack>
          {' '}
          <Box>
            <Button type="submit" onClick={prevStep} colorScheme="blue">
              Back
            </Button>
          </Box>{' '}
          <Box>
            <Button type="submit" onClick={nextStep} colorScheme="blue">
              Next
            </Button>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};

SecondForm.propTypes = {
  handleChange: propTypes.func.isRequired,
  nextStep: propTypes.func.isRequired,
  prevStep: propTypes.func.isRequired,
};

export default SecondForm;
