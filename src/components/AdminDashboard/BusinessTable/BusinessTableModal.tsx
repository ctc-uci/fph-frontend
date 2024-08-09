import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';

import { CsvDropzone } from './CsvDropzone';

interface BusinessTableModalProps {
  isOpen: boolean;
  onClose: () => unknown;
}

const BusinessTableModal = ({ isOpen, onClose }: BusinessTableModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Upload existing data</ModalHeader>

        <ModalBody>
          <Stack spacing={2}>
            <Text>Transfer all business information into your new portal.</Text>
            <CsvDropzone onClose={onClose} />
          </Stack>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default BusinessTableModal;
