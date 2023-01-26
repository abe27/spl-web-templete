/* eslint-disable @next/next/no-img-element */
import { NavBar } from "@/components";
import Head from "next/head";

const MainLayOut = ({
  children,
  title = process.env.APP_NAME,
  description = process.env.APP_DESCRIPTION,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-full">
        <NavBar />
        {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-4 px-2 sm:px-6 lg:px-8">
            ggg
          </div>
        </header> */}
        <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          {children}
          {/* /End replace */}
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayOut;
