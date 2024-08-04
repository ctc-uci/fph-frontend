import { ChangeEvent } from 'react';
import { Box, Flex, FormControl, FormLabel, Heading, Input, Text } from '@chakra-ui/react';

export const VolunteerInformation = ({
  handleChange,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => unknown;
}) => {
  return (
    <Flex sx={{ flexDirection: 'column', gap: 4 }}>
      <Box>
        <Heading fontSize={24} as="h2">
          Volunteer Information
        </Heading>
        <Text>Please fill out the following form to log your donation totals.</Text>
      </Box>

      <Flex direction="column" gap={4}>
        <Flex alignItems="center">
          <FormControl isRequired display={'flex'}>
            <Text width={70} fontWeight={'bold'}>
              NAME
            </Text>
            <FormLabel htmlFor="personFirstName personLastName" />
            <Flex alignItems="center" gap={4} width={'100%'}>
              <Input
                id="personFirstName"
                placeholder="First Name"
                name="personFirstName"
                onChange={handleChange}
                isRequired={true}
              />
              <Input
                id="personLastName"
                placeholder="Last Name"
                name="personLastName"
                onChange={handleChange}
                isRequired={true}
              />
            </Flex>
          </FormControl>
        </Flex>

        <Flex alignItems="center">
          <FormControl isRequired display={'flex'}>
            <Text width={70} fontWeight={'bold'}>
              EMAIL
            </Text>
            <FormLabel htmlFor="email" />
            <Flex alignItems="center" gap={4} width={'100%'}>
              <Input
                id="email"
                placeholder="Email"
                name="email"
                width={'100%'}
                onChange={handleChange}
                isRequired={true}
              />
            </Flex>
          </FormControl>
        </Flex>
        <Flex alignItems="center">
          <FormControl isRequired display={'flex'}>
            <Text width={70} fontWeight={'bold'}>
              HOURS
            </Text>
            <FormLabel htmlFor="volunteer_hours" />
            <Flex alignItems="center" gap={4} width={'100%'}>
              <Input
                id="volunteer_hours"
                placeholder="Number of Hours Worked"
                name="volunteer_hours"
                width={'100%'}
                onChange={handleChange}
                isRequired={true}
              />
            </Flex>
          </FormControl>
        </Flex>
      </Flex>
    </Flex>
  );
};
