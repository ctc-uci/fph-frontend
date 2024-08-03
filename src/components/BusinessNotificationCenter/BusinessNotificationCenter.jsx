import { useEffect, useState } from 'react';
import { BellIcon, HamburgerIcon, PlusSquareIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContext';
import { useBackend } from '../../contexts/BackendContext';

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { backend } = useBackend();
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const businessIdResponse = await backend.get(`/businessUser/${currentUser.uid}`);
        const businessId = businessIdResponse.data[0].id;

        const response = await backend.get(`/notification/${businessId}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  const getDate = (val) => {
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
