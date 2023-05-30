import { FC } from "react";

interface AddUserProps {
    className?: string
}

const AddUser: FC<AddUserProps> = ({className}): JSX.Element => {
  return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
            <path d="M32 14L28 14 28 10 26 10 26 14 22 14 22 16 26 16 26 20 28 20 28 16 32 16 32 14z" />
            <path d="M12 4a5 5 0 11-5 5 5 5 0 015-5m0-2a7 7 0 107 7 7 7 0 00-7-7zM22 30h-2v-5a5 5 0 00-5-5H9a5 5 0 00-5 5v5H2v-5a7 7 0 017-7h6a7 7 0 017 7z" />
            <path
                data-name="&lt;Transparent Rectangle&gt;"
                fill="none"
                d="M0 0H32V32H0z"
            />
        </svg>
    );
}

export default AddUser;
