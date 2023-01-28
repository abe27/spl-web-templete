/* eslint-disable react/no-children-prop */
import { ConfirmDialog, Loading, MainLayOut } from "@/components";
import { DateTime, ReceiveCartonStatus } from "@/hook";
import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Input, InputGroup,
  InputLeftElement, InputRightElement
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import Link from "next/link";
import { useEffect, useState } from "react";

const ReceiveCartonPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [txtSearch, setTxtSearch] = useState("");

  const SearchTxt = (e) => {
    e.preventDefault();
    setTxtSearch(e.target.value);
    const n = data.filter((p) => p.serial_no.indexOf(e.target.value) >= 0)
    setData(n)
    if (e.target.value === "") {
      FetchData()
    }
  };

  const handlerConfirm = (obj) => {
    const newState = data.filter((p) => p.id !== obj.id);
    let x = 1;
    newState.map((i) => {
      i.id = x++;
    });
    setData(newState);
  }

  const FetchData = () => {
    setData(null);
    setLoading(true);
    let timer = setTimeout(() => {
      let doc = [];
      for (let i = 0; i < 10; i++) {
        // #	หมายเลขซีเรียล	เลขที่ Lot	Line	Revise	จำนวน	สถานะ	แก้ไขล่าสุด
        doc.push({
          id: i + 1,
          serial_no: faker.datatype.uuid().substring(24, 36),
          lot: faker.phone.number("####23"),
          line: faker.phone.number("L-##"),
          revise: faker.phone.number("##"),
          qty: faker.datatype.number({ min: 1000, max: 9999 }),
          status: ReceiveCartonStatus(0),
          updated: DateTime(new Date().toISOString()),
        });
      }
      setData(doc);
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    FetchData();
  }, []);
  return (
    <MainLayOut
      title={`รายละเอียดเพิ่มเติม`}
      description={`จัดการรายละเอียดเพิ่มเติม`}
    >
      <div className="overflow-x-auto">
        <div className="flex flex-col items-start justify-between w-full lg:flex-row lg:items-stretch">
          <div className="flex flex-col items-start w-full lg:w-1/3 lg:flex-row lg:items-center">
            <div className="flex items-center space-x-4">
              <div
                className="btn btn-ghost btn-sm btn-circle hover:text-rose-600"
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
            </div>
          </div>
          <div className="flex flex-col justify-end w-full lg:w-1/3 lg:flex-row lg:items-center">
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
          </div>
        </div>
        <div className="divider" />
        <table className="table w-full mt-2 table-compact">
          <thead>
            <tr>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                #
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                หมายเลขซีเรียล
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                เลขที่ Lot
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                Line
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                Revise
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                จำนวน
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                สถานะ
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                แก้ไขล่าสุด
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"></th>
            </tr>
          </thead>
          <tbody>
            {data === null ? (
              <tr>
                <th colSpan={9}>
                  <div className="justify-center">
                    <Loading size="5" />
                  </div>
                </th>
              </tr>
            ) : (
              data.map((i, x) => (
                <tr key={x}>
                  <td>
                    <div className="pl-2">{i.id}</div>
                  </td>
                  <td>
                    <Link href={`/receive/detail?id=${i.serial_no}`}>
                      <span className="uppercase hover:text-blue-800 hover:cursor-pointer">
                        {i.serial_no}
                      </span>
                    </Link>
                  </td>
                  <td>{i.lot}</td>
                  <td>{i.line}</td>
                  <td>{i.revise}</td>
                  <td>{i.qty.toLocaleString()}</td>
                  <td>
                    <span className={i.status.class}>{i.status.name}</span>
                  </td>
                  <td>{i.updated}</td>
                  <td>
                    <ConfirmDialog
                    obj={i}
                    description = {`ลบข้อมูลเลขที่ ${i.serial_no} นี้?`}
                    handlerConfirm = {handlerConfirm}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </MainLayOut>
  );
};

export default ReceiveCartonPage;
