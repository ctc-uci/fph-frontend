import { Route, Routes } from 'react-router-dom';
import { BackendProvider } from './contexts/BackendContext';
import Navbar from './Navbar.jsx';
import AdminAllBusinesses from './components/AdminAllBusinesses/AdminAllBusinesses.jsx';
import BusinessDashboard from './components/BusinessDashboard/BusinessDashboard';
import BusinessForm from './components/BusinessForm/BusinessForm.jsx';
import DonationForm from './components/DonationForm/DonationForm';
import BusinessNotificationCenter from './components/BusinessNotificationCenter/BusinessNotificationCenter';

const App = () => {
  return (
    <BackendProvider>
      <Navbar isAdmin={false} />
      <Routes>
        <Route exact path="/" element={<div>Welcome to the App</div>} />
        <Route exact path="/AdminDashboard" />
        <Route exact path="/AdminAllBusinesses" element={<AdminAllBusinesses />} />
        <Route exact path="/AdminManageForms" />
        <Route exact path="/AdminTeamManagement" />
        <Route exact path="/BusinessDashboard" element={<BusinessDashboard />} />
        <Route exact path="/BusinessDonationTrackingForm" element={<DonationForm />} />
        <Route exact path="/BusinessOnboardingForm" element={<BusinessForm pending={true} pendingData={
          {
            name: "Test Business",
            contactName: "Test Contact",
            street: "123 Test St",
            city: "Test City",
            state: "Test State",
            zip: "12345",
            website: "www.test.com",
            primaryPhone: "123-456-7890",
            primaryEmail: "test@test.com",
            findOut: "Test Find Out",
          }
        } />}></Route>
        <Route
          exact
          path="/BusinessNotificationCenter"
          element={<BusinessNotificationCenter />}
        ></Route>
      </Routes>
    </BackendProvider>
  );
};

export default App;
