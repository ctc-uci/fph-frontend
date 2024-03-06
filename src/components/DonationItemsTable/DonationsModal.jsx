import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import PropTypes from 'prop-types';
import {
  Input,
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  IconButton,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

// TODO: Refactor states such that its a nested state
const DonationsModal = ({ isOpen, onClose, data, setCurrentPageNum, loadInfo }) => {
  const { backend } = useBackend();
  const [categoryData, setCategoryData] = useState('');
  const [typeData, setTypeData] = useState('');
  const [weightData, setWeightData] = useState('');
  const [priceData, setPriceData] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        if (isOpen && data) {
          setCategoryData(data['category']);
          setTypeData(data['item_name']);
          setWeightData(data['quantity_type']);
          setPriceData(data['price']);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [isOpen]);

  const closeAndReset = () => {
    setTypeData('');
    setWeightData('');
    setPriceData('');
    setCategoryData('');
    setAlertVisible(false);
    onClose();
    setCurrentPageNum(1);
    loadInfo();
  };

  const submitForm = async event => {
    event.preventDefault();

    const body = {
      itemName: typeData,
      quantityType: weightData,
      price: priceData,
      category: categoryData,
    };

    if (typeData == '' || weightData == '' || priceData == '' || categoryData == '') {
      setAlertVisible(true);
      return;
    } else {
      if (data == null) {
        await backend.post(`/value`, body);
      } else {
        await backend.put(`/value/${data['item_id']}`, body);
      }
      closeAndReset();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'md'}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            {data ? 'Edit Item' : 'Add Item'}
            <IconButton aria-label="Close" icon={<CloseIcon />} onClick={onClose} />
          </ModalHeader>
          <ModalBody>
            <Text>Category</Text>
            <Input
              id="category"
              value={categoryData}
              placeholder="Category"
              size="lg"
              name="reporter"
              onChange={e => setCategoryData(e.target.value)}
            />
            <Text>Type</Text>
            <Input
              id="type"
              value={typeData}
              placeholder="Type"
              size="lg"
              name="reporter"
              onChange={e => setTypeData(e.target.value)}
            />
            <Text>Weight</Text>
            <Input
              id="weight"
              value={weightData}
              placeholder="pound (lb)"
              size="lg"
              name="reporter"
              onChange={e => setWeightData(e.target.value)}
            />
            <Text>Price</Text>
            <Input
              id="price"
              value={priceData}
              placeholder="0.00"
              size="lg"
              name="reporter"
              onChange={e => setPriceData(e.target.value)}
            />
          </ModalBody>
          {alertVisible && (
            <Alert>
              <AlertTitle>Missing necessary data!</AlertTitle>
              <AlertDescription>Please make sure all textboxes are filed out</AlertDescription>
            </Alert>
          )}
          <ModalFooter justifyContent="flex-end">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={event => {
                submitForm(event);
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

DonationsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  setData: PropTypes.func,
  setCurrentPageNum: PropTypes.func,
  loadInfo: PropTypes.func,
};

export default DonationsModal;
