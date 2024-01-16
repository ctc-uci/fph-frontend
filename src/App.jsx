import './App.css';
import { useEffect, useState } from 'react';
import { useBackend } from './contexts/BackendContext';
import DonationForm from './DonationForm';

const App = () => {
  const { backend } = useBackend();
  var max_id = -1;

  const [formData, setFormData] = useState({
    business_id: null, // Since there's no business_id in the form and the database requires a business id (foreign key), the default for now is the maximum business id in the database (9)
    canned_cat_food_quantity: null,
    canned_dog_food_quantity: null,
    date: null,
    donation_id: null,
    dry_cat_food_quantity: null,
    dry_dog_food_quantity: null,
    email: null,
    food_bank_donation: null,
    misc_items: null,
    reporter: null,
    volunteer_hours: null,
  });

  const getData = async () => {
    try {
      const response = await backend.get('/donation');
      for (let i = 0; i < response.data.length; ++i) {
        if (response.data[i].business_id > max_id) {
          max_id = response.data[i].business_id;
        }
      }
      console.log(response.data);
      setFormData(prevState => ({
        ...prevState,
        business_id: max_id,
        donation_id: max_id,
        food_bank_donation: 'NULL',
        email: 'NULL',
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <DonationForm data={formData} changeData={setFormData}/>;
};

export default App;
