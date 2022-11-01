import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import prisma from "../lib/prisma";
import { PhotosData } from "../types/prisma";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage<Record<string, PhotosData[]>> = ({ feed }) => {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <div>
        please sign in to continue
        <button onClick={() => signIn()}>login</button>
      </div>
    );
  } else
    return (
      <div>
        <h1>Protected Page</h1>
        <p>
          Welcome {session.user?.name} You can view this page because you are
          signed in.
        </p>
        <button onClick={() => signOut()}>sign out</button>
      </div>
    );
};
// if (session) {
//   return (
//     <>
//       Signed in as {session?.user?.email} <br />
//       <div>
//         {feed.map((photo, i) => (
//           <img key={i} src={photo.url}></img>
//         ))}
//       </div>
//       <button onClick={() => signOut()}>Sign out</button>
//     </>
//   );
// }
// return (
//   <>
//     Not signed in <br />
//     <button onClick={() => signIn()}>Sign in</button>
//   </>
// );
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);
//   if (!session)
//     return {
//       redirect: {
//         destination: "api/auth/signin",
//         permanent: false
//       }
//     };
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const feed = await prisma.photo.findMany({
//     include: {
//       owner: {
//         select: { name: true }
//       }
//     }
//   });
//   return {
//     props: { feed }
//   };
// };

export default Home;
