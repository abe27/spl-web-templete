import { MainLayOut, StockList } from "@/components";
import { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const StockPage = () => {
  const [loading, setLoading] = useState(false);

  const FetchData = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <MainLayOut
      title={`ข้อมูลคลังสินค้า`}
      description={`จัดการข้อมูลคลังสินค้า`}
    >
      <Tabs align="end" variant="enclosed">
        <TabList>
          <Tab>
            <span className="text-sm text-small">รายการสินค้า</span>
          </Tab>
          <Tab>
            <span className="text-sm text-small">รอทำพาเลท</span>
          </Tab>
          <Tab>
            <span className="text-sm text-small">รอจัดเก็บ</span>
          </Tab>
          <Tab>
            <span className="text-sm text-small">จัดเตรียม</span>
          </Tab>
          <Tab>
            <span className="text-sm text-small">ผลการสต็อค</span>
          </Tab>
          <Tab>
            <span className="text-sm text-small">ประวัติการเคลื่อนไหว</span>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <StockList />
          </TabPanel>
          <TabPanel>รอทำพาเลท</TabPanel>
          <TabPanel>รอจัดเก็บ</TabPanel>
          <TabPanel>จัดเตรียม</TabPanel>
          <TabPanel>ตรวจเช็คสต็อค</TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayOut>
  );
};

export default StockPage;
