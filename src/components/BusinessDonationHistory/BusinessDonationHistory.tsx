import { ChangeEvent, useEffect, useState } from 'react';
import { ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
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
import { pageStyle, pageTitleStyle } from '../../styles/sharedStyles';

const PAGINATION_NUMBER = 10;

export const BusinessDonationHistory = () => {
  const { backend } = useBackend();
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const navigate = useNavigate();

  const [currentTotalDonationNum, setCurrentTotalDonationNum] = useState(0);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const businessIdResponse = await backend.get(`/businessUser/${currentUser.uid}`);
        const businessId = businessIdResponse.data[0].id;

        const response = await backend.get(
          `/donation/filter/search/?businessId=${businessId}&searchTerm=${searchInput}&donationsLimit=${PAGINATION_NUMBER}&pageNum=${currentPageNum}`,
        );
        setData(response.data);

        const donationNumResponse = await backend.get(
          `/donation/filter/searchCount/?businessId=${businessId}&searchTerm=${searchInput}`,
        );
        setCurrentTotalDonationNum(donationNumResponse.data[0]['count']);
        setPageLimit(Math.ceil(donationNumResponse.data[0]['count'] / PAGINATION_NUMBER));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [backend, currentPageNum, searchInput, PAGINATION_NUMBER]);

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

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setCurrentPageNum(1);
  };

  return (
    <Flex sx={pageStyle} gap={4}>
      <HStack sx={{ width: 'full', justifyContent: 'space-between' }}>
        <Heading sx={pageTitleStyle}>Donation History</Heading>
        <Input
          type="text"
          placeholder="Search"
          size="md"
          width={300}
          value={searchInput}
          onChange={handleSearch}
        />
      </HStack>

      <TableContainer
        sx={{
          padding: 3,
          borderWidth: 1,
          borderRadius: 'md',
          overflowX: 'auto',
          background: 'white',
        }}
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

      <Flex justifyContent="flex-end" alignItems="center">
        <Box padding={2} position="relative">
          {(currentPageNum - 1) * PAGINATION_NUMBER + 1} -{' '}
          {Math.min(currentPageNum * PAGINATION_NUMBER, currentTotalDonationNum)} of{' '}
          {currentTotalDonationNum}
        </Box>

        <IconButton
          variant="ghost"
          aria-label="Back button"
          isDisabled={currentPageNum <= 1}
          icon={<ChevronLeftIcon />}
          onClick={() => setCurrentPageNum(currentPageNum - 1)}
        />
        <IconButton
          variant="ghost"
          aria-label="Next button"
          isDisabled={currentPageNum >= pageLimit}
          icon={<ChevronRightIcon />}
          onClick={() => setCurrentPageNum(currentPageNum + 1)}
        />
      </Flex>
    </Flex>
  );
};
