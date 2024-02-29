/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Button,
  Th,
  Box,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon, Search2Icon } from '@chakra-ui/icons';
import ViewDonationHistory from './ViewDonationHistory/ViewDonationHistory';

const BusinessDonationHistory = () => {
  const { backend } = useBackend();
  const [data, setData] = useState([]);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const TABLE_HEADERS = ['Submitted By', 'Food Bank', 'Date', 'Action'];

  // for pagination
  const [currentTotalDonationNum, setCurrentTotalDonationNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);

  // for search
  const [searchInput, setSearchInput] = useState('');

  // TEMPORARY DISABLE LINE SO THAT IN THE FUTURE IF YOU WANT TO ADD
  // A DROP DOWN TO CHANGE PAGINATION NUMBER JUST USE THE SET FUNCTION
  // AND REMOVE THE COMMENT
  // eslint-disable-next-line no-unused-vars
  const [paginationNumber, setPaginationNumber] = useState(13);

  useEffect(() => {
    const getData = async () => {
      try {
        const response =
          searchInput === ''
            ? await backend.get(
                `/donation/?donationsLimit=${paginationNumber}&pageNum=${currentPageNum}`,
              )
            : await backend.get(
                `/donation/search/${searchInput}?donationsLimit=${paginationNumber}&pageNum=${currentPageNum}`,
              );

        setData(response.data);

        const donationNumResponse = await backend.get(
          `/donation/totalDonations/${searchInput === '' ? '' : searchInput}`,
        );
        setCurrentTotalDonationNum(donationNumResponse.data[0]['count']);
        setPageLimit(Math.ceil(donationNumResponse.data[0]['count'] / paginationNumber));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [backend, currentPageNum, searchInput]);

  const handleButtonClick = async id => {
    try {
      setSelectedDonationId(id);
      await backend.get(`/donation/${id}`);
    } catch (error) {
      console.error('Error while fetching donation data', error);
    }
  };

  if (selectedDonationId) {
    return <ViewDonationHistory id={selectedDonationId} />;
  }

  const handleSearch = e => {
    setSearchInput(e.target.value);
    setCurrentPageNum(1);
  };

  return (
    <div>
      <Box flex={3} display="flex" alignItems="center" marginTop="auto" gap="15px">
        <InputGroup size="sm" margin="auto">
          <InputLeftElement
            margin="auto"
            pointerEvents="none"
            display="flex"
            alignItems="center"
            justifyContent="center"
            top="12%"
          >
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            size="sm"
            value={searchInput}
            onChange={e => handleSearch(e)}
            height="40px"
            borderRadius="md"
          />
        </InputGroup>
      </Box>

      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            {TABLE_HEADERS.map(header => (
              <Th key={header}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.reporter}</Td>
              <Td>{item.food_bank_donation}</Td>
              <Td>{item.date}</Td>
              <Td>
                <Button onClick={() => handleButtonClick(item.donation_id)}>Details</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box>
        {(currentPageNum - 1) * paginationNumber + 1} to{' '}
        {Math.min(currentPageNum * paginationNumber, currentTotalDonationNum)} of{' '}
        {currentTotalDonationNum}
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
  );
};

export default BusinessDonationHistory;
