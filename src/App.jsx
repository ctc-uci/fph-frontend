import { useEffect, useState } from 'react';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import { useBackend } from './contexts/BackendContext';
import RegisterBusinessForm from './components/RegisterBusinessForm';
import RegisterSuccessPage from './components/RegisterSuccessPage';

const isDummyData = true;

const App = () => {
  const { backend } = useBackend();
  // Comment out or remove this line if 'data' is not being used.
  // const [data, setData] = useState([]);

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        await backend.get('/business');
        // If you need to use the response data, you can uncomment the following line:
        // const data = response.data;
        // setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    getData();
  }, [backend]); // Remember to include 'backend' in the dependency array if it might change
  

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <Flex direction="column" align="stretch" gap={5}>
          <RegisterBusinessForm
            isDummyData={isDummyData}
            onRegisterSuccess={handleRegistrationSuccess}
          />
          {registrationSuccess && <RegisterSuccessPage />}
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default App;