import { Box, Flex } from '@chakra-ui/react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';
import { AdminSettingsMaster } from './components/AdminSettings/AdminSettingsMaster';
import ForgotPassword from './components/Authentication/ForgotPassword';
import Login from './components/Authentication/Login';
import { BusinessDashboard } from './components/BusinessDashboard/BusinessDashboard';
import { BusinessDonationHistory } from './components/BusinessDonationHistory/BusinessDonationHistory';
import { ViewBusinessDonationHistory } from './components/BusinessDonationHistory/ViewBusinessDonationHistory/ViewBusinessDonationHistory';
import { AddBusinessForm, BusinessForm } from './components/BusinessForm/BusinessForm';
import { BusinessSetupPage } from './components/BusinessSetup/BusinessSetupPage';
import { CatchAll } from './components/CatchAll';
import { Congrats } from './components/DonationForm/Congrats';
import { DonationForm } from './components/DonationForm/DonationForm';
import { DonationItemsTable } from './components/DonationItemsTable/DonationItemsTable';
import { DonationTrackingTable } from './components/DonationTrackingTable/DonationTrackingTable';
import { EditContactInformation } from './components/EditContactInformation';
import BusinessFormMaster from './components/OnBoarding/BusinessFormMaster';
import { Sidebar } from './components/Sidebar/Sidebar';
import { SupplyRequestsPage } from './components/SupplyRequests/SupplyRequestsPage';
import { ViewBusiness } from './components/ViewBusiness/ViewBusiness';
import ViewDonation from './components/ViewDonation/ViewDonation';
import ViewRequest from './components/ViewRequest/ViewRequest';
import { AuthProvider } from './contexts/AuthContext';
import { BackendProvider } from './contexts/BackendContext';
import { ProtectedRoute } from './utils/ProtectedRoute';

const App = () => {
  const location = useLocation();
  const currentRoute = location.pathname.toLowerCase();

  const shouldShowSidebar = !(
    currentRoute == '/onboarding' ||
    currentRoute == '/signupadmin' ||
    currentRoute == '/signupbusiness' ||
    currentRoute == '/login' ||
    currentRoute == '/forgotpassword' ||
    currentRoute == '/businessform'
  );

  return (
    <BackendProvider>
      <AuthProvider>
        <Flex
          sx={{
            flexDirection: 'row',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {shouldShowSidebar ? <Sidebar /> : null}
          <Box sx={{ backgroundColor: '#F9F8F7', flex: 1, overflow: 'scroll' }}>
            <Routes>
              <Route path="/Onboarding" element={<BusinessFormMaster />} />
              <Route path="/SignupAdmin" element={<BusinessSetupPage isAdmin={true} />} />
              <Route path="/SignupBusiness" element={<BusinessSetupPage isAdmin={false} />} />
              <Route path="/Login" element={<Login isAdmin={true} />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route
                path="/ContactUs"
                element={<ProtectedRoute Component={SupplyRequestsPage} />}
              />
              <Route path="/Congrats" element={<ProtectedRoute Component={Congrats} />} />
              <Route
                path="/AdminDashboard"
                element={<ProtectedRoute Component={AdminDashboard} isAdminRoute={true} />}
              />
              <Route
                path="/AdminSettings"
                element={<ProtectedRoute Component={AdminSettingsMaster} isAdminRoute={true} />}
              />
              <Route
                path="/EditContactInformation"
                element={<ProtectedRoute Component={EditContactInformation} />}
              />
              <Route
                path="/BusinessDashboard"
                element={<ProtectedRoute Component={BusinessDashboard} />}
              />
              <Route
                path="/BusinessDonationTrackingForm"
                element={<ProtectedRoute Component={DonationForm} />}
              />
              <Route
                path="/BusinessDonationHistory"
                element={<ProtectedRoute Component={BusinessDonationHistory} />}
              />
              <Route
                path="/EditContactInformation"
                element={<ProtectedRoute Component={EditContactInformation} />}
              />
              <Route
                path="/DonationItemsTable"
                element={<ProtectedRoute Component={DonationItemsTable} />}
              />
              <Route
                path="/DonationTrackingTable"
                element={<ProtectedRoute Component={DonationTrackingTable} />}
              />
              <Route
                path="/ViewBusiness/:id"
                element={<ProtectedRoute Component={ViewBusiness} />}
              />
              <Route
                path="/EditBusiness/:id"
                element={<ProtectedRoute Component={BusinessForm} />}
              />
              <Route path="/ViewRequest/:id" element={<ProtectedRoute Component={ViewRequest} />} />
              <Route
                path="/ViewDonation/:id"
                element={<ProtectedRoute Component={ViewDonation} />}
              />
              <Route
                path="/BusinessDonationHistory/:id"
                element={<ProtectedRoute Component={ViewBusinessDonationHistory} />}
              />
              <Route path="/AddBusiness" element={<ProtectedRoute Component={AddBusinessForm} />} />

              {/* Catch-all route */}
              <Route path="*" element={<ProtectedRoute Component={CatchAll} />} />
            </Routes>
          </Box>
        </Flex>
      </AuthProvider>
    </BackendProvider>
  );
};

export default App;
