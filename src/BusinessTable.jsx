import './App.css';
import { useEffect, useState } from 'react';
import { useBackend } from './contexts/BackendContext';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const BusinessTable = () => {
  const { backend } = useBackend();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await backend.get('/business');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <div>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Type</Th>
            <Th>Name</Th>
            <Th>Street</Th>
            <Th>Zipcode</Th>
            <Th>State</Th>
            <Th>Qb Vendor Name</Th>
            <Th>Qb City State Zip</Th>
            <Th>Primary Phone</Th>
            <Th>Backup Phone</Th>
            <Th>Primary Email</Th>
            <Th>Comments</Th>
            <Th>Fax phone</Th>
            <Th>Contact name</Th>
            <Th>Website</Th>
            <Th>Business hours</Th>
            <Th>Find out</Th>
            <Th>Onboarding status</Th>
            <Th>Join date</Th>
            <Th>Input type status</Th>
            <Th>Vendor type</Th>
            <Th>Status</Th>
            <Th>Pets of the homeless discount</Th>
            <Th>Updated by</Th>
            <Th>Updated date time</Th>
            <Th>Sync to qb</Th>
            <Th>Veterinary</Th>
            <Th>Ressoure</Th>
            <Th>Food</Th>
            <Th>Donation</Th>
            <Th>Family shelter</Th>
            <Th>Wellness</Th>
            <Th>Spray neuter</Th>
            <Th>Financial</Th>
            <Th>Re home</Th>
            <Th>Er boarding</Th>
            <Th>Senior</Th>
            <Th>Cancer</Th>
            <Th>Dog</Th>
            <Th>Cat</Th>
            <Th>Fph phone</Th>
            <Th>Contact phone</Th>
            <Th>Web notes</Th>
            <Th>Internal notes</Th>
            <Th>Published</Th>
            <Th>Shelter</Th>
            <Th>Domestic Violence</Th>
            <Th>Web Date Init</Th>
            <Th>Ent Qb</Th>
            <Th>Service Request</Th>
            <Th>Inactive</Th>
            <Th>Final Check</Th>
            <Th>Created By</Th>
            <Th>Created Date</Th>
            <Th>City</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.id}</Td>
              <Td>{item.type}</Td>
              <Td>{item.name}</Td>
              <Td>{item.street}</Td>
              <Td>{item.zipcode}</Td>
              <Td>{item.state}</Td>
              <Td>{item.qb_vendor_name}</Td>
              <Td>{item.qb_city_state_zip}</Td>
              <Td>{item.primary_phone}</Td>
              <Td>{item.backup_phone}</Td>
              <Td>{item.primary_email}</Td>
              <Td>{item.comments}</Td>
              <Td>{item.fax_phone}</Td>
              <Td>{item.contact_name}</Td>
              <Td>{item.website}</Td>
              <Td>{item.business_hours}</Td>
              <Td>{item.find_out}</Td>
              <Td>{item.onboarding_status}</Td>
              <Td>{item.join_date}</Td>
              <Td>{item.input_type_status}</Td>
              <Td>{item.vendor_type}</Td>
              <Td>{item.status}</Td>
              <Td>{item.pets_of_the_homeless_discount}</Td>
              <Td>{item.updated_by}</Td>
              <Td>{item.updated_date_time}</Td>
              <Td>{item.sync_to_qb}</Td>
              <Td>{item.veterinary}</Td>
              <Td>{item.ressoure}</Td>
              <Td>{item.food}</Td>
              <Td>{item.donation}</Td>
              <Td>{item.family_shelter}</Td>
              <Td>{item.wellness}</Td>
              <Td>{item.spray_neuter}</Td>
              <Td>{item.financial}</Td>
              <Td>{item.re_home}</Td>
              <Td>{item.er_boarding}</Td>
              <Td>{item.senior}</Td>
              <Td>{item.cancer}</Td>
              <Td>{item.dog}</Td>
              <Td>{item.cat}</Td>
              <Td>{item.fph_phone}</Td>
              <Td>{item.contact_phone}</Td>
              <Td>{item.web_notes}</Td>
              <Td>{item.internal_notes}</Td>
              <Td>{item.published}</Td>
              <Td>{item.shelter}</Td>
              <Td>{item.domestic_violence}</Td>
              <Td>{item.web_date_init}</Td>
              <Td>{item.ent_qb}</Td>
              <Td>{item.service_request}</Td>
              <Td>{item.inactive}</Td>
              <Td>{item.final_check}</Td>
              <Td>{item.created_by}</Td>
              <Td>{item.created_date}</Td>
              <Td>{item.city}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default BusinessTable;