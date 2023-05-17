import { Searchbar } from "~/components";
import { NextPageWithLayout } from "~/pages/page";
import { GeneralLayout } from "~/components";

const Persons: NextPageWithLayout = (): JSX.Element => {
    return (
        <div>
            <Searchbar/>
        </div>
    );
}

Persons.getLayout = (page) => (
    <GeneralLayout
        userImage={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
        userJob={`Software Engineer`}
        userName={`Jorge Plasencia`}
    >
        {page}
    </GeneralLayout>
);

export default Persons;