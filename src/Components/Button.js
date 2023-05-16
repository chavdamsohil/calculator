import React, { useContext } from "react";
import CalcContext from "../Context/CalcContext";

const getClassName = (value) => {
  const classNames = {
    "=": "equals",
    x: "opt",
    "-": "opt",
    "+": "opt",
    "/": "opt",
  };
  return classNames[value];
};

const Button = ({ value }) => {
  const { calc, setCalc } = useContext(CalcContext);

  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const resetClick = () => {
    setCalc({
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const handleNumBtnClick = () => {
    const numberString = value.toString();
    let numberValue;

    if (numberString === "0" && calc.num === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calc.num + numberString);
    }
    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  const signClicked = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsclick = () => {
    if (calc.num && calc.res) {
      const math = (res, num, sign) => {
        const result = {
          "+": (res, num) => res + num,
          "-": (res, num) => res - num,
          x: (res, num) => res * num,
          "/": (res, num) => res / num,
        };
        return result[sign](res, num);
      };

      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  const percentClicked = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign: "",
    });
  };

  const invertClicked = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  };

  const handleBtnClick = () => {
    const result = {
      ".": commaClick,
      c: resetClick,
      "-": signClicked,
      "+": signClicked,
      "/": signClicked,
      x: signClicked,
      "=": equalsclick,
      "%": percentClicked,
      "+-": invertClicked,
    };
    if (result[value]) {
      return result[value]();
    } else {
      return handleNumBtnClick();
    }
  };

  return (
    <button
      className={`${getClassName(value)} button`}
      onClick={handleBtnClick}
    >
      {value}
    </button>
  );
};

export default Button;
