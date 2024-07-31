import { TimeIcon } from '@chakra-ui/icons';
import { Center, Divider, Flex, Icon, Text, useBreakpointValue } from '@chakra-ui/react';
import { BiDonateHeart, BiMoney } from 'react-icons/bi';
import { Notification } from '../../types/notification';
import { Fragment } from 'react/jsx-runtime';

interface BusinessTotalsProps {
  donationData: any;
  reminderData: Notification[];
  priceData: any;
}

const calculateTotalPounds = (donationData: any) => {
  const totalPounds =
    donationData['canned_dog_food_quantity'] +
    donationData['dry_dog_food_quantity'] +
    donationData['canned_cat_food_quantity'] +
    donationData['dry_cat_food_quantity'];

  return totalPounds.toString() ?? 0;
};

const calculateTotalWorth = (donationData: any, priceData: any) => {
  const totalWorth =
    (donationData['canned_dog_food_quantity'] || 0) * (priceData[0] ? priceData[0]['price'] : 0) +
    (donationData['dry_dog_food_quantity'] || 0) * (priceData[1] ? priceData[1]['price'] : 0) +
    (donationData['canned_cat_food_quantity'] || 0) * (priceData[2] ? priceData[2]['price'] : 0) +
    (donationData['dry_cat_food_quantity'] || 0) * (priceData[3] ? priceData[3]['price'] : 0);
  return totalWorth.toFixed(2);
};

const calculateTimeSince = (reminderData: Notification[]) => {
  if (reminderData.length <= 0) {
    return 0;
  }

  const currentTime = new Date();
  const previousTime = new Date(reminderData.at(0)?.timestamp ?? 0);
  const timeDifference = Math.abs(currentTime.getTime() - previousTime.getTime());

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // milliseconds to days
  return daysDifference;
};

export const BusinessTotals = ({ donationData, reminderData, priceData }: BusinessTotalsProps) => {
  const displayIcon = useBreakpointValue({ base: 'block', lg: 'none', xl: 'block' });

  const stats = [
    {
      icon: BiMoney,
      value: `$${calculateTotalWorth(donationData, priceData)}`,
      label: 'Worth of Donation Supplies',
    },
    {
      icon: BiDonateHeart,
      value: calculateTotalPounds(donationData),
      label: 'Pounds of Food Donated',
    },
    {
      icon: TimeIcon,
      value: calculateTimeSince(reminderData),
      label: 'Days Since Last Submission',
    },
  ];

  return (
    <Flex
      borderRadius={8}
      justifyContent="space-around"
      p={4}
      borderWidth={1}
      borderColor="gray.200"
      bg="#FFFFFF"
    >
      {stats.map((stat, index) => (
        <Fragment key={index}>
          <Flex justifyContent="center" alignItems="center" gap={4}>
            <Icon as={stat.icon} color="teal" width={8} height={8} display={displayIcon} />

            <Flex flexDirection={'column'}>
              <Text fontSize={24} fontWeight={500} lineHeight={1}>
                {stat.value}
              </Text>

              <Text color="gray">{stat.label}</Text>
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
