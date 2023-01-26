import { MainLayOut, ReceiveTable } from "@/components";

const ReceivePage = () => {
  return (
    <MainLayOut
      title={`รายการรับสินค้า`}
      description={`จัดการข้อมูลการรับสินค้า`}
    >
      <>
        <ReceiveTable limit={15} />
      </>
    </MainLayOut>
  );
};

export default ReceivePage;
