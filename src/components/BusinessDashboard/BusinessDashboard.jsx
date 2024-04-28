import './BusinessDashboard.module.css';
import { useBackend } from '../../contexts/BackendContext';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  HStack,
  Stack,
  Text,
  Icon,
  Flex,
  Divider,
  Center,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { BiDonateHeart, BiMoney, BiPackage } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import 'boxicons';
import {
  ArrowForwardIcon,
  WarningIcon,
  EmailIcon,
  CheckCircleIcon,
  TimeIcon,
} from '@chakra-ui/icons';
import ViewDonationHistory from '../BusinessDonationHistory/ViewDonationHistory/ViewDonationHistory';

// Currently, this whole component depends on each notification having its correct 'type' when created. We defined 4 types:
// 1. Donation Form Confirmation
// 2. Donation Form Reminder
// 3. Donation Request Shipped
// 4. Donation Request Receieved
// However, none of the current code anywhere does this, and the type for all notifications is null by default. Either that has to be fixed
// or this will need to be changed so that it doesn't rely on a notification having a type.
const BusinessDashboard = () => {
  const [userName, setUserName] = useState('');
  const { backend } = useBackend();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [donationData, setDonationData] = useState([]);
  const [notifClicked, setNotifClicked] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const buttonPath = {
    'Donation Form Confirmation': '/DonationTrackingTable',
    'Donation Form Reminder': '/BusinessDonationTrackingForm',
    'Supply Request Shipped': '/',
    'Supply Request Received': '/',
  };
  const buttonText = {
    'Donation Form Confirmation': 'View Form',
    'Donation Form Reminder': 'Submit Form',
    'Supply Request Shipped': 'View Request',
    'Supply Request Received': 'View Request',
  };

  const buttonIcon = {
    'Donation Form Confirmation': WarningIcon,
    'Donation Form Reminder': EmailIcon,
    'Supply Request Shipped': EmailIcon,
    'Supply Request Received': CheckCircleIcon,
  };
  // *************************************************************************
  // CHANGE LATER: right now just making one big request for all of the
  // rows in the fair_market_value table since it is just full of dummy data.
  // Later, when actual data or more accurate dummy data is used, change the
  // request to efficiently pull the prices of dry and canned dog and cat food
  // *************************************************************************
  const [priceData, setPriceData] = useState([]);
  const [reminderData, setReminderData] = useState([]);
  const [supplyRequest, setSupplyRequest] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [notes, setNotes] = useState('');
  const supplyRequestItems = [
    'Donation Site Decal',
    'Rack Cards',
    'Donation Envelopes',
    'Business Cards',
    'Stickers',
    'Bin Decals',
    '"Homeless?" Card',
  ];

  const formatDate = timestamp => {
    const parsedTimestamp = Number(timestamp);
    const date = new Date(isNaN(parsedTimestamp) ? timestamp : parsedTimestamp * 1000);

    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } else {
      return 'Invalid Date';
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        // ***********************************************************************
        // CHANGE LATER: right now business is hardcoded to be business with id 1
        // in the future will have to change (add parameter to component)
        // so that we can display the dashboard for various businesses
        // ***********************************************************************
        const businessIdResponse = await backend.get(`/businessUser/${currentUser.uid}`);
        const businessId = businessIdResponse.data[0].id;

        const donationResponse = await backend.get(`/donation/business/totals/${businessId}`);
        setDonationData(donationResponse.data[0]);

        const businessResponse = await backend.get(`/business/${businessId}`);
        setUserName(businessResponse.data[0]['contact_name']);

        const priceResponse = await backend.get('/value');
        setPriceData(priceResponse.data);

        const reminderResponse = await backend.get(`/notification/${businessId}`);
        setReminderData(reminderResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  const parseSupplyRequestData = async message => {
    const lines = message.split('\n');
    const numbersList = [];
    let notes = '';
    let notesFound = false;

    lines.forEach(line => {
      if (line.startsWith('Notes:')) {
        notes = line.substring(line.indexOf(':') + 1).trim();
        notesFound = true;
      } else if (!notesFound) {
        const value = line.split(':')[1];
        if (value !== undefined) {
          const numericValue = parseInt(value.trim(), 7);
          numbersList.push(numericValue);
        }
      }
    });

    setSupplyRequest(numbersList.slice(1));
    setNotes(notes);
  };

  const calculateTotalPounds = () => {
    return (
      donationData['canned_dog_food_quantity'] +
      donationData['dry_dog_food_quantity'] +
      donationData['canned_cat_food_quantity'] +
      donationData['dry_cat_food_quantity']
    );
  };

  /*
  const calculateTotalWorth = () => {
    // ***********************************************************************
    // CHANGE LATER: Right now the prices are just the first four rows of the
    // fair_market_value table, thus if the table has less than four tables
    // this function will break
    // ***********************************************************************
    return donationData['canned_dog_food_quantity'] && priceData.length > 0
      ? donationData['canned_dog_food_quantity'] * priceData[0]['price'] +
          donationData['dry_dog_food_quantity'] * priceData[1]['price'] +
          donationData['canned_cat_food_quantity'] * priceData[2]['price'] +
          donationData['dry_cat_food_quantity'] * priceData[3]['price']
      : 0;
  };
  */

  // Bruh naw what is this CHANGE LATER
  const calculateTotalWorth = () => {
    console.log(priceData);
    return 99;
  };

  const calculateTimeSince = () => {
    if (!(reminderData.length > 0)) {
      return 0;
    }
    const currentTime = new Date();
    const previousTime = new Date(reminderData[0].timestamp);
    const timeDifference = Math.abs(currentTime - previousTime);
    // Convert milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };

  <Drawer isOpen={isDrawerOpen} placement="right" onClose={() => setIsDrawerOpen(false)} size="sm">
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader mt={2}>
        <Flex justifyContent="start" alignItems="center">
          <BiPackage size={30} />
          <Text fontSize={20} marginLeft={2}>
            Supply Request
          </Text>
        </Flex>
      </DrawerHeader>

      <DrawerBody p={2}>
        <Box border="2px" borderColor="gray.200" borderRadius="lg" overflow="hidden">
          <Table variant="simple" colorScheme="gray" size="md" borderRadius="sm" overflow="hidden">
            <Thead>
              <Tr>
                <Th color="black" fontWeight={900}>
                  Item
                </Th>
                <Th color="black" fontWeight={900}>
                  Amount
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {supplyRequestItems.map((item, index) => (
                <Tr key={index}>
                  <Td>{item}</Td>
                  <Td>{supplyRequest[index]}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Flex flexDirection="column" alignItems="flex-start" marginLeft={5} marginTop={5}>
          <Text fontWeight={700}>Notes</Text>
          {/* CHANGE THIS TO PARSED NOTES */}
          <Text>{notes}</Text>
        </Flex>
      </DrawerBody>
    </DrawerContent>
  </Drawer>;

  return !notifClicked ? (
    <div>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mt={2}>
            <Flex justifyContent="start" alignItems="center">
              <BiPackage size={30} />
              <Text fontSize={20} marginLeft={2}>
                Supply Request
              </Text>
            </Flex>
          </DrawerHeader>

          <DrawerBody p={2}>
            <Box border="2px" borderColor="gray.200" borderRadius="lg" overflow="hidden">
              <Table
                variant="simple"
                colorScheme="gray"
                size="md"
                borderRadius="sm"
                overflow="hidden"
              >
                <Thead>
                  <Tr>
                    <Th color="black" fontWeight={900}>
                      Item
                    </Th>
                    <Th color="black" fontWeight={900}>
                      Amount
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {supplyRequestItems.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item}</Td>
                      <Td>{supplyRequest[index]}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            <Flex flexDirection="column" alignItems="flex-start" marginLeft={5} marginTop={5}>
              <Text fontWeight={700}>Notes</Text>
              {/* CHANGE THIS TO PARSED NOTES */}
              <Text>{notes}</Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex margin="4vh 0 0 3vh" justifyContent="space-between" alignItems="center">
        {
          <Stack>
            <Text fontSize="30px" color="teal" fontWeight="bold">
              Welcome Back, {`${userName}`}
            </Text>
          </Stack>
        }

        {
          <Button
            colorScheme="teal"
            size="md"
            marginRight="3vh"
            onClick={() => navigate('/BusinessDonationTrackingForm')}
          >
            Submit Donation Form
          </Button>
        }
      </Flex>

      <Flex
        margin="4vh 3vh 0 3vh"
        borderRadius="16px"
        justifyContent="space-around"
        p={5}
        border="1px"
        borderColor="gray.200"
        bg="#FFFFFF"
      >
        <Flex justifyContent="center" alignItems="center">
          {<BiMoney color="teal" size={30} />}
          {
            <div className="vstack">
              <div style={{ marginLeft: '12px' }}>
                <Box>
                  <Text fontSize={25} fontWeight={500}>
                    ${calculateTotalWorth()}
                  </Text>
                </Box>
                <Box>
                  <Text color="gray" mt={-2}>
                    Worth of Donation Supplies
                  </Text>
                </Box>
              </div>
            </div>
          }
        </Flex>
        {
          <Center height="50px">
            <Divider orientation="vertical" color="#E2E8F0" />
          </Center>
        }
        <Flex justifyContent="center" alignItems="center">
          {<BiDonateHeart color="teal" size={30} />}
          {
            <div className="vstack">
              <div style={{ marginLeft: '12px' }}>
                <Box>
                  <Text fontSize={25} fontWeight={500}>
                    {calculateTotalPounds()}
                  </Text>
                </Box>
                <Box>
                  <Text color="gray" mt={-2}>
                    Pounds of Food Donated
                  </Text>
                </Box>
              </div>
            </div>
          }
        </Flex>
        {
          <Center height="50px">
            <Divider orientation="vertical" color="#E2E8F0" />
          </Center>
        }
        <Flex justifyContent="center" alignItems="center">
          {<TimeIcon color="teal" boxSize={6} />}
          {
            <div className="vstack">
              <div style={{ marginLeft: '12px' }}>
                <Box>
                  <Text fontSize={25} fontWeight={500}>
                    {calculateTimeSince()}
                  </Text>
                </Box>
                <Text color="gray" mt={-2}>
                  Days Since Last Submission
                </Text>
              </div>
            </div>
          }
        </Flex>
      </Flex>

      <Table margin="2vh 3vh 0 3vh" width="95.5%" bg="#FFFFFF" borderRadius={'1%'}>
        <Thead>
          <Tr>
            <Th color="#2D3748" fontSize="15px">
              {' '}
              Notifications
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {reminderData.slice(0, 50).map((reminder, index) => (
            <Tr key={index}>
              <Td>
                <Box height="11vh" borderWidth="2px" borderRadius="5px" borderColor="#359797">
                  <HStack justifyContent={'space-between'}>
                    <Box margin="3px">
                      <HStack marginLeft="1vh">
                        <Box color={'#359797'}>
                          {' '}
                          <Icon as={buttonIcon[reminder['type']]}></Icon>
                        </Box>

                        <Stack marginLeft="1vh" marginTop="1.2vh">
                          <Text fontWeight="bold">{reminder['type']}</Text>
                          <Text fontSize="1.2vh">{formatDate(reminder['timestamp'])}</Text>
                          <Text fontSize="1.5vh">{reminder['message'].slice(0, 158)}</Text>
                        </Stack>
                      </HStack>
                    </Box>
                    <Box>
                      <Button
                        variant="link"
                        color="#2D3748"
                        margin="15px"
                        onClick={() => {
                          if (reminder['type'] === 'Donation Form Confirmation') {
                            setNotifClicked(reminder['notification_id']);
                          } else if (reminder['type'] === 'Supply Request Shipped') {
                            parseSupplyRequestData(reminder['message']);
                            setIsDrawerOpen(true);
                          } else {
                            navigate(buttonPath[reminder['type']]);
                          }
                        }}
                        rightIcon={<ArrowForwardIcon />}
                      >
                        {buttonText[reminder['type']]}
                      </Button>
                    </Box>
                  </HStack>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  ) : (
    <ViewDonationHistory id={notifClicked} />
  );
};

export default BusinessDashboard;
