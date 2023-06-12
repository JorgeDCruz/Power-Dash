import { ChartBarIcon, UserIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "~/components";
import Label from "~/components/labels";
import { ChangeEvent, useState } from "react";
import { api } from "~/utils/api";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { getFile, insertFile } from "~/utils/aws/S3_Bucket";
import { router } from "@trpc/server";

interface SidebarProps {
  userName: string;
}

const Sidebar = ({ userName }: SidebarProps) => {

  const bucketName = "ibmcsv";

  const router = useRouter();

  const mutation = api.CSV.CSV_Upload.useMutation();
  const [files, setFiles] = useState<FileList | null>(null);
  const { push } = useRouter();
  const handleCSV = async (e: ChangeEvent<HTMLInputElement>) => {
    const input: FileList | null = e.target.files;
    if(input) {
      //Insertamos el archivo al bucket
      try{
        insertFile(bucketName, input[0]?.name as string, input[0] as File);
      }catch(error){
        console.log("Error inserting the object to the bucket: ", error);
      }
      const file: File | undefined = input[0];

      //Traemos el archivo del bucket
      try{
        const responseData: string = await getFile(bucketName, file?.name as string);
        mutation.mutate(responseData);
      }catch(error){
        //Si llegase a dar un error en la obtención del archivo, se utilizará el local
        console.log("Error retrieving the object: ", error);
        console.log("Using the locally given file instead");
        let text: string;
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>): void => {
          text = e.target?.result as string;
          console.log("Text: ", text);
          mutation.mutate(text);
          console.log("Success")
          return;
        };
        reader.readAsText((file !== undefined)? file : new Blob);
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
      <div className={`flex items-center space-x-2`}>
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl`}
        >
          {userName[0]?.toUpperCase()}
        </div>
        <div>
          <h1 className={`text-lg leading-6 text-gray-900`}>{userName}</h1>
        </div>
      </div>

      <div className={`w-full border-b`} />
      <div className={`flex h-full items-center justify-center`}>
        <div
          className={`flex h-full w-full flex-col items-stretch justify-between space-y-2 py-2`}
        >
          <div className={`flex flex-col space-y-2`}>
            <Button
              onClick={() => push("/persons")}
              variant={`secondary`}
              className={`w-full`}
            >
              <div className={`flex items-center space-x-2`}>
                <UserIcon className={`w-4`} />
                <h1>Personas</h1>
              </div>
            </Button>
            <Button
              onClick={() => push("/")}
              variant={`secondary`}
              className={`w-full`}
            >
              <div className={`flex items-center space-x-2`}>
                <ChartBarIcon className={`w-4`} />
                <h1>Certificaciones</h1>
              </div>
            </Button>
          </div>
          <div>
            <div>
              <Label>Subir CSV</Label>
              <div className={"flex space-x-1"}>
                <Input
                  type={"file"}
                  onChange={(e) => {
                    setFiles(e.target.files);
                  }}
                  accept=".csv"
                />
                <Button
                  disabled={files === null}
                  onClick={() => {
                    handleCSV({
                      target: { files },
                    } as ChangeEvent<HTMLInputElement>);
                  }}
                >
                  Subir
                </Button>
              </div>
            </div>
            <Button
              onClick={() => signOut()}
              className={"mt-4 w-full"}
              variant={"destructive"}
            >
              <h1>Cerrar sesion</h1>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
