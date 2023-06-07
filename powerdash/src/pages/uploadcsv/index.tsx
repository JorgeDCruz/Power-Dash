import { NextPageWithLayout } from "~/pages/page";
import Label from "~/components/labels";
import { Button, Input } from "~/components";
import { ChangeEvent, useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const Uploadcsv: NextPageWithLayout = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const { data: session, status } = useSession();

  const mutation = api.CSV.CSV_Upload.useMutation();

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
    <div>
      <Label>Subir CSV</Label>
      <div className={"flex space-x-1"}>
        <Input
          type={"file"}
          onChange={(e) => {
            setFiles(e.target.files ?? null);
          }}
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
  );
};

export default Uploadcsv;
