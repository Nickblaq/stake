import { useState, useEffect, useContext } from "react"
import coinurl from "../api/coinurl"
import Link from "next/link";
const coinList = [
  "bitcoin",
  "ethereum",
  "tether",
]
const CoinDetail = ({ coin }) => {
    return (
      <div className="text-decoration-none my-1 ">
        <li className="coinlist-item list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark">
          <img className="coinlist-image" src={coin.image} alt="" />
          {/* <span className="text-decoration-none">{coin.low_24h}</span> */}
          <span className="text-decoration-none">{coin.current_price}</span>
          {/* <span className="text-decoration-none">{coin.high_24h}</span> */}
          <span
            className={
              coin.price_change_percentage_24h < 0
                ? "text-danger mr-2"
                : "text-success mr-2"
            }
          >
            <i
              className={
                coin.price_change_percentage_24h < 0
                  ? "fas fa-sort-down align-middle mr-1"
                  : "fas fa-sort-up align-middle mr-1"
              }
            ></i>
            {coin.price_change_percentage_24h}
            <i
             
              className="delete-icon fas fa-times align-middle mr-1"
            ></i>
          </span>
        </li>
      </div>
    );
  };



const Coin = () => {

    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("Not getting data")
        setIsLoading(true);
        const fetchData = async () => {
          const { data } = await coinurl.get("/coins/markets", {
            params: { vs_currency: "usd", ids: coinList.join(",") },
          });
          setCoins(data);
          setIsLoading(false);
        };
        if (coinList.length > 0) {
          fetchData();
        } else {
          setCoins([]);
        }
      }, [coinList]);

    return(
        <>
        <div className="">
        <div>
      {isLoading ? (
       <h1 className="">Loading.,,</h1>
      ) : (
        <div>
          <ul className="mt-2">
            {coins.map((coin) => (
              <CoinDetail key={coin.id} coin={coin} />
            ))}
          </ul>
        </div>
      )}
    </div>
        </div>
        </>
    )
}

export default Coin;