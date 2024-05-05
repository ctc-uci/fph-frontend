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
  VStack,
} from '@chakra-ui/react';
import Supply_0 from './Supply_0.png';
import Supply_1 from './Supply_1.png';
import Supply_2 from './Supply_2.png';
import Supply_3 from './Supply_3.png';
import Supply_4 from './Supply_4.png';
import Supply_5 from './Supply_5.png';
import Supply_6 from './Supply_6.png';
import Supply_7 from './Supply_7.png';

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
  const supplyDescriptions = [
    'Stickers to share with your Pet Food Provider.',
    'Stickers that can be handed out and can be placed on water bottles, cars and more.',
    'Cards to share with your Pet Food Provider who may have more direct contact with the homeless in need of emergency veterinary services.',
    'Feeding Pets of the Homeless’ contact information cards.',
    'Decals that indicate that you are a donation site.',
    'Decorate your donation bins with these decals so donators know where to put their items. ',
    'Envelopes to provide potential donators to make a direct donation.',
    'Cards to share with your Pet Food Provider who may have more direct contact with the homeless who are in need of emergency veterinary services.',
  ];
  const suppliesImages = [
    Supply_0,
    Supply_1,
    Supply_2,
    Supply_3,
    Supply_4,
    Supply_5,
    Supply_6,
    Supply_7,
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
      'Get Pet Food Decal': checkedItems[0],
      Decal: checkedItems[1],
      'Homeless Card': checkedItems[2],
      'Business Card': checkedItems[3],
      'Donation Site Decal': checkedItems[4],
      'Donation Site Bin Decals': checkedItems[5],
      'Donation Envelopes': checkedItems[6],
      'Homeless Card 2': checkedItems[7],
      Notes: text,
    };
    const message = JSON.stringify(msg);
    console.log(message)
    const updatedFormData = {
      businessId: FPH_ID,
      message: message,
      type: 'Supply Request',
      senderId: businessId,
      businessName: businessName,
      donationId: null,
    };
    const confirmationNotification = {
      businessId: businessId,
      message: message,
      type: 'Supply Request',
      senderId: FPH_ID,
      businessName: null,
      donationId: null,
    }
    await backend.post('/notification/', updatedFormData);
    await backend.post('/notification/', confirmationNotification);
    await backend.put(`/business/${businessId}`, { supply_request_status: "Pending" });
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

  const showSupplyRequests = (startingIndex, endingIndex) => {
    return (
      <Stack flex="1" spacing="4">
        {checkedThingies.slice(startingIndex, endingIndex).map((item, index) => (
          <HStack marginTop="20px" key={index} align="top" spacing="0" width="476px" height="131px">
            <Box
              width="202px"
              height="131px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                width="200px"
                height="131px"
                src={suppliesImages[startingIndex + index]}
                alt={`Supply ${startingIndex + index}`}
                objectFit="contain"
              />
            </Box>
            <VStack align="stretch" justifyContent="center" spacing="1" flex="1">
              <HStack spacing={4}>
                <NumberInput
                  size="sm"
                  maxW="100px"
                  defaultValue={0}
                  min={0}
                  onChange={valueString => handleNumInputChange(startingIndex + index, valueString)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text>{item}</Text>
              </HStack>
              <Text
                color="#718096"
                fontSize="sm"
                lineHeight="5"
                fontWeight="normal"
                fontFamily="Inter"
              >
                {supplyDescriptions[startingIndex + index]}
              </Text>
            </VStack>
          </HStack>
        ))}
      </Stack>
    );
  };

  return (
    <>
      <Flex>
        <Box bg="#F5F5F5" width={'100%'} height={'100%'}>
          <Box marginLeft={'1%'} marginRight={'3%'} marginTop={'5%'} marginBottom={'5%'}>
            <Spacer margin={'2%'}>
              <Text fontSize="2xl" as="b">
                Supply Request
              </Text>
            </Spacer>

            <Card width={'81%'} variant={'outline'} margin={'2%'} marginBottom={'0%'}>
              <Box marginTop={'2%'} marginLeft={'2%'}>
                <Text fontWeight={'bold'} fontSize={'18px'}>
                  Select Supplies Needed
                </Text>
              </Box>

              <Box
                p={4}
                display="flex"
                mt="0"
                alignItems="top"
                border="20%"
                marginLeft={'3%'}
                borderColor="gray.200"
                borderRightRadius="1"
              >
                <Flex mt="4">
                  <Stack flex="1" spacing="4">
                    {showSupplyRequests(0, 4)}
                  </Stack>
                  <Stack flex="1" spacing="4">
                    {showSupplyRequests(4, 8)}
                  </Stack>
                </Flex>
              </Box>
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
