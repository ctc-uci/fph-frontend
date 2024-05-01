/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useBackend } from '../../contexts/BackendContext';
import { useNavigate } from 'react-router-dom';
import { renderEmail } from 'react-html-email';
import approvedEmailTemplate from '../../templates/ApprovedBusinessTemplate';
import deniedEmailTemplate from '../../templates/DeniedBusinessEmailTemplate';
import {
  Text,
  Flex,
  IconButton,
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Td,
  Tr,
  Button,
  Table,
  Thead,
  TableContainer,
  Select,
  SimpleGrid,
  Tbody,
  Link as ChakraLink,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
const PendingBusiness = ({ data, handleHome }) => {
  const { backend } = useBackend();
  const navigate = useNavigate();
  const toast = useToast();

  const [pendingStatus, setPendingStatus] = useState();

  useEffect(() => {
    const getResidentialStatus = async () => {
      try {
        const businessResponse = await backend.get(`/business/${data.id}`);
        const residentialStatus = businessResponse.data[0].residential;
        setPendingStatus(residentialStatus.toUpperCase());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getResidentialStatus();
  }, []);

  const showToast = () => {
    toast({
      title: 'Approval Status',
      description: 'Approval successful!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleApproveDeny = async action => {
    const emailSubject =
      action === 'Active' ? `FPH Has Approved Your Application` : `FPH Has Denied Your Application`;
    console.log(data);
    const emailData = {
      //   email: data.primary_email,
      email: 'jalipton11@gmail.com',
      messageHtml: renderEmail(
        action === 'Active' ? approvedEmailTemplate(data.id) : deniedEmailTemplate(),
      ),
      subject: emailSubject,
    };
    try {
      await backend.put(`/business/${data.id}`, {
        status: action,
        onboardingStatus: action,
      });
      await backend.post('/email/send', emailData);
      navigate('/adminDashboard');
      showToast();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = event => {
    setPendingStatus(event.target.value);
  };

  const handleSave = async () => {
    await backend.put(`/business/${data.id}`, {
      residential: pendingStatus,
    });
  };

  return (
    <>
      {data ? (
        <>
          <Flex
            justify="flex-end"
            wrap="nowrap"
            maxW="80%"
            mx="auto"
            flexDirection={'column'}
            ml="39"
          >
            <Flex justifyContent={'space-between'} mr="auto" w="70vw" marginTop={4}>
              <Flex gap={1}>
                <ChakraLink onClick={handleHome} color="blue.500" decoration="underline">
                  Home{' '}
                </ChakraLink>
                <Text>/ {data.name}</Text>
              </Flex>

              <IconButton icon={<box-icon type="solid" name="bell"></box-icon>} />
            </Flex>
          </Flex>

          <Card maxW="100%" w="64vw" h="auto" p={6} mt="10" ml="10" mb="10">
            <CardHeader>
              <Flex justify="space-between" align="center" w="full">
                <Flex align="center" gap="4">
                  <Box>
                    <Heading size="lg">{data.name}</Heading>
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <Flex direction="row">
                <Box flex="2">
                  <Card>
                    <Flex alignItems="left">
                      <TableContainer>
                        <SimpleGrid columns={2} spacing={4}>
                          <Table variant="unstyled">
                            <Thead></Thead>
                            <Tbody>
                              <Tr>
                                <Flex flexDirection="column">
                                  <Td mb={-6}>
                                    <Text fontSize="xs" color="500" as="b">
                                      {' '}
                                      NAME{' '}
                                    </Text>
                                  </Td>
                                  <Td>
                                    <Text fontSize="xs" color="500">
                                      {data.contact_name}
                                    </Text>
                                  </Td>
                                </Flex>
                              </Tr>
                              <Tr>
                                <Flex flexDirection="column">
                                  <Td mb={-6}>
                                    <Text fontSize="xs" color="500" as="b">
                                      EMAIL
                                    </Text>
                                  </Td>
                                  <Td>
                                    <Text fontSize="xs" color="500">
                                      {data.primary_email}
                                    </Text>
                                  </Td>
                                </Flex>
                              </Tr>
                              <Tr>
                                <Flex flexDirection="column">
                                  <Td mb={-6}>
                                    <Text fontSize="xs" color="500" as="b">
                                      WEBSITE
                                    </Text>
                                  </Td>
                                  <Td>
                                    <Text fontSize="xs" color="500">
                                      {data.website}
                                    </Text>
                                  </Td>
                                </Flex>
                              </Tr>
                              <Tr>
                                <Flex flexDirection="column">
                                  <Td mb={-6}>
                                    <Text fontSize="xs" color="500" as="b">
                                      RESEDENTIAL STATUS
                                    </Text>
                                  </Td>
                                  <Td>
                                    <Select
                                      placeholder="Select status"
                                      value={pendingStatus}
                                      onChange={handleChange}
                                    >
                                      <option value="PENDING">PENDING</option>
                                      <option value="RESIDENTIAL">RESIDENTIAL</option>
                                      <option value="NON-RESIDENTIAL">NON-RESIDENTIAL</option>
                                    </Select>
                                  </Td>
                                </Flex>
                              </Tr>
                              <Tr>
                                <Flex flexDirection="column">
                                  <Td mb={-6}>
                                    <Text fontSize="xs" color="500" as="b">
                                      HOW DID YOU HEAR ABOUT US?
                                    </Text>
                                  </Td>
                                  <Td>
                                    <Text fontSize="xs" color="500">
                                      {data.street + ' ' + data.qb_city_state_zip}
                                    </Text>
                                  </Td>
                                </Flex>
                              </Tr>
                            </Tbody>
                          </Table>
                          <Table variant="unstyled">
                            <Thead></Thead>
                            <Tbody>
                              <Tr>
                                <Flex flexDirection="column">
                                  <Td mb={-6}>
                                    <Text fontSize="xs" color="500" as="b">
                                      LOCATION
                                    </Text>
                                  </Td>
                                  <Td>
                                    <Text fontSize="xs" color="500">
                                      {data.street + ' ' + data.qb_city_state_zip}
                                    </Text>
                                  </Td>
                                </Flex>
                              </Tr>
                              <Tr>
                                <Flex flexDirection="column">
                                  <Td mb={-6}>
                                    <Text fontSize="xs" color="500" as="b">
                                      PHONE
                                    </Text>
                                  </Td>
                                  <Td>
                                    <Text fontSize="xs" color="500">
                                      {data.primary_phone.replace(
                                        /(\d{3})(\d{3})(\d{4})/,
                                        '$1-$2-$3',
                                      )}
                                    </Text>
                                  </Td>
                                </Flex>
                              </Tr>
                              <Tr>
                                <Flex flexDirection="column">
                                  <Td mb={-6}>
                                    <Text fontSize="xs" color="500" as="b">
                                      BUSINESS HOURS
                                    </Text>
                                  </Td>
                                  <Td>
                                    <Text fontSize="xs" color="500">
                                      {data.business_hours}
                                    </Text>
                                  </Td>
                                </Flex>
                              </Tr>
                              <Tr>
                                <Button
                                  size="md"
                                  height="6vh"
                                  width="15vw"
                                  border="2px"
                                  borderColor="gray.500"
                                  padding="4"
                                  ml="6"
                                >
                                  Notify of Resedential Status
                                </Button>
                              </Tr>
                              <Tr>
                                <Flex flexDirection="column">
                                  <Td mb={-6}>
                                    <Text fontSize="xs" color="500" as="b"></Text>
                                  </Td>
                                  <Td>
                                    <Text fontSize="xs" color="500"></Text>
                                  </Td>
                                </Flex>
                              </Tr>
                            </Tbody>
                          </Table>
                        </SimpleGrid>
                      </TableContainer>
                    </Flex>
                  </Card>
                </Box>
              </Flex>
              <Flex mt="10" justifyContent="space-between">
                <Button
                  variant="outline"
                  borderColor="red.500"
                  color="red.500"
                  onClick={() => handleApproveDeny('Denied')}
                >
                  Deny
                </Button>
                <ButtonGroup>
                  <Button variant="outline" colorScheme="teal" onClick={handleSave}>
                    Save
                  </Button>
                  <Button colorScheme="teal" onClick={() => handleApproveDeny('Active')}>
                    Approve
                  </Button>
                </ButtonGroup>
              </Flex>
            </CardBody>
          </Card>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

export default PendingBusiness;
