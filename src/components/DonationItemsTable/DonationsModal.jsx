import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import PropTypes from 'prop-types';
import { Input, Text, Modal, ModalContent, ModalHeader, ModalBody, ModalOverlay, ModalFooter, IconButton, Button} from '@chakra-ui/react';
import {CloseIcon} from '@chakra-ui/icons';

const DonationsModal = ({ isOpen, onClose, data, setData, currentPageNum }) => {
  const { backend } = useBackend();
  const [categoryData, setCategoryData] = useState('');
  const [typeData, setTypeData] = useState('');
  const [weightData, setWeightData] = useState('');
  const [priceData, setPriceData] = useState('');

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

  const submitForm = async event => {
    event.preventDefault();
    if (!data){
      await backend.post(`/value`, {
        'itemName': typeData,
        'quantityType': weightData,
        'price': priceData,
        'category': categoryData,
      });
    } else{
      await backend.put(`/value/${data["item_id"]}`, {
        'itemName': typeData,
        'quantityType': weightData,
        'price': priceData,
        'category': categoryData,
      });
    }
    const dataResponse = backend.get(
      `/value/?itemsLimit=10&pageNum=${currentPageNum}`,
    );
    setData(dataResponse.data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            {data ? 'Edit Item' : 'Add Item'}
            <IconButton aria-label="Close" icon ={<CloseIcon/>} onClick={onClose}/>
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
          <ModalFooter justifyContent="flex-end">
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={(event) => {submitForm(event); onClose();}}>Save</Button>
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
  currentPageNum: PropTypes.int
};

export default DonationsModal;
