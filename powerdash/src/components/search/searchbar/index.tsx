import { FC, useState, useRef } from "react";
import { GeneralButton } from "~/components";
import { SearchIcon } from "~/assets";
import { useClickOutside } from "~/hooks";
import cn from "~/utils/classNames";

const Line: FC<{className?: string | undefined}> = ({className}): JSX.Element => <div className={cn(["w-[.7px] h-9 bg-black rounded-full", className])}></div>;

interface SearchbarProps {
    className?: string | undefined;
}

const Searchbar: FC<SearchbarProps> = ({className}): JSX.Element => {
    const [search, setSearch] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement>(null);
    useClickOutside(ref, () => setSearch(prev => !prev));

    const test = ["AWAaaaaaaaa", "OWO", "UWU", "7U7", "UNU", "T_T", ":3", "EWE",]
    const topicsLenght: number = test.length;

    return(
        <div
            className={cn([`
                bg-[#dde1e6]
                w-${search? "2" : "4"}/5 h-fit p-3
                rounded-2xl shadow-sm
                transition-all duration-500 ease-in-out
                flex flex-wrap justify-between items-center
                hover:${search? "" : "w-[81%]"}
                hover:shadow-md`,
                className])}>
            {search? (
                <div ref={ref} className="w-full h-full flex">
                    <SearchIcon className="fill-[#0043ce]"/>
                    <input
                        className="
                            w-full h-15 pl-3
                            bg-white
                            rounded-2xl
                            outline-none"
                        placeholder="Busqueda..."
                    />
                </div>
            ) : (
                <>
                    {test.map((topicSearchs, index) => {
                        return(
                            <>
                                {index !== (topicsLenght - 1)? (
                                    <>
                                        <GeneralButton
                                            className={`
                                                bg-transparent
                                                rounded-none
                                                outline-none
                                                shadow-none
                                                text-black
                                                ${search? "invisible" : "visible"}
                                                hover:text-[#0043ce]
                                                hover:bg-transparent`}
                                            size="medium"
                                        >{topicSearchs}
                                        </GeneralButton>
                                        <Line className={`${search? "invisible" : "visible"}`}/>
                                    </>
                                    ) : (
                                    <GeneralButton
                                        className="
                                            bg-transparent
                                            rounded-none
                                            outline-none
                                            shadow-none
                                            text-black
                                            hover:bg-transparent"
                                        size="medium"
                                        onClick={() => setSearch(prev => !prev)}
                                    >
                                        <SearchIcon
                                            className="hover:fill-[#0043ce]"
                                        />
                                    </GeneralButton>
                                    )
                                }
                            </>
                        );
                    })}
                </>
            )}
        </div>
    );
}

export default Searchbar;