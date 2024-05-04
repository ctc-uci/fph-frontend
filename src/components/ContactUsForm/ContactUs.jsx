import { useBackend } from '../../contexts/BackendContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
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
  const FPH_ID = 0;
  const { backend } = useBackend();
  const { currentUser } = useAuth();
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
    'Homeless Card 2',
  ];

  const [businessId, setBusinessId] = useState(null);
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    // Define an async function inside useEffect since useEffect cannot be asynchronous directly
    const fetchBusinessId = async () => {
      try {
        // Fetch business ID from backend
        const businessIdResponse = await backend.get(`/businessUser/${currentUser.uid}`);
        const fetchedBusinessId = businessIdResponse.data[0].id;
        const businessNameResponse = await backend.get(`/business/${fetchedBusinessId}`);
        const fetchedBusinessName = businessNameResponse.data[0].business_name;
        // Set the fetched business ID in state
        setBusinessId(fetchedBusinessId);
        setBusinessName(fetchedBusinessName);
      } catch (error) {
        // Handle errors
        console.error('Error fetching business ID:', error);
      }
    };

    fetchBusinessId();
  }, []);

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
    const msg = {
      "Get Pet Food Decal": checkedItems[0],
      "Decal": checkedItems[1],
      "Homeless Card": checkedItems[2],
      "Business Card": checkedItems[3],
      "Donation Site Decal": checkedItems[4],
      "Donation Site Bin Decals": checkedItems[5],
      "Donation Envelopes": checkedItems[6],
      "Homeless Card 2": checkedItems[7],
      "Notes": text,
    };
    const message = JSON.stringify(msg);
    const updatedFormData = {
      businessId: FPH_ID,
      message: message,
      type: 'Supply Request',
      senderId: businessId,
      businessName: businessName,
      donationId: null,
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
                      <HStack marginBottom={'17%'} key={index}>
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
