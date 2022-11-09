import Head from "next/head";

const HeadLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>My Unsplash</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </>
  );
};

export default HeadLayout;