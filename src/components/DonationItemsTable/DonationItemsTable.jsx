import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
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
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const DonationItemsTable = () => {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>All</Tab>
          <Tab>Food</Tab>
          <Tab>Misc.</Tab>
        </TabList>
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
  const TABLE_HEADERS = ['Category', 'Id', 'Name', 'Quantity Type', 'Price'];
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await backend.get(`/value/filter/${category}`);
        setData(response.data);
      } catch (error) {
        console.error('Error getting donation items:', error);
        setData([]);
      }
    };
    getData();
  }, [backend, category]);

  return (
    <Table variant="striped">
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
            {Object.keys(item).map(key => (
              <Td key={key}>
                {typeof item[key] === 'boolean' ? (item[key] ? 'True' : 'False') : item[key]}
              </Td>
            ))}
            <Td>
              <EditIcon /> <DeleteIcon color="red" />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

DonationItems.propTypes = {
  category: PropTypes.string.isRequired,
};

export default DonationItemsTable;
