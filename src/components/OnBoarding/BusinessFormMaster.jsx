// houses components like components 1,2 ,3 ,4
// pass setters as props to components 1,2,3,4
import { useState } from 'react';
import Page1Onboarding from './Page1Onboarding';
import Page2Onboarding from './Page2Onboarding';


const BusinessFormMaster = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    personFirstName: '',
    personLastName: '',
    personEmail: '',
    personPosition: '',
    businessWebsite: '',
    businessAddress1: '',
    businessAddress2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    businessHours: '',
    phoneNumber: '',
    heardAbout: '',
    termsAndConditionsAccepted: false,
  });

  const [step, setStep] = useState(0);

  const handleChange = event => {
    const name = event.target.name;
    var value = event.target.value;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Next step

  const nextStep = () => {
    setStep(prevState => prevState + 1);
  };

  // previous step

  const prevStep = () => {
    setStep(prevState => prevState - 1);
  };

  // Map steps to components

  const stepsComponents = [
    <Page1Onboarding key={0} formData={formData} handleChange={handleChange} nextStep={nextStep} />,
    <Page2Onboarding key={1} formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />,
  ];
    
return (
  <div>
    {stepsComponents[step]}
  </div>
);
};

export default BusinessFormMaster;
