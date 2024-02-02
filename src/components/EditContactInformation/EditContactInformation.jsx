// type,
//       name,
//       street,
//       zipCode,
//       state,
//       qbVendorName,
//       qbCityStateZip,
//       primaryPhone,
//       backupPhone,
//       primaryEmail,
//       comments,
//       faxPhone,
//       contactName,
//       website,
//       businessHours,
//       findOut,
//       onboardingStatus,
//       joinDate,
//       inputTypeStatus,
//       vendorType,
//       status,
//       petsOfTheHomelessDiscount,
//       updatedBy,
//       updatedDateTime,
//       syncToQb,
//       veterinary,
//       resource,
//       food,
//       donation,
//       familyShelter,
//       wellness,
//       spayNeuter,
//       financial,
//       reHome,
//       erBoarding,
//       senior,
//       cancer,
//       dog,
//       cat,
//       fphPhone,
//       contactPhone,
//       webNotes,
//       internalNotes,
//       published,
//       shelter,
//       domesticViolence,
//       webDateInit,
//       entQb,
//       serviceRequest,
//       inactive,
//       finalCheck,
//       createdBy,
//       createdDate,
//       city,
import { useBackend } from '../../contexts/BackendContext';
import { useState } from 'react';
import { Flex, Text, Textarea, Stack, Box, Spacer, Button, Input } from '@chakra-ui/react';


const EditContactInformation = () => {
    return (
        <>
          <Flex>
            <Box>
                <Text>Contact Information</Text>
                
                <Input></Input>
                
            </Box>
            <Button onClick={SubmitForm}>Save</Button>
            <Box>
                Business Information
                <Box>
                    <Text>Address</Text>
                    <Text>123 Address Blvd.</Text>
                </Box>
                <Box>
                    <Text>Phone</Text>
                    <Text>(123) 456-7890</Text>
                </Box>
                <Box>
                    <Text>Email</Text>
                    <Text>kaicenatGYATT@gyattmail.com</Text>
                </Box>
            </Box>
          </Flex>
    
        </>
       )
}

export default EditContactInformation