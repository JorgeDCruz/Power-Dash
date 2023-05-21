import { 
    FC,
    useState,
    useRef,
    SyntheticEvent,
    Dispatch,
    SetStateAction,
    FormEvent,
    Fragment } from "react";
import { Button } from "~/components";
import { SearchIcon } from "~/assets";
import { useClickOutside } from "~/hooks";
import { cn } from "~/lib/utils";

const Line: FC<{className?: string | undefined}> = ({className}): JSX.Element => <div className={cn(["w-[.7px] h-9 bg-black rounded-full", className])}></div>;

interface SearchbarProps {
    className?: string | undefined;
    searchTopics: string[];
    setTopic: Dispatch<SetStateAction<string>>;
}

const Searchbar: FC<SearchbarProps> = ({className, searchTopics, setTopic}): JSX.Element => {
    const [search, setSearch] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const ref = useRef<HTMLInputElement>(null);
    useClickOutside(ref, () => setSearch(prev => !prev));

    const topicsLenght: number = searchTopics.length;

    const handleSubmit = (e: SyntheticEvent): void => {
        e.preventDefault();

        console.log("OLA")
    }

    const handleChange = (e: FormEvent<HTMLInputElement>): void => {
        setSearchText(e.currentTarget.value);
        setTopic(e.currentTarget.value);
    }

    return(
        <div
            className={cn([`
                bg-[#dde1e6]
                w-4/5 h-fit p-3
                rounded-2xl shadow-sm
                transition-all duration-500 ease-in-out
                flex flex-wrap justify-between items-center
                hover:w-[81%]
                hover:shadow-md`,
                className])}>
            {search? (
                <div ref={ref} className="w-full h-full flex">
                    <SearchIcon className="fill-[#0043ce]"/>
                    <form
                        className="w-full h-15"
                        onSubmit={handleSubmit}>
                        <input
                            className="
                            w-full h-full pl-3
                            bg-white
                            rounded-2xl
                            outline-none"
                            placeholder="Busqueda..."
                            type="text"
                            onChange={handleChange}
                        />
                    </form>
                </div>
            ) : (
                <>
                    {searchTopics.map((topicSearchs, index) => {
                        return(
                            <Fragment key={index}>
                                {index !== (topicsLenght - 1)? (
                                    <>
                                        <Button
                                            className={`
                                                bg-transparent
                                                rounded-none
                                                outline-none
                                                shadow-none
                                                text-black
                                                ${search? "invisible" : "visible"}
                                                hover:text-[#0043ce]
                                                hover:bg-transparent
                                                active:bg-transparent
                                                active:scale-105
                                                active:text-[#002d9c]`}
                                        >{topicSearchs}
                                        </Button>
                                        <Line className={`${search? "invisible" : "visible"}`}/>
                                    </>
                                    ) : (
                                    <Button
                                        className="
                                            bg-transparent
                                            rounded-none
                                            outline-none
                                            shadow-none
                                            text-black
                                            hover:bg-transparent
                                            active:bg-transparent"
                                        onClick={() => setSearch(prev => !prev)}
                                    >
                                        <SearchIcon
                                            className="hover:fill-[#0043ce]"
                                        />
                                    </Button>
                                    )
                                }
                            </Fragment>
                        );
                    })}
                </>
            )}
        </div>
    );
}

export default Searchbar;