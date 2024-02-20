import { Route, Routes } from 'react-router-dom';
import { BackendProvider } from './contexts/BackendContext';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import AdminAllBusinesses from './components/AdminAllBusinesses/AdminAllBusinesses';
import BusinessDashboard from './components/BusinessDashboard/BusinessDashboard';
import DonationForm from './components/DonationForm/DonationForm';
import BusinessNotificationCenter from './components/BusinessNotificationCenter/BusinessNotificationCenter';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import EditContactInformation from './components/EditContactInformation';
import BusinessDonationHistory from './components/BusinessDonationHistory/BusinessDonationHistory.jsx';
import ContactUs from './components/ContactUsForm/ContactUs';
import Navbar from './components/Navbar/Navbar';
import styles from './App.module.css';
import DonationItemsTable from './components/DonationItemsTable/DonationItemsTable.jsx';

const App = () => {
  return (
    <BackendProvider>
      <Navbar
        showContactUs={true}
        title={''}
        showSettings={false}
        excelDownload={false}
        backButton={true}
      />
      <div className={styles.appLayout}>
        <Sidebar isAdmin={false} />
        <Routes>
          <Route exact path="/" element={<div>Welcome to the App</div>} />
          <Route exact path="/ContactUs" element={<ContactUs />} />
          <Route exact path="/AdminDashboard" element={<AdminDashboard />} />
          <Route exact path="/AdminAllBusinesses" element={<AdminAllBusinesses />} />
          <Route exact path="/AdminManageForms" />
          <Route exact path="/AdminTeamManagement" />
          <Route exact path="/EditContactInformation" element={<EditContactInformation />} />
          <Route exact path="/BusinessDashboard" element={<BusinessDashboard />} />
          <Route exact path="/BusinessDonationTrackingForm" element={<DonationForm />} />
          <Route
            exact
            path="/BusinessDonationHistory"
            element={<BusinessDonationHistory />}
          ></Route>
          <Route
            exact
            path="/BusinessNotificationCenter"
            element={<BusinessNotificationCenter />}
          ></Route>
          <Route exact path="/EditContactInformation" element={<EditContactInformation />}></Route>
          <Route exact path="/DonationItemsTable" element={<DonationItemsTable />} />
        </Routes>
      </div>
    </BackendProvider>
  );
};

export default App;
