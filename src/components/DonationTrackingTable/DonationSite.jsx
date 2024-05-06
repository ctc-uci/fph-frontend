/* eslint react/prop-types: 0 */
import { Tr, Td, Checkbox } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBackend } from '../../contexts/BackendContext';

const DonationSite = ({ donation_site, checkSet, setCheck, topCheckBox }) => {
  const [individualCheckBox, setIndividualCheckBox] = useState(topCheckBox);
  const [donationSiteName, setDonationSiteName] = useState('');
  const navigate = useNavigate();
  const { backend } = useBackend();

  useEffect(() => {
    setIndividualCheckBox(topCheckBox);
  }, [topCheckBox]);

  useEffect(() => {
    const getDonationSiteName = async () => {
      try {
        const businessResponse = await backend.get(`business/${donation_site.business_id}`);
        setDonationSiteName(businessResponse.data[0].name);
      } catch (error) {
        console.log(error)
      }
    }

    getDonationSiteName();
  }, []);

  const headers = [
    donationSiteName,
    donation_site?.donation_id,
    donation_site?.food_bank_donation,
    donation_site?.reporter,
    donation_site?.email,
    donation_site?.date ? new Date(donation_site.date).toLocaleDateString() : null,
    donation_site?.canned_dog_food_quantity !== null ? `${donation_site.canned_dog_food_quantity} lb` : '0 lb',
    donation_site?.dry_dog_food_quantity !== null ? `${donation_site.dry_dog_food_quantity} lb` : '0 lb',
    donation_site?.canned_cat_food_quantity !== null ? `${donation_site.canned_cat_food_quantity} lb` : '0 lb',
    donation_site?.dry_cat_food_quantity !== null ? `${donation_site.dry_cat_food_quantity} lb` : '0 lb',
    donation_site?.misc_items,
    donation_site?.volunteer_hours !== null ? `${donation_site.volunteer_hours} hrs` : '0 hrs',
  ];

  const handleClick = () => {
    const newCheckedState = !individualCheckBox;
    setIndividualCheckBox(newCheckedState);
    if (checkSet.has(donation_site.donation_id)) {
      setCheck(prevState => {
        prevState.delete(donation_site.donation_id);
        return prevState;
      });
    } else {
      setCheck(prevState => {
        prevState.add(donation_site.donation_id);
        return prevState;
      });
    }
  };

  const handleRowClick = async id => {
    navigate(`/ViewDonation/${id}`);
  };

  return (
    <Tr sx={{ borderTop: '1px solid #EDF2F7' }}>
      <Checkbox
        isChecked={individualCheckBox}
        onChange={handleClick}
        sx={{ top: '15px', padding: '0 10px' }}
      />
      {headers.map((header, index) => (
        <Td key={index} onClick={() => handleRowClick(donation_site.donation_id)}>
          {header}
        </Td>
      ))}
    </Tr>
  );
};

export default DonationSite;
