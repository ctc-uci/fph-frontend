import { useEffect, useState } from 'react';
import { Checkbox, Td, Tr } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useBackend } from '../../contexts/BackendContext';
import { Donation } from '../../types/donation';

interface DonationSiteProps {
  donation: Donation;
  checkedSet: Set<number>;
  allChecked: boolean;
  setCheckedSet: (set: Set<number>) => unknown;
}

export const DonationSite = ({
  donation,
  checkedSet,
  allChecked,
  setCheckedSet,
}: DonationSiteProps) => {
  const navigate = useNavigate();
  const { backend } = useBackend();

  const [isChecked, setIsChecked] = useState(allChecked || checkedSet.has(donation.business_id));
  const [donationSiteName, setDonationSiteName] = useState('');

  useEffect(() => {
    setIsChecked(allChecked);
  }, [allChecked]);

  useEffect(() => {
    const getDonationSiteName = async () => {
      try {
        const businessResponse = await backend.get(`business/${donation.business_id}`);
        setDonationSiteName(businessResponse.data[0].name);
      } catch (error) {
        console.log(error);
      }
    };

    getDonationSiteName();
  }, []);

  const cells = [
    donationSiteName,
    donation?.donation_id,
    donation?.food_bank_donation,
    donation?.reporter,
    donation?.email,
    donation?.date ? new Date(donation.date).toLocaleDateString() : null,
    donation?.canned_dog_food_quantity !== null
      ? `${donation.canned_dog_food_quantity} lb`
      : '0 lb',
    donation?.dry_dog_food_quantity !== null ? `${donation.dry_dog_food_quantity} lb` : '0 lb',
    donation?.canned_cat_food_quantity !== null
      ? `${donation.canned_cat_food_quantity} lb`
      : '0 lb',
    donation?.dry_cat_food_quantity !== null ? `${donation.dry_cat_food_quantity} lb` : '0 lb',
    donation?.misc_items,
    donation?.volunteer_hours !== null ? `${donation.volunteer_hours} hrs` : '0 hrs',
  ];

  const handleClick = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    const newSet = new Set(checkedSet);
    checkedSet.has(donation.donation_id)
      ? newSet.delete(donation.donation_id)
      : newSet.add(donation.donation_id);

    setCheckedSet(newSet);
  };

  const handleRowClick = async (id: number) => {
    navigate(`/ViewDonation/${id}`);
  };

  return (
    <Tr>
      <Td>
        <Checkbox isChecked={isChecked} onChange={handleClick} />
      </Td>

      {cells.map((cell, index) => (
        <Td key={index} onClick={() => handleRowClick(donation.donation_id)}>
          {cell}
        </Td>
      ))}
    </Tr>
  );
};
