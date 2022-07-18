import React from 'react';
import styles from './boxelem.module.scss';

type BoxProp = {
  value: number;
  changeColor: () => void;
  isHeld: boolean;
};

const BoxElem: React.FC<BoxProp> = ({ changeColor, isHeld, value }) => {
  return (
    <div onClick={changeColor} className={isHeld ? styles.box__green : styles.box}>
      <h2 className="box-text">{value}</h2>
    </div>
  );
};

export default BoxElem;
