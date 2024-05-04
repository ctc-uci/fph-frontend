/* eslint react/prop-types: 0 */
import { Tr, Td, Checkbox } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DonationSite = ({ donation_site, checkSet, setCheck, topCheckBox }) => {
  const [individualCheckBox, setIndividualCheckBox] = useState(topCheckBox);
  const navigate = useNavigate();
  useEffect(() => {
    setIndividualCheckBox(topCheckBox);
  }, [topCheckBox]);

  const headers = [
    'NULL',
    donation_site.donation_id,
    donation_site.food_bank_donation,
    donation_site.reporter,
    donation_site.email,
    new Date(donation_site.date).toLocaleDateString(),
    donation_site.canned_dog_food_quantity,
    donation_site.dry_dog_food_quantity,
    donation_site.canned_cat_food_quantity,
    donation_site.dry_cat_food_quantity,
    donation_site.misc_items,
    donation_site.volunteer_hours,
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
    <Tr>
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
