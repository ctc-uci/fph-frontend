import { useEffect, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';

import { useBackend } from '../../contexts/BackendContext';

// TODO: Refactor states such that its a nested state
export const DonationsModal = ({ isOpen, onClose, data, setCurrentPageNum, loadInfo, isEdit }) => {
  const { backend } = useBackend();
  const toast = useToast();
  const [categoryData, setCategoryData] = useState('Food');
  const [typeData, setTypeData] = useState('');
  const [weightData, setWeightData] = useState('lbs');
  const [priceData, setPriceData] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        if (isOpen && isEdit) {
          setCategoryData(data['category']);
          setTypeData(data['item_name']);
          setWeightData(data['quantity_type']);
          setPriceData(data['price']);
        } else if (isOpen && !isEdit) {
          setCategoryData('Food');
          setTypeData('');
          setWeightData('lbs');
          setPriceData('');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [isOpen]);

  const closeAndReset = () => {
    onClose();
    setTypeData('');
    setWeightData('lbs');
    setPriceData('');
    setCategoryData('Food');
    setAlertVisible(false);
    setCurrentPageNum(1);
    loadInfo();
  };

  const submitForm = async (event, price) => {
    event.preventDefault();

    const cleanedValue = price.replace(/[^\d.]/g, '');
    const floatValue = parseFloat(cleanedValue);
    const floatValueString = floatValue.toFixed(2);
    setPriceData(floatValueString);

    const body = {
      itemName: typeData,
      quantityType: weightData,
      price: floatValue,
      category: categoryData,
    };

    if (typeData == '' || weightData == '' || floatValueString == '' || categoryData == '') {
      setAlertVisible(true);
      return;
    } else {
      try {
        if (isEdit) {
          await backend.put(`/value/${data['item_id']}`, body);
          toast({
            title: 'Donation Item Updated',
            description: `"${typeData}" was updated.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right',
          });
        } else {
          await backend.post(`/value`, body);
          toast({
            title: 'Donation Item Added',
            description: `"${typeData}" was added.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom-right',
          });
        }
      } catch (error) {
        console.log(error);
      }
      closeAndReset();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeAndReset}>
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton onClick={closeAndReset} />

          <ModalHeader>{isEdit ? 'Edit Item' : 'Add Item'}</ModalHeader>

          <ModalBody sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Stack>
              <Text>Type</Text>
              <Input
                id="type"
                value={typeData}
                placeholder="Type"
                size="lg"
                name="reporter"
                onChange={(e) => setTypeData(e.target.value)}
              />
            </Stack>
            <Stack>
              <Text>Price</Text>
              <Input
                id="price"
                value={priceData}
                placeholder="Price"
                size="lg"
                name="reporter"
                onChange={(e) => setPriceData(e.target.value)}
              />
            </Stack>
            <Stack>
              <Text>Category</Text>
              <Select
                id="category"
                value={categoryData}
                size="lg"
                onChange={(e) => setCategoryData(e.target.value)}
              >
                <option value="Food">Food</option>
                <option value="Misc.">Misc.</option>
              </Select>
            </Stack>
            <Stack>
              <Text>Weight Type</Text>
              <Select
                id="weight"
                value={weightData}
                size="lg"
                onChange={(e) => setWeightData(e.target.value)}
              >
                <option value="lbs">Pounds (lbs)</option>
                <option value="ea">Each (ea)</option>
              </Select>
            </Stack>
          </ModalBody>
          {alertVisible && (
            <Alert>
              <AlertTitle>Missing necessary data!</AlertTitle>
              <AlertDescription>Please make sure all textboxes are filed out</AlertDescription>
            </Alert>
          )}
          <ModalFooter justifyContent="flex-end" gap={4}>
            <Button onClick={closeAndReset}>Cancel</Button>
            <Button
              onClick={(event) => {
                submitForm(event, priceData);
              }}
              colorScheme="teal"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
