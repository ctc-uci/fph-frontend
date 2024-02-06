import { useBackend } from '../../contexts/BackendContext';
import { useState } from 'react';
import { Flex, Text, Textarea, Stack, Box, Button, Checkbox } from '@chakra-ui/react';

const ContactUs = () => {
  const business_ID = 0;
  const { backend } = useBackend();
  const [name, setName] = useState('business?'); // name of business
  const [text, setText] = useState('');
  const [checkedItems, setCheckedItems] = useState([false, false, false, false, false]);
  const formData = {
    business_id: business_ID,
    message: null,
    timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
    been_dismissed: false,
  };

  const handleCheck = (index, newValue) => {
    setCheckedItems(checkedItems => {
      const newArray = [...checkedItems];
      newArray[index] = newValue;
      return newArray;
    });
  };

  const SubmitForm = async () => {
    const message = setMessage(text);
    const updatedFormData = {
      ...formData,
      message: message,
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
      been_dismissed: false,
    };
    const result = await backend.post('/notification/', updatedFormData);
  };

  const handleInputChange = e => {
    let inputValue = e.target.value;
    setText(inputValue);
  };

  const setMessage = text => {
    const textCopy = text;
    const checkedThingies = ['Stickers', 'Posters', 'Business Cards', 'Something', 'Joshua Lipton'];
    const preMessage = `${name} is requesting: \n`; // business name... hard-coded right now
    const updatedMessage = checkedThingies.filter((_, index) => checkedItems[index]).join('\n-');
    return `${preMessage}-${updatedMessage}\nNotes:\n${textCopy}`;
  };

  return (
    <>
      <Flex>
        <Box>
          <Text>Supply Request</Text>
          <Stack>
            <Checkbox onChange={e => handleCheck(0, e.target.checked)}>Stickers</Checkbox>
            <Checkbox onChange={e => handleCheck(1, e.target.checked)}>Posters</Checkbox>
            <Checkbox onChange={e => handleCheck(2, e.target.checked)}>Business Cards</Checkbox>
            <Checkbox onChange={e => handleCheck(3, e.target.checked)}>Something</Checkbox>
            <Checkbox onChange={e => handleCheck(4, e.target.checked)}>Joshua Lipton</Checkbox>
          </Stack>
          <Text>Notes</Text>
          <Textarea value={text} onChange={handleInputChange} />
          <Button onClick={SubmitForm}>Submit</Button>
        </Box>
        <Box>
          Feeding Pets of the Homeless Information
          <Box>
            <Text>Address</Text>
            <Text>123 Address Blvd.</Text>
          </Box>
          <Box>
            <Text>Phone</Text>
            <Text>(123) 456-7890</Text>
          </Box>
          <Box>
            <Text>Email</Text>
            <Text>kaicenatGYATT@gyattmail.com</Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default ContactUs;
