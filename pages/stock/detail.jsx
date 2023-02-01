import { MainLayOut } from "@/components";
import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const StockDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const [txtSearch, setTxtSearch] = useState("");

  const SearchTxt = (e) => {
    setTxtSearch(e.target.value);
  };

  const FetchData = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
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
        <div></div>
      </div>
    </MainLayOut>
  );
};

export default StockDetailPage;
