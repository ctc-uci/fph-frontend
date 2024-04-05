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
  useToast,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import DownloadCSV from '../../utils/downloadCSV';

const NotificationsDrawer = ({ notificationsData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [sortState, setSortState] = useState('');
  const toast = useToast();

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
    'Not Submitted': 'Send Reminder to Business',
    'Submitted Form': 'Download CSV',
    'Supply Request': 'View Request',
    'Edited Information': 'View Information',
  };

  const afterAction = {
    'New Application': 'Storm is closing in',
    'Not Submitted': 'Send Reminder',
    'Submitted Form': 'Download CSV',
    'Supply Request': 'Victory Royale',
    'Edited Information': 'Golden Scar',
  };

  const onActionClick = notification_type => {
    console.log(notification_type);
    return toast({
      title: afterAction[notification_type],
      description: 'meow',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const handleDownloadCSV = ids => {
    const headers = [
      'business_id',
      'notification_id',
      'message',
      'timestamp',
      'been_dismissed',
      'type',
    ];
    DownloadCSV(headers, ids, 'notification');
  };

  return (
    <>
      <IconButton
        onClick={onOpen}
        variant="ghost"
        colorScheme="gray"
        aria-label="Edit menu"
        icon={<BellIcon boxSize="6" />}
        mr={4}
      />
      <Drawer size="sm" isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <BellIcon boxSize={6} mt={10} mb={-10} ml={6} />
          <DrawerHeader mt={-1} ml={12}>
            Notifications
          </DrawerHeader>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Sort By
            </MenuButton>{' '}
            <Badge colorScheme="green">{sortState}</Badge>
            <MenuList>
              <MenuItem onClick={() => setSortState('')}>All</MenuItem>
              <MenuItem onClick={() => setSortState('New Application')}>New Application</MenuItem>
              <MenuItem onClick={() => setSortState('Not Submitted')}>Send Reminder</MenuItem>
              <MenuItem onClick={() => setSortState('Submitted Form')}>Submitted Form</MenuItem>
              <MenuItem onClick={() => setSortState('Supply Request')}>Supply Request</MenuItem>
              <MenuItem onClick={() => setSortState('Edited Information')}>
                Edited Information
              </MenuItem>
            </MenuList>
          </Menu>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {notificationsData
                .filter(notification => sortState === '' || notification.type === sortState)
                .map((notification, index) => (
                  <Box key={index} p={5} shadow="md" borderWidth="1px">
                    <Text>{notification.message}</Text>
                    <Text fontSize="sm">{new Date(notification.timestamp).toLocaleString()}</Text>
                    <Button
                      onClick={() => {
                        onActionClick(notification.type);
                        if (notificationAction[notification.type] === 'Download CSV')
                          handleDownloadCSV([notification.notification_id]);
                      }}
                      rightIcon={<ArrowForwardIcon />}
                    >
                      {notificationAction[notification.type]}
                    </Button>
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
