import { useBackend } from '../../contexts/BackendContext';
import { useState } from 'react';
import { Flex, Text, Textarea, Stack, Box, Spacer, Button, ButtonGroup, Checkbox } from '@chakra-ui/react';

// All in Flexbox component
/* Supply Request
Checkbox for checkboxes duh
Textarea for notes section
Button for submit
*/
/* FPH Info
Box
*/

// notificationRouter.post('/', async (req, res) => {
//   const { business_id: businessId, message, timestamp, been_dismissed: beenDismissed } = req.body;
//   try {
//     await db.query(
//       `
//         INSERT INTO notification (business_id, message, timestamp, been_dismissed)
//         VALUES
//         ($(businessId), $(message), $(timestamp), $(beenDismissed));
//       `,
//       { businessId, message, timestamp, beenDismissed },
//     );
//     res.status(200).json({
//       status: 'Success',
//     });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });




const ContactUs = () => {
  const { backend } = useBackend();
  const [ID, setID] = useState(0);
  const [name, setName] = useState("business?"); // name of business
  const [text, setText] = useState("");
  const [checkedItems, setCheckedItems] = useState([false, false, false, false, false]);
  const [formData, setFormData] = useState({ // idk whats in the form data
    business_id: 0,
    message: null,
    timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
    been_dismissed: false,
  });

  const handleCheck = (index, newValue) => {
    setCheckedItems((checkedItems) => {
      const newArray = [...checkedItems];
      newArray[index] = newValue;
      return newArray;
    });


  };

   const SubmitForm = async event => {
    event.preventDefault();
    console.log(formData);
    const result = await backend.post('/notification/', formData);
    console.log(result);
   }

   const updateForm = (inputValue) => { // how do you make this run first before submit?
    const message = setMessage(inputValue);
    setFormData({
      business_id: 0,
      message: message,
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }), //idk
      been_dismissed: false,
    });
   }

   const handleInputChange = (e) => {
    let inputValue = e.target.value;
    updateForm(inputValue);
    setText(inputValue);
  }

  const setMessage = (text) => {
    const textCopy = text;
    const checkedThingies = ['Stickers', 'Posters', 'Business Cards', 'Something', 'Joshua Lipton'];
    const preMessage = `${name} is requesting: \n`; // business name... hard-coded right now
    const updatedMessage = checkedThingies
      .filter((_, index) => checkedItems[index])
      .join('\n-');
    return `${preMessage}-${updatedMessage}\nNotes:\n${textCopy}`;
  };

   return (
    <>
      <Flex>
        <Box>
            <Text>Supply Request</Text>
            <Stack>
                <Checkbox onChange={(e) => handleCheck(0, e.target.checked)}>Stickers</Checkbox>
                <Checkbox onChange={(e) => handleCheck(1, e.target.checked)}>Posters</Checkbox>
                <Checkbox onChange={(e) => handleCheck(2, e.target.checked)}>Business Cards</Checkbox>
                <Checkbox onChange={(e) => handleCheck(3, e.target.checked)}>Something</Checkbox>
                <Checkbox onChange={(e) => handleCheck(4, e.target.checked)}>Joshua Lipton</Checkbox>
            </Stack>
            <Text>Notes</Text>
            <Textarea
            value={text}
            onChange={handleInputChange}
            />
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
   )

}

export default ContactUs;
