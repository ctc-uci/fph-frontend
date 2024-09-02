import { useEffect, useState } from 'react';
import { AddIcon, ChevronLeftIcon, ChevronRightIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';

import { useBackend } from '../../contexts/BackendContext';
import { pageStyle, pageTitleStyle } from '../../styles/sharedStyles';
import { Donation } from '../../types/donation';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer';
import DonationsDeleteConfirmationModal from './DonationsDeleteConfirmationModal';
import { DonationsModal } from './DonationsModal';

export const DonationItemsTable = () => {
  const [notifications, setNotifications] = useState([]);
  const { backend } = useBackend();

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await backend.get('/notification/0');
      setNotifications(response.data);
    };

    fetchNotifications();
  }, [backend]);

  return (
    <Flex sx={pageStyle}>
      <HStack sx={{ width: 'full', justifyContent: 'space-between' }}>
        <Heading sx={pageTitleStyle}>Donation Items</Heading>
        <NotificationsDrawer notificationsData={notifications} />
      </HStack>

      <Tabs isFitted={true} colorScheme="teal">
        <TabList width={'fit-content'} mb={-10}>
          <Tab>All</Tab>
          <Tab>Food</Tab>
          <Tab>Misc.</Tab>
        </TabList>

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
    </Flex>
  );
};

const DonationItems = ({ category }: { category: string }) => {
  const [data, setData] = useState([]);
  const { backend } = useBackend();
  const [currentItemNum, setCurrentItemNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [selectedItem, setSelectedItem] = useState<Donation | null>(null);
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
    try {
      const formResponse = await backend.get(
        `/value/paginate?itemsLimit=10&pageNum=${currentPageNum}&category=${category}`,
      );
      setData(formResponse.data);

      const itemsNumResponse = await backend.get(`/value/totalValues?category=${category}`);
      setCurrentItemNum(itemsNumResponse.data[0]['count']);
      setPageLimit(Math.ceil(itemsNumResponse.data[0]['count'] / 10));
    } catch (error) {
      console.log(error.message);
    }
  };

  const openDeleteModal = async (item: Donation) => {
    setSelectedItem(item);
    deleteModalOnOpen();
  };

  const setEditModal = (isEdit: boolean) => {
    setIsEdit(isEdit);
  };

  return (
    <Flex sx={{ flexDirection: 'column', gap: 4 }}>
      <Button
        colorScheme="teal"
        onClick={() => {
          donationsModalOnOpen();
          setEditModal(false);
        }}
        sx={{ marginLeft: 'auto', marginRight: 4, gap: 2, width: 'fit-content' }}
      >
        <AddIcon boxSize={3} />
        Add Item
      </Button>

      <TableContainer sx={{ backgroundColor: 'white', borderRadius: 'lg', borderWidth: 1 }}>
        <Table style={{ borderCollapse: 'collapse' }}>
          <Thead>
            <Tr>
              {TABLE_HEADERS.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item, index) => (
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

      <HStack sx={{ justifyContent: 'flex-end' }}>
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
      </HStack>

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
    </Flex>
  );
};
