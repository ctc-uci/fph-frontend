import { useBackend } from '../../contexts/BackendContext';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
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
  const senderID = 1;
  const { backend } = useBackend();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [checkedItems, setCheckedItems] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const checkedThingies = [
    'Get Pet Food Decal',
    'Decal',
    'Homeless Card',
    'Business Card',
    'Donation Site Decal',
    'Donation Site Bin Decals',
    'Donation Envelopes',
    'Homeless Card 2'
  ];

  const formData = {
    business_id: business_ID,
    message: null,
    timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
    been_dismissed: false,
  };

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
            <Button colorScheme="blue" mr={3} onClick={handleCancelButtonClick}>
              Back to Home
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
      type: 'Supply Request',
      timestamp: new Date().toLocaleString('en-US', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
      been_dismissed: false,
    };
    await backend.post('/notification/', updatedFormData);
    setShowConfirmation(true);
  };

  const handleNumInputChange = (e, index) => {
    checkedItems[index] = Number(e);

    // Update the state with the new array
    setCheckedItems(checkedItems);
    isFormFilled();
    setIsFormValid(checkedItems.some(value => value !== 0) || text.length > 0);
  };

  const isFormFilled = () => {
    // Check if all form fields are filled
    return checkedItems.some(value => value !== 0) || text.length > 0;
  };

  const setMessage = text => {
    const textCopy = text;
   
    const preMessage = `Business ID: ${senderID} is requesting:`;
    const messageBody = checkedThingies.map((item, index) => (
      `${item}: ${checkedItems[index]}\n`
    ));
    return `${preMessage}\n${messageBody}\nNotes:\n${textCopy}`;
  };

  const textInputHandler = e => {
    const newText = e.target.value;
    setText(newText);
    isFormFilled();
    setIsFormValid(checkedItems.some(value => value !== 0) || text.length > 0);
  };

  const buttonStyles = {
    ...(isFormFilled()
      ? { colorScheme: 'teal' } // Styles for 'teal' state
      : {
          backgroundColor: 'blackAlpha.300',
          color: 'white',
        }),
  };

  const handleCancelButtonClick = () => {
    navigate('/BusinessDashboard');
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
                      {checkedThingies.map((item, index) => (
                        <HStack
                          marginBottom={'17%'}
                          key={index}
                        >
                          <NumberInput
                            size="sm"
                            maxW={20}
                            defaultValue={0}
                            min={0}
                            onChange={e => handleNumInputChange(e, index)}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          <Text>{item}</Text>
                        </HStack>
                      ))}
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
                <Button
                  colorScheme="teal"
                  variant="outline"
                  width="130px"
                  onClick={handleCancelButtonClick}
                >
                  Cancel
                </Button>
                <Button
                  {...buttonStyles}
                  isDisabled={!isFormValid}
                  width="130px"
                  onClick={SubmitForm}
                >
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
      </Flex>
    </>
  );
};

export default ContactUs;
