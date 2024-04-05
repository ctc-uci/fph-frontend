import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import DonationsModal from './DonationsModal.jsx';
import classes from './DonationItemsTable.module.css';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Box,
  IconButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon, DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const DonationItemsTable = () => {
  return (
    <div className={classes.container}>
      <div className={classes.ditTitleContainer}>
        <Text>Donation Items</Text>
      </div>
      <Tabs>
        <div className={classes.tabs}>
          <Tabs isFitted="true">
            <TabList>
              <Tab>All</Tab>
              <Tab>Food</Tab>
              <Tab>Misc.</Tab>
            </TabList>
          </Tabs>
        </div>
        <TabPanels>
          <TabPanel>
            <DonationItems category="all" />
          </TabPanel>
          <TabPanel>
            <DonationItems category="Food" />
          </TabPanel>
          <TabPanel>
            <DonationItems category="Misc." />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

const DonationItems = ({ category }) => {
  const [data, setData] = useState([]);
  const { backend } = useBackend();
  const [currentItemNum, setCurrentItemNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const TABLE_HEADERS = ['Id', 'Name', 'Quantity Type', 'Price', 'Category'];

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

    const itemsNumResponse = await backend.get(`/value/totalValues?category=${category}`);
    setCurrentItemNum(itemsNumResponse.data[0]['count']);
    setPageLimit(Math.ceil(itemsNumResponse.data[0]['count'] / 10));
  };

  const deleteItem = async item => {
    await backend.delete(`/value/${item['item_id']}`);
    loadInfo();
  };

  return (
    <>
      <DonationsModal
        isOpen={isOpen}
        onClose={onClose}
        data={selectedItem}
        setCurrentPageNum={setCurrentPageNum}
        loadInfo={loadInfo}
      />
      <div className={classes.addItemContainer}>
        <Button colorScheme="teal" onClick={onOpen}>
          Add Item
          <AddIcon />
        </Button>
      </div>
      <Table variant="striped" className={classes.table} colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            {TABLE_HEADERS.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index} className={classes.tableRows}>
              {Object.keys(item).map(key => (
                <Td key={key}>
                  {typeof item[key] === 'boolean' ? (item[key] ? 'True' : 'False') : item[key]}
                </Td>
              ))}
              <Td>
                <Button
                  sx={{ backgroundColor: 'transparent' }}
                  onClick={() => {
                    onOpen();
                    setSelectedItem(item);
                  }}
                >
                  <EditIcon />
                </Button>
                <Button
                  sx={{ backgroundColor: 'transparent' }}
                  onClick={() => {
                    deleteItem(item);
                  }}
                >
                  <DeleteIcon color="red" />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
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
    </>
  );
};

DonationItems.propTypes = {
  category: PropTypes.string.isRequired,
};

export default DonationItemsTable;
