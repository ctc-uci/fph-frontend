import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Button,
  Box,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { ChevronDownIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import DownloadCSV from '../../utils/downloadCSV';
import { useNavigate } from 'react-router-dom';
import 'boxicons';
import { useBackend } from '../../contexts/BackendContext';

const NotificationsDrawer = ({ notificationsData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [sortState, setSortState] = useState('');
  const navigate = useNavigate();
  //const toast = useToast();
  const { backend } = useBackend();

  NotificationsDrawer.propTypes = {
    notificationsData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  const notificationAction = {
    'New Application': 'View Application',
    'Not Submitted': 'Send Reminder',
    'Submitted Form': 'Download CSV',
    'Supply Request': 'View Request',
    'Edited Information': 'View Information',
  };

  const handleDownloadCSV = ids => {
    DownloadCSV(ids);
  };

  const handleSendReminder = async (businessId, businessName) => {
    try {
      const requestData = {
        businessId: businessId,
        businessName: businessName,
        senderId: 0,
        message: null,
        type: 'Not Submitted',
        donationId: null,
      };

      await backend.post('/notification', requestData);
    } catch (error) {
      console.error('Error sending reminders:', error);
    }
  };

  const getNotifBadge = type => {
    return (
      <Flex>
        <Badge borderRadius="full" px="2" bgColor="#359797" width="26px" height={'26px'}>
          <Flex justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100%'}>
            {type == 'New Application' && (
              <box-icon size="18px" name="buildings" type="regular" color={'white'}></box-icon>
            )}
            {type == 'Not Submitted' && (
              <box-icon size="18px" name="envelope" type="regular" color={'white'}></box-icon>
            )}
            {type == 'Submitted Form' && (
              <box-icon size="18px" name="check" type="regular" color={'white'}></box-icon>
            )}
            {type == 'Supply Request' && (
              <box-icon size="18px" name="package" type="regular" color={'white'}></box-icon>
            )}
            {type == 'Edited Information' && (
              <box-icon size="18px" name="edit" type="regular" color={'white'}></box-icon>
            )}
          </Flex>
        </Badge>
      </Flex>
    );
  };

  const getSortState = () => {
    switch (sortState) {
      case 'New Application':
        return (
          <>
            <box-icon name="buildings" type="regular" color={'black'}></box-icon>
            <Text>New application</Text>
          </>
        );
      case 'Not Submitted':
        return (
          <>
            <box-icon name="envelope" type="regular" color={'black'}></box-icon>
            <Text>Send reminder</Text>
          </>
        );
      case 'Submitted Form':
        return (
          <>
            <box-icon name="check" type="regular" color={'black'}></box-icon>
            <Text>Submitted form</Text>
          </>
        );
      case 'Supply Request':
        return (
          <>
            <box-icon name="package" type="regular" color={'black'}></box-icon>
            <Text>Supply request</Text>
          </>
        );
      case 'Edited Information':
        return (
          <>
            <box-icon name="edit" type="regular" color={'black'}></box-icon>
            <Text>Edited information</Text>
          </>
        );
      default:
        return <></>;
    }
  };

  const getNotificationText = type => {
    if (type === 'New Application') {
      return 'Sent a business application.';
    }
    if (type === 'Not Submitted') {
      return 'Donation form not submitted this quarter.';
    }
    if (type === 'Submitted Form') {
      return 'Submitted their donation form.';
    }
    if (type === 'Supply Request') {
      return 'Sent a supply request.';
    }
    if (type === 'Edited Information') {
      return 'Edited their business information.';
    }
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="ghost"
        colorScheme="gray"
        aria-label="Edit menu"
        icon={<box-icon name="bell" type="regular" color={'black'}></box-icon>}
        mr={4}
      />
      <Drawer size="lg" isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Box boxSize={6} mt={6} mb={-10} ml={6}>
            <box-icon name="bell" type="regular" color={'black'}></box-icon>
          </Box>
          <DrawerHeader mt={-1} ml={12}>
            Notifications
          </DrawerHeader>
          <Flex gap={0}>
            <Flex marginLeft={'24px'} marginRight={'0px'} width={'172px'}>
              <Menu
                px={4}
                py={2}
                borderRadius={'md'}
                borderWidth={1}
                transition={'all 0.2s'}
                variant={'outline'}
              >
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant={'outline'}>
                  Sort By
                </MenuButton>{' '}
                <MenuList>
                  <MenuItem
                    width={'96%'}
                    margin={'auto'}
                    borderRadius={2}
                    onClick={() => setSortState('')}
                  >
                    All
                  </MenuItem>
                  <MenuItem
                    width={'96%'}
                    margin={'auto'}
                    borderRadius={2}
                    onClick={() => setSortState('New Application')}
                  >
                    New Application
                  </MenuItem>
                  <MenuItem
                    width={'96%'}
                    margin={'auto'}
                    borderRadius={2}
                    onClick={() => setSortState('Not Submitted')}
                  >
                    Send Reminder
                  </MenuItem>
                  <MenuItem
                    width={'96%'}
                    margin={'auto'}
                    borderRadius={2}
                    onClick={() => setSortState('Submitted Form')}
                  >
                    Submitted Form
                  </MenuItem>
                  <MenuItem
                    width={'96%'}
                    margin={'auto'}
                    borderRadius={2}
                    onClick={() => setSortState('Supply Request')}
                  >
                    Supply Request
                  </MenuItem>
                  <MenuItem
                    width={'96%'}
                    margin={'auto'}
                    borderRadius={2}
                    onClick={() => setSortState('Edited Information')}
                  >
                    Edited Information
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Flex marginLeft={'-24px'} width={'172px'}>
              {sortState === '' || (
                <Badge width={'100%'} height={'100%'}>
                  <Flex justifyContent={'space-evenly'} alignItems={'center'} height={'100%'}>
                    {getSortState()}
                  </Flex>
                </Badge>
              )}
            </Flex>
          </Flex>

          <DrawerBody marginTop={2}>
            <VStack spacing={4} align="stretch">
              {notificationsData
                .filter(notification => sortState === '' || notification.type === sortState)
                .map((notification, index) => (
                  <Box key={index} p={5} shadow="md" borderWidth="1px">
                    <Flex alignItems={'center'} justifyContent={'space-between'} gap={4}>
                      {getNotifBadge(notification.type)}
                      <Flex flexDirection={'column'} width={'75%'}>
                        <Text>{getNotificationText(notification.type)}</Text>
                        <Text fontSize="sm">
                          {new Date(notification.timestamp).toLocaleString()}
                        </Text>
                      </Flex>
                      <Button
                        _hover={'none'}
                        onClick={() => {
                          if (notificationAction[notification.type] === 'Download CSV') {
                            handleDownloadCSV([notification.sender_id]);
                          } else if (notificationAction[notification.type] === 'View Request') {
                            navigate(`/ViewRequest/${notification.sender_id}`);
                          } else if (
                            notificationAction[notification.type] === 'View Application' ||
                            notificationAction[notification.type] === 'View Information'
                          ) {
                            navigate(`/ViewBusiness/${notification.sender_id}`);
                          } else if (notificationAction[notification.type] === 'Send Reminder') {
                            handleSendReminder(notification.sender_id, notification.business_name);
                          }
                        }}
                        rightIcon={<ArrowForwardIcon />}
                        variant={'ghost'}
                      >
                        {notificationAction[notification.type]}
                      </Button>
                    </Flex>
                  </Box>
                ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotificationsDrawer;
