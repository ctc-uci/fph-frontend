import { Route, Routes } from 'react-router-dom';
import { BackendProvider } from './contexts/BackendContext';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import BusinessDashboard from './components/BusinessDashboard/BusinessDashboard';
import DonationForm from './components/DonationForm/DonationForm';
import BusinessNotificationCenter from './components/BusinessNotificationCenter/BusinessNotificationCenter';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import EditContactInformation from './components/EditContactInformation';
import BusinessDonationHistory from './components/BusinessDonationHistory/BusinessDonationHistory.jsx';
import ContactUs from './components/ContactUsForm/ContactUs';
import DonationTrackingTable from './components/DonationTrackingTable/DonationTrackingTable.jsx';
import styles from './App.module.css';
import DonationItemsTable from './components/DonationItemsTable/DonationItemsTable.jsx';
import Signup from './components/Authentication/Signup.jsx';
import Login from './components/Authentication/Login.jsx';
import ForgotPassword from './components/Authentication/ForgotPassword.jsx';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute.jsx';

const App = () => {
  return (
    <BackendProvider>
      <AuthProvider>
        <div className={styles.appLayout}>
          <Sidebar isAdmin={true} />
          <div className={styles.mainContent}>
            <Routes>
              <Route exact path="/" element={<div>Welcome to the App</div>} />
              <Route exact path="/SignupAdmin" element={<Signup isAdmin={true} />} />
              <Route exact path="/SignupBusiness" element={<Signup isAdmin={false} />} />
              <Route exact path="/LoginAdmin" element={<Login isAdmin={true} />} />
              <Route exact path="/LoginBusiness" element={<Login isAdmin={false} />} />
              <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
              <Route exact path="/ContactUs" element={<ProtectedRoute Component={ContactUs}/>} />
              <Route exact path="/AdminDashboard" element={<ProtectedRoute Component={AdminDashboard}/>} />
              <Route exact path="/AdminManageForms" />
              <Route exact path="/AdminTeamManagement" />
              <Route exact path="/EditContactInformation" element={<ProtectedRoute Component={EditContactInformation} />} />
              <Route exact path="/BusinessDashboard" element={<ProtectedRoute Component={BusinessDashboard}/>} />
              <Route exact path="/BusinessDonationTrackingForm" element={<ProtectedRoute Component={DonationForm}/>} />
              <Route
                exact
                path="/BusinessDonationHistory"
                element={<ProtectedRoute Component={BusinessDonationHistory} />}
              ></Route>
              <Route
                exact
                path="/BusinessNotificationCenter"
                element={<ProtectedRoute Component={BusinessNotificationCenter}/>}
              ></Route>
              <Route
                exact
                path="/EditContactInformation"
                element={<ProtectedRoute Component={EditContactInformation} />}
              ></Route>
              <Route exact path="/DonationItemsTable" element={<ProtectedRoute Component={DonationItemsTable} />} />
              <Route exact path="/DonationTrackingTable" element={<ProtectedRoute Component={DonationTrackingTable}/>} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BackendProvider>
  );
};

export default App;
