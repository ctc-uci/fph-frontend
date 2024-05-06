import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Flex,
  Heading,
  Text,
  Textarea,
  VStack,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
  Divider,
} from '@chakra-ui/react';
import { CloseIcon, DownloadIcon } from '@chakra-ui/icons';
import { useBackend } from '../../contexts/BackendContext';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import classes from './DonationForm.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const DonationForm = () => {
  const { backend } = useBackend();
  const { currentUser } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramId = searchParams.get('id');
  const labels = {
    'Canned Cat Food': 'canned_cat_food_quantity',
    'Dry Cat Food': 'dry_cat_food_quantity',
    'Canned Dog Food': 'canned_dog_food_quantity',
    'Dry Dog Food': 'dry_dog_food_quantity',
  };
  const navigate = useNavigate();

  const [businessId, setBusinessId] = useState(null);
  const FPH_ID = 0;
  const [businessName, setBusinessName] = useState('');

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
  });

  useEffect(() => {
    const fetchBusinessId = async () => {
      if (paramId) {
        setFormData(prevState => ({ ...prevState, business_id: paramId }));
      } else {
        try {
          const businessIdResponse = await backend.get(`/businessUser/${currentUser.uid}`);
          console.log(businessIdResponse)
          const fetchedBusinessId = businessIdResponse.data[0].id;
          setBusinessId(fetchedBusinessId);
          setFormData(prevState => ({ ...prevState, business_id: fetchedBusinessId }));
          const businessNameResponse = await backend.get(`/business/${fetchedBusinessId}`);
          setBusinessName(businessNameResponse.data[0].name);
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

  const submitForm = async event => {
    event.preventDefault();
    console.log(formData);

    formData.reporter = formData.personFirstName + ' ' + formData.personLastName;
    formData.date = new Date().toLocaleString('en-US');
    delete formData.personFirstName;
    delete formData.personLastName;

    // DO TYPE IN THE DATABASE/CODE HERE, BUT THE DATA ASE DOES NOT SUPPORT SOMEONE HELP, CURRENTLY SHOWS AS TYPE:null

    try {
      const donation_data = await backend.post('/donation', formData);
      const donationId = donation_data.data[0].donation_id;
      console.log('Donation data:', donation_data.data[0]);
      const fphNotificationData = {
        businessId: FPH_ID,
        senderId: formData.business_id,
        businessName,
        donationId: donationId,
        message: null,
        type: 'Submitted Form',
      };
      console.log('Notification data:', fphNotificationData);
      await backend.post('/notification', fphNotificationData);
    } catch (error) {
      console.error('Form submission failed:', error);
    }
    if (!paramId) {
      navigate('/Congrats');
    } else {
      navigate(`/ViewBusiness/${paramId}`)
    }
  };

  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;
    console.log(name, value);

    if (event.target.type === 'number') {
      value = value ? parseInt(value, 10) : '';
    }
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  function CustomBox({ itemName }) {
    return (
      <Box
        width="480px"
        border="1px"
        borderColor="gray.200"
        borderRadius={'sm'}
        height="49px"
        alignContent={'center'}
      >
        <Flex alignItems="center">
          <Text marginLeft="10px">{itemName}</Text>
          <Spacer />
          <NumberInput
            value={formData[labels[itemName]] || 0}
            min={0}
            size="xs"
            maxW="66px"
            marginRight={2}
            name={itemName}
            onChange={value => {
              setFormData(prevState => ({
                ...prevState,
                [labels[itemName]]: parseInt(value),
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
              setFormData(prevState => ({
                ...prevState,
                [labels[itemName]]: 0,
              }));
            }}
          />
        </Flex>
      </Box>
    );
  }

  CustomBox.propTypes = {
    itemName: PropTypes.string.isRequired,
  };

  function CustomSearchBox({ itemName }) {
    return (
      <Box width="480px" border="1px" borderColor="gray.200" height="40px" alignContent={'center'}>
        <Checkbox marginLeft="10px">{itemName}</Checkbox>
      </Box>
    );
  }

  CustomSearchBox.propTypes = {
    itemName: PropTypes.string.isRequired,
  };

  function CustomFormElement({ id, placeholder, name, htmlFor, inputWidth, labelText }) {
    return (
      <FormControl>
        <Flex alignItems="center">
          <FormLabel htmlFor={htmlFor} width="4px" fontSize="12px" fontWeight="700">
            {labelText}
          </FormLabel>
          <Input
            id={id}
            placeholder={placeholder}
            name={name}
            width={inputWidth}
            value={formData[labels[name]]}
            onChange={handleChange}
          />
        </Flex>
      </FormControl>
    );
  }

  CustomFormElement.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    htmlFor: PropTypes.string.isRequired,
    inputWidth: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
  };
  return (
    <>
      <Breadcrumb spacing="2" mt="30px" ml="32px">
        <BreadcrumbItem>
          <BreadcrumbLink color="#245F61" onClick={handleCancelClick}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Donation Form</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Heading marginLeft="32px" mt={5} fontSize="36px" paddingBottom={'20px'}>
        Donation Form
      </Heading>
      <Box
        bg="#FFFFFF"
        borderRadius="4px"
        margin="0px 32px 40px 32px"
        width="1088px"
        height="900px"
        top="160px"
        left="320px"
      >
        <Box marginLeft="35px" position="relative">
          <FormControl>
            <Heading fontSize="24px" paddingTop="25px">
              Volunteer Information
            </Heading>
            <Text fontSize="1xl" marginBottom="10px" paddingTop="15px">
              Please fill out the following form to log your donation totals.
            </Text>
            <Flex alignItems="center" marginTop="5px" width="80%" marginLeft={-55}>
              <FormLabel
                itemName="NAME"
                htmlFor="personFirstName personLastName"
                labelHeight="0px"
                className={classes.form_label}
              ></FormLabel>
              <Text className={classes.form_label} width={70}>
                NAME
              </Text>
              <Flex height="40px" width="820px" alignItems="center" gap={4}>
                <Input
                  id="personFirstName"
                  placeholder="First Name"
                  name="personFirstName"
                  onChange={handleChange}
                  isRequired={true}
                />
                <Input
                  id="personLastName"
                  placeholder="Last Name"
                  name="personLastName"
                  onChange={handleChange}
                  isRequired={true}
                />
              </Flex>
            </Flex>
            <Flex alignItems="center" marginTop="5px" width="80%" marginLeft={-55}>
              <FormLabel
                itemName="EMAIL"
                htmlFor="email"
                labelHeight="0px"
                className={classes.form_label}
              ></FormLabel>
              <Text className={classes.form_label} width={70}>
                EMAIL
              </Text>
              <Input
                id="email"
                placeholder="Email"
                name="email"
                width="820px"
                onChange={handleChange}
                isRequired={true}
              />
            </Flex>
            <Flex alignItems="center" marginTop="5px" width="80%" marginLeft={-55}>
              <FormLabel
                itemName="volunteer_hours"
                htmlFor="hours"
                labelHeight="0px"
                className={classes.form_label}
              ></FormLabel>
              <Text className={classes.form_label} width={70}>
                HOURS
              </Text>
              <Input
                id="volunteer_hours"
                placeholder="Number of Hours Worked"
                name="volunteer_hours"
                width="820px"
                onChange={handleChange}
                isRequired={true}
              />
            </Flex>
            <Divider borderColor="black" my={4} />{' '}
            {/* Customize margin as needed for visual spacing */}
            <Heading as="h2" size="md" marginTop="30px" marginBottom="10px">
              {' '}
              {/* Increased top margin */}
              Donation Information
            </Heading>
            <Text fontWeight="500" fontSize="14px" marginTop="10px" marginBottom="10px">
              Please select the category, amount, or weight of the items you are donating.
            </Text>
            <Text fontWeight="700" fontSize="12px" marginTop="10px" marginBottom="10px">
              DONATION FOOD ITEM
            </Text>
            <Flex width="990px" gap="30px">
              <div>
                <Select
                  placeholder="Select..."
                  height="40px"
                  width="480px"
                  textColor={'gray.500'}
                  onChange={event => {
                    const selectedItem = event.target.value;
                    setFormData(prevState => ({
                      ...prevState,
                      [labels[selectedItem]]: 1, // Set the initial quantity to 1 when an item is selected
                    }));
                  }}
                >
                  <option value="Canned Cat Food">Canned Cat Food</option>
                  <option value="Dry Cat Food">Dry Cat Food</option>
                  <option value="Canned Dog Food">Canned Dog Food</option>
                  <option value="Dry Dog Food">Dry Dog Food</option>
                </Select>
              </div>

              <VStack spacing={3}>
                {Object.entries(labels).map(([itemName, itemKey]) => {
                  if (formData[itemKey] > 0) {
                    return <CustomBox key={itemKey} itemName={itemName} />;
                  }
                  return null;
                })}
              </VStack>
            </Flex>
            <Flex marginTop="40px">
              <FormLabel
                htmlFor="miscDonations"
                fontSize="12px"
                width="160px"
                height="90px"
                fontWeight="700"
              >
                <VStack alignItems={'flex-start'}>
                  <Divider borderColor="black" />
                  <Text>MISC. DONATIONS</Text>
                  <Text textColor={'gray.600'} fontSize="xs" fontWeight={400}>
                    If your donation item is not listed above, please add the item information with
                    count or pounds to the text box.
                  </Text>
                </VStack>
              </FormLabel>
              <Flex width="820px">
                <Textarea
                  id="misc_items"
                  height="171px"
                  name="misc_items"
                  onChange={handleChange}
                />
              </Flex>
            </Flex>
            <Flex marginTop="10px">
              <FormLabel
                htmlFor="photos"
                fontSize="12px"
                width="160px"
                height="90px"
                fontWeight="700"
              >
                <VStack alignItems={'flex-start'}>
                  <Text>UPLOAD PHOTOS</Text>
                  <Text textColor={'gray.600'} fontSize="xs" fontWeight={400}>
                    Please insert any photos that were taken while volunteering.
                  </Text>
                </VStack>
              </FormLabel>
              <Flex width="820px">
                <Box
                  height="171px"
                  width="820px"
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
            <Flex justifyContent={'flex-end'} marginRight="60px" marginTop="20px" gap="20px">
              <Button type="button" onClick={handleCancelClick}>
                Cancel
              </Button>
              <Button type="button" colorScheme="teal" onClick={submitForm}>
                Submit
              </Button>
            </Flex>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};
// Note that unit of measure, food bank donation, volunteer description, photo upload, and volunteer name is NOT tracked in the backend database, however it is detailed in the Figma design.
// Unused data points: business_id, donation_id, email, food_bank_donation
// Quantities look discrete in the backend, however it seems from the design that they are measured in ounces, cups, and grams. I'm not sure how to handle this discrepency. Will keep as an int to stay consistent w/ backend for now.

export default DonationForm;
