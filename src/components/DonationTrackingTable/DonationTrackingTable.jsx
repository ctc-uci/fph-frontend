import { useBackend } from '../../contexts/BackendContext';
import { useState, useEffect } from 'react';
import DonationSite from './DonationSite';
import { Tabs, TabList, Tab, Button } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  Checkbox,
} from '@chakra-ui/react';

const DonationTrackingTable = () => {
  const { backend } = useBackend();

  const [donationTrackingTableData, setDonationTrackingTableData] = useState([]);
  const [checkedSet, setCheckedSet] = useState(new Set());
  const [topCheckBox, setTopCheckBox] = useState(false);

  const getDonationTrackingTableData = async filter => {
    const response = await backend.get(`/donation/filter/${filter}`);
    const data = response.data;
    const donation_list = [];

    for (let i = 0; i < data.length; ++i) {
      var donation_site = {
        donationSite: null,
        donationId: data[i].donation_id,
        foodBank: data[i].food_bank_donation,
        reporter: data[i].reporter,
        email: data[i].email,
        date: data[i].date,
        cannedDogFoodQuantity: data[i].canned_dog_food_quantity,
        dryDogFoodQuantity: data[i].dry_dog_food_quantity,
        cannedCatFoodQuantity: data[i].canned_cat_food_quantity,
        dryCatFoodQuantity: data[i].dry_cat_food_quantity,
        miscItems: data[i].misc_items,
        volunteerHours: data[i].volunteer_hours,
      };

      donation_list.push(donation_site);
    }
    setDonationTrackingTableData(donation_list);
  };
  useEffect(() => {
    getDonationTrackingTableData('month');
  });

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
        <ArrowDownIcon/>
        Download CSV
      </Button>
      <Tabs variant="enclosed">
        <TabList>
          <Tab
            onClick={() => {
              updateFilter('month');
            }}
          >
            This Month
          </Tab>
          <Tab
            onClick={() => {
              updateFilter('quarter');
            }}
          >
            This Quarter
          </Tab>
          <Tab
            onClick={() => {
              updateFilter('year');
            }}
          >
            This Year
          </Tab>
          <Tab
            onClick={() => {
              updateFilter('all');
            }}
          >
            All
          </Tab>
        </TabList>
      </Tabs>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Checkbox onChange={handleCheckBoxes} />
              <Th>Donation Site</Th>
              <Th>Donation ID</Th>
              <Th>Food Bank</Th>
              <Th>Person Reporting</Th>
              <Th>Email</Th>
              <Th>Date</Th>
              <Th>Canned Dog Food</Th>
              <Th>Dry Dog Food</Th>
              <Th>Canned Cat Food</Th>
              <Th>Dry Cat Food</Th>
              <Th>Misc Items</Th>
              <Th>Volunteer Hours</Th>
              <Th>Description</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>{renderDonationTrackingTableData()}</Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DonationTrackingTable;
