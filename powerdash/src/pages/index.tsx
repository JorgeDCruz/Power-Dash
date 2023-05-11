// import { handleCSV } from "~/utils/functions";
import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ChangeEvent } from "react";
import { api } from "~/utils/api";
import {signOut} from "next-auth/react";

const Home: NextPage = () => {
  //Obtenemos los datos de la sesión actual a través de next-login "useSession"
  const { data: session, status } = useSession();
  console.log("session", session);

  const router = useRouter();
  const mutation = api.CSV.CSV_Upload.useMutation();
  //Verificamos si el usuario esta verificado
  //Si no lo está se regresará a la siguiente pantalla
  useEffect(() => {
    if (status == "unauthenticated") router.replace("/login");
  }, [status]);

  const handleCSV = (e: ChangeEvent<HTMLInputElement>): void => {
    const input: FileList | null = e.target.files;
    
    if(input !== null){
        const file: File | undefined = input[0];
        let text: string;

        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>): void => {
          text = e.target?.result as string;
          mutation.mutate(text);
          return;
        };
        reader.readAsText((file !== undefined)? file : new Blob);
    }
    return;
}
  //Si lo está podrá ver la página
  if (status == "authenticated") {
    return (
      <>
        <Head>
          <title>Dashboard IBM</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/5969/5969083.png" />
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <input
            className=""
            onChange={handleCSV}
            accept=".csv, .txt"
            type="file"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {signOut()}}
          >
            Cerrar sesion
          </button>
        </main>
      </>
    );
  }

  return <div>Loading...</div>;
};

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
