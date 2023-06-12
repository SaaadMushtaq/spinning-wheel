import React, { FC } from "react";
import "../App.css";
interface SingleRewardProps {
  itemRef: any;
  data: string;
  bgColor: string;
  spin: string;
  id: string;
}

const SingleReward: FC<SingleRewardProps> = ({
  data,
  bgColor,
  spin,
  id,
  itemRef,
}) => {
  return (
    <li
      id={id}
      style={{
        transform: `rotate(${spin}) skewY(-45deg)`,
      }}
    >
      <div ref={itemRef} className="text" style={{ backgroundColor: bgColor }}>
        {data}
      </div>
    </li>
  );
};

export default SingleReward;
