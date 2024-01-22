import { Route, Routes} from 'react-router-dom'
import Navbar from './Navbar.jsx'
import BusinessTable from './components/BusinessTable/BusinessTable';
import BusinessDashboard from './components/BusinessDashboard/BusinessDashboard';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar isAdmin={false} />
      <Routes>
        <Route exact path="/" element={<div>Welcome to the App</div>}/>
        <Route exact path="/AdminDashboard" />
        <Route exact path="/AdminAllBusinesses" element={<BusinessTable />}/>
        <Route exact path="/AdminManageForms" />
        <Route exact path="/AdminTeamManagement" />
        <Route exact path="/BusinessDashboard" element={<BusinessDashboard />}/>
        <Route exact path="/BusinessDonationTracking" />
      </Routes>
    </>
  );
};

export default App;
