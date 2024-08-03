/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';
import classes from './BusinessDonationHistory.module.css';

const BusinessDonationHistory = () => {
  const { backend } = useBackend();
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const navigate = useNavigate();

  // for pagination
  const [currentTotalDonationNum, setCurrentTotalDonationNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);

  // for search
  const [searchInput, setSearchInput] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [paginationNumber, setPaginationNumber] = useState(10);

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch business ID from backend
        const businessIdResponse = await backend.get(`/businessUser/${currentUser.uid}`);
        const response = await backend.get(
          `/donation/filter/search/?businessId=${businessIdResponse.data[0].id}&searchTerm=${searchInput}&donationsLimit=${paginationNumber}&pageNum=${currentPageNum}`,
        );
        setData(response.data);
        const donationNumResponse = await backend.get(
          `/donation/filter/searchCount/?businessId=${businessIdResponse.data[0].id}&searchTerm=${searchInput}`,
        );
        setCurrentTotalDonationNum(donationNumResponse.data[0]['count']);
        setPageLimit(Math.ceil(donationNumResponse.data[0]['count'] / paginationNumber));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [backend, currentPageNum, searchInput, paginationNumber]);

  const handleButtonClick = async (id) => {
    try {
      setSelectedDonationId(id);
      await backend.get(`/donation/${id}`);
    } catch (error) {
      console.error('Error while fetching donation data', error);
    }
  };

  if (selectedDonationId) {
    navigate(`/BusinessDonationHistory/${selectedDonationId}`);
  }

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setCurrentPageNum(1);
  };

  return (
    <Box margin="0px 32px 0px 32px">
      <Flex alignItems="center" margin="48px 0px 37px 0px">
        <Heading size="md"> Donation Tracking </Heading>
        <Spacer></Spacer>
        <InputGroup size="sm" margin="auto" width="222px" height="32px">
          <Input
            type="text"
            placeholder="Search"
            size="sm"
            value={searchInput}
            onChange={(e) => handleSearch(e)}
            height="40px"
            borderRadius="md"
          />
        </InputGroup>
      </Flex>
      <TableContainer
        border="1px"
        borderRadius="12px"
        borderColor="#E2E8F0"
        width="100%"
        className={classes.roundedTable}
      >
        <Table>
          <Thead>
            <Tr>
              <Th color="gray.600">Submitted By</Th>
              <Th color="gray.600">Food Bank</Th>
              <Th color="gray.600" textAlign="right">
                Date
              </Th>
              <Th color="gray.600" textAlign="right" paddingRight="42px">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index} color="gray.700">
                <Td paddingTop="6px" paddingBottom="6px">
                  {item.reporter}
                </Td>
                <Td paddingTop="6px" paddingBottom="6px">
                  {item.food_bank_donation}
                </Td>
                <Td textAlign="right" paddingTop="6px" paddingBottom="6px">
                  {new Date(item.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Td>
                <Td textAlign="right" paddingTop="6px" paddingBottom="6px">
                  <Button
                    variant="ghost"
                    color="gray.700"
                    fontWeight="normal"
                    onClick={() => handleButtonClick(item.donation_id)}
                    rightIcon={<ArrowForwardIcon />}
                  >
                    Details
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent="flex-end" alignItems="center" marginTop="10px">
        <Box padding="4px 16px 4px 16px" h="28px" fontSize="14px" position="relative">
          {(currentPageNum - 1) * paginationNumber + 1} -{' '}
          {Math.min(currentPageNum * paginationNumber, currentTotalDonationNum)} of{' '}
          {currentTotalDonationNum}
        </Box>
        <IconButton
          variant="ghost"
          aria-label="Back button"
          isDisabled={currentPageNum <= 1}
          icon={<ChevronLeftIcon />}
          onClick={() => setCurrentPageNum(currentPageNum - 1)}
          position="relative"
        />
        <IconButton
          variant="ghost"
          aria-label="Next button"
          isDisabled={currentPageNum >= pageLimit}
          icon={<ChevronRightIcon />}
          onClick={() => setCurrentPageNum(currentPageNum + 1)}
          position="relative"
        />
      </Flex>
    </Box>
  );
};

export default BusinessDonationHistory;
