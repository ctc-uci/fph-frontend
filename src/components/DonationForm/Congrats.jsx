import { ArrowBackIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Congratulations from '../../../public/congratulations.png';
import { pageStyle } from '../../styles/sharedStyles';

const Congrats = () => {
  return (
    <Flex sx={{ ...pageStyle, position: 'relative', minHeight: '100vh' }}>
      <Link to="/BusinessDashboard">
        <Flex
          position="absolute"
          top={8}
          left={8}
          alignItems="center"
          color="teal"
          _hover={{ color: 'green.600' }}
        >
          <ArrowBackIcon boxSize={6} mr={2} />
          <Text fontWeight="bold">Back</Text>
        </Flex>
      </Link>

      <Center flexDirection="column" textAlign="center" px={8} my={'auto'}>
        <Image src={Congratulations} alt="Congratulations" mb={8} />
        <Heading color="green.500" mb={4}>
          Congratulations!
        </Heading>
        <Text width={700}>
          Thank you for completing your business donation form! Your donation will continue to
          positively impact the homeless, veterans, and pets that we interact with daily.
        </Text>
        <Text>Thank you on behalf of of all of the pets!</Text>
        <Box mt={20}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '4',
            }}
          >
            <QuestionOutlineIcon boxSize={4} color="gray.400" mr={2} />
            <Text fontSize="sm" color="gray.400">
              Did you know?
            </Text>
          </div>

          <Text fontSize="sm" color={'gray.400'}>
            All donation sites are entered into a monthly raffle to receive a gift card!
          </Text>
          <Text fontSize="sm" color={'gray.400'}>
            Be sure to check your email to see if your site has won!
          </Text>
        </Box>
      </Center>
    </Flex>
  );
};

export default Congrats;
