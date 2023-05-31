// import { handleCSV } from "~/utils/functions";
import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { ChangeEvent } from "react";
import { api } from "~/utils/api";
import { signOut } from "next-auth/react";
import { getFile, insertFile } from "~/utils/aws/S3_Bucket";
import { type } from "os";
import { GeneralLayout } from "~/components";
import Persons from "~/pages/persons";
import { NextPageWithLayout } from "~/pages/page";

const Home: NextPageWithLayout = () => {
  //Obtenemos los datos de la sesión actual a través de next-login "useSession"
  const { data: session, status } = useSession();
  console.log("session", session);

  const mutation = api.CSV.CSV_Upload.useMutation();

  const bucketName = "ibmcsv";

  const handleCSV = async (e: ChangeEvent<HTMLInputElement>) => {
    const input: FileList | null = e.target.files;
    if (input) {
      const file: File | undefined = input[0];
      let text: string;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        text = e.target?.result as string;
        mutation.mutate(text);
        console.log("Success");
        return;
      };
      reader.readAsText(file ? file : new Blob());
    }
    return;
  };

  return (
    <>
      <Head>
        <title>Dashboard IBM</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/512/5969/5969083.png"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <input
          className=""
          onChange={handleCSV}
          accept=".csv, .txt"
          type="file"
        />
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => {
            signOut();
          }}
        >
          Cerrar sesion
        </button>
      </main>
    </>
  );
};

Home.getLayout = (page) => (
  <GeneralLayout
    // userName={page.props.session.user.name || "User"}
    userName={"User"}
  >
    {page}
  </GeneralLayout>
);
export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
