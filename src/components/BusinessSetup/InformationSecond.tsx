import { Box, Flex, Text, VStack } from '@chakra-ui/react';

const steps = [
  {
    id: 5,
    description:
      'Report Monthly: Each month log your donations. You will be entered in our quarterly drawing for a $50 Starbucks gift card.',
    words: 2,
  },
  {
    id: 6,
    description:
      'Add this verbiage to your email signature: “We are a Feeding Pets of the Homeless® Donation Site! Please bring by dog or cat food, treats or supplies to help!” Feeding Pets of the Homeless® is the first and only national animal organization focused completely on feeding and providing emergency veterinary care to pets that belong to homeless people.',
    words: 7,
  },
  {
    id: 7,
    description:
      'Do not accept cash! Check should be addressed to Feeding Pets of the Homeless® and sent to headquarters.',
    words: 3,
  },
  {
    id: 8,
    description:
      'If a donor requests a donation receipt, please use form included in the startup kit and return to us. We will then send an official receipt to them from headquarters.',
    words: 6,
  },
];

const splitDescription = (description: string, n: number) => {
  const wordsArray = description.split(' ');
  const firstWords = wordsArray.slice(0, n).join(' ');
  const remainingWords = wordsArray.slice(n).join(' ');
  return {
    firstWords,
    remainingWords,
  };
};

export const InformationSecond = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bg="white"
      flexGrow={1}
      padding={8}
      paddingTop={0}
    >
      <VStack spacing={4} maxWidth={1000}>
        <Text color="teal" fontSize="5xl" fontWeight="bold">
          Let&apos;s Get You Set Up!
        </Text>

        {steps.map(({ id, description, words }) => {
          const { firstWords, remainingWords } = splitDescription(description, words);

          return (
            <Box bg={'#f9f8f7'} paddingY={4} paddingX={8} borderRadius={8} key={id} width={'100%'}>
              <Flex gap={8} alignItems={'center'}>
                <Text fontSize="6xl" color="teal" fontWeight="bold">
                  {id}
                </Text>

                <Text fontSize="lg" lineHeight={'tall'} as="span" display={'inline-block'}>
                  <Text as="p" fontWeight="bold" display={'inline'}>
                    {firstWords}&nbsp;
                  </Text>
                  {remainingWords}
                </Text>
              </Flex>
            </Box>
          );
        })}
      </VStack>
    </Flex>
  );
};
