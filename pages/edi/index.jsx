/* eslint-disable react/no-children-prop */
import {
  EdiDownload, MainLayOut
} from "@/components";
import {
  Tab, TabList, TabPanel, TabPanels, Tabs
} from "@chakra-ui/react";

const EDIPage = () => {

  return (
    <MainLayOut title={`ข้อมูล EDI`} description={`จัดการข้อมูล EDI`}>
      <Tabs align="end" variant="enclosed">
        <TabList>
          <Tab>รายการดาว์นโหลด</Tab>
          <Tab>รายการอัพโหลด</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <EdiDownload />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MainLayOut>
  );
};

export default EDIPage;
