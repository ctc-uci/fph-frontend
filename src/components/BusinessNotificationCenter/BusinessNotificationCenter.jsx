import './App.css';
import { useEffect, useState } from 'react';
import { useBackend } from './contexts/BackendContext';
import { SearchIcon, PlusSquareIcon, BellIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
  Menu,
  MenuButton,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { backend } = useBackend();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const id = '5';
      const response = await backend.get(`/notification/${id}`);
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getDate = val => {
    const timestamp = new Date(val);
    return `${timestamp.toLocaleString('default', { month: 'long' })} ${timestamp.getDay()}`;
  };

  return (
    <div>
      <Menu>
        <MenuButton as={Button}>
          <Icon as={HamburgerIcon} />
        </MenuButton>
      </Menu>
      <Button onClick={onOpen}>
        <Icon as={PlusSquareIcon} />
        &nbsp;Contact Us
      </Button>
      <Button onClick={null}>Received</Button>

      <InputGroup>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input placeholder="Search" />
      </InputGroup>

      <Button onClick={null}>Notifications</Button>
      <Button>
        <Icon as={BellIcon} />
      </Button>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Dismissed</Th>
            <Th>Name</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.been_dismissed ? 'True' : 'False'}</Td>
              <Td>{item.message}</Td>
              <Td>{getDate(item.timestamp)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Contact Us</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus maiores ipsum
              iusto quibusdam, saepe fugit. Voluptatibus tempore porro quidem laboriosam repellendus
              et, recusandae laudantium ipsum doloribus animi quibusdam, temporibus accusamus?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default App;
