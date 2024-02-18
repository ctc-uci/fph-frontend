/* eslint react/prop-types: 0 */
import { Tr, Td, Checkbox } from '@chakra-ui/react';

const DonationSite = ({ donation_site, checkSet, setCheck, topCheckBox }) => {
  const headers = [
    'NULL',
    donation_site.donation_id,
    donation_site.food_bank_donation,
    donation_site.reporter,
    donation_site.email,
    donation_site.date,
    donation_site.canned_dog_food_quantity,
    donation_site.dry_dog_food_quantity,
    donation_site.canned_cat_food_quantity,
    donation_site.dry_cat_food_quantity,
    donation_site.misc_items,
    donation_site.volunteer_hours,
  ];

  const handleClick = () => {
    if (checkSet.has(donation_site.donationId)) {
      setCheck(prevState => {
        prevState.delete(donation_site.donationId);
        return prevState;
      });
    } else {
      setCheck(prevState => {
        prevState.add(donation_site.donationId);
        return prevState;
      });
    }
  };

  return (
    <Tr>
      <Checkbox defaultChecked={topCheckBox ? true : false} onChange={handleClick} />
      {headers.map((header, index) => (
        <Td key={index}>{header}</Td>
      ))}
    </Tr>
  );
};

export default DonationSite;
