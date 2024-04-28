/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import { AdminModal } from './AdminModal.jsx';
import { DeleteAdminModal } from './DeleteAdminModal.jsx';
import {
  // Box,
  Flex,
  // IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import { EditIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import classes from './AdminSettings.module.css';

const AdminsTable = () => {
  const { backend } = useBackend();
  const [data, setData] = useState([]);
  // const [editEmail, setEditEmail] = useState('');
  // const [searchTerm, setSearchTerm] = useState('');
  // const [currentItemNum, setCurrentItemNum] = useState(0);
  // const [currentPageNum, setCurrentPageNum] = useState(1);
  // const [pageLimit, setPageLimit] = useState(1);
  // FOR SELECTED ADMIN ON EDIT, HOW TO GET UNIQUE IDENTIFIER???
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

  useEffect(() => {
    getAdminData();
  }, []);

  const getAdminData = async () => {
    try {
      const adminDataResponse = await backend.get('/adminUser/paginate');
      setData(adminDataResponse.data);

      // WHEN ADDING PAGINATION, USE THIS TO REPLACE CODE ABOVE
      // const formResponse = await backend.get(
      //   `/adminUser/paginate?itemsLimit=10&pageNum=${currentPageNum}`,
      // );
      // setAdminData(formResponse.data);
    } catch (error) {
      console.log(error.message);
    }

    // const itemsNumResponse = await backend.get(`/adminUser/totalValues`);
    // setCurrentItemNum(itemsNumResponse.data[0]['count']);
    // setPageLimit(Math.ceil(itemsNumResponse.data[0]['count'] / 10));
  };

  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleSearch = event => {
    console.log(event);
    // setSearchTerm(event.target.value.split(' ').join('+'));
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
        <Button
          colorScheme="teal"
          onClick={adminModalOnOpen}>
          <AddIcon />
          Add Admin
        </Button>
      </div>

      <div className={classes.roundedTable}>
        <DeleteAdminModal
          isOpen={deleteModalIsOpen}
          onClose={() => {deleteModalOnClose(); setSelectedAdmin(null);}}
          loadInfo={getAdminData}
          selectedItem={selectedAdmin}
        />
        <AdminModal
          isOpen={adminModalIsOpen}
          onClose={() => {adminModalOnClose(); setSelectedAdmin(null);}}
          data={selectedAdmin}
          loadInfo={getAdminData}
        />
        <TableContainer>
          <Table style={{ borderCollapse: 'collapse' }}>
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
      </div>

      {/* <div className={classes.resultNavigation}>
        <Box>
          {(currentPageNum - 1) * 10 + 1} to {Math.min(currentPageNum * 10, currentItemNum)} of{' '}
          {currentItemNum}
        </Box>
        <IconButton
          aria-label="Back button"
          isDisabled={currentPageNum <= 1}
          icon={<ChevronLeftIcon />}
          onClick={() => setCurrentPageNum(currentPageNum - 1)}
        />
        <IconButton
          aria-label="Next button"
          isDisabled={currentPageNum >= pageLimit}
          icon={<ChevronRightIcon />}
          onClick={() => setCurrentPageNum(currentPageNum + 1)}
        />
      </div> */}
    </>
  );
};

export default AdminsTable;
