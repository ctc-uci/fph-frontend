import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from '@chakra-ui/react';
import { useBackend } from './contexts/BackendContext';
import PropTypes from 'prop-types';

const DonationForm = ({ data, changeData}) => {
  const { backend } = useBackend();
  const submitForm = async event => {
    console.log('poop');
    event.preventDefault();
    console.log(data);
    await backend.post('/donation', data);
  };

  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;
    changeData(prevState => ({ ...prevState, [name]: value }));
    console.log({ ...data, [name]: value });
  };
  return (
    <>
      <h1>Submit your Donation Totals</h1>
      <FormControl>
        <FormLabel htmlFor="personName">Name of Person Reporting</FormLabel>
        <Input
          id="personName"
          placeholder="Enter your name"
          size="lg"
          name="reporter"
          onChange={handleChange}
        />
        <FormLabel htmlFor="date">Date</FormLabel>
        <Input id="date" type="date" name="date" onChange={handleChange} />
        <h2> Amounts </h2>
        <FormLabel htmlFor="cannedDogFoodAmt">Canned Dog Food</FormLabel>
        <Input
          id="cannedDogFoodAmt"
          placeholder="Enter amount"
          size="lg"
          name="canned_dog_food_quantity"
          onChange={handleChange}
          type="number"
        />
        <FormLabel htmlFor="dryDogFoodAmt">Dry Dog Food</FormLabel>
        <Input
          id="dryDogFoodAmt"
          placeholder="Enter amount"
          size="lg"
          name="dry_dog_food_quantity"
          onChange={handleChange}
          type="number"
        />
        <FormLabel htmlFor="cannedCatFoodAmt">Canned Cat Food</FormLabel>
        <Input
          id="cannedCatFoodAmt"
          placeholder="Enter amount"
          size="lg"
          name="canned_cat_food_quantity"
          onChange={handleChange}
          type="number"
        />
        <FormLabel htmlFor="dryCatFoodAmt">Dry Cat Food</FormLabel>
        <Input
          id="dryCatFoodAmt"
          placeholder="Enter amount"
          size="lg"
          name="dry_cat_food_quantity"
          onChange={handleChange}
          type="number"
        />
        <FormLabel htmlFor="miscFood">Misc</FormLabel>
        <Input
          id="miscFood"
          placeholder="Enter amount"
          size="lg"
          name="misc_items"
          onChange={handleChange}
        />
        <FormLabel>Unit of Measure</FormLabel>
        <Select id="unit" name="dab">
          <option value="oz"> ounces (oz) </option>
          <option value="c"> cups (c) </option>
          <option value="g"> grams (g) </option>
        </Select>
        <h2> Volunteer Hours </h2>
        <FormLabel htmlFor="volunteerHrsWorked">Number of Volunteer Hours Worked </FormLabel>
        <Input
          id="volunteerHrsWorked"
          placeholder="Enter amount"
          size="lg"
          name="volunteer_hours"
          onChange={handleChange}
          type="number"
        />
        <FormLabel htmlFor="volunteerName">Who</FormLabel>
        <Input id="volunteerName" placeholder="Enter volunteer name" size="lg" />
        <FormLabel htmlFor="volunteerActivities">Briefly describe volunteer activities</FormLabel>
        <Input id="volunteerActivities" placeholder="Enter volunteer activities" size="lg" />
        <FormLabel htmlFor="photoUpload">Upload photo</FormLabel>
        <Input id="photoUpload" type="file" accept="image/*" multiple />
        <Button type="button" onClick={submitForm}>
          Submit
        </Button>
      </FormControl>
    </>
  );
};

DonationForm.propTypes = {
    data: PropTypes.object,
    changeData: PropTypes.func,
  }

// Note that unit of measure, food bank donation, volunteer description, photo upload, and volunteer name is NOT tracked in the backend database, however it is detailed in the Figma design.
// Unused data points: business_id, donation_id, email, food_bank_donation
// Quantities look discrete in the backend, however it seems from the design that they are measured in ounces, cups, and grams. I'm not sure how to handle this discrepency. Will keep as an int to stay consistent w/ backend for now.

export default DonationForm;
