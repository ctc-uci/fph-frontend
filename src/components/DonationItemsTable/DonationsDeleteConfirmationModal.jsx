import { useRef } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

function DonationsDeleteConfirmationModal({ isOpen, onClose, loadInfo, selectedItem }) {
  const { backend } = useBackend();
  const cancelRef = useRef();

  const handleDelete = async () => {
    await backend.delete(`/value/${selectedItem.item_id}`);
    loadInfo();
    onClose();
    selectedItem = null;
  };

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You cannot undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => {onClose(); selectedItem = null;}}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

DonationsDeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
  loadInfo: PropTypes.func.isRequired,
};

export default DonationsDeleteConfirmationModal;
