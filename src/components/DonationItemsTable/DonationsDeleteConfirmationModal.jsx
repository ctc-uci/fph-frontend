import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { useBackend } from '../../contexts/BackendContext';

function DonationsDeleteConfirmationModal({ isOpen, onClose, loadInfo, selectedItem }) {
  const { backend } = useBackend();
  const cancelRef = useRef();

  const handleDelete = async () => {
    await backend.delete(`/value/${selectedItem.item_id}`);
    loadInfo();
    onClose();
  };

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure you would like to delete this item?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
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
