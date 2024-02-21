import { useBackend } from '../../contexts/BackendContext';
import { useState, useEffect } from 'react';
import DonationSite from './DonationSite';
import { Tabs, TabList, Tab, Button } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';

import { Table, Thead, Tbody, Tr, Th, TableContainer, Checkbox } from '@chakra-ui/react';

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

  const getDonationTrackingTableData = async filter => {
    const response = await backend.get(`/donation/filter/${filter}`);
    const data = response.data;

    for (let i = 0; i < data.length; ++i) {
      data[i] = { donation_site: 'NULL', ...data[i] };
    }

    setDonationTrackingTableData(data);
  };
  useEffect(() => {
    getDonationTrackingTableData(filter);
  }, []);

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
      <Button
        colorScheme="teal"
        onClick={() => {
          console.log(checkedSet);
        }}
      >
        <ArrowDownIcon />
        Download CSV
      </Button>
      <Tabs variant="enclosed">
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
    </>
  );
};

export default DonationTrackingTable;
