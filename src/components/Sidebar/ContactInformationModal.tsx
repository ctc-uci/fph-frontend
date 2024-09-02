import {
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BiBuildingHouse, BiEnvelope, BiPhone } from 'react-icons/bi';

interface ContactInformationModalProps {
  isOpen: boolean;
  onClose: () => unknown;
}

export const ContactInformationModal = ({ isOpen, onClose }: ContactInformationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Contact Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems={'flex-start'} gap={0}>
            <Flex alignItems="center" gap={2}>
              <Icon as={BiBuildingHouse} color={'#359797'} />
              <Text fontWeight={'semibold'}>Address</Text>
            </Flex>
            <Text>710 W Washington St, Carson City, NV 89703</Text>
          </VStack>

          <Spacer height="4" />

          <VStack alignItems={'flex-start'} gap={0}>
            <Flex alignItems="center" gap={2}>
              <Icon as={BiPhone} color={'#359797'} />
              <Text fontWeight={'semibold'}>Phone Number</Text>
            </Flex>
            <Text>(775) 841-7463</Text>
          </VStack>

          <Spacer height="4" />

          <VStack alignItems={'flex-start'} gap={0}>
            <Flex alignItems="center" gap={2}>
              <Icon as={BiEnvelope} color={'#359797'} />
              <Text fontWeight={'semibold'}>Email</Text>
            </Flex>
            <Text>info@petsofthehomeless.org</Text>
          </VStack>
          <br />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
