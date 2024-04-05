/* eslint-disable react-hooks/exhaustive-deps */
import './AdminFilterBusinesses.module.css';
import BusinessTable from '../BusinessTable/BusinessTable.jsx';
import BusinessTablePending from '../BusinessTablePending/BusinessTablePending.jsx';
import { useBackend } from '../../contexts/BackendContext';
import { useEffect, useState } from 'react';
import { Box, IconButton, Tabs, TabList, Tab } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { useNavigate, Outlet } from 'react-router-dom';

const AdminFilterBusinesses = () => {
  const { backend } = useBackend();
  const [businessDictionary, setBusinessDictionary] = useState([]);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [currentTab, setCurrentTab] = useState('All');
  const [pageLimit, setPageLimit] = useState(1);
  const navigation = useNavigate();

  useEffect(() => {
    loadInfo(currentTab);
  }, [currentPageNum]);

  const changeTab = async (tab, tabName) => {
    setCurrentTab(tab);
    setCurrentPageNum(1);
    navigation(`/AdminDashboard/${tabName}`);
    loadInfo(tab);
  };

  const loadInfo = async tab => {
    let tabQueryParamter = '';

    if (tab !== 'All') {
      tabQueryParamter = `tab=${tab}`
    }

    const businessResponseActive = await backend.get(
      `/business/?businessLimit=10&pageNum=${currentPageNum}&${tabQueryParamter}`,
    );
    setBusinessDictionary([...businessResponseActive.data]);

    const totalBusinesses = await backend.get(
      `/business/totalBusinesses/?${tabQueryParamter}`
    );
    setPageLimit(totalBusinesses.data[0].count);
  };

  return (
    <div>
      <Outlet />
      <Tabs>
        <TabList>
          <Tab onClick={() => changeTab('All', 'All')}>All</Tab>
          <Tab onClick={() => changeTab('Active', 'Submitted')}>Submitted</Tab>
          <Tab onClick={() => changeTab('Pending', 'NotSubmitted')}>Not Submitted</Tab>
          <Tab onClick={() => changeTab('Pending', 'Pending')}>Pending</Tab>
        </TabList>
      </Tabs>

      {currentTab == 'Active' ? (
        <BusinessTable businessData={businessDictionary} />
      ) : (
        <BusinessTablePending businessData={businessDictionary} />
      )}
      <Box>
        {(currentPageNum - 1) * 10 + 1} to {Math.min(currentPageNum * 10, pageLimit)} of {pageLimit}
      </Box>
      <IconButton
        aria-label="Back button"
        isDisabled={currentPageNum <= 1}
        icon={<ChevronLeftIcon />}
        onClick={() =>
          setCurrentPageNum(prevPageNum => prevPageNum - 1)
        }
      />
      <IconButton
        aria-label="Next button"
        isDisabled={currentPageNum * 10 >= pageLimit}
        icon={<ChevronRightIcon />}
        onClick={() =>
          setCurrentPageNum(prevPageNum => prevPageNum + 1)
        }
      />
    </div>
  );
};

export default AdminFilterBusinesses;
