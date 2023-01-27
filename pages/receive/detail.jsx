/* eslint-disable react-hooks/exhaustive-deps */
import { Loading, MainLayOut } from "@/components";
import { DateOnly, DateTime } from "@/hook";
import { faker } from "@faker-js/faker";
import {
  ArrowPathIcon,
  PencilIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

let status = [
  { name: "Success", class: "text-green-600" },
  { name: "In Progress", class: "text-red-700" },
  { name: "Cancel", class: "text-gray-600" },
  { name: "Error", class: "text-rose-800" },
];

let whs = ["COM", "DOM", "NESC", "ICAM", "WIRE", "SUPP"];

const ReceiveDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [recDate, setRecDate] = useState(null);
  const [recWhs, setRecWhs] = useState("-");
  const [recNo, setRecNo] = useState(null);
  const [recTotal, setRecTotal] = useState(null);
  const [data, setData] = useState(null);

  const FetchData = () => {
    setLoading(true);
    setData(null);

    let doc = [];
    let timer = setTimeout(() => {
      for (let i = 0; i < 15; i++) {
        let s =
          status[faker.datatype.number({ min: 0, max: status.length - 1 })];
        let ctn = faker.datatype.number(999);
        let rec = faker.datatype.number(999);
        let diff = rec - ctn;
        let p = [
          faker.phone.number("7###-####"),
          faker.phone.number("7###-####-##"),
        ];
        doc.push({
          id: i + 1,
          title: p[faker.datatype.number({ min: 0, max: p.length - 1 })],
          description: faker.name.fullName(),
          total: faker.datatype.number({ min: 1000, max: 999999 }),
          ctn: ctn,
          rec: rec,
          diff: diff,
          status: s,
          updated: DateTime(new Date().toISOString()),
        });
      }
      // console.dir(doc)
      setData([...doc]);
      setLoading(false);
    }, 3200);
    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    setRecDate(DateOnly(new Date().toDateString()));
    let w = whs[faker.datatype.number({ min: 0, max: whs.length - 1 })]
    setRecWhs(w);
    setRecNo(id);
    setRecTotal(faker.datatype.number({ min: 1, max: 9999 }));
    FetchData();
  }, []);

  return (
    <MainLayOut
      title={`รายละเอียดข้อมูลการรับสินค้า`}
      description={`จัดการข้อมูลรายละเอียดข้อมูลการรับสินค้า`}
    >
      <div className="flex justify-between ">
        <div className="item-start">
          <div className="grid grid-cols-2 gap-4 space-x-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">วันที่รับ</span>
              </label>
              <input
                type="date"
                id="recDate"
                name="recDate"
                placeholder="Type here"
                className="w-full max-w-xs input input-bordered input-sm"
                defaultValue={recDate}
                onChange={(e) => setRecDate(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">คลังสินค้า</span>
              </label>
              <select
                className="w-full max-w-xs select select-bordered select-sm"
                defaultValue={recWhs}
                onChange={(e) => setRecWhs(e.target.value)}
              >
                <option value={`-`}>-</option>
                <option value={`COM`}>COM</option>
                <option value={`DOM`}>DOM</option>
                <option value={`NESC`}>NESC</option>
                <option value={`ICAM`}>ICAM</option>
                <option value={`WIRE`}>WIRE</option>
                <option value={`SUPP`}>SUPP.</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 space-x-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">เลขที่เอกสาร</span>
              </label>
              <input
                type="text"
                id="recNo"
                name="recNo"
                placeholder="Type here"
                className="w-full max-w-xs input input-bordered input-sm"
                defaultValue={recNo}
                onChange={(e) => setRecNo(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">จำนวน</span>
              </label>
              <input
                type="number"
                id="recTotal"
                name="recTotal"
                placeholder="Type here"
                className="w-full max-w-xs input input-bordered input-sm"
                defaultValue={recTotal}
                onChange={(e) => setRecTotal(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="item-end">
          <div className="grid">
            <div className="row-span-4">
              <QRCodeCanvas id="qrCode" value={id} size={120} level={"H"} />
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
      <table className="table w-full mt-2 table-compact">
        <thead>
          <tr>
            <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              <button
                className="btn btn-ghost btn-sm btn-circle hover:animate-spin hover:text-orange-700"
                onClick={() => FetchData()}
              >
                <ArrowPathIcon
                  className={loading ? "w-4 h-4 animate-spin" : "w-4 h-4"}
                />
              </button>
            </th>
            <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              เลขที่
            </th>
            <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              รายละเอียด
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
            <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              <button className="btn btn-ghost btn-sm btn-circle hover:text-rose-600">
                <PlusCircleIcon className="w-6 h-6 hover:animate-spin" />
              </button>
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
                  <Link href={`/receive/detail?id=${i.title}`}>
                    <span className="hover:text-blue-800 hover:cursor-pointer">
                      {i.title}
                    </span>
                  </Link>
                </td>
                <td>{i.description}</td>
                <td>
                  <span className="text-orange-800">
                    {i.ctn.toLocaleString()}
                  </span>
                </td>
                <td>
                  <span className="text-green-800">
                    {i.rec.toLocaleString()}
                  </span>
                </td>
                <td>
                  <span
                    className={i.diff < 0 ? "text-rose-800" : "text-green-800"}
                  >
                    {i.diff.toLocaleString()}
                  </span>
                </td>
                <td>
                  <span className={i.status.class}>{i.status.name}</span>
                </td>
                <td>{i.updated}</td>
                <td>
                  <div className="flex space-x-1">
                    <button className="btn btn-ghost btn-sm btn-circle">
                      <PencilIcon className="w-4 h-4 text-green-600 hover:text-rose-600" />
                    </button>
                    <button className="btn btn-ghost btn-sm btn-circle">
                      <XMarkIcon className="w-4 h-4 text-rose-600 hover:text-orange-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </MainLayOut>
  );
};

export default ReceiveDetailPage;