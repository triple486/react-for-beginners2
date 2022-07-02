import { Fragment, useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  function MinutesToHours() {
    const [amount, setAmount] = useState(0);
    const [inverted, setInverted] = useState(false);
    const onChange = (event) => {
      setAmount(event.target.value);
    };
    const reset = () => setAmount(0);
    const onInvert = () => {
      reset();
      setInverted((current) => !current);
    };
    return (
      <div>
        <div>
          <label htmlFor="dollar">Dollar</label>
          <input
            value={inverted ? amount * 19175 : amount}
            id="dollar"
            placeholder="Dollar"
            type="number"
            onChange={onChange}
            disabled={inverted}
          />
        </div>
        <div>
          <label htmlFor="bitcoin">Bitcoin</label>
          <input
            value={inverted ? amount : amount / 19175}
            id="bitcoin"
            placeholder="bitcoin"
            type="number"
            disabled={!inverted}
            onChange={onChange}
          />
        </div>
        <button onClick={reset}>Reset</button>
        <button onClick={onInvert}>{inverted ? "Turn back" : "Invert"}</button>
      </div>
    );
  }
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <Fragment>
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price}
              </option>
            ))}
          </select>
          <hr />
          <MinutesToHours />
        </Fragment>
      )}
    </div>
  );
}

export default App;
