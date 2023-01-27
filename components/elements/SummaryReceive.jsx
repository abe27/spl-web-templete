/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { DateOnly, DateTime } from "@/hook";
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import { Loading } from "..";

const SummaryReceive = ({limit=10}) => {
  const [data, setData] = useState(null);

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
  }, []);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                คลังสินค้า
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                วดป.
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                เลขที่เอกสาร
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                จำนวน
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                รับแล้ว
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ค้างรับ
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                สถานะ
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                  <td>{i.rec_no}</td>
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
          <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
            <span className="text-xs xs:text-sm text-gray-900">
              Showing 1 to 4 of 50 Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                ก่อนหน้า
              </button>
              <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                ถัดไป
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SummaryReceive;
