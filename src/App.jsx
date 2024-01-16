import './App.css';
import { Route, Routes, BrowserRouter} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" />
        <Route exact path="/AdminDashboard" />
        <Route exact path="/AdminAllBusinesses" />
        <Route exact path="/AdminManageForms" />
        <Route exact path="/AdminTeamManagement" />
        <Route exact path="/BusinessDashboard" />
        <Route exact path="/BusinessDonationTracking" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
