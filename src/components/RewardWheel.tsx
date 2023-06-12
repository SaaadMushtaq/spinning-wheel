import React, {
  FC,
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { TbArrowBigRight } from "react-icons/tb";
import SingleReward from "./SingleReward";

const RewardWheel: FC = () => {
  const itemsRefs = useRef<any>([]);
  const wheel = useRef<any>();
  const wheelAndArrow = useRef<any>();
  const deg = useRef<number>(0);
  const refIndex = useRef<any>(null);

  const zoneSize = 45;

  const [spinCheck, setSpinCheck] = useState<boolean>(false);

  const wheelArr = useMemo(
    () => [
      {
        id: "0",
        data: "spin again",
        bgColor: "#ea2c2c",
        spin: "0deg",
      },
      {
        id: "1",
        data: "10 stars",
        bgColor: "#1C9AD2",
        spin: "45deg",
      },
      {
        id: "2",
        data: "50 stars",
        bgColor: "#DD273C",
        spin: "90deg",
      },
      {
        id: "3",
        data: "1 star",
        bgColor: "#F17800",
        spin: "135deg",
      },
      {
        id: "4",
        data: "spin again",
        bgColor: "#18B583",
        spin: "180deg",
      },
      {
        id: "5",
        data: "world trip",
        bgColor: "#F17800",
        spin: "225deg",
      },
      {
        id: "6",
        data: "free food",
        bgColor: "#D788E0",
        spin: "270deg",
      },
      {
        id: "7",
        data: "5 stars",
        bgColor: "#1C9AD2",
        spin: "315deg",
      },
    ],
    []
  );

  const handleWin = useCallback((actualDeg: number) => {
    const winningSymbolNr = Math.ceil(actualDeg / zoneSize);

    if (winningSymbolNr === 1) {
      refIndex.current = 5;
    } else if (winningSymbolNr === 2) {
      refIndex.current = 4;
    } else if (winningSymbolNr === 4) {
      refIndex.current = 2;
    } else if (winningSymbolNr === 5) {
      refIndex.current = 1;
    } else if (winningSymbolNr === 6) {
      refIndex.current = 0;
    } else if (winningSymbolNr === 8) {
      refIndex.current = 6;
    } else {
      refIndex.current = winningSymbolNr;
    }

    itemsRefs.current[refIndex.current].classList.add("blinking-text");

    setSpinCheck(true);
  }, []);

  const eliminate = () => {
    setSpinCheck(false);
    deg.current = 0;
    itemsRefs.current[refIndex.current].classList.remove("blinking-text");

    wheelAndArrow.current.style.transform = "translate(0,0)";
  };

  const spinning = () => {
    setSpinCheck(false);
    if (refIndex.current) {
      itemsRefs.current[refIndex.current].classList.remove("blinking-text");
      deg.current = 0;
    }
    if (spinCheck) {
      wheelAndArrow.current.style.transform = "translate(0,0)";
      setTimeout(() => {
        deg.current = Math.floor(5000 + Math.random() * 5000);
        wheelAndArrow.current.style.transform = "translate(40%,35%)";
        wheel.current.style.transition = "all 10s ease-in-out";
        wheel.current.style.transform = `rotate(${deg.current}deg)`;
      }, 3000);
      return;
    }
    refIndex.current = null;
    deg.current = Math.floor(5000 + Math.random() * 5000);
    wheelAndArrow.current.style.transform = "translate(40%,35%)";
    wheel.current.style.transition = "all 10s ease-out";
    wheel.current.style.transform = `rotate(${deg.current}deg)`;
  };

  useEffect(() => {
    wheel.current.addEventListener("transitionend", () => {
      wheel.current.style.transition = "none";

      const actualDeg = deg.current % 360;
      handleWin(actualDeg);
    });
  }, [handleWin]);

  return (
    <div className="main-app">
      <span>
        <h1>Drag wheel of spin</h1>
      </span>
      <div ref={wheelAndArrow} className="circle-and-arrow">
        <TbArrowBigRight className="arrow" />
        <ul ref={wheel} className="circle">
          {wheelArr.map((singleRewardProps, index) => {
            return (
              <span key={singleRewardProps.id} className="single-row">
                <SingleReward
                  itemRef={(element: any) => itemsRefs.current.push(element)}
                  id={singleRewardProps.id}
                  data={singleRewardProps.data}
                  bgColor={singleRewardProps.bgColor}
                  spin={singleRewardProps.spin}
                />
              </span>
            );
          })}
        </ul>
      </div>
      <div>
        {spinCheck && (
          <button className="eliminate-button" onClick={eliminate}>
            Eliminate
          </button>
        )}
        <button id="btn" className="spin-button" onClick={spinning}>
          SPIN
        </button>
      </div>
    </div>
  );
};

export default RewardWheel;
