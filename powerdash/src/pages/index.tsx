import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { ChangeEvent } from "react";
import { api } from "~/utils/api";
import { getFile } from "~/utils/aws/S3_Bucket";
import { GeneralLayout } from "~/components";
import { NextPageWithLayout } from "~/pages/page";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth";


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  session && session.user.image === undefined && (session.user.image = null);

  return {
    props: {
      user: session?.user,
    },
  };
};
const Home: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  //Obtenemos los datos de la sesión actual a través de next-login "useSession"

  const mutation = api.CSV.CSV_Upload.useMutation();

  const bucketName = "ibmcsv";



  const handleCSV = async (e: ChangeEvent<HTMLInputElement>) => {
    const input: FileList | null = e.target.files;
    if (input) {
      const file: File | undefined = input[0];

      try {
        //GetFile nos regresará el contenido del csv como un string
        const responseData: string = await getFile(
          bucketName,
          file?.name as string
        );
        mutation.mutate(responseData);
      } catch (error) {
        //Si llegase a dar un error en la obtención del archivo, se utilizará el local
        console.log("Error retrieving the object: ", error);
        console.log("Using the locally given file instead");
        let text: string;
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>): void => {
          text = e.target?.result as string;
          console.log("Text: ", text);
          mutation.mutate(text);
          console.log("Success");
          return;
        };
        reader.readAsText(file !== undefined ? file : new Blob());
      }
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
        <title>Dashboard IBM </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/512/5969/5969083.png"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>{props.user.name}</h1>
      </main>
    </>
  );
};

Home.getLayout = (page) => (
  <GeneralLayout userName={page.props.user.name}>{page}</GeneralLayout>
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
