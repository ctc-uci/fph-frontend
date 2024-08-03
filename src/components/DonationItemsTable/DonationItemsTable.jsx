import { useEffect, useState } from 'react';
import { AddIcon, ChevronLeftIcon, ChevronRightIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  IconButton,
  Image,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import FemalePettingDog from '../../assets/FemalePettingDog.png';
import MalePettingDog from '../../assets/MalePettingDog.png';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useBackend } from '../../contexts/BackendContext';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer.jsx';
import classes from './DonationItemsTable.module.css';
import DonationsDeleteConfirmationModal from './DonationsDeleteConfirmationModal.jsx';
import DonationsModal from './DonationsModal.jsx';

const DonationItemsTable = () => {
  const { isAdmin } = useAuth();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [notification, setNotification] = useState([]);
  const { backend } = useBackend();
  const navigate = useNavigate();
  useEffect(() => {
    const checkIsAdmin = async () => {
      if (!(await isAdmin())) {
        navigate('/BusinessDashboard');
      } else {
        setIsAdminUser(true);
      }
    };

    const fetchNotifications = async () => {
      const response = await backend.get('/notification/0');
      setNotification(response.data);
    };
    checkIsAdmin();
    fetchNotifications();
  }, [backend]);
  return (
    <>
      {isAdminUser && (
        <div className={classes.container}>
          <div className={classes.ditTitleContainer}>
            <Text>Donation Items</Text>
            <NotificationsDrawer notificationsData={notification} />
          </div>
          <Tabs marginTop="24px" isFitted="true" colorScheme="teal">
            <div>
              <TabList w="185px" mb={-10}>
                <Tab>All</Tab>
                <Tab>Food</Tab>
                <Tab>Misc.</Tab>
              </TabList>
            </div>
            <TabPanels>
              <TabPanel padding="0">
                <DonationItems category="all" />
              </TabPanel>
              <TabPanel padding="0">
                <DonationItems category="Food" />
              </TabPanel>
              <TabPanel padding="0">
                <DonationItems category="Misc." />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      )}
    </>
  );
};

const DonationItems = ({ category }) => {
  const [data, setData] = useState([]);
  const { backend } = useBackend();
  const [currentItemNum, setCurrentItemNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const {
    isOpen: deleteModalIsOpen,
    onOpen: deleteModalOnOpen,
    onClose: deleteModalOnClose,
  } = useDisclosure();
  const {
    isOpen: donationsModalIsOpen,
    onOpen: donationsModalOnOpen,
    onClose: donationsModalOnClose,
  } = useDisclosure();

  const TABLE_HEADERS = ['Id', 'Name', 'Quantity Type', 'Price', 'Category', ''];

  useEffect(() => {
    loadInfo();
  }, [currentPageNum, category]);

  const loadInfo = async () => {
    // Loads pages
    try {
      const formResponse = await backend.get(
        `/value/paginate?itemsLimit=10&pageNum=${currentPageNum}&category=${category}`,
      );
      setData(formResponse.data);
    } catch (error) {
      console.log(error.message);
    }
    console.log(category);
    const itemsNumResponse = await backend.get(`/value/totalValues?category=${category}`);
    setCurrentItemNum(itemsNumResponse.data[0]['count']);
    setPageLimit(Math.ceil(itemsNumResponse.data[0]['count'] / 10));
  };

  const openDeleteModal = async (item) => {
    setSelectedItem(item);
    deleteModalOnOpen();
  };

  const setEditModal = (isEdit) => {
    setIsEdit(isEdit);
  };

  // const  deleteModalOnOpen();
  //   await backend.delete(`/value/${item['item_id']}`);
  //   //setDeleteModalVisible(true);
  //   loadInfo();
  // };

  return (
    <Box>
      <DonationsDeleteConfirmationModal
        isOpen={deleteModalIsOpen}
        onClose={deleteModalOnClose}
        loadInfo={loadInfo}
        selectedItem={selectedItem}
      />
      <DonationsModal
        isOpen={donationsModalIsOpen}
        onClose={donationsModalOnClose}
        data={selectedItem}
        setCurrentPageNum={setCurrentPageNum}
        loadInfo={loadInfo}
        isEdit={isEdit}
      />
      <Box className={classes.addItemContainer} mr={4}>
        <Button
          colorScheme="teal"
          onClick={() => {
            donationsModalOnOpen();
            setEditModal(false);
          }}
          gap={2}
        >
          <AddIcon boxSize={3} />
          Add Item
        </Button>
      </Box>
      <TableContainer className={classes.roundedTable}>
        <Table style={{ borderCollapse: 'collapse' }}>
          <Thead>
            <Tr>
              {TABLE_HEADERS.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                {Object.keys(item).map((key) => (
                  <Td key={key}>
                    {typeof item[key] === 'boolean' ? (item[key] ? 'True' : 'False') : item[key]}
                  </Td>
                ))}
                <Td>
                  <Button
                    sx={{ backgroundColor: 'transparent' }}
                    onClick={() => {
                      donationsModalOnOpen();
                      setSelectedItem(item);
                      setEditModal(true);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    sx={{ backgroundColor: 'transparent' }}
                    onClick={() => {
                      openDeleteModal(item);
                    }}
                  >
                    {index >= 4 ? <DeleteIcon color="red" /> : null}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <div className={classes.resultNavigation}>
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
      </div>
      <Box position="absolute" left="40%">
        {currentPageNum === pageLimit && category === 'Food' && (
          <>
            <Image src={MalePettingDog} alt="Male Image" />
            <Text ml="10" color="blackAlpha.400">
              You’ve reached the end!
            </Text>
          </>
        )}
        {currentPageNum === pageLimit && category !== 'Food' && (
          <>
            <Image src={FemalePettingDog} alt="Female Image" />
            <Text ml="4" color="blackAlpha.400">
              You’ve reached the end!
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
};

DonationItems.propTypes = {
  category: PropTypes.string.isRequired,
};

export default DonationItemsTable;
