/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { NavBar } from "@/components";

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
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-4 px-2 sm:px-6 lg:px-8">
            ggg
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="h-96 rounded-lg border-4 border-dashed border-gray-200">
                {children}
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
};

export default MainLayOut;
