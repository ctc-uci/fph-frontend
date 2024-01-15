import { useState } from 'react';
import './App.css';

const App = () => {
  const [unit, setUnit] = useState('oz');
  const handleUnitChange = event => {
    setUnit(event.target.value);
  };
  return (
    <>
      <h1>Submit your Donation Totals</h1>
      <form>
        <label htmlFor="personName"> Name of Person Reporting </label>
        <input type="text" placeholder="Enter your name" id="personName" />

        <label htmlFor="date"> Date </label>
        <input type="date" id="date" />

        <h2> Amounts </h2>
        <label htmlFor="cannedDogFoodAmt"> Canned Dog Food </label>
        <input type="text" placeholder={unit} id="cannedDogFoodAmt" />

        <label htmlFor="dryDogFoodAmt"> Dry Dog Food </label>
        <input type="text" placeholder={unit} id="dryDogFoodAmt" />

        <label htmlFor="cannedCatFoodAmt"> Canned Cat Food </label>
        <input type="text" placeholder={unit} id="cannedCatFoodAmt" />

        <label htmlFor="dryCatFoodAmt"> Canned Dog Food </label>
        <input type="text" placeholder={unit} id="dryCatFoodAmt" />

        <label htmlFor="miscFood">Misc</label>
        <input type="text" id="miscFood" />

        <label> Unit of Measure </label>
        <select id="unit" name="dab" defaultValue={unit} onChange={handleUnitChange}>
          <option value="oz"> ounces (oz) </option>
          <option value="c"> cups (c) </option>
          <option value="g"> grams (g) </option>
        </select>

        <h2> Volunteer Hours </h2>
        <label htmlFor="volunteerHrsWorked"> Number of Volunteer Hours Worked </label>
        <input type="text" placeholder="hrs" name="volunteerHrsWorked" />

        <label htmlFor="volunteerName"> Who </label>
        <input type="text" placeholder="Enter volunteer name" id="volunteerName" />

        <label htmlFor="volunteerActivities"> Briefly describe volunteer activities </label>
        <input type="text" />

        <label htmlFor="photoUpload"> Upload photo </label>
        <input type="file" id="photoUpload" accept="image/*" multiple />

        <button type="button"> Submit </button>
      </form>
    </>
  );
};

export default App;
