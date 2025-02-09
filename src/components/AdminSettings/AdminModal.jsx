import { useEffect, useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { renderEmail } from 'react-html-email';

import { useBackend } from '../../contexts/BackendContext';
import {
  approvedEmailTemplateAdmin,
  editedEmailTemplateAdmin,
} from './AdminSettingsEmailTemplates';

// TODO: Refactor states such that its a nested state
const AdminModal = ({ isOpen, onClose, data, loadInfo, toast }) => {
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
  }, [data, isOpen]);

  const closeAndReset = () => {
    setNameData('');
    setEmailData('');
    setLastUpdatedData(new Date().toISOString());
    setAlertVisible(false);
    onClose();
    loadInfo();
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const body = {
      name: nameData,
      email: emailData,
      last_updated: lastUpdatedData,
    };

    if (nameData == '' || emailData == '' || lastUpdatedData == '') {
      setAlertVisible(true);
      return;
    } else {
      try {
        const emailSubject =
          data == null ? `FPH Has Added You As A User` : `FPH Has Edited Your Account`;
        const emailInfo = {
          email: emailData,
          messageHtml: renderEmail(
            data == null ? approvedEmailTemplateAdmin : editedEmailTemplateAdmin,
          ),
          subject: emailSubject,
        };

        if (data == null) {
          await backend.post(`/adminUser`, body);
          toast({
            title: 'Success',
            description: 'Admin added successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        } else {
          await backend.put(`/adminUser/${data['email']}`, body);
          toast({
            title: 'Success',
            description: 'Successfully updated information.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }

        await backend.post('/email/send', emailInfo);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Your changes were not saved.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }

    closeAndReset();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeAndReset} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex justifyContent="space-between">
            {data ? 'Edit Admin' : 'Add Admin'}

            <IconButton
              variant={'ghost'}
              aria-label="Close"
              icon={<CloseIcon />}
              onClick={closeAndReset}
            />
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Text> First and Last Name </Text>
              <Input
                type="text"
                name="name"
                value={nameData}
                onChange={(e) => setNameData(e.target.value)}
              />
            </Stack>
            <Stack spacing={1}>
              <Text> Email </Text>
              <Input
                type="text"
                name="email"
                value={emailData}
                onChange={(e) => setEmailData(e.target.value)}
              />
            </Stack>
          </Stack>

          {alertVisible && (
            <Alert mt={4}>
              <AlertIcon />
              <Stack spacing={0}>
                <AlertTitle>Missing necessary data!</AlertTitle>
                <AlertDescription>Please make sure all textboxes are filed out</AlertDescription>
              </Stack>
            </Alert>
          )}
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            <Button onClick={closeAndReset}>Cancel</Button>
            <Button colorScheme="teal" onClick={(e) => submitForm(e)}>
              Submit
            </Button>
          </HStack>
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
  toast: PropTypes.func.isRequired,
};

export { AdminModal };
