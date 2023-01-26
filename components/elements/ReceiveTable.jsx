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
  const [data, setData] = useState(null);

  const handleUploadExcelClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log("fileObj is", fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  };

  const FetchData = () => {
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

    let d = new Date();
    let doc = [];
    let timer = setTimeout(() => {
      for (let i = 0; i < limit; i++) {
        let s =
          status[faker.datatype.number({ min: 0, max: status.length - 1 })];
        let w = whs[faker.datatype.number({ min: 0, max: whs.length - 1 })];
        let ctn = faker.datatype.number(9999);
        let rec = faker.datatype.number(9999);
        let diff = rec - ctn;
        doc.push({
          id: i + 1,
          class: w.class,
          whs: w.whs,
          etd: DateOnly(new Date().toUTCString()),
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
          updated: DateTime(new Date().toISOString()),
        });
      }
      setData([...doc]);
    }, 3000);

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
      <div class="overflow-x-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-stretch w-full">
          <div className="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">
            <div className="flex items-center space-x-4">
              <div className="btn btn-ghost btn-sm" onClick={() => FetchData()}>
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
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
            <div className="lg:ml-6 flex items-center">
              <button
                onClick={handleUploadExcelClick}
                className="bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm"
              >
                อัพโหลด Excel
              </button>
              <Link href="/receive/add">
                <div className="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-rose-700 transition duration-150 ease-in-out hover:bg-rose-600 w-8 h-8 rounded flex items-center justify-center">
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
        <table class="table table-compact w-full mt-2">
          <thead>
            <tr>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                #
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                คลังสินค้า
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                วดป.
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                เลขที่เอกสาร
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                จำนวน
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                รับแล้ว
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ค้างรับ
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                สถานะ
              </th>
              <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                แก้ไขล่าสุด
              </th>
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
                    <span className={i.class}>{i.whs}</span>
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
          <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span class="text-xs xs:text-sm text-gray-900">
              Showing 1 to 4 of 50 Entries
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                ก่อนหน้า
              </button>
              <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
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
