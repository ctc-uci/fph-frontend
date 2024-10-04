import { useEffect, useState } from 'react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

import { useBackend } from '../../contexts/BackendContext';
import downloadCSV from '../../utils/downloadCSV';
import NotificationsDrawer from '../NotificationsDrawer/NotificationsDrawer';
import classes from './ViewDonation.module.css';

const ViewDonation = () => {
  const { backend } = useBackend();
  const { id } = useParams();
  const toast = useToast();
  const [donationData, setDonationData] = useState([]);
  const [businessName, setBusinessName] = useState('');
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();

  const handleDownloadCSV = () => {
    try {
      downloadCSV([id], true);
      toast({
        title: 'Downloaded CSV',
        description: `for ${businessName}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error Downloading CSV',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleViewBusiness = () => {
    navigate(`/ViewBusiness/${donationData.business_id}`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const donationResponse = await backend.get(`/donation/${id}`);
        const businessResponse = await backend.get(
          `/business/${donationResponse.data[0].business_id}`,
        );
        setBusinessName(businessResponse.data[0].name);
        setDonationData(donationResponse.data[0]);
      } catch (error) {
        console.error('Error fetching donation data:', error);
      }
    };

    const getNotifications = async () => {
      try {
        const notificationResponse = await backend.get('/notifications');
        setNotification(notificationResponse.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    if (notification.length === 0) {
      getNotifications();
    }

    getData();
  }, []);

  return (
    <>
      <Flex pl={10} flexDirection={'column'} pt={10}>
        <Flex alignItems="center" justifyContent={'space-between'} width={'75%'} pb={'5'}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink color="#245F61" onClick={() => navigate('/DonationTrackingTable')}>
                Donation Tracking
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink
                color="#245F61"
                onClick={() => navigate(`/ViewBusiness/${donationData.business_id}`)}
              >
                View Business{' '}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">{businessName}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <NotificationsDrawer notificationsData={notification} />
        </Flex>
        <Flex alignItems="center" justifyContent={'space-between'} width={'75%'} pb={'5'}>
          <Heading size="lg" className={classes.titleText}>
            {businessName}&rsquo;s Donation Submission
          </Heading>
          <Flex gap="3">
            <Button
              onClick={handleViewBusiness}
              sx={{
                width: '172',
                borderRadius: '6px',
                border: '1px solid var(--fph-teal-500-primary, #359797)',
                color: 'var(--fph-teal-500-primary, #359797)',
                backgroundColor: 'transparent',
              }}
            >
              View Business Details
            </Button>
            <Button colorScheme="teal" onClick={handleDownloadCSV} sx={{ width: '172px' }}>
              <ArrowDownIcon sx={{ marginRight: '5px' }} />
              Download CSV
            </Button>
          </Flex>
        </Flex>

        <Card width={'75%'}>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <CustomRow title="Donation ID" info={donationData.donation_id} />
              <CustomRow title="Donation Site" info={donationData.food_bank_donation} />
              <CustomRow title="Person Reporting" info={donationData.reporter} />
              <CustomRow title="Email" info={donationData.email} />
              <CustomRow
                title="Date Submitted"
                info={new Date(donationData.date).toLocaleDateString()}
              />
              <CustomRow title="Canned Dog Food QTY" info={donationData.canned_dog_food_quantity} />
              <CustomRow title="Dry Dog Food QTY" info={donationData.dry_dog_food_quantity} />
              <CustomRow title="Canned Cat Food QTY" info={donationData.canned_cat_food_quantity} />
              <CustomRow title="Dry Cat Food QTY" info={donationData.dry_cat_food_quantity} />
              <CustomRow title="Miscellaneous Items" info={donationData.misc_items} />
              <CustomRow title="Volunteer Hours" info={donationData.volunteer_hours} />
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default ViewDonation;

const CustomRow = ({ title, info }) => {
  const shouldShowLb = [
    'Canned Dog Food QTY',
    'Dry Dog Food QTY',
    'Canned Cat Food QTY',
    'Dry Cat Food QTY',
  ].includes(title);
  return (
    <Box>
      <Flex alignContent={'center'} gap={300}>
        <Heading size="xs" textTransform="uppercase" top={'3px'} position={'relative'} width={250}>
          {title}
        </Heading>
        {typeof info === 'number' && shouldShowLb ? (
          <Text fontSize="sm">{info} lb</Text>
        ) : (
          <Text fontSize="sm">{info}</Text>
        )}
      </Flex>
    </Box>
  );
};

CustomRow.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
};
