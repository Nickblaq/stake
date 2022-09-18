import React, { createContext, useContext, useEffect, useState } from "react";

export const CoinListContext = createContext();

export const CoinListContextProvider = (props) => {
  const [coinList, setCoinList] = useState(
    localStorage.getItem("CoinList")?.split(",") || [
      "bitcoin",
      "ethereum",
      "tether",
    ]
  );
  useEffect(() => {
    localStorage.setItem("CoinList", coinList);
  }, [coinList]);

  const addCoin = (coin) => {
    if (coinList.indexOf(coin) === -1) {
      setCoinList([...coinList, coin]);
    }
  };

//   const deleteCoin = (coin) => {
//     setCryptoList(
//       cryptoList.filter((element) => {
//         return element !== coin;
//       })
//     );
//   };

  return (
    <CoinListContext.Provider value={{ coinList }}>
      {props.children}
    </CoinListContext.Provider>
  );
};

export function useCoin() {
    return useContext(CoinListContext);
  }