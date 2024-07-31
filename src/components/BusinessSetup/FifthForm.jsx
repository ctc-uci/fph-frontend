import { Box, VStack, Text, HStack, Flex } from '@chakra-ui/react';
import 'boxicons';
import PropTypes from 'prop-types';

const FifthForm = () => {
  return (
    <Flex height="90vh" justifyContent="center" alignItems="center" bg="#FFFFFF">
      <VStack spacing={'6vh'}>
        <Text
          color={'#359797'}
          maxWidth="80vh"
          textAlign="center"
          fontSize="5xl"
          lineHeight="6vh"
          fontWeight="bold"
        >
          Tips on how to increase your donations!
        </Text>
        <HStack height="4vh">
          <box-icon
            type="regular"
            size="md"
            name={'calendar'}
            style={{ marginRight: '1vh' }}
          ></box-icon>
          <Text textAlign="left" fontSize="md" width="60vh" lineHeight={'tall'} marginLeft="2vh">
            <Box as="span" fontWeight="bold">
              Host events{' '}
            </Box>{' '}
            and ask that a donation of pet food be the admittance ticket.
          </Text>
        </HStack>
        <HStack height="4vh">
          <box-icon
            type="regular"
            name={'bone'}
            size="md"
            style={{ marginRight: '1vh' }}
          ></box-icon>
          <Text textAlign="left" fontSize="md" width="60vh" lineHeight={'tall'} marginLeft="2vh">
            <Box as="span" fontWeight="bold">
              Offer a service with a donation
            </Box>{' '}
            as the fee for your services. Example: grooming, pet sitting, boarding, etc.
          </Text>
        </HStack>
        <HStack height="4vh">
          <box-icon type="regular" name={'car'} size="md" style={{ marginRight: '1vh' }}></box-icon>
          <Text textAlign="left" fontSize="md" width="60vh" lineHeight={'tall'} marginLeft="2vh">
            <Box as="span" fontWeight="bold">
              Fill a truck or police vehicle
            </Box>{' '}
            (popular choice).
          </Text>
        </HStack>
        <HStack height="4vh">
          <box-icon
            type="regular"
            name={'copy-alt'}
            size="md"
            style={{ marginRight: '1vh' }}
          ></box-icon>
          <Text textAlign="left" fontSize="md" width="60vh" lineHeight={'tall'} marginLeft="2vh">
            <Box as="span" fontWeight="bold">
              Print our newsletter or flyer
            </Box>{' '}
            and post it to boards in your community with your business name and address.
          </Text>
        </HStack>
        <HStack height="4vh">
          <box-icon
            type="regular"
            name={'conversation'}
            size="md"
            style={{ marginRight: '1vh' }}
          ></box-icon>
          <Text textAlign="left" fontSize="md" width="60vh" lineHeight={'tall'} marginLeft="2vh">
            We are always{' '}
            <Box as="span" fontWeight="bold">
              {' '}
              open to other suggestions.
            </Box>
          </Text>
        </HStack>
      </VStack>
    </Flex>
  );
};

FifthForm.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  nextStep: PropTypes.bool.isRequired,
};

export default FifthForm;
