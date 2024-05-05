import { useBackend } from '../../contexts/BackendContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Card,
  Heading,
  CardBody,
  Stack,
  Box,
  Text,
  StackDivider,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';

import DownloadCSV from '../../utils/downloadCSV';
import PropTypes from 'prop-types';

const ViewDonation = () => {
  const { backend } = useBackend();
  const { id } = useParams();
  const toast = useToast();
  const [donationData, setDonationData] = useState([]);
  const [businessName, setBusinessName] = useState('');
  const navigate = useNavigate();

  const handleDownloadCSV = () => {
    try {
      DownloadCSV([id], true);
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
        const businessResponse = await backend.get(`/business/${donationResponse.data[0].business_id}`);
        setBusinessName(businessResponse.data[0].name);
        setDonationData(donationResponse.data[0]);
      } catch (error) {
        console.error('Error fetching donation data:', error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <Flex pl={10} flexDirection={'column'} pt={10}>
        <Flex alignItems="center" justifyContent={'space-between'} width={'75%'} pb={'5'}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate('/DonationTrackingTable')}>Donation Tracking</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => navigate(`/ViewBusiness/${donationData.business_id}`)}>View Business </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">{businessName}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <IconButton icon={<box-icon type="solid" name="bell"></box-icon>} />
        </Flex>
        <Flex alignItems="center" justifyContent={'space-between'} width={'75%'} pb={'5'} pt={'10'}>
          <Heading size="lg">{businessName}&rsquo;s Donation Summary</Heading>
          <Flex gap="3">
            <Button colorScheme="teal" onClick={handleViewBusiness} sx={{ width: '172px' }}>
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
              <CustomRow title="Donation Site" info={donationData.donation_id} />
              <CustomRow title="Food Bank" info={donationData.food_bank_donation} />
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
