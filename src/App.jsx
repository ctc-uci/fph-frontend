import { Route, Routes } from 'react-router-dom';
import { BackendProvider } from './contexts/BackendContext';
import Navbar from './Navbar.jsx';
import BusinessTable from './components/BusinessTable/BusinessTable';
import BusinessDashboard from './components/BusinessDashboard/BusinessDashboard';
import RegisterBusinessForm from './components/RegisterBusinessForm/RegisterBusinessForm';
import DonationForm from './components/DonationForm/DonationForm'
import './App.css';

const App = () => {
  return (
    <BackendProvider>
      <Navbar isAdmin={false} />
      <Routes>
        <Route exact path="/" element={<div>Welcome to the App</div>} />
        <Route exact path="/AdminDashboard" />
        <Route exact path="/AdminAllBusinesses" element={<BusinessTable />} />
        <Route exact path="/AdminManageForms" />
        <Route exact path="/AdminTeamManagement" />
        <Route exact path="/BusinessDashboard" element={<BusinessDashboard />} />
        <Route exact path="/BusinessDonationTrackingForm" element={<DonationForm />}/>
        <Route exact path="/BusinessOnboardingForm" element={<RegisterBusinessForm />}></Route>
      </Routes>
    </BackendProvider>
  );
};

export default App;
