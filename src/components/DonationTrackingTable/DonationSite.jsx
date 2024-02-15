/* eslint react/prop-types: 0 */
import {
    Tr,
    Td,
    Checkbox
  } from '@chakra-ui/react';

const DonationSite = ({donation_site, checkSet, setCheck, topCheckBox}) => {

    const handleClick = () => {
        if (checkSet.has(donation_site.donationId)) {
            setCheck((prevState) => {
                prevState.delete(donation_site.donationId);
                return prevState;
            })
        } else {
            setCheck((prevState) => {
                prevState.add(donation_site.donationId);
                return prevState;
            })
        }
    }
    
    return (
        <Tr>
            <Checkbox defaultChecked={topCheckBox ? true : false} onChange={handleClick}/>
            <Td>NULL</Td>
            <Td>{donation_site.donationId}</Td>
            <Td>{donation_site.foodBank}</Td>
            <Td>{donation_site.reporter}</Td>
            <Td>{donation_site.email}</Td>
            <Td>{donation_site.date}</Td>
            <Td>{donation_site.cannedDogFoodQuantity}</Td>
            <Td>{donation_site.dryDogFoodQuantity}</Td>
            <Td>{donation_site.cannedCatFoodQuantity}</Td>
            <Td>{donation_site.dryCatFoodQuantity}</Td>
            <Td>{donation_site.miscItems}</Td>
            <Td>{donation_site.volunteerHours}</Td>
        </Tr>
    )
};

export default DonationSite;