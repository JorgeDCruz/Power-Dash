import { FC, useState } from "react";
import { GeneralButton } from "~/components";
import { SearchIcon } from "~/assets";

const Line: FC = (): JSX.Element => <div className="w-[.7px] h-9 bg-black rounded-full"></div>;

const Searchbar: FC = (): JSX.Element => {
    const [search, setSearch] = useState<boolean>(false);

    const test = ["AWAaaaaaaaa", "OWO", "UWU", "7U7", "UNU", "T_T", ":3", "EWE",]
    const topicsLenght: number = test.length;

    return(
        <>
            {search? (
                <div>
                    AWA
                </div>
            ) : (
                <div
                    className="
                        mt-32 ml-32 bg-[#dde1e6]
                        w-3/5 h-fit p-3
                        rounded-2xl shadow-sm
                        transition-all duration-500 ease-in-out
                        flex flex-wrap justify-between items-center
                        hover:w-[63%]
                        hover:shadow-md"
                >
                    {test.map((topicSearchs, index) => {
                        return(
                            <>
                                {index !== (topicsLenght - 1)? (
                                    <>
                                        <GeneralButton
                                            className="
                                                bg-transparent
                                                rounded-none
                                                outline-none
                                                shadow-none
                                                text-black
                                                hover:text-[#0043ce]
                                                hover:bg-transparent"
                                            size="medium"
                                        >{topicSearchs}
                                        </GeneralButton>
                                        <Line/>
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
                </div>
            )}
        </>
    );
}

export default Searchbar;