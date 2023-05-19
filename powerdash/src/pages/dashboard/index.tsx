import { NextPageWithLayout } from "~/pages/page";
import Div100vh from "react-div-100vh";
import { useState } from "react";
import { Button, GeneralLayout } from "~/components";

const Dashboard: NextPageWithLayout = () => {
  const [input, setInput] = useState<string>("");
  return (
    <Div100vh className={` flex items-center justify-center bg-pink-200`}>
      <input
        value={input}
        className={`border`}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Button variant={`ghost`} disabled={input.length < 3}>
        Hello
      </Button>
    </Div100vh>
  );
};

Dashboard.getLayout = (page) => (
  <GeneralLayout
    userImage={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
    userJob={`Software Engineer`}
    userName={`Jorge Plasencia`}
  >
    {page}
  </GeneralLayout>
);
export default Dashboard;
