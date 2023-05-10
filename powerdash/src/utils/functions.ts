import { ChangeEvent } from "react";

type txt = 
    string
    | ArrayBuffer
    | null 
    | undefined;

export const handleCSV = (e: ChangeEvent<HTMLInputElement>): txt => {
    const input: FileList | null = e.target.files;

    if(input != null){
        const file: File | undefined = input[0];
        var text: txt;

        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>): txt => text = e.target?.result;
        
        reader.readAsText((file != undefined)? file : new Blob);
    }

    return text;
}