import { ArrowBackIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Congratulations from '../../../public/congratulations.png';

const Congrats = () => {
  return (
    <Box position="relative" height="100vh">
      <Link to="/BusinessDashboard">
        <Flex
          position="absolute"
          top="20px"
          left="20px"
          alignItems="center"
          color="green.500"
          _hover={{ color: 'green.600' }}
        >
          <ArrowBackIcon boxSize={6} mr={2} />
          <Text fontWeight="bold">Back</Text>
        </Flex>
      </Link>
      <Flex
        height="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        px={8}
      >
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
      </Flex>
    </Box>
  );
};

export default Congrats;

// import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';
// import { ArrowBackIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
// import Congratulations from '../../../public/congratulations.png';
// import { Link } from 'react-router-dom';

// const Congrats = () => {
//   return (
//     <Box position="relative" height="100vh">
//       <Link to="/BusinessDashboard">
//         <Flex
//           position="absolute"
//           top="20px"
//           left="20px"
//           alignItems="center"
//           color="green.500"
//           _hover={{ color: 'green.600' }}
//         >
//           <ArrowBackIcon boxSize={6} mr={2} />
//           <Text fontWeight="bold">Back</Text>
//         </Flex>
//       </Link>
//       <Flex
//         height="100%"
//         flexDirection="column"
//         justifyContent="center"
//         alignItems="center"
//         textAlign="center"
//         px={8}
//       >
//         <Image src={Congratulations} alt="Congratulations" mb={8} />
//         <Heading color="green.500" mb={4}>
//           Congratulations!
//         </Heading>
//         <Text mb={6} width={700}>
//           Thank you for completing your business donation form! Your donation will continue to
//           positively impact the homeless, veterans, and pets that we interact with daily.
//         </Text>
//         Thank you on behalf of of all of the pets!
//         <Box mt={12}>
//           <Flex alignItems="center" justifyContent="center" mb={4}>
//             <QuestionOutlineIcon boxSize={5} color="gray.500" mr={2} />
//             <Text fontSize="sm" color="gray.600">
//               Did you know?
//             </Text>
//           </Flex>
//           <Text fontSize="sm">
//             All donation sites are entered into a monthly raffle to receive a gift card! Be sure to
//             check your email to see if your site has won!
//           </Text>
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// export default Congrats;
