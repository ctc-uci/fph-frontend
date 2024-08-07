import { useEffect, useState } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import propTypes from 'prop-types';

import FPH_LOGO from './fph_logo.png';

const ThirdForm = ({ formData, handleChange, prevStep, handleSubmit, setFormData }) => {
  const [businessHours, setBusinessHours] = useState('');
  useEffect(() => {
    setFormData({ ...formData, businessHours });
  }, [businessHours]);

  const TimeInput = ({ label, value, onChange, isReadOnly }) => (
    <Stack direction="row" align="center">
      <FormLabel mb="0">{label}</FormLabel>
      <Select
        value={value.hour}
        onChange={(e) => onChange({ ...value, hour: e.target.value })}
        w="auto"
        disabled={isReadOnly}
      >
        {[...Array(12).keys()].map((h) => (
          <option key={h} value={h + 1}>
            {h + 1}
          </option>
        ))}
      </Select>
      <Select
        value={value.minute}
        onChange={(e) => onChange({ ...value, minute: e.target.value })}
        w="auto"
        disabled={isReadOnly}
      >
        {['00', '15', '30', '45'].map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </Select>
      <Select
        value={value.ampm}
        onChange={(e) => onChange({ ...value, ampm: e.target.value })}
        w="auto"
        disabled={isReadOnly}
      >
        {['AM', 'PM'].map((ampm) => (
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

  const handleTimeChange = (e) => {
    setBusinessHours(e.target.value);
  };

  const [termsAndConditionsIsOpened, changeTermsAndConditionsIsOpened] = useState(false);
  const [termsAndConditionsAccepted, changeTermsAndConditionsAccepted] = useState(false);
  const [submitAndAcceptedFalse, changeSubmitAndAcceptedFalse] = useState(false);

  return (
    <>
      <Box p={5}>
        <Image boxSize="8vh" src={FPH_LOGO} />
        <Text paddingLeft="10vh" marginTop="10vh" fontSize="3xl" fontWeight="bold" color="#359797">
          Become a Donation Site
        </Text>
        <Text paddingLeft="10vh" fontSize="sm">
          To get started, fill out the form below.
        </Text>
        <Modal isOpen={termsAndConditionsIsOpened} isCentered>
          <ModalOverlay>
            <ModalContent
              paddingBottom="1vh"
              position="fixed"
              maxWidth="40%"
              height="90%"
              left="55%"
              transform="translateY(-50%)"
            >
              <ModalHeader>
                &nbsp;
                <Stack direction="row" justifyContent="space-between">
                  <Text fontWeight="bold" fontSize="2xl">
                    Terms and Conditions&nbsp;
                  </Text>

                  <ModalCloseButton
                    onClick={() => {
                      changeTermsAndConditionsIsOpened(false);
                    }}
                  />
                </Stack>
              </ModalHeader>
              <ModalBody alignItems="center" overflow={'scroll'}>
                <Text fontSize="xl">
                  I hereby acknowledge and agree to serve as a member/volunteer for Feeding Pets of
                  the Homeless, 710 West Washington Street, Carson City, NV 89703. I give my consent
                  and agree to release, indemnify and hold harmless Feeding Pets of the Homeless
                  (DBA: Pets of the Homeless) and all personnel, including but not limited to its
                  officers, agents and/or employees, other participants, sponsors, advertisers, I
                  hereby assume all of the risks of participating as a volunteer, with respect to
                  any and all injury, disability, death or loss or damage of person or property,
                  whether arising from negligence of the releases or otherwise, to the fullest
                  extent permitted by law. I agree to comply with the guidelines and conditions for
                  participation. See Fundraising Policies here:
                  http://www.petsofthehomeless.org/fundraising-policy-for-pets-of-the-homeless/ Pets
                  of the Homeless reserves the right to terminate this agreement at any time. I also
                  grant Feeding Pets of the Homeless the right to use photographs of me at events
                  and activities and use the photographs in future advertising including online
                  webpage. <br />
                  <br />I acknowledge that all information regarding Pets of the Homeless&apos;
                  operations, procedures, contacts, volunteers, recipients and donors is of a
                  proprietary nature and should not be disclosed or used for any purposes other than
                  the direct benefit of the organization
                  <br />
                  <br />I HAVE READ THIS RELEASE OF LIABILITY AND FULLY UNDERSTAND ITS TERMS AND
                  CONDITIONS.
                  <br />
                  <br />I acknowledge that I am not authorized to speak to the media. I agree to
                  refer all media inquiries to Headquarters, 775-841-7463.
                </Text>
                <Text fontsize="sm" marginTop="5vh">
                  By checking the &quot;I Accept the Terms and Conditions&quot; box and clicking the
                  &quot;Submit&quot; button on this page, you acknowledge you have read and agree to
                  the above.
                </Text>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        </Modal>

        <Stack direction="column">
          <Flex direction="column" align="stretch" gap={5}>
            <Flex direction="column">
              <Box>
                <FormControl
                  marginTop="8vh"
                  paddingLeft="10vh"
                  paddingRight="10vh"
                  id="business-hours"
                >
                  <Text fontSize="xl">Business Hours</Text>
                  <Input value={businessHours} onChange={handleTimeChange}></Input>
                </FormControl>
              </Box>

              <Box>
                <FormControl
                  marginTop="2vh"
                  paddingLeft="10vh"
                  paddingRight="10vh"
                  id="phone-number"
                  flex="1"
                >
                  <Text fontSize="xl">Phone Number</Text>
                  <Input
                    maxLength="12"
                    placeHolder="000-000-0000"
                    name="phoneNumber"
                    type="text"
                    value={formData['phoneNumber']}
                    onChange={(e) => {
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
                  <Text fontSize="xl">How Did You Hear About Us?</Text>
                  <Textarea
                    height="12vh"
                    name="heardAbout"
                    value={formData['heardAbout']}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </FormControl>
              </Box>
            </Flex>
            <Box paddingLeft="10vh">
              <HStack alignItems="center" justifyContent="left">
                <Box justifyContent={'center'}>
                  <Checkbox
                    name="termsAndConditionsAccepted"
                    defaultChecked={formData['termsAndConditionsAccepted']}
                    value={termsAndConditionsAccepted}
                    onChange={(e) => {
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
                  ></Checkbox>
                </Box>
                <Box marginBottom="0.6vh">
                  <Text fontSize="xs">
                    I accept the&nbsp;
                    {
                      <Link
                        textDecoration="underline"
                        onClick={() => {
                          changeTermsAndConditionsIsOpened(true);
                        }}
                      >
                        Terms and Conditions.
                      </Link>
                    }
                  </Text>
                </Box>
              </HStack>
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
                  background="#319795"
                  width="9vh"
                  onClick={async (e) => {
                    if (!termsAndConditionsAccepted) {
                      changeSubmitAndAcceptedFalse(true);
                    } else {
                      await handleSubmit(e);
                    }
                  }}
                  colorScheme="teal"
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
                            <AlertTitle>
                              You haven&apos;t accepted the Terms and Conditions
                            </AlertTitle>
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
  setFormData: propTypes.func.isRequired,
};

export default ThirdForm;
