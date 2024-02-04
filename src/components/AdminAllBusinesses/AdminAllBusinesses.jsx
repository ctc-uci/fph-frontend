import BusinessTable from '../BusinessTable/BusinessTable';
import PendingBusinessTable from '../PendingBusinessTable/PendingBusinessTable';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';

const AdminAllBusinesses = () => {
    const [pendingFlag, setPendingFlag] = useState(false);

    const handleClick = () => {
        setPendingFlag(true);
    };

    let contents = (
        <div>
            {!pendingFlag 
                ? 
                <Button colorScheme="teal" variant="outline" onClick={handleClick}>
                    Pending Applications
                </Button> 
                :
                <></>}
            {!pendingFlag ? <BusinessTable /> : <PendingBusinessTable />}
        </div>
    );

    return contents;
};

export default AdminAllBusinesses;