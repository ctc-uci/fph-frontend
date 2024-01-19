import './App.css';
import { Route, Routes} from 'react-router-dom'
import Navbar from './Navbar.jsx'

const App = () => {
  return (
    <>
      <Navbar isAdmin={false} />
      <Routes>
        <Route exact path="/" element={<div>Welcome to the App</div>}/>
        <Route exact path="/AdminDashboard" />
        <Route exact path="/AdminAllBusinesses" />
        <Route exact path="/AdminManageForms" />
        <Route exact path="/AdminTeamManagement" />
        <Route exact path="/BusinessDashboard" />
        <Route exact path="/BusinessDonationTracking" />
      </Routes>
    </>
  );
};

export default App;
