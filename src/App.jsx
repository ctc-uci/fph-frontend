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
import BusinessFormMaster from './components/OnBoarding/BusinessFormMaster.jsx';
import ForgotPassword from './components/Authentication/ForgotPassword.jsx';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import ViewBusiness from './components/ViewBusiness/ViewBusiness.jsx';
import BusinessForm from './components/BusinessForm/BusinessForm.jsx';

const App = () => {
  return (
    <BackendProvider>
      <AuthProvider>
        <div className={styles.appLayout}>
          <Sidebar isAdmin={false} />
          <div className={styles.mainContent}>
            <Routes>
              <Route exact path="/SignupAdmin" element={<Signup isAdmin={true} />} />
              <Route exact path="/SignupBusiness" element={<Signup isAdmin={false} />} />
              <Route exact path="/LoginAdmin" element={<Login isAdmin={true} />} />
              <Route exact path="/LoginBusiness" element={<Login isAdmin={false} />} />
              <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
              <Route exact path="/ContactUs" element={<ProtectedRoute Component={ContactUs} />} />
              <Route
                exact
                path="/AdminDashboard"
                element={<ProtectedRoute Component={AdminDashboard} />}
              />
              <Route exact path="/AdminManageForms" />
              <Route exact path="/AdminTeamManagement" />
              <Route
                exact
                path="/EditContactInformation"
                element={<ProtectedRoute Component={EditContactInformation} />}
              />
              <Route
                exact
                path="/BusinessDashboard"
                element={<ProtectedRoute Component={BusinessDashboard} />}
              />
              <Route
                exact
                path="/BusinessDonationTrackingForm"
                element={<ProtectedRoute Component={DonationForm} />}
              />
              <Route
                exact
                path="/BusinessDonationHistory"
                element={<ProtectedRoute Component={BusinessDonationHistory} />}
              ></Route>
              <Route
                exact
                path="/BusinessNotificationCenter"
                element={<ProtectedRoute Component={BusinessNotificationCenter} />}
              ></Route>
              <Route
                exact
                path="/EditContactInformation"
                element={<ProtectedRoute Component={EditContactInformation} />}
              ></Route>
              <Route
                exact
                path="/DonationItemsTable"
                element={<ProtectedRoute Component={DonationItemsTable} />}
              />
              <Route
                exact
                path="/DonationTrackingTable"
                element={<ProtectedRoute Component={DonationTrackingTable} />}
              />
              <Route
                exact
                path="/BusinessForm"
                element={<ProtectedRoute Component={BusinessFormMaster} />}
              />
              <Route
                exact
                path="/ViewBusiness/:id"
                element={<ProtectedRoute Component={ViewBusiness} />}
              />
              <Route
                exact
                path="/EditBusiness/:id"
                element={<ProtectedRoute Component={BusinessForm} />}
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BackendProvider>
  );
};

export default App;
