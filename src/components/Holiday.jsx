import { useState, useEffect } from "react";
import axios from "axios";
import SingleHoliday from "./SingleHoliday";
const url = "https://react--course-api.herokuapp.com/api/v1/data/vacanze";

const Holiday = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);

  // funzione next holiday
  const nextHoliday = () => {
    if (selected < data.data.length-1) {
      setSelected((oldValue) => oldValue + 1);
    } else {
      setSelected(0);
    }
  };

  // funzione per la vacanza precedente
  const prevHoliday = () => {
    if (selected -1 < 0) {
      setSelected(4);
    } else {
      setSelected((oldValue) => oldValue - 1);
    }
  };

  // funzione per fetchare dati dalla api
  const getData = async () => {
    try {
      const res = await axios.get(url);
      setData(res.data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // return condizionale per vedere se abbiamo risolto la promise
  if (data.success) {
    return (
      <>
        {
          //ternary operato per controllare il numero di vacanze
          data.data.length > 0 ? (
            <SingleHoliday
              {...data.data[selected]}
              setSelected={setSelected}
              next={nextHoliday}
              prev={prevHoliday}
            />
          ) : (
            <h4>No Vacanze</h4>
          )
        }
      </>
    );
  } else {
    return <h3>Loading...</h3>;
  }
};

export default Holiday;
