import { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { useBackend } from '../../../contexts/BackendContext';
import { pageStyle, pageTitleStyle } from '../../../styles/sharedStyles';
import { Donation } from '../../../types/donation';

export const ViewBusinessDonationHistory = () => {
  const { id } = useParams();
  const { backend } = useBackend();
  const navigate = useNavigate();

  const [data, setData] = useState<Donation | undefined>();

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await backend.get(`/donation/${id}`);
        setData(response.data[0]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDonation();
  }, [id]);

  const dataEntries = [
    { label: 'BUSINESS ID', value: data?.business_id },
    { label: 'DONATION ID', value: data?.donation_id },
    { label: 'FOOD BANK', value: data?.food_bank_donation },
    { label: 'PERSON REPORTING', value: data?.reporter },
    { label: 'EMAIL', value: data?.email },
    { label: 'DATE', value: data?.date },
    { label: 'CANNED DOG FOOD QTY', value: data?.canned_dog_food_quantity },
    { label: 'DRY DOG FOOD QTY', value: data?.dry_dog_food_quantity },
    { label: 'CANNED CAT FOOD QTY', value: data?.canned_cat_food_quantity },
    { label: 'DRY CAT FOOD QTY', value: data?.dry_cat_food_quantity },
    { label: 'MISC ITEMS', value: data?.misc_items },
    { label: 'VOLUNTEER HOURS', value: data?.volunteer_hours },
  ];

  return (
    <Flex sx={pageStyle}>
      <Breadcrumb spacing="2">
        <BreadcrumbItem>
          <BreadcrumbLink color="#245F61" onClick={() => navigate('/BusinessDonationHistory')}>
            Donation History
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">Donation Details</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Heading sx={pageTitleStyle}>Donation Details</Heading>

      <Card maxHeight={'calc(100vh - 190px)'}>
        <TableContainer overflowY={'scroll'}>
          <Table>
            <Thead></Thead>
            <Tbody>
              {dataEntries.map((entry, index) => (
                <Tr key={index}>
                  <Td width={300}>
                    <Text color="500" fontWeight={'semibold'}>
                      {entry.label}
                    </Text>
                  </Td>
                  <Td>
                    <Text color="500">{entry.value}</Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </Flex>
  );
};
