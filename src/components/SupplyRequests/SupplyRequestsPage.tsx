import { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';
import { pageStyle, pageTitleStyle } from '../../styles/sharedStyles';
import { SupplyRequests } from './SupplyRequests';

export const SupplyRequestsPage = () => {
  const { backend } = useBackend();
  const { currentUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const confirmationDisclosure = useDisclosure();

  const FPH_ID = 0;

  const [text, setText] = useState('');
  const [checkedItems, setCheckedItems] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [isFormValid, setIsFormValid] = useState(false);

  const [businessId, setBusinessId] = useState(null);
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
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
  }, [backend, currentUser.uid]);

  const handleSubmit = async () => {
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

    try {
      await Promise.all([
        backend.post('/notification/', updatedFormData),
        backend.post('/notification/', confirmationNotification),
        backend.put(`/business/${businessId}`, { supply_request_status: 'Pending' }),
      ]);

      confirmationDisclosure.onOpen();

      toast({
        title: 'Supply Request Sent!',
        description: 'Your supplies will be shipped in 5-7 business days.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/BusinessDashboard');
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const isFormFilled = (newText?: string) => {
    return checkedItems.some((value) => value !== 0) || (newText ?? text).length > 0;
  };

  const handleTextInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setIsFormValid(isFormFilled(newText));
  };

  const handleCancelButtonClick = () => {
    setCheckedItems([0, 0, 0, 0, 0, 0, 0, 0]);
    setText('');
  };

  const handleNumInputChange = (index: number, value: string) => {
    checkedItems[index] = Number(value) ?? 0;
    setCheckedItems(checkedItems);
    setIsFormValid(isFormFilled());
  };

  return (
    <Flex sx={pageStyle}>
      <Heading sx={pageTitleStyle}>Supply Request</Heading>

      <Card
        variant={'outline'}
        sx={{ padding: 4, gap: 4, overflowY: 'scroll', maxHeight: 'calc(100vh - 150px)' }}
      >
        <SupplyRequests handleChange={handleNumInputChange} />
        <Textarea
          sx={{ height: 150, marginTop: 4 }}
          value={text}
          placeholder="Notes..."
          onChange={handleTextInputChange}
        />
        <HStack justify="flex-end">
          <Button variant="ghost" onClick={handleCancelButtonClick}>
            Cancel
          </Button>
          <Button
            isDisabled={!isFormValid}
            colorScheme={isFormValid ? 'teal' : undefined}
            onClick={handleSubmit}
          >
            Send Request
          </Button>
        </HStack>
      </Card>
    </Flex>
  );
};
