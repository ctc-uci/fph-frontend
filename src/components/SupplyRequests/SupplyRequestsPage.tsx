import { useBackend } from '../../contexts/BackendContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
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
  SimpleGrid,
} from '@chakra-ui/react';

import { ConfirmationDialog } from './ConfirmationDialog';
import { SupplyRequests } from './SupplyRequests';

export const SupplyRequestsPage = () => {
  const { backend } = useBackend();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const FPH_ID = 0;

  const [text, setText] = useState('');
  const [checkedItems, setCheckedItems] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

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
        const fetchedBusinessName = businessNameResponse.data[0].name;
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
    };
    await backend.post('/notification/', updatedFormData);
    await backend.post('/notification/', confirmationNotification);
    await backend.put(`/business/${businessId}`, { supply_request_status: 'Pending' });
    setShowConfirmation(true);
  };

  const isFormFilled = () => {
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

  const handleNumInputChange = (index: number, value: string) => {
    checkedItems[index] = Number(value) ?? 0;
    setCheckedItems(checkedItems);
    setIsFormValid(isFormFilled());
  };

  return (
    <>
      <Flex>
        <Box>
          <Text fontSize="2xl" as="b">
            Supply Request
          </Text>

          <Card variant={'outline'}>
            <Box>
              <Text fontWeight={'bold'} fontSize={'18px'}>
                Select Supplies Needed
              </Text>
            </Box>

            <Box
              p={4}
              display="flex"
              mt="0"
              alignItems="top"
              borderColor="gray.200"
              borderRightRadius="1"
            >
              <SupplyRequests handleChange={handleNumInputChange} />
            </Box>
            <Box>
              <Textarea
                h={'150px'}
                value={text}
                placeholder="Notes..."
                onChange={textInputHandler}
              />
            </Box>
            <HStack justify="flex-end">
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
          </Card>

          <ConfirmationDialog
            isOpen={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            onCancel={handleCancelButtonClick}
          />
        </Box>
      </Flex>
    </>
  );
};
