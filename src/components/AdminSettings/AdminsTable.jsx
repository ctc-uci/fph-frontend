/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import { AdminModal } from './AdminModal.jsx';
import { DeleteAdminModal } from './DeleteAdminModal.jsx';
import {
  Box,
  Flex,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  Input,
  useToast,
} from '@chakra-ui/react';
import { EditIcon, AddIcon, DeleteIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import classes from './AdminSettings.module.css';

const AdminsTable = () => {
  const { backend } = useBackend();
  const [data, setData] = useState([]);
  // const [editEmail, setEditEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentItemNum, setCurrentItemNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const {
    isOpen: adminModalIsOpen,
    onOpen: adminModalOnOpen,
    onClose: adminModalOnClose,
  } = useDisclosure();
  const {
    isOpen: deleteModalIsOpen,
    onOpen: deleteModalOnOpen,
    onClose: deleteModalOnClose,
  } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    getAdminData();
  }, [currentPageNum, searchTerm]);

  const getAdminData = async () => {
    try {
      const adminDataResponse = await backend.get(
        `/adminUser/paginate?itemsLimit=10&pageNum=${currentPageNum}&searchTerm=${searchTerm}`,
      );
      setData(adminDataResponse.data);
    } catch (error) {
      console.log(error.message);
    }

    const itemsNumResponse = await backend.get(`/adminUser/totalValues?searchTerm=${searchTerm}`);
    setCurrentItemNum(itemsNumResponse.data[0]['count']);
    setPageLimit(Math.ceil(itemsNumResponse.data[0]['count'] / 10));
  };

  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value.split(' ').join('+'));
    setCurrentPageNum(1);
  };

  const openDeleteModal = async admin => {
    setSelectedAdmin(admin);
    deleteModalOnOpen();
  };

  const displayAdminTable = () => {
    return data.map((admin, index) => (
      <Tr style={{ borderTop: '1px solid #EDF2F7' }} key={index}>
        <Td>{admin.name}</Td>
        <Td>{admin.email}</Td>
        <Td>{formatDate(admin.last_updated)}</Td>
        <Td>
          <Flex>
            <Button
              sx={{ backgroundColor: 'transparent' }}
              onClick={() => {
                adminModalOnOpen();
                setSelectedAdmin(admin);
              }}
            >
              <EditIcon />
            </Button>
            <Button
              sx={{ backgroundColor: 'transparent' }}
              onClick={() => {
                openDeleteModal(admin);
              }}
            >
              <DeleteIcon color="red" />
            </Button>
          </Flex>
        </Td>
      </Tr>
    ));
  };

  return (
    <>
      <div className={classes.addAdminContainer}>
        <Input
          placeholder="Search"
          onChange={handleSearch}
          sx={{ width: '222px', backgroundColor: '#FFFFFF' }}
        />
        <Button colorScheme="teal" onClick={() => adminModalOnOpen()}>
          <AddIcon />
          Add Admin
        </Button>
      </div>

      <div className={classes.roundedTable}>
        <DeleteAdminModal
          isOpen={deleteModalIsOpen}
          onClose={() => {
            deleteModalOnClose();
            setSelectedAdmin(null);
          }}
          loadInfo={getAdminData}
          selectedItem={selectedAdmin}
          toast={toast}
        />
        <AdminModal
          isOpen={adminModalIsOpen}
          onClose={() => {
            adminModalOnClose();
            setSelectedAdmin(null);
          }}
          data={selectedAdmin}
          loadInfo={getAdminData}
          toast={toast}
        />
        <TableContainer>
          <Table style={{ borderCollapse: 'collapse' }}>
            <Thead>
              <Tr>
                <Th width='29%'>Name</Th>
                <Th width='29%'>Email</Th>
                <Th width='29%'>Last Updated</Th>
                <Th width='13%'></Th>
              </Tr>
            </Thead>
            <Tbody>{displayAdminTable()}</Tbody>
          </Table>
        </TableContainer>
      </div>

      <div className={classes.resultNavigation}>
        <Box>
          {(currentPageNum - 1) * 10 + 1} to {Math.min(currentPageNum * 10, currentItemNum)} of{' '}
          {currentItemNum}
        </Box>
        <IconButton
          aria-label="Back button"
          isDisabled={currentPageNum <= 1}
          icon={<ChevronLeftIcon />}
          variant='ghost'
          onClick={() => setCurrentPageNum(currentPageNum - 1)}
        />
        <IconButton
          aria-label="Next button"
          isDisabled={currentPageNum >= pageLimit}
          icon={<ChevronRightIcon />}
          variant='ghost'
          onClick={() => setCurrentPageNum(currentPageNum + 1)}
        />
      </div>
    </>
  );
};

export default AdminsTable;
