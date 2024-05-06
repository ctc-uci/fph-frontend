import {
  Flex,
  Box,
  Card,
  TabPanel,
  CardBody,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { BiCalendar, BiBone, BiCar, BiCopyAlt, BiConversation } from 'react-icons/bi';
import { PropTypes } from 'prop-types';

const ReferenceGuide = () => {
  const CustomAccordionItem = ({ title, panelInfo }) => (
    <AccordionItem borderTopWidth={'0px'} borderBottomWidth={'1px'} borderColor={'#E2E8F0'}>
      <Text>
        <AccordionButton>
          <Box as="span" flex="1" textAlign={'left'}>
            <Text fontWeight={'700'} fontSize={'16px'}>
              {title}
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Text>
      <AccordionPanel pb={4}>{panelInfo}</AccordionPanel>
    </AccordionItem>
  );

  CustomAccordionItem.propTypes = {
    title: PropTypes.string.isRequired,
    panelInfo: PropTypes.string.isRequired,
  };
  return (
    <TabPanel>
      <Card width={'100%'}>
        <CardBody>
          <Text padding={'0px 0px 20px 0px'} display={'flex'}>
            Refer to the following if you have any questions, otherwise contact us at
            <Text pl={1} textDecoration={'underline'}>
              info@petsofthehomeless.org
            </Text>
          </Text>
          <Accordion allowToggle borderWidth={'1px'} borderColor={'#E2E8F0'}>
            <CustomAccordionItem
              title="Visit Our Website"
              panelInfo="Visit our website to familiarize yourself with our mission, donation 
                                sites and pet food providers in your area, and other useful info."
            />
            <CustomAccordionItem
              title="Reach out to Pet Food Providers"
              panelInfo="Reach out to Pet Food Providers in your area and set up a pick up or drop off schedule for your donations."
            />
            <CustomAccordionItem
              title="Set up a donation bin"
              panelInfo="Set up a donation bin in an accessible area around your business. We accept donations of pet food (cat, dog, canned & dry, NOT expired) and gently used and new pet supplies, such as leashes, collars, bowls, harnesses, beds, etc. Open bags okay, please tape up. We do not accept donations of prescription medications. Over the counter medications are okay."
            />
            <CustomAccordionItem
              title="Spread the word"
              panelInfo="Spread the word on social media and let your customers know you have become a Feeding Pets of the Homeless® Donation Site."
            />
            <CustomAccordionItem
              title="Report Monthly"
              panelInfo="Report Monthly: Each month log your donations. You will be entered in our quarterly drawing for a $50 Starbucks gift card."
            />
            <CustomAccordionItem
              title="Add this verbiage to your email signature"
              panelInfo="Add this verbiage to your email signature: “We are a Feeding Pets of the Homeless® Donation Site! Please bring by dog or cat food, treats or supplies to help!” Feeding Pets of the Homeless® is the first and only national animal organization focused completely on feeding and providing emergency veterinary care to pets that belong to homeless people."
            />
            <CustomAccordionItem
              title="Do not accept cash"
              panelInfo="Do not accept cash! Check should be addressed to Feeding Pets of the Homeless® and sent to headquarters."
            />
            <CustomAccordionItem
              title="If a donor requests a donation receipt"
              panelInfo="If a donor requests a donation receipt, please use form included in the startup kit and return to us. We will then send an official receipt to them from headquarters."
            />
            <AccordionItem borderColor={'white'}>
              <Text>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign={'left'}>
                    <Text fontWeight={'700'} fontSize={'16px'}>
                      Tips on how to increase donations
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Text>
              <AccordionPanel pb={4}>
                <Flex alignItems={'center'} pb={1}>
                  <Icon as={BiCalendar} />
                  <Text>
                    Host events and ask that a donation of pet food be the admittance ticket.
                  </Text>
                </Flex>
                <Flex alignItems={'center'} pb={1}>
                  <Icon as={BiBone} />
                  <Text>
                    Offer a service with a donation as the fee for your services. Example: grooming,
                    pet sitting, boarding, etc.
                  </Text>
                </Flex>
                <Flex alignItems={'center'} pb={1}>
                  <Icon as={BiCar} />
                  <Text>Fill a truck or police vehicle (popular choice).</Text>
                </Flex>
                <Flex alignItems={'center'} pb={1}>
                  <Icon as={BiCopyAlt} />
                  <Text>
                    Print our newsletter or flyer and post it to boards in your community with your
                    business name and address.
                  </Text>
                </Flex>
                <Flex alignItems={'center'}>
                  <Icon as={BiConversation} />
                  <Text>We are always open to other suggestions.</Text>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>
    </TabPanel>
  );
};

export default ReferenceGuide;
