/* eslint-disable react-hooks/exhaustive-deps */
import { ConfirmDialog, Loading, MainLayOut } from "@/components";
import { DateOnly, DateTime } from "@/hook";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import {
  ArrowPathIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";

let status = [
  { name: "Success", class: "text-green-600" },
  { name: "In Progress", class: "text-red-700" },
  { name: "Cancel", class: "text-gray-600" },
  { name: "Error", class: "text-rose-800" },
  { name: "New", class: "text-blue-700" },
  { name: "Update", class: "text-indigo-600" },
];

let whs = ["COM", "DOM", "NESC", "ICAM", "WIRE", "SUPP"];

const ReceiveDetailPage = () => {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [loading, setLoading] = useState(false);
  const [recDate, setRecDate] = useState(null);
  const [recWhs, setRecWhs] = useState(null);
  const [recNo, setRecNo] = useState(null);
  const [recTotal, setRecTotal] = useState(null);
  const [data, setData] = useState(null);

  //--- new value
  const [newPartNo, setNewPartNo] = useState("");
  const [newTotal, setNewTotal] = useState("0");

  const ConfirmDelete = (obj) => {
    // console.dir(obj)
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

  const OpenAddNew = () => {
    setNewPartNo("");
    setNewTotal(0);
    onOpen();
  };

  const OnSaveNewRec = () => {
    setLoading(true);
    if (newTotal >= 0) {
      let txt = "???????????????????????????????????????????????????????????????????????????";
      let isFound = false;
      const newState = data.map((obj) => {
        if (obj.title.indexOf(newPartNo) >= 0) {
          isFound = true;
          return { ...obj, ctn: newTotal, diff: obj.rec - newTotal,status: status[5] };
        }
        return obj;
      });

      if (!isFound) {
        txt = "???????????????????????????????????????????????????????????????????????????";
        let n = {
          id: newState.length + 1,
          title: newPartNo,
          description: faker.name.fullName(),
          total: faker.datatype.number({ min: 1000, max: 999999 }),
          ctn: newTotal,
          rec: 0,
          diff: newTotal,
          status: status[4],
          updated: DateTime(new Date().toISOString()),
        };

        setData([...newState, n]);
      } else {
        setData(newState);
      }
      onClose();
      toast({
        title: "????????????????????????????????????????????????",
        description: txt,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      let timer = setTimeout(() => {
        setLoading(false);
        setNewPartNo("");
        setNewTotal("0");
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }

    toast({
      title: "????????????????????????????????????????????????",
      description: "????????????????????????????????????????????????????????????????????????????????????",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const FetchData = () => {
    setLoading(true);
    setData(null);

    let doc = [];
    let timer = setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        let s =
          status[faker.datatype.number({ min: 0, max: status.length - 3 })];
        let ctn = faker.datatype.number(999);
        let rec = 0;
        let diff = rec - ctn;
        let p = [
          faker.phone.number("18######"),
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
      setRecDate(DateOnly(new Date().toDateString()));
      let w = whs[faker.datatype.number({ min: 0, max: whs.length - 1 })];
      setRecWhs(w);
      setRecNo(id);
      setRecTotal(faker.datatype.number({ min: 1, max: 9999 }));
      setData([...doc]);
      setLoading(false);
    }, 3200);
    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <MainLayOut
      title={`????????????????????????????????????????????????????????????????????????????????????`}
      description={`????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????`}
    >
      <div className="flex justify-between ">
        <div className="item-start">
          <div className="grid grid-cols-2 gap-4 space-x-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">???????????????????????????</span>
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
                <span className="label-text">??????????????????????????????</span>
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
                <span className="label-text">????????????????????????????????????</span>
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
                <span className="label-text">???????????????</span>
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
              ??????????????????
            </th>
            <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              ??????????????????????????????
            </th>
            <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              ???????????????
            </th>
            <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              ?????????????????????
            </th>
            <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              ?????????????????????
            </th>
            <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              ???????????????
            </th>
            <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              ?????????????????????????????????
            </th>
            <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
              <button
                className="btn btn-ghost btn-sm btn-circle hover:text-rose-600"
                ref={btnRef}
                onClick={() => OpenAddNew()}
              >
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
                  <Link href={`/receive/carton?id=${i.title}`}>
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
                      description={`????????????????????????????????????????????????????????????????????? ${i.title} ????????????????????????????????????????`}
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
          <DrawerHeader>?????????????????????????????????</DrawerHeader>

          <DrawerBody>
            <Divider />
            <FormControl isRequired>
              <FormLabel>????????????????????????????????????</FormLabel>
              <Input
                placeholder="????????????????????????????????????"
                value={newPartNo}
                onChange={(e) => setNewPartNo(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>???????????????</FormLabel>
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
              ??????????????????
            </Button>
            <Button colorScheme="blue" onClick={OnSaveNewRec}>
              ??????????????????
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </MainLayOut>
  );
};

export default ReceiveDetailPage;
