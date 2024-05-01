import { Route, Routes, useLocation } from 'react-router-dom';
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
import BusinessSetupPageMaster from './components/SetUp/BusinessSetupPageMaster.jsx';
import Login from './components/Authentication/Login.jsx';
import BusinessFormMaster from './components/OnBoarding/BusinessFormMaster.jsx';
import ForgotPassword from './components/Authentication/ForgotPassword.jsx';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import ViewBusiness from './components/ViewBusiness/ViewBusiness.jsx';
import { AddBusinessForm, BusinessForm } from './components/BusinessForm/BusinessForm.jsx';
import Congrats from './components/DonationForm/Congrats.jsx';
import ViewRequest from './components/ViewRequest/ViewRequest.jsx';
import AdminSettingsMaster from './components/AdminSettings/AdminSettingsMaster.jsx';

const App = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  return (
    <BackendProvider>
      <AuthProvider>
        <div className={styles.appLayout}>
          {currentRoute == '/SignupAdmin' ||
            currentRoute == '/SignupBusiness' ||
            currentRoute == '/Login' ||
            currentRoute == '/ForgotPassword' ||
            currentRoute == '/BusinessForm' || <Sidebar isAdmin={false} />}
          <div className={styles.mainContent}>
            <Routes>
              <Route
                exact
                path="/SignupAdmin"
                element={<BusinessSetupPageMaster isAdmin={true} />}
              />
              <Route
                exact
                path="/SignupBusiness"
                element={<BusinessSetupPageMaster isAdmin={false} />}
              />
              <Route exact path="/Login" element={<Login isAdmin={true} />} />
              <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
              <Route exact path="/ContactUs" element={<ProtectedRoute Component={ContactUs} />} />
              <Route exact path="/Congrats" element={<ProtectedRoute Component={Congrats} />} />
              <Route
                exact
                path="/AdminDashboard"
                element={<ProtectedRoute Component={AdminDashboard} />}
              />
              <Route exace path="/AdminSettings" Component={AdminSettingsMaster} />
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
              <Route
                exact
                path="/ViewRequest/:id"
                element={<ProtectedRoute Component={ViewRequest} />}
              />
              <Route
                exact
                path="/AddBusiness"
                element={<ProtectedRoute Component={AddBusinessForm} />}
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BackendProvider>
  );
};

export default App;
