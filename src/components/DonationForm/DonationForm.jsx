import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  Flex,
  Heading,
  Text,
  Textarea,
  InputGroup,
  InputLeftElement,
  VStack,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon, DownloadIcon } from '@chakra-ui/icons';
import { useBackend } from '../../contexts/BackendContext';
import { useState } from 'react';
import { PropTypes } from 'prop-types';

const DonationForm = () => {
  const { backend } = useBackend();
  const MAX_ID = 9; // This is the maximum business id in the database. This is a temporary solution since the Figma design does not include a business id in the form.

  const [formData, setFormData] = useState({
    business_id: MAX_ID, // Since there's no business_id in the form and the database requires a business id (foreign key), the default for now is the maximum business id in the database (9)
    canned_cat_food_quantity: null,
    canned_dog_food_quantity: null,
    date: null,
    donation_id: MAX_ID,
    dry_cat_food_quantity: null,
    dry_dog_food_quantity: null,
    email: 'NULL',
    food_bank_donation: 'NULL',
    misc_items: null,
    reporter: null,
    volunteer_hours: null,
  });

  const businessID = 1;

  const submitForm = async event => {
    event.preventDefault();
    await backend.post('/donation', formData);
    const fphNotificationData = {
      message: `Business ID: ${businessID} Donation Form Submission`,
      timestamp: new Date().toLocaleString('en-US', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
      been_dismissed: false,
      type: 'Donation Form Submitted',
    };
    await backend.post('/notification', fphNotificationData);
    const businessNotificationData = {
      message: 'Donation Form Submitted Successfully',
      timestamp: new Date().toLocaleString('en-US', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
      been_dismissed: false,
      type: 'Donation Form Submitted',
    };
    await backend.post('/notification', businessNotificationData);
  };

  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;

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
          <NumberInput defaultValue={1} size="xs" maxW="66px" marginRight={2}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text marginRight={2} marginBottom={1}>
            ea
          </Text>
          <CloseIcon color="red.500" boxSize={3} marginRight={4} />
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

  function CustomInput({ id, placeholder, name, width, flex }) {
    return (
      <Input
        id={id}
        placeholder={placeholder}
        name={name}
        height="40px"
        width={width}
        flex={flex}
        padding="0px 16px 0px 16px"
        onChange={handleChange}
      />
    );
  }

  CustomInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    flex: PropTypes.number,
  };

  function CustomFormLabel({ itemName, htmlFor, labelHeight }) {
    return (
      <FormLabel
        htmlFor={htmlFor}
        fontSize="12px"
        width="160px"
        height={labelHeight}
        fontWeight="700"
      >
        {itemName}
      </FormLabel>
    );
  }

  CustomFormLabel.propTypes = {
    itemName: PropTypes.string.isRequired,
    htmlFor: PropTypes.string.isRequired,
    labelHeight: PropTypes.string.isRequired,
  };

  function CustomFormElement({
    id,
    placeholder,
    name,
    itemName,
    htmlFor,
    labelHeight,
    inputWidth,
  }) {
    return (
      <Flex alignItems="center" marginTop="10px">
        <CustomFormLabel itemName={itemName} htmlFor={htmlFor} labelHeight={labelHeight} />
        <CustomInput id={id} placeholder={placeholder} name={name} width={inputWidth} />
      </Flex>
    );
  }

  CustomFormElement.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    htmlFor: PropTypes.string.isRequired,
    labelHeight: PropTypes.string.isRequired,
    inputWidth: PropTypes.string.isRequired,
  };
  return (
    <>
      <Text margin="30px 0px 20px 32px" fontSize="16px">
        Home / Donation Form
      </Text>
      <Heading marginLeft="32px" fontSize="36px" paddingBottom={'20px'}>
        Donation Form
      </Heading>
      <Box
        bg="#FFFFFF"
        borderRadius="4px"
        margin="0px 32px 0px 32px"
        width="1088px"
        height="1566px"
        top="160px"
        left="320px"
      >
        <Box marginLeft="35px" position="relative">
          <FormControl>
            <Heading fontSize="24px" paddingTop="25px">
              Donation Information
            </Heading>
            <Text fontSize="1xl" marginBottom="10px" paddingTop="15px">
              Please fill out the following form to complete logging the donation of your business.
            </Text>

            <CustomFormElement
              id="companyName"
              placeholder="Company"
              name="companyName"
              itemName="NAME OF COMPANY"
              htmlFor="companyName"
              labelHeight="0px"
              inputWidth={'820px'}
            />

            <Flex alignItems="center" marginTop="10px">
              <CustomFormLabel
                itemName="NAME"
                htmlFor="personFirstName personLastName"
                labelHeight="0px"
              />
              <Flex height="40px" width="820px" alignItems="center" gap="30px">
                <CustomInput id="personFirstName" placeholder="First Name" name="personFirstName" />
                <CustomInput id="personLastName" placeholder="Last Name" name="personLastName" />
              </Flex>
            </Flex>

            <CustomFormElement
              id="email"
              placeholder="Email"
              name="email"
              itemName="EMAIL"
              htmlFor="email"
              labelHeight="0px"
              inputWidth={'820px'}
            />

            <CustomFormElement
              id="website"
              placeholder="Website"
              name="website"
              itemName="WEBSITE"
              htmlFor="website"
              labelHeight="0px"
              inputWidth={'820px'}
            />

            <Flex alignItems="center" marginTop="10px">
              <CustomFormLabel
                itemName="LOCATION"
                htmlFor="streetNumber city state unitNumber zipCode country"
                labelHeight={'50px'}
              />
              <Flex width="820px" alignItems="center" gap="30px">
                <div>
                  <CustomInput id="streetNumber" placeholder="Street Number" name="streetNumber" />
                  <Flex marginTop="10px" gap="20px">
                    <CustomInput id="city" placeholder="City" name="city" />
                    <CustomInput id="state" placeholder="State" name="state" />
                  </Flex>
                </div>
                <div>
                  <CustomInput
                    id="unitNumber"
                    placeholder="Unit or Apartment Number"
                    name="unitNumber"
                  />
                  <Flex marginTop="10px" gap="20px">
                    <CustomInput id="zipCode" placeholder="Zip Code" name="zipCode" />
                    <CustomInput id="country" placeholder="Country" name="country" />
                  </Flex>
                </div>
              </Flex>
            </Flex>

            <Flex alignItems="center" marginTop="10px">
              <CustomFormLabel
                itemName="PHONE NUMBER"
                htmlFor="phoneNumber countryCode"
                labelHeight={'0px'}
              />
              <Flex height="40px" width="820px" alignItems="center" gap="20px">
                <CustomInput id="countryCode" placeholder="+1" name="countryCode" width="187.5px" />
                <CustomInput
                  id="phoneNumber"
                  placeholder="000-000-0000"
                  name="phoneNumber"
                  flex="1"
                />
              </Flex>
            </Flex>

            <CustomFormElement
              id="numberOfHours"
              placeholder="Hours"
              name="numberOfHours"
              itemName="NUMBER OF HOURS WORKED"
              htmlFor="numberOfHours"
              labelHeight="20px"
              inputWidth={'820px'}
            />

            <Flex alignItems="center" marginTop="10px">
              <FormLabel
                htmlFor="activities"
                fontSize="12px"
                width="160px"
                height="90px"
                fontWeight="700"
              >
                BRIEFLY DESCRIBE ACTIVITIES
              </FormLabel>
              <Flex width="820px">
                <Textarea id="activities" height="114px" name="activites" onChange={handleChange} />
              </Flex>
            </Flex>

            <Heading as="h2" size="md" marginTop="10px" marginBottom="10px">
              DONATION INFO
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
                ></Select>
                <InputGroup marginTop="10px">
                  <InputLeftElement>
                    <SearchIcon color="gray.200" />
                  </InputLeftElement>
                  <Input
                    id="search"
                    placeholder="Search"
                    height="40px"
                    width="480px"
                    name="search"
                    borderRadius={'0px'}
                    onChange={handleChange}
                  />
                </InputGroup>
                <CustomSearchBox itemName="Canned Cat Food" />
                <CustomSearchBox itemName="Canned Dog Food" />
                <CustomSearchBox itemName="Canned Pet Food" />
                <CustomSearchBox itemName="Treats" />
              </div>

              <VStack spacing={3}>
                <CustomBox itemName="Canned Cat Food" />
                <CustomBox itemName="Dog Treats" />
                <CustomBox itemName="Canned Dog Food" />
                <CustomBox itemName="Crates" />
                <CustomBox itemName="Dry Dog Food" />
              </VStack>
            </Flex>

            <Flex marginTop="10px">
              <FormLabel
                htmlFor="miscDonations"
                fontSize="12px"
                width="160px"
                height="90px"
                fontWeight="700"
              >
                <VStack alignItems={'flex-start'}>
                  <Text>MISC. DONATIONS</Text>
                  <Text textColor={'gray.600'} fontSize="xs" fontWeight={400}>
                    If your donation item is not listed above, please add the item information with
                    count or pounds to the text box.
                  </Text>
                </VStack>
              </FormLabel>
              <Flex width="820px">
                <Textarea
                  id="miscDonations"
                  height="171px"
                  name="miscDonations"
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
              <Button type="button" onClick={submitForm}>
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
