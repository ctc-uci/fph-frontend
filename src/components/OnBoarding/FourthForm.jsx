import { Box, Flex, Image, Link, Stack, Text } from '@chakra-ui/react';

import FPH_LOGO from './fph_logo.png';

const FourthForm = () => {
  return (
    <Flex>
      <Stack marginTop="30vh" width="full" direction="column" align={'center'}>
        <Box>
          <Image boxSize="25vh" src={FPH_LOGO} alt="fph-logo" />
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="bold" color="#359797">
            Thank You!
          </Text>
        </Box>
        <Box width="35%" textAlign={'center'}>
          <Text fontSize="xs">
            Thank you for taking the time to apply for becoming one of our donors! While our team
            reviews your application, see what we&apos;ve been up to by heading back to our&nbsp;
            {
              <Link textDecoration="underline" href={'https://petsofthehomeless.org/'}>
                website
              </Link>
            }
            .
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
};

export default FourthForm;
