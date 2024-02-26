import { useBackend } from '../../contexts/BackendContext';
import { useState, useEffect } from 'react';
import DonationSite from './DonationSite';
import { Tabs, TabList, Tab, Button, Box, IconButton } from '@chakra-ui/react';
import { ArrowDownIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import './DonationTrackingTable.module.css';
import { Table, Thead, Tbody, Tr, Th, TableContainer, Checkbox, Text } from '@chakra-ui/react';

const DonationTrackingTable = () => {
  const { backend } = useBackend();

  const [donationTrackingTableData, setDonationTrackingTableData] = useState([]);
  const [checkedSet, setCheckedSet] = useState(new Set());
  const [topCheckBox, setTopCheckBox] = useState(false);
  var filter = 'month';
  const headers = [
    'Donation Site',
    'Donation ID',
    'Food Bank',
    'Person Reporting',
    'Email',
    'Date',
    'Canned Dog Food',
    'Dry Dog Food',
    'Canned Cat Food',
    'Dry Cat Food',
    'Misc Items',
    'Volunteer Hours',
  ];

  const tabHeaders = ['month', 'quarter', 'year', 'all'];
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [currentDonationsNum, setCurrentDonationsNum] = useState(0);
  const [pageLimit, setPageLimit] = useState(1);

  const getDonationTrackingTableData = async () => {
    const response = await backend.get(`/donation/filter/pageNum=${currentPageNum}&filter=${filter}`);
    const data = response.data;

    for (let i = 0; i < data.length; ++i) {
      data[i] = { donation_site: 'NULL', ...data[i] };
    }

    setDonationTrackingTableData(data);
  };

  const setValues = () => {
    setCurrentDonationsNum(donationTrackingTableData.length);
    setPageLimit(Math.ceil(currentDonationsNum / 10));
  }

  useEffect(() => {
    getDonationTrackingTableData(filter, currentPageNum);
    setValues();
    console.log(currentDonationsNum);
    console.log(pageLimit);
  }, [currentPageNum]);

  const renderDonationTrackingTableData = () => {
    return donationTrackingTableData.map((element, index) => {
      return (
        <DonationSite
          donation_site={element}
          key={index}
          checkSet={checkedSet}
          setCheck={setCheckedSet}
          topCheckBox={topCheckBox}
        />
      );
    });
  };

  const updateFilter = filter => {
    getDonationTrackingTableData(filter);
  };

  const handleCheckBoxes = () => {
    const newCheckboxValue = !topCheckBox;
    setTopCheckBox(newCheckboxValue);
    if (newCheckboxValue) {
      const newCheckedSet = new Set(donationTrackingTableData.map(element => element.donationId));
      setCheckedSet(newCheckedSet);
    } else {
      const newCheckedSet = new Set();
      setCheckedSet(newCheckedSet);
    }
  };

  return (
    <>
      <div className='dtt-title-container'>
        <Text sx={{
            'color': 'var(--gray-700, #2D3748)',

            /* text-3xl/lineHeight-9/font-bold */
            'font-family': 'Inter',
            'font-size': '30px',
            'font-style' : 'normal',
            'font-weight': '700',
            'line-height': '36px' /* 120% */
          }}
        >
          Donation Tracking
        </Text>
      </div>
      <Button
        colorScheme="teal"
        onClick={() => {
          console.log(checkedSet);
        }}
      >
        <ArrowDownIcon />
        Download CSV
      </Button>
      <Tabs>
        <TabList>
          {tabHeaders.map((header, index) => {
            if (header != 'all')
              return (
                <Tab onClick={() => updateFilter(header)} key={index}>
                  This {header.substring(0, 1).toUpperCase() + header.substring(1)}
                </Tab>
              );
            else {
              return (
                <Tab onClick={() => updateFilter('all')} key={index}>
                  All
                </Tab>
              );
            }
          })}
        </TabList>
      </Tabs>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Checkbox onChange={handleCheckBoxes} />
              {headers.map((header, index) => {
                return <Th key={index}>{header}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>{renderDonationTrackingTableData()}</Tbody>
        </Table>
      </TableContainer>
      <Box>
        {(currentPageNum - 1) * 10 + 1} to {Math.min(currentPageNum * 10, currentDonationsNum)} of{' '}
        {currentDonationsNum}
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
    </>
  );
};

export default DonationTrackingTable;
