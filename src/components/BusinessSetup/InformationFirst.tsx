import { Box, VStack, Text, HStack, Flex } from '@chakra-ui/react';

const steps = [
  {
    id: 1,
    description:
      'Visit our website to familiarize yourself with our mission, donation sites and pet food providers in your area, and other useful info.',
    words: 3,
  },
  {
    id: 2,
    description:
      'Set up a donation bin in an accessible area around your business. We accept donations of pet food (cat, dog, canned & dry, NOT expired) and gently used and new pet supplies, such as leashes, collars, bowls, harnesses, beds, etc. Open bags okay, please tape up. We do not accept donations of prescription medications. Over the counter medications are okay.',
    words: 5,
  },
  {
    id: 3,
    description:
      'Reach out to Pet Food Providers in your area and set up a pick up or drop off schedule for your donations.',
    words: 6,
  },
  {
    id: 4,
    description:
      'Spread the word on social media and let your customers know you have become a Feeding Pets of the Homeless® Donation Site.',
    words: 3,
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

export const InformationFirst = () => {
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
