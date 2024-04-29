import { useBackend } from '../../contexts/BackendContext';
import { useParams, useNavigate} from 'react-router-dom';
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
} from '@chakra-ui/react';
import {
    ArrowDownIcon,
  } from '@chakra-ui/icons';

import DownloadCSV from '../../utils/downloadCSV';
import PropTypes from 'prop-types';

const ViewDonation = () => {
    const { backend } = useBackend();
    const { id } = useParams();
    const [donationData, setDonationData] = useState([]);
    const [businessName, setBusinessName] = useState('');  
    const navigate = useNavigate(); 

    const getData = async () => {
        try {
        const donationResponse = await backend.get(
          `/donation/${id}`
        );
        setDonationData(donationResponse.data[0]);
        } catch (error) {
            console.error('Error fetching donation data:', error);
        }
      };

    const getBusinessName = async () => {
        console.log('started getbusiness name');
        try {
            const businessResponse = await backend.get(
                `/business/${donationData.business_id}`
            );
            console.log('businessResponse yessir');
            setBusinessName(businessResponse.data[0].name);
        } catch (error) {
            console.error('Error fetching business name:', error);
        }
    }

    const handleDownloadCSV = () => {
        const headers = [
          'business_id',
          'donation_id',
          'food_bank_donation',
          'reporter',
          'email',
          'date',
          'misc_items',
          'volunteer_hours',
          'canned_cat_food_quantity',
          'canned_dog_food_quantity',
          'dry_cat_food_quantity',
          'dry_dog_food_quantity',
        ];
        DownloadCSV(headers, id, 'donation_tracking');
      };
    
    const handleViewBusiness = () => {
        navigate(`/ViewBusiness/${donationData.business_id}`);
      };

    useEffect(() => {
        const fetchData = async () => {
            await getData();
            await getBusinessName();
        };
        fetchData();
    }, []);
    
    return (
        <>
            <Flex pl={10} flexDirection={'column'} pt={10}>
                <Flex alignItems='center' justifyContent={'space-between'} width={'75%'} pb={'5'}>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='#'>Donation Tracking</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem>
                            <BreadcrumbLink href='#'>View Business </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href='#'>{businessName}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <IconButton icon={<box-icon type="solid" name="bell"></box-icon>} />
                </Flex>
                <Flex alignItems='center' justifyContent={'space-between'} width={'75%'} pb={'5'} pt={'10'}>
                    <Heading size='lg'>
                            {businessName}&rsquo;s Donation Summary
                    </Heading>
                    <Flex gap='3' >
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
                        <Stack divider={<StackDivider />} spacing='4'>     
                            <CustomRow title='Donation Site' info={donationData.donation_id} />
                            <CustomRow title='Food Bank' info={donationData.food_bank_donation} />
                            <CustomRow title='Person Reporting' info={donationData.reporter} />
                            <CustomRow title='Email' info={donationData.email} />
                            <CustomRow title='Date Submitted' info={new Date(donationData.date).toLocaleDateString()} />
                            <CustomRow title='Canned Dog Food QTY' info={donationData.canned_dog_food_quantity} />
                            <CustomRow title='Dry Dog Food QTY' info={donationData.dry_dog_food_quantity} />
                            <CustomRow title='Canned Cat Food QTY' info={donationData.canned_cat_food_quantity} />
                            <CustomRow title='Dry Cat Food QTY' info={donationData.dry_cat_food_quantity} />
                            <CustomRow title='Miscellaneous Items' info={donationData.misc_items} />
                            <CustomRow title='Volunteer Hours' info={donationData.volunteer_hours} />
                        </Stack>
                    </CardBody>
                </Card>
            </Flex>
        </>
    );
}

export default ViewDonation;


const CustomRow = ({ title, info }) => {
    const shouldShowLb = ['Canned Dog Food QTY','Dry Dog Food QTY','Canned Cat Food QTY', 'Dry Cat Food QTY'].includes(title);
    console.log(`${title}: ${shouldShowLb}`);
    return (
        <Box>
            <Flex alignContent={'center'} gap={300}>
                <Heading size='xs' textTransform='uppercase' top={'3px'} position={'relative'} width={250}>
                    {title}
                </Heading>
                {typeof info === 'number' && shouldShowLb ? (
                    <Text fontSize='sm'>
                        {info} lb
                    </Text>
                ) : (
                    <Text fontSize='sm'>
                        {info}
                    </Text>
                )}
            </Flex>
        </Box>
    );
};




CustomRow.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
};
