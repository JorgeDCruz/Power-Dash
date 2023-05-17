import { FC } from "react";
import cn from "~/utils/classNames";
import { cva } from "class-variance-authority";

interface SearchbarProps {
    className?: string,
    animated?: boolean,
    id?: string,
    topics: string[],
    handleSubmit: () => void
};

const Searchbar: FC = (): JSX.Element => {
    return (
        <div>
            AWA
        </div>
    );
}

export default Searchbar;