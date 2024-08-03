import { Box, Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { BiBone, BiCalendar, BiCar, BiChat, BiCopy } from 'react-icons/bi';

const tips = [
  {
    icon: BiCalendar,
    text: (
      <>
        <b>Host events</b> and ask that a donation of pet food be the admittance ticket.
      </>
    ),
  },
  {
    icon: BiBone,
    text: (
      <>
        <b>Offer a service with a donation</b> as the fee for your services. Example: grooming, pet
        sitting, boarding, etc.
      </>
    ),
  },
  {
    icon: BiCar,
    text: (
      <>
        <b>Fill a truck or police vehicle</b> (popular choice).
      </>
    ),
  },
  {
    icon: BiCopy,
    text: (
      <>
        <b>Print our newsletter or flyer</b> and post it to boards in your community with your
        business name and address.
      </>
    ),
  },
  {
    icon: BiChat,
    text: (
      <>
        We are always <b>open to other suggestions.</b>
      </>
    ),
  },
];

export const Tips = () => {
  return (
    <Flex justify="center" align="center" minH="100vh" p={8}>
      <VStack spacing={4} align="stretch">
        <Text color="teal.500" textAlign="center" fontSize={'5xl'} fontWeight="bold" mb={8}>
          Tips on how to increase your donations!
        </Text>

        <VStack spacing={8} align={'stretch'}>
          {tips.map((tip, index) => (
            <HStack key={index} spacing={4} align="flex-start">
              <Icon as={tip.icon} boxSize={6} color="teal.500" />
              <Text fontSize="md" lineHeight="tall">
                {tip.text}
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Flex>
  );
};
