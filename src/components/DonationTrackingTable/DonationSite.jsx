/* eslint react/prop-types: 0 */
import { Tr, Td, Checkbox } from '@chakra-ui/react';

const DonationSite = ({ donation_site, checkSet, setCheck, topCheckBox }) => {
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

  return (
    <Tr>
      <Checkbox isChecked={topCheckBox} onChange={handleClick} sx={{top: "15px", padding: "0 10px"}} />
      {headers.map((header, index) => (
        <Td key={index}>{header}</Td>
      ))}
    </Tr>
  );
};

export default DonationSite;
