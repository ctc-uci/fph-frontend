import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import PropTypes from 'prop-types';
import {
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
  IconButton,
  Input,
  Flex,
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalFooter,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

// TODO: Refactor states such that its a nested state
const AdminModal = ({ isOpen, onClose, data, loadInfo }) => {
  const { backend } = useBackend();
  const [alertVisible, setAlertVisible] = useState(false);
  const [nameData, setNameData] = useState('');
  const [emailData, setEmailData] = useState('');
  const [lastUpdatedData, setLastUpdatedData] = useState(new Date().toISOString());

  useEffect(() => {
    const getData = async () => {
      try {
        if (isOpen && data) {
          setNameData(data['name']);
          setEmailData(data['email']);
          setLastUpdatedData(data['last_updated']);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [isOpen]);

  const closeAndReset = () => {
    setNameData('');
    setEmailData('');
    setLastUpdatedData(new Date().toISOString());
    setAlertVisible(false);
    onClose();
    loadInfo();
  };

  const submitForm = async event => {
    event.preventDefault();
    const body = {
      name: nameData,
      email: emailData,
      last_updated: lastUpdatedData,
    };
    console.log(nameData);
    console.log(emailData);
    console.log(lastUpdatedData);

    if (nameData == '' || emailData == '' || lastUpdatedData == '') {
      setAlertVisible(true);
      return;
    } else {
      if (data == null) {
        console.log('add');
        await backend.post(`/adminUser`, body);
      } else {
        console.log('edit');
        await backend.put(`/adminUser/${data['email']}`, body);
      }
    }
    closeAndReset();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeAndReset}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justifyContent="space-between">
            {data ? 'Edit Admin' : 'Add Admin'}
            <IconButton aria-label="Close" icon={<CloseIcon />} onClick={closeAndReset} />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Text> Name </Text>
          <Input
            type="text"
            name="name"
            value={nameData}
            onChange={e => setNameData(e.target.value)}
          />
          <Text> Email </Text>
          <Input
            type="text"
            name="email"
            value={emailData}
            onChange={e => setEmailData(e.target.value)}
          />
        </ModalBody>
        {alertVisible && (
          <Alert>
            <AlertTitle>Missing necessary data!</AlertTitle>
            <AlertDescription>Please make sure all textboxes are filed out</AlertDescription>
          </Alert>
        )}
        <ModalFooter>
          <Button mr={3} onClick={closeAndReset}>
            Cancel
          </Button>
          <Button colorScheme="teal" mr={3} onClick={e => submitForm(e)}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

AdminModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  setData: PropTypes.func,
  setCurrentPageNum: PropTypes.func,
  loadInfo: PropTypes.func,
};

export { AdminModal };
