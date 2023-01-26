import {
  BarChart,
  LineChart,
  MainLayOut,
  StatElement,
  SummaryReceive,
} from "@/components";

const HomePage = () => {
  return (
    <MainLayOut>
      <>
        <div className="mt-2">
          <StatElement />
        </div>
        <section className="divider" />
        <section className="flex flex-row flex-wrap flex-grow">
          <section className="w-full pr-4 md:w-1/2">
            <BarChart />
          </section>
          <section className="w-full pl-4 md:w-1/2">
            <LineChart />
          </section>
        </section>
        <section className="divider" />
        <section className="mt-4">
          <SummaryReceive />
        </section>
      </>
    </MainLayOut>
  );
};

export default HomePage;
