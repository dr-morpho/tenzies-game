import React from 'react';
import { nanoid } from 'nanoid';
import BoxElem from '../components/BoxElem';
import { useDispatch, useSelector } from 'react-redux';
import { boxSelector, gameSelector, setBoxes, setGame } from '../redux/slices/boxSlice';
import styles from './app.module.scss';

const App: React.FC = () => {
  const [popup, setPopup] = React.useState(false);
  const dispatch = useDispatch();
  const endgame = useSelector(gameSelector);
  const arrElem = useSelector(boxSelector);
  let everyColor = arrElem.every((elem) => elem.isHeld);
  let everyValue = arrElem.every((elem) => elem.value === arrElem[0].value);

  const randomElem = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };

  const arrayBox = () => {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(randomElem());
    }
    return arr;
  };

  React.useEffect(() => {
    everyColor = false;
    everyValue = false;
  }, []);

  React.useEffect(() => {
    if (everyColor && everyValue) {
      dispatch(setGame(true));
    }
    // eslint-disable-next-line
  }, [arrElem]);

  React.useEffect(() => {
    dispatch(setBoxes(arrayBox()));
    // eslint-disable-next-line
  }, []);

  const holdColor = (id: string) => {
    const holdElems = arrElem.map((elem) =>
      elem.id === id ? { ...elem, isHeld: !elem.isHeld } : elem,
    );
    dispatch(setBoxes(holdElems));
  };

  const restart = () => {
    if (!endgame) {
      const arrElems = arrElem.map((elem) => (elem.isHeld ? elem : randomElem()));
      dispatch(setBoxes(arrElems));
    } else {
      dispatch(setBoxes(arrayBox()));
      dispatch(setGame(false));
    }
  };

  const popupClick = () => {
    setPopup((state) => !state);
  };

  const boxElemMap = arrElem.map((elem) => (
    <BoxElem
      key={elem.id}
      {...elem}
      isHeld={elem.isHeld}
      value={elem.value}
      changeColor={() => holdColor(elem.id)}
    />
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <section className={styles.title}>
          <p>
            {endgame && 'Cool! You won :)'}
            <br />
          </p>
          <h1>Tenzies game</h1>
          <button onClick={popupClick}>instruction</button>
          {popup && (
            <div className={styles.popupmenu}>
              <p>
                Roll until all dice are the same. Click each die to freeze it at its current value
                between rolls.
              </p>
              <button className={styles.button} onClick={popupClick}>
                Oк
              </button>
            </div>
          )}
        </section>
        <section className={styles.boxcontainer}>{boxElemMap}</section>
        <button className={styles.rollbutton} onClick={restart}>
          <h2>{endgame ? 'New Game' : 'Roll'}</h2>
        </button>
      </div>
    </div>
  );
};

export default App;
