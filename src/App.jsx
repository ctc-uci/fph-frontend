import { Route, Routes } from 'react-router-dom';
import { BackendProvider } from './contexts/BackendContext';
import Navbar from './Navbar.jsx';
import AdminAllBusinesses from './components/AdminAllBusinesses/AdminAllBusinesses.jsx';
import BusinessDashboard from './components/BusinessDashboard/BusinessDashboard';
import DonationForm from './components/DonationForm/DonationForm';
import BusinessNotificationCenter from './components/BusinessNotificationCenter/BusinessNotificationCenter';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import EditContactInformation from './components/EditContactInformation';

const App = () => {
  return (
    <BackendProvider>
      <Navbar isAdmin={true} />
      <Navbar isAdmin={true} />
      <Routes>
        <Route exact path="/" element={<div>Welcome to the App</div>} />
        <Route exact path="/AdminDashboard" element={<AdminDashboard />} />
        <Route exact path="/AdminAllBusinesses" element={<AdminAllBusinesses />} />
        <Route exact path="/AdminManageForms" />
        <Route exact path="/AdminTeamManagement" />
        <Route exact path="/BusinessDashboard" element={<BusinessDashboard />} />
        <Route exact path="/BusinessDonationTrackingForm" element={<DonationForm />} />
        <Route
          exact
          path="/BusinessNotificationCenter"
          element={<BusinessNotificationCenter />}
        ></Route>
        <Route exact path="/EditContactInformation" element={<EditContactInformation />}></Route>
      </Routes>
    </BackendProvider>
  );
};

export default App;
