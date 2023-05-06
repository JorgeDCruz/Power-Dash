import { NextPageWithLayout } from "~/pages/page";
import Div100vh from "react-div-100vh";
import { GeneralButton } from "~/components/buttons";
import { useState } from "react";

const Main: NextPageWithLayout = () => {
  const [input, setInput] = useState<string>("");
  return (
    <Div100vh className={`flex items-center justify-center`}>
      <input
        value={input}
        className={`border`}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <GeneralButton
        style={`ghost`}
        size={`medium`}
        disabled={input.length < 3}
        animated={true}
      >
        Hello
      </GeneralButton>
    </Div100vh>
  );
};

export default Main;
