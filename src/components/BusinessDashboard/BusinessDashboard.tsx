import { useEffect, useState } from 'react';
import { ArrowForwardIcon, CheckCircleIcon, EmailIcon, WarningIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ComponentWithAs,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Icon,
  IconProps,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { BiPackage } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';
import { pageStyle } from '../../styles/sharedStyles';
import { Donation } from '../../types/donation';
import type { Notification } from '../../types/notification';
import { BusinessTotals } from './BusinessTotals';

const BUTTON_PATH: Record<string, string> = {
  'Donation Form Confirmation': `/BusinessDonationHistory`,
  'Submitted Form': `/BusinessDonationHistory`,
  'Donation Form Reminder': '/BusinessDonationTrackingForm',
  'Not Submitted': '/BusinessDonationTrackingForm',
  // 'Supply Request Shipped': '/',
  // 'Supply Request Received': '/',
};

const BUTTON_TEXT: Record<string, string> = {
  'Donation Form Confirmation': 'View Form',
  'Submitted Form': 'View Form',
  'Not Submitted': 'Submit Form',
  'Donation Form Reminder': 'Submit Form',
  'Supply Request': 'View Request',
  'Supply Request Shipped': 'View Request',
  'Supply Request Received': 'View Request',
};

const BUTTON_ICON: Record<string, ComponentWithAs<'svg', IconProps>> = {
  'Donation Form Confirmation': CheckCircleIcon,
  'Submitted Form': CheckCircleIcon,
  'Donation Form Reminder': WarningIcon,
  'Not Submitted': WarningIcon,
  'Supply Request Shipped': EmailIcon,
  'Supply Request Received': EmailIcon,
  'Supply Request': EmailIcon,
};

// Currently, this whole component depends on each notification having its correct 'type' when created. We defined 4 types:
// 1. Donation Form Confirmation
// 2. Donation Form Reminder
// 3. Donation Request Shipped
// 4. Donation Request Receieved
// However, none of the current code anywhere does this, and the type for all notifications is null by default. Either that has to be fixed
// or this will need to be changed so that it doesn't rely on a notification having a type.
export const BusinessDashboard = () => {
  const { backend } = useBackend();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [donationData, setDonationData] = useState<Donation[]>([]);
  const [currentQuarter, setCurrentQuarter] = useState<string>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // *************************************************************************
  // CHANGE LATER: right now just making one big request for all of the
  // rows in the fair_market_value table since it is just full of dummy data.
  // Later, when actual data or more accurate dummy data is used, change the
  // request to efficiently pull the prices of dry and canned dog and cat food
  // *************************************************************************
  const [priceData, setPriceData] = useState([]);
  const [reminderData, setReminderData] = useState<Notification[]>([]);
  const [supplyRequest, setSupplyRequest] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [note, setNote] = useState('');
  const supplyRequestItems = [
    'Pet Food Decal',
    'Decal',
    'Homeless Card',
    'Business Card',
    'Donation Site Decal',
    'Donation Site Bin Decals',
    'Donation Envelopes',
    'Homeless Card 2',
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const businessIdResponse = await backend.get(`/businessUser/${currentUser.uid}`);
        const businessId = businessIdResponse.data[0].id;

        const [donationResponse, businessResponse, priceResponse, reminderResponse] =
          await Promise.all([
            backend.get(`/donation/business/totals/${businessId}`),
            backend.get(`/business/${businessId}`),
            backend.get('/value'),
            backend.get(`/notification/${businessId}`),
          ]);

        setDonationData(donationResponse.data[0]);
        // setUserName(businessResponse.data[0]['contact_name']);
        setPriceData(priceResponse.data);
        setReminderData(reminderResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const currentTime = new Date();

    if (currentTime.getMonth() <= 2) {
      setCurrentQuarter('Q1');
    } else if (currentTime.getMonth() <= 5) {
      setCurrentQuarter('Q2');
    } else if (currentTime.getMonth() <= 8) {
      setCurrentQuarter('Q3');
    } else {
      setCurrentQuarter('Q4');
    }
  }, []);

  const parseSupplyRequestData = async (message: string) => {
    const lines = message.split(',');
    const numbersList: number[] = [];
    let notes = '';
    let notesFound = false;

    lines.forEach((line) => {
      if (line.startsWith('"Notes":')) {
        notes = line
          .substring(line.indexOf(':') + 2)
          .trim()
          .split('"')[0];
        notesFound = true;
      } else if (!notesFound) {
        const value = line.split(':')[1];
        if (value !== undefined) {
          const numericValue = parseInt(value.trim());
          numbersList.push(numericValue);
        }
      }
    });

    setSupplyRequest(numbersList);
    setNote(notes);
  };

  const isUrgentNotif = () => {
    const currentTime = new Date();
    const currentYear = currentTime.getFullYear();
    let dueDate = new Date();

    if (currentTime.getMonth() <= 2) {
      dueDate = new Date(currentYear, 3, 1);
    } else if (currentTime.getMonth() <= 5) {
      dueDate = new Date(currentYear, 4, 9);
    } else if (currentTime.getMonth() <= 8) {
      dueDate = new Date(currentYear, 9, 1);
    } else {
      dueDate = new Date(currentYear, 0, 1);
    }

    const timeDifference = Math.abs(currentTime.getTime() - dueDate.getTime());
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference < 3;
  };

  const isRedNotif = (reminder: Notification) => {
    return reminder['type'] === 'Not Submitted' && isUrgentNotif();
  };

  const getNotifText = (reminder: Notification) => {
    const notifDate = new Date(reminder['timestamp']);
    const formattedDate = notifDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const notifText: Record<string, string> = {
      'Donation Form Confirmation': `Donation form has been submitted for ${currentQuarter}. Thank you!`,
      'Submitted Form': `Donation form has been submitted for ${currentQuarter}. Thank you!`,
      'Donation Form Reminder': 'Please submit your donation form by the due date!',
      'Not Submitted': 'Please submit your donation form by the due date!',
      'Supply Request Shipped': `Supply request submitted from ${formattedDate} has been shipped.`,
      'Supply Request Received': 'Supplies will be shipped in 5-7 business days.',
      'Supply Request': 'Supplies will be shipped in 5-7 business days.',
    };

    return notifText[reminder['type']];
  };

  return (
    <Flex sx={pageStyle}>
      <Flex justifyContent="space-between" alignItems="center" paddingY={4}>
        <Heading color="teal" fontWeight="bold">
          Welcome Back{userName === '' ? '!' : `, ${userName}`}
        </Heading>

        <Button
          colorScheme="teal"
          size="md"
          onClick={() => navigate('/BusinessDonationTrackingForm')}
        >
          Submit Donation Form
        </Button>
      </Flex>

      <BusinessTotals
        donationData={donationData}
        reminderData={reminderData}
        priceData={priceData}
      />

      <Table sx={{ backgroundColor: 'white' }}>
        <Thead>
          <Tr>
            <Th>Notifications</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reminderData.slice(0, 50).map((reminder, index) => (
            <Tr key={index}>
              <Td>
                <Box
                  sx={{ borderWidth: 1, borderRadius: 'lg', paddingX: 4, paddingY: 2 }}
                  borderColor={isRedNotif(reminder) ? '#F56565' : '#359797'}
                  backgroundColor={isRedNotif(reminder) ? '#FED7D7' : ''}
                >
                  <HStack justifyContent={'space-between'}>
                    <Box>
                      <HStack spacing={4}>
                        <Icon
                          as={BUTTON_ICON[reminder['type']]}
                          color={isRedNotif(reminder) ? '#E53E3E' : 'teal'}
                        />

                        <Stack spacing={0.25}>
                          <Text fontWeight="bold">{reminder['type']}</Text>
                          <Text>
                            {new Date(reminder['timestamp']).toLocaleDateString('en-us', {
                              timeZone: 'America/Los_Angeles',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </Text>
                          <Text>{getNotifText(reminder)}</Text>
                        </Stack>
                      </HStack>
                    </Box>

                    <Box display="flex" alignItems="center" justifyContent="center">
                      <Button
                        variant="link"
                        color="gray.800"
                        onClick={() => {
                          if (
                            ['Donation Form Confirmation', 'Submitted Form'].includes(
                              reminder['type'],
                            )
                          ) {
                            navigate(`${BUTTON_PATH[reminder['type']]}/${reminder.donation_id}`);
                          } else if (
                            [
                              'Supply Request Shipped',
                              'Supply Request Received',
                              'Supply Request',
                            ].includes(reminder['type'])
                          ) {
                            parseSupplyRequestData(reminder['message']);
                            onOpen();
                          } else {
                            navigate(BUTTON_PATH[reminder['type']]);
                          }
                        }}
                        rightIcon={<ArrowForwardIcon />}
                      >
                        {BUTTON_TEXT[reminder['type']]}
                      </Button>
                    </Box>
                  </HStack>
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <SupplyRequestDrawer
        isOpen={isOpen}
        onClose={onClose}
        supplyRequestItems={supplyRequestItems}
        supplyRequest={supplyRequest}
        note={note}
      />
    </Flex>
  );
};

const SupplyRequestDrawer = ({
  isOpen,
  onClose,
  supplyRequestItems,
  supplyRequest,
  note,
}: {
  isOpen: boolean;
  onClose: () => unknown;
  supplyRequestItems: string[];
  supplyRequest: number[];
  note: string;
}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
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

        <DrawerBody sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box border="2px" borderColor="gray.200" borderRadius="lg" overflowY="scroll">
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

          <Flex flexDirection="column" alignItems="flex-start">
            <Text fontWeight={700}>Notes:</Text>
            <Text
              flexWrap={'wrap'}
              wordBreak={'break-all'}
              maxHeight={400}
              width={'100%'}
              overflowY={'scroll'}
            >
              {note}
            </Text>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
