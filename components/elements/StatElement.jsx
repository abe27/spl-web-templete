import { useState, useEffect } from "react";
import { Loading } from "..";
import { faker } from "@faker-js/faker";

const StatElement = () => {
  const [data, setData] = useState(null);

  const FetchData = () => {
    setData(null);
    let timer = setTimeout(() => {
      let doc = [
        {
          id: 1,
          name: "รายการรับ",
          total: faker.datatype.number(99999),
          percent: faker.datatype.number(100),
        },
        {
          id: 2,
          name: "รายการจัดเตรียม",
          total: faker.datatype.number(999999),
          percent: faker.datatype.number(100),
        },
        {
          id: 3,
          name: "โหลดขึ้นตู้",
          total: faker.datatype.number(999),
          percent: faker.datatype.number(100),
        },
        {
          id: 4,
          name: "อัพโหลด",
          total: faker.datatype.number(999),
          percent: faker.datatype.number(100),
        },
        {
          id: 5,
          name: "คลังสินค้า",
          total: faker.datatype.number(999999),
          percent: faker.datatype.number(100),
        },
      ];
      setData([...doc]);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(() => {
    FetchData();
  }, []);
  return (
    <>
      {data === null ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-between space-x-4">
          {data.map((i, x) => (
            <div className="stats shadow mt-2" key={x}>
              <div className="stat">
                <div className="stat-figure text-primary">
                  {i.percent > 49 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-rose-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                      />
                    </svg>
                  )}
                </div>
                <div className="stat-title">{i.name}</div>
                <div
                  className={
                    i.percent <= 49
                      ? `stat-value text-rose-600`
                      : `stat-value text-green-600`
                  }
                >
                  {i.total.toLocaleString()}
                </div>
                <div className="stat-desc">{i.percent}%</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StatElement;
