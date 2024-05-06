import { Box, Link, Text, Image, Flex, Stack } from '@chakra-ui/react';
import FPH_LOGO from './fph_logo.png';
import propTypes from 'prop-types';

const FourthForm = ({ setFormOpen }) => {
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
              <Link
                textDecoration="underline"
                href={'https://petsofthehomeless.org/'}
                onClick={() => {
                  setFormOpen(false);
                }}
              >
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

FourthForm.propTypes = {
  setFormOpen: propTypes.func.isRequired,
};

export default FourthForm;
