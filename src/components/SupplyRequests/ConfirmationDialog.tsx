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
            <Button colorScheme="blue" mr={3} onClick={onCancel}>
              Back to Home
            </Button>
          </ModalFooter>
        </Stack>
      </ModalContent>
    </Modal>
  );
};
