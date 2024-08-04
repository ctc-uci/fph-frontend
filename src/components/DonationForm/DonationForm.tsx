import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { CloseIcon, DownloadIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';
import { pageStyle, pageTitleStyle } from '../../styles/sharedStyles';
import { VolunteerInformation } from './VolunteerInformation';

const LABELS = {
  'Canned Cat Food': 'canned_cat_food_quantity',
  'Dry Cat Food': 'dry_cat_food_quantity',
  'Canned Dog Food': 'canned_dog_food_quantity',
  'Dry Dog Food': 'dry_dog_food_quantity',
};

export const DonationForm = () => {
  const { backend } = useBackend();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramId = searchParams.get('id');

  const [businessId, setBusinessId] = useState(null);
  const [formData, setFormData] = useState({
    business_id: businessId,
    canned_cat_food_quantity: null,
    canned_dog_food_quantity: null,
    date: null,
    dry_cat_food_quantity: null,
    dry_dog_food_quantity: null,
    email: 'NULL',
    food_bank_donation: 'NULL',
    misc_items: null,
    reporter: null,
    volunteer_hours: null,
    personFirstName: null,
    personLastName: null,
  });

  const [activeItems, setActiveItems] = useState(
    Object.keys(LABELS).reduce(
      (acc, key) => {
        acc[key] = false;
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const item = e.currentTarget.value;
    setActiveItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  useEffect(() => {
    const fetchBusinessId = async () => {
      if (paramId) {
        setFormData((prevState) => ({ ...prevState, business_id: paramId }));
      } else {
        try {
          const businessIdResponse = await backend.get(`/businessUser/${currentUser.uid}`);
          const fetchedBusinessId = businessIdResponse.data[0].id;

          setBusinessId(fetchedBusinessId);
          setFormData((prevState) => ({ ...prevState, business_id: fetchedBusinessId }));
        } catch (error) {
          console.error('Error fetching business ID:', error);
        }
      }
    };

    fetchBusinessId();
  }, []);

  const handleCancelClick = () => {
    if (paramId) {
      navigate(`/ViewBusiness/${paramId}`);
    } else {
      navigate('/BusinessDashboard');
    }
  };

  const submitForm = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    formData.reporter = formData.personFirstName + ' ' + formData.personLastName;
    formData.date = new Date().toLocaleString('en-US');
    delete formData.personFirstName;
    delete formData.personLastName;

    // handle non-active labels with form values
    for (const label in LABELS) {
      if (!activeItems[label]) {
        formData[LABELS[label]] = null;
      }
    }

    // DO TYPE IN THE DATABASE/CODE HERE, BUT THE DATA ASE DOES NOT SUPPORT SOMEONE HELP, CURRENTLY SHOWS AS TYPE:null

    try {
      await backend.post('/donation', formData);
      console.log(formData);

      const fphNotificationData = {
        businessId: businessId,
        message: `Business ID: ${businessId} Donation Form Submission`,
        timestamp: new Date().toLocaleString('en-US', {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
        been_dismissed: false,
        type: 'Submitted Form',
      };
      await backend.post('/notification', fphNotificationData);
    } catch (error) {
      console.error('Form submission failed:', error);
    }
    if (!paramId) {
      navigate('/Congrats');
    } else {
      navigate(`/ViewBusiness/${paramId}`);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name;
    let value: string | number = event.target.value;

    if (event.target.type === 'number') {
      value = value ? parseInt(value, 10) : '';
    }
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Flex sx={pageStyle}>
      <Breadcrumb spacing="2">
        <BreadcrumbItem>
          <BreadcrumbLink color="#245F61" onClick={handleCancelClick}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Donation Form</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading sx={pageTitleStyle}>Donation Form</Heading>

      <Box bg="white" borderRadius="lg">
        <FormControl sx={{ padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <VolunteerInformation handleChange={handleChange} />
          <Divider />

          <Flex sx={{ flexDirection: 'column', gap: 4 }}>
            <Box>
              <Heading fontSize={24} as="h2">
                Donation Information
              </Heading>
              <Text>
                Please select the category, amount, or weight of the items you are donating.
              </Text>
            </Box>

            <Flex sx={{ flexDirection: 'column', gap: 2 }}>
              <Text>Donated Item(s)</Text>
              <Flex direction={{ base: 'column', xl: 'row' }} gap={4}>
                <CheckboxGroup>
                  <Stack>
                    {Object.keys(LABELS).map((item) => (
                      <Checkbox
                        key={item}
                        value={item}
                        width={155}
                        textColor="gray.500"
                        onChange={handleCheckboxChange}
                      >
                        {item}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
                <Stack spacing={3} width={'100%'}>
                  {Object.keys(activeItems).map((item) => {
                    if (activeItems[item]) {
                      return (
                        <CustomBox
                          key={item}
                          itemName={item}
                          formData={formData}
                          setFormData={setFormData}
                        />
                      );
                    }
                    return null;
                  })}
                </Stack>
              </Flex>
            </Flex>

            <Flex>
              <FormLabel htmlFor="miscDonations" fontSize="12px" width="160px" fontWeight="700">
                <VStack alignItems={'flex-start'}>
                  <Divider />
                  <Text>MISC. DONATIONS</Text>
                  <Text textColor={'gray.600'} fontSize="xs" fontWeight={400}>
                    If your donation item is not listed above, please add the item information with
                    count or pounds to the text box.
                  </Text>
                </VStack>
              </FormLabel>
              <Flex width={'100%'}>
                <Textarea
                  id="misc_items"
                  height="171px"
                  name="misc_items"
                  onChange={handleChange}
                />
              </Flex>
            </Flex>

            <Flex>
              <FormLabel htmlFor="photos" fontSize="12px" width="160px" fontWeight="700">
                <VStack alignItems={'flex-start'}>
                  <Divider />
                  <Text>UPLOAD PHOTOS</Text>
                  <Text textColor={'gray.600'} fontSize="xs" fontWeight={400}>
                    Please insert any photos that were taken while volunteering.
                  </Text>
                </VStack>
              </FormLabel>
              <Flex width={'100%'}>
                <Box
                  width={'100%'}
                  height={200}
                  borderColor="teal.200"
                  borderStyle="dashed"
                  borderWidth="2px"
                  bgColor="teal.50"
                  borderRadius={'md'}
                  alignContent={'center'}
                >
                  <Box>
                    <VStack>
                      <Text>Drag files here or</Text>
                      <Button
                        bgColor="white"
                        borderColor="teal.200"
                        borderWidth="2px"
                        leftIcon={<DownloadIcon color="gray.300" />}
                      >
                        Upload File
                      </Button>
                    </VStack>
                  </Box>
                </Box>
              </Flex>
            </Flex>
          </Flex>

          <Flex justifyContent={'flex-end'} gap={2}>
            <Button type="button" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button type="button" colorScheme="teal" onClick={submitForm}>
              Submit
            </Button>
          </Flex>
        </FormControl>
      </Box>
    </Flex>
  );
};

// Note that unit of measure, food bank donation, volunteer description, photo upload, and volunteer name is NOT tracked in the backend database, however it is detailed in the Figma design.
// Unused data points: business_id, donation_id, email, food_bank_donation
// Quantities look discrete in the backend, however it seems from the design that they are measured in ounces, cups, and grams. I'm not sure how to handle this discrepency. Will keep as an int to stay consistent w/ backend for now.

function CustomBox({
  itemName,
  formData,
  setFormData,
}: {
  itemName: string;
  formData;
  setFormData;
}) {
  return (
    <Box
      width={'100%'}
      maxWidth={480}
      height={50}
      border="1px"
      borderColor="gray.200"
      alignContent={'center'}
    >
      <Flex alignItems="center">
        <Text marginLeft="10px">{itemName}</Text>
        <Spacer />
        <NumberInput
          value={formData[LABELS[itemName]] || 0}
          min={0}
          size="xs"
          maxW="66px"
          marginRight={2}
          name={itemName}
          onChange={(value) => {
            setFormData((prevState) => ({
              ...prevState,
              [LABELS[itemName]]: parseInt(value),
            }));
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text marginRight={2} marginBottom={1}>
          ea
        </Text>
        <CloseIcon
          color="red.500"
          boxSize={3}
          marginRight={4}
          cursor="pointer"
          onClick={() => {
            setFormData((prevState) => ({
              ...prevState,
              [LABELS[itemName]]: 0,
            }));
          }}
        />
      </Flex>
    </Box>
  );
}
