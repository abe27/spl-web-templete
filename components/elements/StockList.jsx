/* eslint-disable react/no-children-prop */
import { FetchPart, FetchWhs, RandomLastUpdate } from "@/hook";
import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import Link from "next/link";
import { useEffect, useState } from "react";

const StockList = () => {
  const [loading, setLoading] = useState(false);
  const [txtSearch, setTxtSearch] = useState("");
  const [whs, setWhs] = useState(FetchWhs);
  const [selectWhs, setSelectWhs] = useState("-");
  const [selectLimit, setSelectLimit] = useState(15);
  const [data, setData] = useState([]);

  const SearchTxt = (e) => {
    setTxtSearch(e.target.value);
    FetchData();
  };

  const whsChange = (e) => {
    setSelectWhs(e.target.value);
    FetchData();
  };

  const limitChange = (e) => {
    setSelectLimit(e.target.value);
  };

  const FetchData = () => {
    setData(null);
    setLoading(true);
    let part = FetchPart(selectLimit);
    let doc = [];
    part.map((i) => {
      doc.push({
        id: i.id,
        whs: whs[faker.datatype.number({ min: 0, max: whs.length - 1 })],
        part: i,
        updated: RandomLastUpdate(),
      });
    });

    setData(doc);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    FetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    FetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectLimit])

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col items-start justify-between w-full lg:flex-row lg:items-stretch">
        <div className="flex flex-col items-start w-full lg:w-1/3 lg:flex-row lg:items-center">
          <div className="flex items-center space-x-4">
            <div
              className="btn btn-ghost btn-sm btn-circle"
              onClick={() => FetchData()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={loading ? "w-6 h-6 animate-spin" : "w-6 h-6"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </div>
            <>
              <Select
                size="sm"
                width="auto"
                placeholder="แสดงข้อมูล"
                defaultValue={selectLimit}
                onChange={limitChange}
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
              </Select>
            </>
          </div>
        </div>
        <div className="flex flex-col items-end w-full">
          <div className="flex items-center space-x-4">
            <>
              <InputGroup size="sm" width="auto">
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children={<SearchIcon />}
                />
                <Input
                  placeholder="ค้นหา"
                  value={txtSearch}
                  onChange={(e) => SearchTxt(e)}
                />
                <InputRightElement
                  children={
                    <CheckIcon
                      color={txtSearch.length > 0 ? "green.500" : "gray.500"}
                    />
                  }
                />
              </InputGroup>
            </>
            <>
              <Select
                size="sm"
                width="auto"
                placeholder="คลังสินค้า"
                defaultValue={selectWhs}
                onChange={whsChange}
              >
                {whs?.map((i, x) => (
                  <option key={x} value={i.id}>
                    {i.title}
                  </option>
                ))}
              </Select>
            </>
          </div>
        </div>
      </div>
      <div className="divider" />
      <>
        <div className="overflow-x-auto">
          <table className="table w-full table-compact">
            <thead>
              <tr>
                <th>#</th>
                <th>คลังสินค้า</th>
                <th>สินค้า</th>
                <th>รายละเอียดเพิ่มเติม</th>
                <th>จำนวน</th>
                <th>กล่อง/coil</th>
                <th>พื้นที่</th>
                <th>เลขที่พาเลท</th>
                <th>แก้ไขล่าสุด</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, x) => (
                <tr key={x}>
                  <td>{i.id}</td>
                  <td>
                    <span className={i.whs.class}>{i.whs.title}</span>
                  </td>
                  <td>
                    <Link href={`/stock/detail?id=${i.id}`} target="_blank">
                      <span className="hover:text-blue-700">
                        {i.part.title}
                      </span>
                    </Link>
                  </td>
                  <td>{i.part.description}</td>
                  <td>
                    <span className="text-orange-600">
                      {i.part.qty.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className="text-indigo-700">
                      {i.part.ctn.toLocaleString()}
                    </span>
                  </td>
                  <td>{i.part.shelve}</td>
                  <td>{i.part.pallet_no}</td>
                  <td>{i.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default StockList;
