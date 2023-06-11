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
  <GeneralLayout userName={`Jorge Plasencia`}>{page}</GeneralLayout>
);
export default Dashboard;
