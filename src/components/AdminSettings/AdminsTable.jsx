/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

const AdminsTable = () => {
  const { backend } = useBackend();

  const [adminData, setAdminData] = useState([]);
  const [newAdminData, setNewAdminData] = useState({
    name: '',
    email: '',
    last_updated: new Date().toISOString(),
  });
  const [editEmail, setEditEmail] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;
    setNewAdminData(prevState => ({ ...prevState, [name]: value }));
  };

  const getAdminData = async () => {
    try {
      const adminDataResponse = await backend.get('/adminUser/');
      setAdminData(adminDataResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createAdmin = async () => {
    try {
      await backend.post('/adminUser/', newAdminData);

      // Clean slates
      setNewAdminData({
        name: '',
        email: '',
        last_updated: new Date().toISOString(),
      });
      getAdminData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const editAdmin = async () => {
    try {
      await backend.put(`/adminUser/${editEmail}`, newAdminData);

      // Clean slates
      setNewAdminData({
        name: '',
        email: '',
        last_updated: new Date().toISOString(),
      });
      setEditEmail('');
      getAdminData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteAdmin = async email => {
    try {
      await backend.delete(`/adminUser/${email}`);
      getAdminData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const displayAdminTable = () => {
    return adminData.map((admin, index) => (
      <Tr key={index}>
        <Td>{admin.name}</Td>
        <Td>{admin.email}</Td>
        <Td isNumeric>{admin.last_updated}</Td>
        <Flex>
          <Button
            sx={{ backgroundColor: 'transparent' }}
            onClick={() => {
              setNewAdminData({
                name: admin.name,
                email: admin.email,
                last_updated: new Date().toISOString(),
              });
              setEditEmail(admin.email);
              onOpen();
            }}
          >
            <EditIcon />
          </Button>
          <Button
            sx={{ backgroundColor: 'transparent' }}
            onClick={() => {
              deleteAdmin(admin.email);
            }}
          >
            <DeleteIcon color="red" />
          </Button>
        </Flex>
      </Tr>
    ));
  };

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <>
      <Button
        colorScheme="teal"
        size="xs"
        onClick={() => {
          editEmail('');
          onOpen();
        }}
      >
        Add Admin
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> Name </Text>
            <Input type="text" name="name" value={newAdminData.name} onChange={handleChange} />
            <Text> Email </Text>
            <Input type="text" name="email" value={newAdminData.email} onChange={handleChange} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3} onClick={editEmail ? editAdmin : createAdmin}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Last Updated</Th>
            </Tr>
          </Thead>
          <Tbody>{displayAdminTable()}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminsTable;
