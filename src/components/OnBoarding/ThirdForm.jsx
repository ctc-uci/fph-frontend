import { useState } from 'react';
import propTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Checkbox,
  Text,
  Box,
  Flex,
  FormLabel,
  FormControl,
  Input,
  Stack,
  Select,
  Alert,
  AlertIcon,
  Link,
  AlertTitle,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  HStack,
  Image,
  Textarea,
} from '@chakra-ui/react';
import FPH_LOGO from './fph_logo.png';

const ThirdForm = ({ formData, handleChange, prevStep, handleSubmit }) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [businessHours, changeBusinessHours] = useState(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          start: { hour: '9', minute: '00', ampm: 'AM' },
          end: { hour: '5', minute: '00', ampm: 'PM' },
        },
      }),
      {},
    ),
  );

  const TimeInput = ({ label, value, onChange, isReadOnly }) => (
    <Stack direction="row" align="center">
      <FormLabel mb="0">{label}</FormLabel>
      <Select
        value={value.hour}
        onChange={e => onChange({ ...value, hour: e.target.value })}
        w="auto"
        disabled={isReadOnly}
      >
        {[...Array(12).keys()].map(h => (
          <option key={h} value={h + 1}>
            {h + 1}
          </option>
        ))}
      </Select>
      <Select
        value={value.minute}
        onChange={e => onChange({ ...value, minute: e.target.value })}
        w="auto"
        disabled={isReadOnly}
      >
        {['00', '15', '30', '45'].map(m => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>
      <Select
        value={value.ampm}
        onChange={e => onChange({ ...value, ampm: e.target.value })}
        w="auto"
        disabled={isReadOnly}
      >
        {['AM', 'PM'].map(ampm => (
          <option key={ampm} value={ampm}>
            {ampm}
          </option>
        ))}
      </Select>
    </Stack>
  );

  TimeInput.propTypes = {
    label: propTypes.string.isRequired,
    value: propTypes.shape({
      hour: propTypes.string.isRequired,
      minute: propTypes.string.isRequired,
      ampm: propTypes.string.isRequired,
    }).isRequired,
    onChange: propTypes.func.isRequired,
    isReadOnly: propTypes.bool.isRequired,
  };

  const handleTimeChange = (day, period, value) => {
    changeBusinessHours({ ...businessHours, [day]: { ...businessHours[day], [period]: value } });
  };

  const [termsAndConditionsIsOpened, changeTermsAndConditionsIsOpened] = useState(false);
  const [termsAndConditionsAccepted, changeTermsAndConditionsAccepted] = useState(false);
  const [submitAndAcceptedFalse, changeSubmitAndAcceptedFalse] = useState(false);

  return (
    <>
      <Box p={5}>
        <Image boxSize="8vh" src={FPH_LOGO} />
        <Text paddingLeft="10vh" marginTop="5vh" fontSize="3xl" fontWeight="bold" color="#359797">
          Become a Donation Site
        </Text>
        <Text paddingLeft="10vh" fontSize="sm">
          To get started, fill out the form below.
        </Text>
        {termsAndConditionsIsOpened ? (
          <Modal isOpen={true} size="3xl" isCentered>
            <ModalOverlay>
              <ModalContent paddingBottom="1vh" alignItems="center">
                <ModalHeader>
                  {' '}
                  <Text marginLeft="1vh" fontSize="2xl">
                    Terms and Conditions{' '}
                  </Text>
                </ModalHeader>
                <ModalBody>
                  <Text fontWeight="bold" fontSize="sm">
                    I hereby acknowledge and agree to serve as a member/volunteer for Feeding Pets
                    of the Homeless, 710 West Washington Street, Carson City, NV 89703. I give my
                    consent and agree to release, indemnify and hold harmless Feeding Pets of the
                    Homeless (DBA: Pets of the Homeless) and all personnel, including but not
                    limited to its officers, agents and/or employees, other participants, sponsors,
                    advertisers, I hereby assume all of the risks of participating as a volunteer,
                    with respect to any and all injury, disability, death or loss or damage of
                    person or property, whether arising from negligence of the releases or
                    otherwise, to the fullest extent permitted by law. I agree to comply with the
                    guidelines and conditions for participation. See Fundraising Policies here:
                    http://www.petsofthehomeless.org/fundraising-policy-for-pets-of-the-homeless/
                    Pets of the Homeless reserves the right to terminate this agreement at any time.
                    I also grant Feeding Pets of the Homeless the right to use photographs of me at
                    events and activities and use the photographs in future advertising including
                    online webpage. I acknowledge that all information regarding Pets of the
                    Homeless' operations, procedures, contacts, volunteers, recipients and donors is
                    of a proprietary nature and should not be disclosed or used for any purposes
                    other than the direct benefit of the organization. I acknowledge that I am not
                    authorized to speak to the media. I agree to refer all media inquiries to
                    Headquarters, 775-841-7463.
                  </Text>
                  <Text fontsize="sm" marginTop="5vh">
                    By checking the "I Accept the Terms and Conditions" box and clicking the
                    "Submit" button on this page, you acknowledge you have read and agree to the
                    above.
                  </Text>
                </ModalBody>
                <Button
                  onClick={() => {
                    changeTermsAndConditionsIsOpened(false);
                  }}
                >
                  Close
                </Button>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        ) : (
          <Stack direction="column">
            <Flex direction="column" align="stretch" gap={5}>
              <Flex direction="column">
                <Box>
                  <FormControl marginTop="8vh" paddingLeft="10vh" id="business-hours">
                    <FormLabel>Business Hours</FormLabel>
                    <Popover width="auto">
                      <PopoverTrigger>
                        <Button bg="none" borderColor="#E2E8F0" borderWidth="1px">
                          Select Hours
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent width="full">
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Hours</PopoverHeader>
                        <PopoverBody>
                          {daysOfWeek.map(day => (
                            <Flex key={day} justify="space-between" align="center">
                              <Box width="20vh" flexBasis="100px">
                                {day}
                              </Box>
                              <TimeInput
                                label="From"
                                value={businessHours[day].start}
                                onChange={value => handleTimeChange(day, 'start', value)}
                              />
                              <TimeInput
                                label="To"
                                value={businessHours[day].end}
                                onChange={value => handleTimeChange(day, 'end', value)}
                              />
                            </Flex>
                          ))}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl
                    marginTop="2vh"
                    paddingLeft="10vh"
                    paddingRight="10vh"
                    width="80vh"
                    id="phone-number"
                    flex="1"
                  >
                    <FormLabel fontSize="small">Phone Number</FormLabel>
                    <Input
                      maxLength="10"
                      name="phoneNumber"
                      type="text"
                      value={formData['phoneNumber']}
                      onChange={e => {
                        handleChange(e);
                      }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    marginTop="3vh"
                    paddingLeft="10vh"
                    paddingRight="10vh"
                    id="heard-about"
                    flex="1"
                  >
                    <FormLabel fontSize="small">How Did You Hear About Us?</FormLabel>
                    <Textarea
                      height="12vh"
                      name="heardAbout"
                      value={formData['heardAbout']}
                      onChange={e => {
                        handleChange(e);
                      }}
                      // Additional properties like resizing and styling can be added here
                    />
                  </FormControl>
                </Box>
              </Flex>
              <Box paddingLeft="10vh">
                <Checkbox
                  name="termsAndConditionsAccepted"
                  defaultChecked={formData['termsAndConditionsAccepted']}
                  value={termsAndConditionsAccepted}
                  onChange={e => {
                    const checked = e.target.checked;
                    const syntheticEvent = {
                      target: {
                        name: e.target.name,
                        value: checked,
                      },
                    };
                    handleChange(syntheticEvent);
                    changeTermsAndConditionsAccepted(checked);
                  }}
                >
                  <Text fontSize="xs">
                    I HAVE READ THIS RELEASE OF LIABILITY AND FULLY UNDERSTAND ITS{' '}
                    {
                      <Link
                        textDecoration="underline"
                        onClick={() => {
                          changeTermsAndConditionsIsOpened(true);
                        }}
                      >
                        TERMS AND CONDITIONS.
                      </Link>
                    }
                  </Text>
                </Checkbox>
              </Box>
              <HStack paddingLeft="10vh" paddingRight="10vh" justifyContent="space-between">
                <Box>
                  <Button
                    variant="outline"
                    borderColor="#319795"
                    color="#319795"
                    width="9vh"
                    type="submit"
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                </Box>
                <Box>
                  <Button
                    type="submit"
                    background="#319795"
                    width="9vh"
                    onClick={async e => {
                      if (!termsAndConditionsAccepted) {
                        changeSubmitAndAcceptedFalse(true);
                      } else {
                        await handleSubmit(e);
                      }
                    }}
                    colorScheme="blue"
                  >
                    Submit
                  </Button>
                </Box>
              </HStack>
              <>
                <Box paddingLeft="10vh" paddingRight="10vh">
                  {submitAndAcceptedFalse ? (
                    <>
                      <Alert borderRadius="2vh" status="error">
                        <Flex align="center" justify="space-between" width="100%">
                          <Box>
                            <HStack>
                              <AlertIcon />
                              <AlertTitle>You haven't accepted the Terms and Conditions</AlertTitle>
                            </HStack>
                          </Box>
                          <Button onClick={() => changeSubmitAndAcceptedFalse(false)}>Close</Button>
                        </Flex>
                      </Alert>
                    </>
                  ) : null}
                </Box>
              </>
            </Flex>
          </Stack>
        )}
      </Box>
    </>
  );
};

ThirdForm.propTypes = {
  handleChange: propTypes.func.isRequired,
  nextStep: propTypes.func.isRequired,
  prevStep: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  formData: propTypes.func.isRequired,
};

export default ThirdForm;
