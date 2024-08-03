import { useEffect, useState } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext.jsx';
import BusinessForm from '../BusinessForm/BusinessForm';
import PendingBusinessTable from '../PendingBusinessTable/PendingBusinessTable';

const AdminAllBusinesses = () => {
  const [pendingFlag, setPendingFlag] = useState(false);
  const [formFlag, setFormFlag] = useState(false);
  const [formItem, setFormItem] = useState({});
  const [isAdminUser, setIsAdminUser] = useState(false);

  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsAdmin = async () => {
      if (!(await isAdmin())) {
        navigate('/BusinessDashboard');
      } else {
        setIsAdminUser(true);
      }
    };
    checkIsAdmin();
  }, []);

  const handleClickPending = () => {
    setPendingFlag(true);
    setFormFlag(false);
  };

  const handleClickAll = () => {
    setPendingFlag(true);
    setFormFlag(false);
  };

  function goToBusinessForm(item) {
    setFormFlag(true);
    setFormItem(item);
  }

  let contents = (
    <div>
      {formFlag && (
        <>
          <Text>
            <Link onClick={handleClickAll} color="teal.500">
              Businesses
            </Link>{' '}
            &gt;
            <Link onClick={handleClickPending}>Pending Applications</Link> &gt;
            {formItem.name}
          </Text>
          <BusinessForm pending={true} pendingData={formItem} />
        </>
      )}

      {!formFlag && !pendingFlag && (
        <>
          <Button colorScheme="teal" variant="outline" onClick={handleClickPending}>
            Pending Applications
          </Button>
          {/* <BusinessTable /> */}
        </>
      )}

      {!formFlag && pendingFlag && (
        <>
          <Text>
            <Link onClick={handleClickAll} color="teal.500">
              Businesses
            </Link>{' '}
            &gt; Pending Applications
          </Text>
          <PendingBusinessTable goToBusinessForm={(item) => goToBusinessForm(item)} />
        </>
      )}
    </div>
  );

  return isAdminUser ? contents : <></>;
};

export default AdminAllBusinesses;
