import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

/* 
 * ************************************************************************************************
 * ClassValues are the classes names represented usually as string. The type definition is:
    type ClassValue = string | number | boolean | ClassArray | ClassDictionary | null | undefined
 * clsx is a function from the homonimus library. It handles the function to conditionally 
   render classes and it also transforms the ClassValue value into readable tailwind styles.
 * twMerge avoids tailwind repeated class overlaping and return a clean tailwind string class
 * ************************************************************************************************
 */


/** 
    * * Alternative Way of Writting this Function:
    import { ClassValue } from "clsx";
    import { twMerge } from "tailwind-merge";
    import { cx, CxOptions } from "class-variance-authority"; //alternative for clsx();

    export default function cn(...inputs: ClassValue[]) {
        return twMerge(cx(...inputs as CxOptions[]));
    }
**/