import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  Image,
  Button,
} from '@chakra-ui/react';
import logo from '../../../public/fph_logo_no_bg.png';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => unknown;
  onCancel: () => unknown;
}

export const ConfirmationDialog = ({ isOpen, onClose, onCancel }: ConfirmationDialogProps) => {
  return (
    <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Stack align="center">
          <ModalHeader mt="25">
            <Image src={logo} boxSize="200px" alt="fph Logo" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack align="center">
              <Text fontSize="3xl" fontWeight="semibold" color="teal">
                Supply Request Sent!
              </Text>
              <Text>Your supplies will be shipped in 5-7 business days.</Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCancel}>
              Back to Home
            </Button>
          </ModalFooter>
        </Stack>
      </ModalContent>
    </Modal>
  );
};
