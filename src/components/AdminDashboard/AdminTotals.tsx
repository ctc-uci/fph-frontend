import { Fragment } from 'react/jsx-runtime';
import { Box, Center, Divider, Flex, Icon, Text } from '@chakra-ui/react';
import { BiBuildingHouse, BiDonateHeart, BiFile, BiTime } from 'react-icons/bi';

export const AdminTotals = ({ businesses, pendingBusinesses }) => {
  const calculateTotalDonationForms = () => {
    var submittedBusinesses = 0;
    for (const [value] of Object.entries(businesses)) {
      const status = businesses[value].submitted;
      if (status) {
        submittedBusinesses += 1;
      }
    }

    return submittedBusinesses;
  };

  const calculateTotalDonationSites = () => {
    return Object.keys(businesses).length - 1;
  };

  const calculatePendingBusinesses = () => {
    return pendingBusinesses;
  };

  const stats = [
    {
      icon: BiBuildingHouse,
      value: calculateTotalDonationSites(),
      label: 'Donation Sites',
    },
    {
      icon: BiDonateHeart,
      value: calculateTotalDonationForms(),
      label: 'Donation Forms Submitted',
    },
    {
      icon: BiFile,
      value: calculateTotalDonationSites() - calculateTotalDonationForms(),
      label: 'Donation Forms Not Submitted',
    },
    {
      icon: BiTime,
      value: calculatePendingBusinesses(),
      label: 'Pending Applications',
    },
  ];

  return (
    <Flex
      justifyContent="space-around"
      borderRadius={'lg'}
      p={4}
      borderWidth={1}
      borderColor="gray.200"
      bg="white"
    >
      {stats.map((stat, index) => (
        <Fragment key={index}>
          <Flex justifyContent="center" alignItems="center" gap={4}>
            <Icon as={stat.icon} color="teal" width={8} height={8} />

            <Flex flexDirection="column">
              <Box>
                <Text fontSize={25} fontWeight={500}>
                  {stat.value}
                </Text>
              </Box>

              <Box>
                <Text color="gray" mt={-2}>
                  {stat.label}
                </Text>
              </Box>
            </Flex>
          </Flex>

          {index < stats.length - 1 && (
            <Center height="50px">
              <Divider orientation="vertical" color="#E2E8F0" />
            </Center>
          )}
        </Fragment>
      ))}
    </Flex>
  );
};
