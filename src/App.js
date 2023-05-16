import Wrapper from "./Components/Wrapper";
import Screen from "./Components/Screen";
import ButtonBox from "./Components/ButtonBox";
import Button from "./Components/Button";
import CalcContext from "./Context/CalcContext";
import { useState } from "react";

function App() {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const btnValues = [
    ["c", "+-", "%", "/"],
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  return (
    <div>
      <CalcContext.Provider value={{ calc, setCalc }}>
        <Wrapper>
          <Screen></Screen>
          <ButtonBox>
            {btnValues.flat().map((btn, i) => (
              <Button key={i} value={btn}></Button>
            ))}
          </ButtonBox>
        </Wrapper>
      </CalcContext.Provider>
    </div>
  );
}

export default App;
