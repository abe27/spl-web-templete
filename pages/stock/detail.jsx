import { DrawerCartonDetail, Loading, MainLayOut } from "@/components";
import { RandomLastUpdate, FetchPart } from "@/hook";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

const StockDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const [txtSearch, setTxtSearch] = useState("");
  const [data, setData] = useState([]);

  const SearchTxt = (e) => {
    setTxtSearch(e.target.value);
  };

  const FetchData = () => {
    setLoading(true);
    setData([]);
    let p = FetchPart(10);
    let doc = [];
    p.map((i) => {
      doc.push({
        id: doc.length + 1,
        part: i,
        serial_no: faker.finance.account(10), // ซีเรียล
        lot_no: faker.finance.account(6), // เลขที่ LOT
        line_no: `T-${faker.finance.account(1)}`, // LINE NO
        revise_no: faker.finance.account(1), // REVISE NO
        shelve_no: "-", // ชั้น
        pallet_no: "-", // เลขที่พาเลท
        qty: faker.datatype.number({ min: 0, max: 9999 }),
        updated: RandomLastUpdate(),
      });
    });
    const timer = setTimeout(() => {
      setLoading(false);
      setData(doc);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    FetchData();
  }, [txtSearch]);

  return (
    <MainLayOut
      title={`รายละเอียดเพิ่มเติม`}
      description={`จัดการรายละเอียดเพิ่มเติม`}
    >
      <div className="overflow-x-auto">
        <div className="flex justify-between">
          <div className="flex justify-start">
            <span
              className={`btn btn-sm btn-ghost btn-circle hover:cursor-pointer hover:animate-spin hover:text-gray-50 hover:bg-rose-600 ${
                loading ? "animate-spin bg-rose-600 text-gray-50" : ""
              }`}
              onClick={FetchData}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </span>
          </div>
          <div className="flex justify-end">
            <>
              <InputGroup size="sm" width="auto">
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  // eslint-disable-next-line react/no-children-prop
                  children={<SearchIcon />}
                />
                <Input
                  placeholder="ค้นหา"
                  value={txtSearch}
                  onChange={(e) => SearchTxt(e)}
                />
                <InputRightElement
                  // eslint-disable-next-line react/no-children-prop
                  children={
                    txtSearch.length > 0 ? (
                      <span
                        className="hover:cursor-pointer"
                        onClick={() => setTxtSearch("")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 text-rose-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    ) : (
                      <></>
                    )
                  }
                />
              </InputGroup>
            </>
          </div>
        </div>
        <div className="divider" />
        <table className="table w-full table-compact">
          <thead>
            <tr>
              <th>#</th>
              <th>สินค้า</th>
              <th>รายละเอียด</th>
              <th>ซีเรียล</th>
              <th>เลขที่ Lot</th>
              <th>line no.</th>
              <th>revise no.</th>
              <th>ชั้น</th>
              <th>เลขที่พาเลท</th>
              <th>จำนวน</th>
              <th>แก้ไขล่าสุด</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((i, x) => (
                <tr key={x}>
                  <td>{i.id}</td>
                  <td>{i.part.title}</td>
                  <td>{i.part.description}</td>
                  <td>{i.serial_no}</td>
                  <td>{i.lot_no}</td>
                  <td>{i.line_no}</td>
                  <td>{i.revise_no}</td>
                  <td>{i.shelve_no}</td>
                  <td>{i.pallet_no}</td>
                  <td>
                    <span className="text-orange-600">
                      {i.qty.toLocaleString()}
                    </span>
                  </td>
                  <td>{i.updated}</td>
                  <td>
                    <DrawerCartonDetail />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12}>
                  <Loading />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayOut>
  );
};

export default StockDetailPage;
