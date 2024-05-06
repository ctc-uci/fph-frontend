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

function DeleteAdminModal({ isOpen, onClose, loadInfo, selectedItem, toast }) {
  const { backend } = useBackend();
  const cancelRef = useRef();

  const handleDelete = async () => {
    try {
      await backend.delete(`/adminUser/${selectedItem.email}`);
      toast({
        title: 'Success',
        description: 'Successfully deleted admin.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Your changes were not saved.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
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

            <AlertDialogBody>Are you sure? You cannot undo this action afterwards.</AlertDialogBody>

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

DeleteAdminModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
  loadInfo: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};

export { DeleteAdminModal };
