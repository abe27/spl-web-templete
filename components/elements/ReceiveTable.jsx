/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { DateOnly, DateTime } from "@/hook";
import { faker } from "@faker-js/faker";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Loading } from "..";

const ReceiveTable = ({ limit = 15 }) => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleUploadExcelClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    // console.log("fileObj is", fileObj);

    // // 👇️ reset file input
    // event.target.value = null;

    // // 👇️ is now empty
    // console.log(event.target.files);

    // // 👇️ can still access file object here
    // console.log(fileObj);
    // console.log(fileObj.name);
  };

  const FetchData = () => {
    setLoading(true);
    setData(null);
    const whs = [
      { whs: "COM", prefix: "TI2", class: "text-green-700" },
      { whs: "DOM", prefix: "TI1", class: "text-blue-700" },
      { whs: "NESC", prefix: "NO", class: "text-violet-700" },
      { whs: "ICAM", prefix: "IV", class: "text-pink-700" },
      { whs: "WIRE", prefix: "TW", class: "text-orange-700" },
      { whs: "SUPP.", prefix: "SC", class: "text-red-700" },
    ];

    let status = [
      { name: "Success", class: "text-green-600" },
      { name: "In Progress", class: "text-red-700" },
      { name: "Cancel", class: "text-gray-600" },
    ];

    let doc = [];
    let timer = setTimeout(() => {
      for (let i = 0; i < limit; i++) {
        let s =
          status[faker.datatype.number({ min: 0, max: status.length - 1 })];
        let w = whs[faker.datatype.number({ min: 0, max: whs.length - 1 })];
        let ctn = faker.datatype.number(9999);
        let rec = faker.datatype.number(9999);
        let diff = rec - ctn;
        let d = faker.date.between(
          "2022-12-01T00:00:00.000Z",
          "2023-01-31T00:00:00.000Z"
        );
        doc.push({
          id: i + 1,
          class: w.class,
          batch_id: (
            "00000" + faker.datatype.number({ min: 0, max: 9999 })
          ).slice(-5),
          whs: w.whs,
          etd: DateOnly(
            faker.date
              .between("2022-12-01T00:00:00.000Z", "2023-01-31T00:00:00.000Z")
              .toUTCString()
          ),
          rec_no: `${w.prefix}${d.getFullYear().toString().substring(3, 4)}${(
            "0" +
            (d.getMonth() + 1)
          ).slice(-2)}${("0" + d.getDate()).slice(-2)}${(
            "0" + faker.datatype.number({ min: 1, max: 12 })
          ).slice(-2)}`,
          qty: faker.datatype.number(9999),
          ctn: ctn,
          rec: rec,
          diff: diff,
          status: s,
          updated: DateTime(
            faker.date
              .between("2022-12-01T00:00:00.000Z", "2023-01-31T00:00:00.000Z")
              .toISOString()
          ),
        });
      }
      setData([...doc]);
      setLoading(false);
    }, 2200);

    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    FetchData();
  }, [limit]);

  return (
    <>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />
      <div className="overflow-x-auto">
        <div className="flex flex-col items-start justify-between w-full lg:flex-row lg:items-stretch">
          <div className="flex flex-col items-start w-full lg:w-1/3 lg:flex-row lg:items-center">
            <div className="flex items-center space-x-4">
              <div className="btn btn-ghost btn-sm" onClick={() => FetchData()}>
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
          <div className="flex flex-col items-start justify-end w-full lg:w-2/3 lg:flex-row lg:items-center">
            <div className="flex items-center lg:ml-6">
              <button
                onClick={handleUploadExcelClick}
                className="flex items-center h-8 px-5 text-sm text-indigo-700 transition duration-150 ease-in-out bg-gray-200 border border-transparent rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray hover:bg-rose-600 hover:text-gray-50"
              >
                <div className="flex justify-between space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <div>อัพโหลด Excel</div>
                </div>
              </button>
              <Link href="/receive/add">
                <div className="flex items-center justify-center w-8 h-8 ml-4 text-white transition duration-150 ease-in-out border border-transparent rounded cursor-pointer focus:outline-none focus:border-gray-800 focus:shadow-outline-gray bg-rose-700 hover:bg-rose-600">
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
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <table className="table w-full mt-2 table-compact">
          <thead>
            <tr>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                #
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                คลังสินค้า
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                edi
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                วดป.
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                เลขที่เอกสาร
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                จำนวน
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                รับแล้ว
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                ค้างรับ
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                สถานะ
              </th>
              <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                แก้ไขล่าสุด
              </th>
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
                    <span className={i.class}>{i.whs}</span>
                  </td>
                  <td>
                    <Link href={`/edi/detail?id=${i.batch_id}`}>
                      <span className="hover:text-blue-800 hover:cursor-pointer">
                        {i.batch_id}
                      </span>
                    </Link>
                  </td>
                  <td>{i.etd}</td>
                  <td>
                    <Link href={`/receive/detail?id=${i.rec_no}`}>
                      <span className="hover:text-blue-800 hover:cursor-pointer">
                        {i.rec_no}
                      </span>
                    </Link>
                  </td>
                  <td>{i.ctn.toLocaleString()}</td>
                  <td>{i.rec.toLocaleString()}</td>
                  <td>{i.diff.toLocaleString()}</td>
                  <td>
                    <span className={i.status.class}>{i.status.name}</span>
                  </td>
                  <td>{i.updated}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {data !== null && (
          <div className="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between ">
            <span className="text-xs text-gray-900 xs:text-sm">
              Showing 1 to 4 of 50 Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400">
                ก่อนหน้า
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400">
                ถัดไป
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReceiveTable;
