import { Route, Routes } from 'react-router-dom';
import { BackendProvider } from './contexts/BackendContext';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import BusinessTable from './components/BusinessTable/BusinessTable';
import BusinessDashboard from './components/BusinessDashboard/BusinessDashboard';
import RegisterBusinessForm from './components/RegisterBusinessForm/RegisterBusinessForm';
import DonationForm from './components/DonationForm/DonationForm';
import BusinessNotificationCenter from './components/BusinessNotificationCenter/BusinessNotificationCenter';
import ContactUs from './components/ContactUsForm/ContactUs';
import Navbar from './components/Navbar/Navbar';
import EditContactInformation from './components/EditContactInformation/EditContactInformation';
import styles from './App.module.css';

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
          <Route exact path="/" element={<></>} />
          <Route exact path="/ContactUs" element={<ContactUs />} />
          <Route exact path="/AdminDashboard" />
          <Route exact path="/AdminAllBusinesses" element={<BusinessTable />} />
          <Route exact path="/AdminManageForms" />
          <Route exact path="/AdminTeamManagement" />
          <Route exact path="/EditContactInformation" element={<EditContactInformation />} />
          <Route exact path="/BusinessDashboard" element={<BusinessDashboard />} />
          <Route exact path="/BusinessDonationTrackingForm" element={<DonationForm />} />
          <Route exact path="/BusinessOnboardingForm" element={<RegisterBusinessForm />}></Route>
          <Route
            exact
            path="/BusinessNotificationCenter"
            element={<BusinessNotificationCenter />}
          ></Route>
        </Routes>
      </div>
    </BackendProvider>
  );
};

export default App;
