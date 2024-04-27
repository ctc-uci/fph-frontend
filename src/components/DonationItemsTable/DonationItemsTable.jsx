import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import DonationsModal from './DonationsModal.jsx';
import DonationsDeleteConfirmationModal from './DonationsDeleteConfirmationModal.jsx';
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  Tab,
  Box,
  IconButton,
  Button,
  Heading,
  useDisclosure,
  Flex,
  Text
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon, DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import classes from './DonationItemsTable.module.css';

const DonationItemsTable = () => {
  const [data, setData] = useState([]);
  const { backend } = useBackend();
  const [currentItemNum, setCurrentItemNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [category, setCategory] = useState('all');
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

  const TABLE_HEADERS = ['Category', 'Type', 'Weight Type', 'Price', ''];
  const keys = ['category', 'item_name', 'quantity_type', 'price']

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

  const updateCategory = index => {
    switch (index) {
      case 0:
        setCategory('all');
        break;
      case 1:
        setCategory('Food');
        break;
      case 2:
        setCategory('Misc.');
        break;
      default:
        setCategory('all');
        break;
    }
  }

  const openDeleteModal = async item => {
    setSelectedItem(item);
    deleteModalOnOpen();
  };
  return (
    <div className={classes.container}>
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
      />
      <Flex justifyContent={'space-between'}>
        <Heading size='md' fontFamily='Inter'>
          Donation Items
        </Heading>
      </Flex>
      
      <Tabs marginBottom={'3%'} colorScheme="teal" onChange={(index) => updateCategory(index)}>
          <Flex flexFlow={'row'} justifyContent={'space-between'} marginBottom={4} >
            <TabList display="inline-flex">
              <Tab>All</Tab>
              <Tab>Food</Tab>
              <Tab>Misc.</Tab>
            </TabList>
            <Button colorScheme="teal" onClick={donationsModalOnOpen} w={32}>
              <Flex justifyContent={'space-between'}>
                <AddIcon />
                <Text>Add Item</Text>
              </Flex>
            </Button>
          </Flex>  
          <TableContainer bg={'#FFFFFF'} borderRadius={12} border={'1px solid #E2E8F0'} w={'100%'}>
            <Table variant="simple" margin={'auto'} width={'98%'} marginTop={4} marginBottom={4}>
                <Thead>
                  <Tr>
                    {TABLE_HEADERS.map((header, index) => (
                      <Th key={index}>{header}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((item, row_index) => (
                    <Tr key={row_index} className={classes.tableRows}>
                      {keys.map((key, col_index) => (
                        <Td key={col_index} >{item[key]}</Td>
                      ))}
                      <Td>
                        <Flex justifyContent={'flex-end'}>
                          <Button
                            sx={{ backgroundColor: 'transparent' }}
                            onClick={() => {
                              donationsModalOnOpen();
                              setSelectedItem(item);
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
                            <DeleteIcon color="red" />
                          </Button>
                        </Flex>
                        
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
            variant={'ghost'}
          />
          <IconButton
            aria-label="Next button"
            isDisabled={currentPageNum >= pageLimit}
            icon={<ChevronRightIcon />}
            onClick={() => setCurrentPageNum(currentPageNum + 1)}
            variant={'ghost'}
          />
        </div>
      
    </Tabs>
    </div>
  );
};

export default DonationItemsTable;
