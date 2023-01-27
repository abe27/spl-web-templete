import { ConfirmDialog, Loading, MainLayOut } from "@/components";
import {
  ArrowPathIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { QRCodeCanvas } from "qrcode.react";
import { faker } from "@faker-js/faker";
import { useState, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
  Input,
  Button,
  useDisclosure,
  Divider,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { DateOnly, ReceiveStatus, DateTime } from "@/hook";
import Link from "next/link";

const ReceiveAddNewPage = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [loading, setLoading] = useState(false);
  const [recDate, setRecDate] = useState(DateOnly(new Date().toDateString()));
  const [recWhs, setRecWhs] = useState(null);
  const [recNo, setRecNo] = useState(null);
  const [recTotal, setRecTotal] = useState(0);
  const [data, setData] = useState([]);

  //--- new value
  const [newPartNo, setNewPartNo] = useState("");
  const [newTotal, setNewTotal] = useState("0");

  const OpenAddNew = () => {
    if (recDate === null) {
      toast({
        title: "ข้อความแจ้งเตือน",
        description: "กรุณาระบุวันที่รับ",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    } else if (recWhs === null || recWhs === "-") {
      toast({
        title: "ข้อความแจ้งเตือน",
        description: "กรุณาระบุคลังสินค้าด้วย",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    } else if (recNo === null || recNo === "") {
      toast({
        title: "ข้อความแจ้งเตือน",
        description: "กรุณาระบุเลขที่เอกสารด้วย",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    } else {
      // console.dir("open dialog");
      setNewPartNo("");
      setNewTotal(0);
      onOpen();
    }
    // after add new item is save data
  };

  const OnSaveNewRec = () => {
    let id = 1;
    if (data !== null) {
      id = data.length + 1;
    }

    let isFound = false;
    const newState = data.map((obj) => {
      if (obj.title.indexOf(newPartNo.trimStart()) >= 0) {
        isFound = true;
        return { ...obj, ctn: newTotal, status: ReceiveStatus(5) };
      }
      return obj;
    });

    if (!isFound) {
      let n = {
        id: id,
        whs: recWhs,
        rec_date: recDate,
        rec_id: recNo.toUpperCase(),
        title: newPartNo.trimStart(),
        description: faker.name.fullName(),
        total: faker.datatype.number({ min: 1000, max: 999999 }),
        ctn: newTotal,
        rec: 0,
        diff: newTotal,
        status: ReceiveStatus(4),
        updated: DateTime(new Date().toISOString()),
      };
      setData([...data, n]);
    } else {
      setData(newState);
    }
    setNewPartNo("");
    setNewTotal(0);
    onClose();
  };

  const ConfirmDelete = (obj) => {
    const newState = data.filter((p) => p.id !== obj.id);
    let x = 1;
    newState.map((i) => {
      i.id = x++;
    });
    setData(newState);
  };

  const OpenUpdate = (obj) => {
    // console.dir(obj);
    setNewPartNo(obj.title);
    setNewTotal(obj.ctn);
    onOpen();
  };

  const FetchData = () => {};

  return (
    <MainLayOut
      title={`เพิ่มข้อมูลการรับสินค้า`}
      description={`จัดการข้อมูลการเพิ่มข้อมูลการรับสินค้า`}
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
              {recNo !== null ? (
                recNo.length > 0 && (
                  <QRCodeCanvas
                    id="qrCode"
                    value={recNo}
                    size={120}
                    level={"H"}
                  />
                )
              ) : (
                <></>
              )}
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
              <div className="flex space-x-1">
                <button
                  className="btn btn-ghost btn-sm btn-circle hover:text-rose-600"
                  ref={btnRef}
                  onClick={() => OpenAddNew()}
                >
                  <PlusCircleIcon className="w-6 h-6 hover:animate-spin" />
                </button>
              </div>
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
                    <button
                      className="btn btn-ghost btn-sm btn-circle"
                      ref={btnRef}
                      onClick={() => OpenUpdate(i)}
                    >
                      <PencilIcon className="w-4 h-4 text-green-600 hover:text-rose-600" />
                    </button>
                    <ConfirmDialog
                      obj={i}
                      description={`คุณต้องการที่จะลบข้อมูล ${i.title} นี้ใช่หรือไม่?`}
                      handlerConfirm={ConfirmDelete}
                      disabled={i.rec > 0}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>เพิ่มข้อมูล</DrawerHeader>

          <DrawerBody>
            <Divider />
            <FormControl isRequired>
              <FormLabel>เลขที่สินค้า</FormLabel>
              <Input
                placeholder="เลขที่สินค้า"
                value={newPartNo}
                onChange={(e) => setNewPartNo(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>จำนวน</FormLabel>
              <NumberInput max={999} min={0}>
                <NumberInputField
                  value={newTotal}
                  onChange={(e) => setNewTotal(e.target.value)}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              ยกเลิก
            </Button>
            <Button colorScheme="blue" onClick={OnSaveNewRec}>
              บันทึก
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </MainLayOut>
  );
};

export default ReceiveAddNewPage;
