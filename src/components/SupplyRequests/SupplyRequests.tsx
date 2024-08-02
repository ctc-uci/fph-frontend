import {
  Text,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  VStack,
  Box,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';
import Supply_0 from './Supply_0.png';
import Supply_1 from './Supply_1.png';
import Supply_2 from './Supply_2.png';
import Supply_3 from './Supply_3.png';
import Supply_4 from './Supply_4.png';
import Supply_5 from './Supply_5.png';
import Supply_6 from './Supply_6.png';
import Supply_7 from './Supply_7.png';

const SUPPLIES = [
  {
    type: 'Get Pet Food Decal',
    description: 'Stickers to share with your Pet Food Provider.',
    image: Supply_0,
  },
  {
    type: 'Decal',
    description:
      'Stickers that can be handed out and can be placed on water bottles, cars and more.',
    image: Supply_1,
  },
  {
    type: 'Homeless Card',
    description:
      'Cards to share with your Pet Food Provider who may have more direct contact with the homeless in need of emergency veterinary services.',
    image: Supply_2,
  },
  {
    type: 'Business Card',
    description: 'Feeding Pets of the Homeless’ contact information cards.',
    image: Supply_3,
  },
  {
    type: 'Donation Site Decal',
    description: 'Decals that indicate that you are a donation site.',
    image: Supply_4,
  },
  {
    type: 'Donation Site Bin Decals',
    description:
      'Decorate your donation bins with these decals so donators know where to put their items.',
    image: Supply_5,
  },
  {
    type: 'Donation Envelopes',
    description: 'Envelopes to provide potential donators to make a direct donation.',
    image: Supply_6,
  },
  {
    type: 'Homeless Card 2',
    description:
      'Cards to share with your Pet Food Provider who may have more direct contact with the homeless who are in need of emergency veterinary services.',
    image: Supply_7,
  },
];

interface SupplyRequestProps {
  handleChange: (index: number, value: string) => unknown;
}

export const SupplyRequests = ({ handleChange }: SupplyRequestProps) => {
  return (
    <SimpleGrid columns={2} spacing={4}>
      {SUPPLIES.map((supply, index) => (
        <HStack key={index} marginTop="20px" align="top" spacing="0" width="476px" height="131px">
          <Box
            width="202px"
            height="131px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              width="200px"
              height="131px"
              src={supply.image}
              alt={`Supply ${index}`}
              objectFit="contain"
            />
          </Box>
          <VStack align="stretch" justifyContent="center" spacing="1" flex="1">
            <HStack spacing={4}>
              <NumberInput
                size="sm"
                maxW="100px"
                defaultValue={0}
                min={0}
                onChange={value => handleChange(index, value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text>{supply.type}</Text>
            </HStack>
            <Text
              color="#718096"
              fontSize="sm"
              lineHeight="5"
              fontWeight="normal"
              fontFamily="Inter"
            >
              {supply.description}
            </Text>
          </VStack>
        </HStack>
      ))}
    </SimpleGrid>
  );
};
