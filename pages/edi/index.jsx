/* eslint-disable react/no-children-prop */
import {
  ConfirmDialog,
  ConfirmReloadDialog,
  Loading,
  MainLayOut,
} from "@/components";
import { DateTime, EdiStatus, FakerEDI, ReceiveCartonStatus } from "@/hook";
import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import Link from "next/link";
import { useEffect, useState } from "react";

const EDIPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [txtSearch, setTxtSearch] = useState("");

  const SearchTxt = (e) => {
    e.preventDefault();
    setTxtSearch(e.target.value);
    const n = data.filter((p) => p.serial_no.indexOf(e.target.value) >= 0);
    setData(n);
    if (e.target.value === "") {
      FetchData();
    }
  };

  const handlerConfirm = (obj) => {
    const newState = data.filter((p) => p.id !== obj.id);
    let x = 1;
    newState.map((i) => {
      i.id = x++;
    });
    setData(newState);
  };

  const FetchData = () => {
    setLoading(true);
    setData(null);
    let doc = [];
    for (let i = 0; i < 15; i++) {
      let x = FakerEDI();
      doc.push({
        id: i + 1,
        batch_class: x.batch_class,
        batch_id: x.batch_id,
        batch_type: x.batch_type,
        batch_no: x.batch_no,
        batch_size: x.batch_size,
        batch_upload: x.batch_upload,
        batch_download: x.batch_download,
        status: EdiStatus(),
        is_download: faker.datatype.boolean(),
        updated: DateTime(new Date().toISOString()),
      });
    }

    console.dir(doc);
    let timer = setTimeout(() => {
      setLoading(false);
      setData(doc);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <MainLayOut title={`ข้อมูล EDI`} description={`จัดการข้อมูล EDI`}>
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
                ประเภท
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                เลขที่
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                เอกสาร
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                ขนาด
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 bg-gray-100 border-b-2 border-gray-200">
                อัพโหลดเมื่อ
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                ดาว์นโหลดเมื่อ
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
                <th colSpan={10}>
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
                    <span className={i.batch_class}>{i.batch_type}</span>
                  </td>
                  <td>
                    <Link href={`/receive/detail?id=${i.batch_id}`}>
                      <span className="uppercase hover:text-blue-800 hover:cursor-pointer">
                        {i.batch_id}
                      </span>
                    </Link>
                  </td>
                  <td>{i.batch_no}</td>
                  <td>{i.batch_size.toLocaleString()}</td>
                  <td>{i.batch_upload}</td>
                  <td>{i.batch_download}</td>
                  <td>
                    <span className={i.status.class}>{i.status.name}</span>
                  </td>
                  <td>{i.updated}</td>
                  <td>
                    <ConfirmReloadDialog
                      obj={i}
                      isChecked={i.is_download}
                      description={`ลบข้อมูลเลขที่ ${i.batch_id} นี้?`}
                      handlerConfirm={handlerConfirm}
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

export default EDIPage;
