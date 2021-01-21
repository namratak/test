import React, {useState, useEffect} from 'react';
import SelectOptions from './components/SelectOptions';
import Spinner from './components/Spinner';

function App() {
  const [options, setOptions] = useState([]);
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("https://api.mocki.io/v1/3ec13c87");
    let resJson = await res.json();
    let response = resJson.availableColors;
    const result = response.sort((a, b) => {
      if (a.color > b.color) {
        return 1;
      }
      if (a.color < b.color) {
        return -1;
      } else return 0;
      });
      console.log(result);
      setOptions(result);
    };
    fetchData();
    setLoading(false);
  }, [color]);

  return (
    <div className="App">
    { loading ? <Spinner/> : (
    <select onChange={(e)=>setColor(e.currentTarget.value)}>
        {
          options.map((option) => (
        	<SelectOptions label={option.color} value={option.value}/>
        ))
        }
      </select>
        )}
      <div style={{backgroundColor: (color)}}>{color}</div>
    </div>
  );
}

export default App;
