import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import ViewBusiness from '../ViewBusiness/ViewBusiness';
import BusinessForm from '../BusinessForm/BusinessForm';
import { Table, Thead, Tbody, Tr, Td, Checkbox, Button, Th } from '@chakra-ui/react';

const BusinessTablePending = businessData => {
  const { backend } = useBackend();
  const [data, setData] = useState([]);
  const [selectedBusinessId, setBusinessId] = useState(null);
  const [backButtonClicked, setBackButtonClicked] = useState(false);
  const [pendingData, setPendingData] = useState([]);
  //   const [selectedApplication, setSelectedApplication] = useState(new Set());
  const TABLE_HEADERS = [
    'id',
    'Type',
    'Name',
    'Street',
    'Zipcode',
    'State',
    'Qb Vendor Name',
    'Qb City State Zip',
    'Primary Phone',
    'Backup Phone',
    'Primary Email',
    'Comments',
    'Fax phone',
    'Contact name',
    'Website',
    'Business hours',
    'Find out',
    'Onboarding status',
    'Join date',
    'Input type status',
    'Vendor type',
    'Status',
    'Pets of the homeless discount',
    'Updated by',
    'Updated date time',
    'Sync to qb',
    'Veterinary',
    'Ressoure',
    'Food',
    'Donation',
    'Family shelter',
    'Wellness',
    'Spray neuter',
    'Financial',
    'Re home',
    'Er boarding',
    'Senior',
    'Cancer',
    'Dog',
    'Cat',
    'Fph phone',
    'Contact phone',
    'Web notes',
    'Internal notes',
    'Published',
    'Shelter',
    'Domestic Violence',
    'Web Date Init',
    'Ent Qb',
    'Service Request',
    'Inactive',
    'Final Check',
    'Created By',
    'Created Date',
    'City',
    'Application',
  ];
  const tableHeaders = TABLE_HEADERS.map(tableHeader => <th key={tableHeader}>{tableHeader}</th>);
  const [selectedBusinessIds, setSelectedBusinessIds] = useState(new Set());

  const handleCheckboxChange = businessId => {
    setSelectedBusinessIds(prevSelectedIds => {
      const newSelectedIds = new Set(prevSelectedIds);
      if (newSelectedIds.has(businessId)) {
        newSelectedIds.delete(businessId);
      } else {
        newSelectedIds.add(businessId);
      }
      return newSelectedIds;
    });
  };

  const handleSelectAllChange = () => {
    setSelectedBusinessIds(prevSelectedIds => {
      const newSelectedIds = new Set(prevSelectedIds);
      const allBusinessIds = data.map(business => business.id);

      if (newSelectedIds.size === allBusinessIds.length) {
        // If all are selected, unselect all
        newSelectedIds.clear();
      } else {
        // Otherwise, select all
        allBusinessIds.forEach(id => newSelectedIds.add(id));
      }

      return newSelectedIds;
    });
  };

  const handleSendReminders = async () => {
    for (const businessId of selectedBusinessIds) {
      try {
        const requestData = {
          business_id: businessId,
          message: 'Message',
          timestamp: new Date().toISOString(),
          been_dismissed: false,
        };

        await backend.post('/notification', requestData);
      } catch (error) {
        console.error('Error sending reminders:', error);
      }
    }
  };

  const handleViewApplication = async businessId => {
    try {
      const response = await backend.get(`/business/${businessId}`);
      setPendingData(response);
      setBackButtonClicked(false);
      // setSelectedApplication(businessId);
    } catch (error) {
      console.error('Error while fetching  application', error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setData(businessData['businessData']);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [businessData]);

  const handleRowClick = async id => {
    try {
      setBusinessId(id);
      setBackButtonClicked(false);
      const response = await backend.get(`/business/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error while fetching business', error);
    }
  };

  if (selectedBusinessId && !backButtonClicked) {
    return <ViewBusiness id={selectedBusinessId} setBackButtonClicked={setBackButtonClicked} />;
  } else if (pendingData.length !== 0 && !backButtonClicked) {
    return <BusinessForm pending={true} pendingData={pendingData.data[0]} setBackButtonClicked={setBackButtonClicked}/>;
  }
  return businessData['businessData'].length == 0 ? (
    <h1>Loading ...</h1>
  ) : (
    <div>
      <Button colorScheme="blue" onClick={handleSendReminders}>
        Send Reminders
      </Button>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            {/* Add an empty header for the checkbox column */}
            <Th key="checkbox">
              <Checkbox
                isChecked={selectedBusinessIds.size > 0 && selectedBusinessIds.size === data.length}
                onChange={handleSelectAllChange}
              ></Checkbox>
            </Th>
            {tableHeaders.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index} sx={{cursor: 'pointer'}}>
              {/* Add a Checkbox for each row in the checkbox column */}
              <Td key="checkbox">
                <Checkbox
                  isChecked={selectedBusinessIds.has(item.id)}
                  onChange={() => handleCheckboxChange(item.id)} // .append, .add
                ></Checkbox>
              </Td>
              {Object.keys(item).map(key => (
                <Td key={key} onClick={() => handleRowClick(item.id)}>
                  {typeof item[key] === 'boolean' ? (item[key] ? 'True' : 'False') : item[key]}
                </Td>
              ))}
              {item.status === 'Pending' ? (
                <Td key="Application">
                  <Button onClick={() => handleViewApplication(item.id)}>View Application</Button>
                </Td>
              ) : null}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default BusinessTablePending;