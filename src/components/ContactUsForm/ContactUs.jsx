import { useBackend } from '../../contexts/BackendContext';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Text,
  Textarea,
  Stack,
  Box,
  Button,
  HStack,
  Card,
  Spacer,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const ContactUs = () => {
  const business_ID = 0;
  const { backend } = useBackend();
  // const [name, setName] = useState('business?'); // name of business
  const [text, setText] = useState('');
  const [checkedItems, setCheckedItems] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const formData = {
    business_id: business_ID,
    message: null,
    timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
    been_dismissed: false,
  };

  // const handleCheck = (index, newValue) => {
  //   setCheckedItems(checkedItems => {
  //     const newArray = [...checkedItems];
  //     newArray[index] = newValue;
  //     return newArray;
  //   });
  // };

  const ConfirmationDialog = ({ isOpen, onClose }) => (
    <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Stack align="center">
          <ModalHeader mt="25">
            <Image src="src/components/ContactUsForm/fph_logo.png" boxSize="200px" alt="fph Logo" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack align="center">
              <Text fontSize="3xl" color="teal">
                Supply Request Sent!
              </Text>
              <Text>Your supplies will be shipped in 5-7 business days.</Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Back to Home
              <Link to={'/BusinessDonationTrackingForm'} />
            </Button>
          </ModalFooter>
        </Stack>
      </ModalContent>
    </Modal>
  );

  ConfirmationDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const SubmitForm = async () => {
    const message = setMessage(text);
    const updatedFormData = {
      ...formData,
      message: message,
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
      been_dismissed: false,
    };
    const result = await backend.post('/notification/', updatedFormData);
    console.log(result);
    setShowConfirmation(true);
  };

  const handleNumInputChange = (e, index) => {
    checkedItems[index] = Number(e);

    // Update the state with the new array
    setCheckedItems(checkedItems);
    isFormFilled();
    setIsFormValid(checkedItems.some(value => value !== 0) && text.length > 0);
    console.log(checkedItems);
  };

  const isFormFilled = () => {
    // Check if all form fields are filled
    console.log(checkedItems.some(value => value !== 0) && text.length > 0);
    return checkedItems.some(value => value !== 0) && text.length > 0;
  };

  const setMessage = text => {
    const textCopy = text;
    const checkedThingies = [
      'DS Decals',
      'Rack Cards',
      'Donation Envelopes',
      'Business Cards',
      'Stickers',
      'Bin Decals',
      'DS Decals',
    ];
    const preMessage = `Business is requesting: \n`; // business name... hard-coded right now
    const updatedMessage = checkedThingies.filter((_, index) => checkedItems[index]).join('\n-');
    return `${preMessage}-${updatedMessage}\nNotes:\n${textCopy}`;
  };

  const textInputHandler = e => {
    const newText = e.target.value;
    setText(newText);
    isFormFilled();
    setIsFormValid(checkedItems.some(value => value !== 0) && text.length > 0);
  };

  const buttonStyles = {
    ...(isFormFilled()
      ? { colorScheme: 'teal' } // Styles for 'teal' state
      : {
          backgroundColor: 'blackAlpha.300',
          color: 'white',
        }),
  };

  return (
    <>
      <Flex>
        <Box bg="#F5F5F5" width={'100%'} height={'100%'}>
          <Box marginLeft={'3%'} marginRight={'3%'} marginTop={'5%'} marginBottom={'5%'}>
            <Text fontSize="2xl" as="b">
              Supply Request
            </Text>
            <Spacer margin={'2%'}></Spacer>
            <Card width={'100%'}>
              <Card width={'81%'} variant={'outline'} margin={'5%'} marginBottom={'0%'}>
                <Box
                  p={4}
                  display="flex"
                  mt="15"
                  alignItems="top"
                  border="20%"
                  marginLeft={'3%'}
                  borderColor="gray.200"
                  borderRightRadius="1"
                >
                  <Stack>
                    <HStack marginBottom={'17%'}>
                      <NumberInput
                        size="sm"
                        maxW={20}
                        defaultValue={0}
                        min={0}
                        onChange={e => handleNumInputChange(e, 0)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Text>DS Decals</Text>
                    </HStack>
                    <HStack marginBottom={'17%'}>
                      <NumberInput
                        size="sm"
                        maxW={20}
                        defaultValue={0}
                        min={0}
                        onChange={e => handleNumInputChange(e, 1)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Text>Rack Cards</Text>
                    </HStack>
                    <HStack marginBottom={'17%'}>
                      <NumberInput
                        size="sm"
                        maxW={20}
                        defaultValue={0}
                        min={0}
                        onChange={e => handleNumInputChange(e, 2)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Text>Donation Envelopes</Text>
                    </HStack>
                    <HStack marginBottom={'17%'}>
                      <NumberInput
                        size="sm"
                        maxW={20}
                        defaultValue={0}
                        min={0}
                        onChange={e => handleNumInputChange(e, 3)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Text>BusinessCards</Text>
                    </HStack>
                    <HStack marginBottom={'17%'}>
                      <NumberInput
                        size="sm"
                        maxW={20}
                        defaultValue={0}
                        min={0}
                        onChange={e => handleNumInputChange(e, 4)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Text>Stickers</Text>
                    </HStack>
                  </Stack>
                  <Stack margin={'5%'}></Stack>
                  <Stack>
                    <HStack marginBottom={'17%'}>
                      <NumberInput
                        size="sm"
                        maxW={20}
                        defaultValue={0}
                        min={0}
                        onChange={e => handleNumInputChange(e, 5)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Text>Bin Decals</Text>
                    </HStack>
                    <HStack marginBottom={'17%'}>
                      <NumberInput
                        size="sm"
                        maxW={20}
                        defaultValue={0}
                        min={0}
                        onChange={e => handleNumInputChange(e, 6)}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Text>DS Decals</Text>
                    </HStack>
                  </Stack>
                </Box>
              </Card>
              <Box margin={'5%'}>
                <Textarea
                  width={'90%'}
                  h={'150px'}
                  value={text}
                  placeholder="Notes..."
                  onChange={textInputHandler}
                />
              </Box>
              <Spacer p={'6%'}></Spacer>
              <HStack justify="flex-end" marginEnd={'5%'}>
                <Button colorScheme="teal" variant="outline" width="130px">
                  Cancel
                  <Link to="/BusinessDashboard"></Link>
                </Button>
                <Button {...buttonStyles} disabled={isFormValid} width="130px" onClick={SubmitForm}>
                  Send
                </Button>
              </HStack>
              <Stack margin={'2%'}></Stack>
            </Card>
            <ConfirmationDialog
              isOpen={showConfirmation}
              onClose={() => setShowConfirmation(false)}
            />
          </Box>
        </Box>
        {/* <Box>
          Feeding Pets of the Homeless Information
          <Box>
            <Text>Address</Text>
            <Text>123 Address Blvd.</Text>
          </Box>
          <Box>
            <Text>Phone</Text>
            <Text>(123) 456-7890</Text>
          </Box>
          <Box>
            <Text>Email</Text>
            <Text>kaicenatGYATT@gyattmail.com</Text>
          </Box>
        </Box> */}
      </Flex>
    </>
  );
};

export default ContactUs;
