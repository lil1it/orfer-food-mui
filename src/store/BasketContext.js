import { createContext, useCallback, useEffect, useState } from "react";
import { fetchApi } from "../lib/fetchApi";

export const BasketContext = createContext({
  items: [],
});

export const BasketProvider = ({ children }) => {


  const [items, setItems] = useState([]);

  const getBasket = async () => {


    try {
      const { data } = await fetchApi("basket");
      setItems(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBasket();
  }, []);

  const addToBasket = async (newItem) => {
 

    try {
      console.log(newItem);
      const response = await fetchApi(`foods/${newItem.id}/addToBasket`, {
        method: "POST",
        body: { amount: newItem.amount },
      });

      setItems(response.data.items);
    } catch (error) {
      console.log(error);
    }

    // getBasket()

    //     console.log(newItem);
    // setItems((prevState) => {
    //     if(!prevState.length){
    //         return [newItem]
    //     }

    //     const doesItemExists = prevState.find((oldItem) => oldItem.id === newItem.id)

    //     if (!doesItemExists){
    //         return[...prevState,newItem]
    //     }

    //     const updatedItems = prevState.map((oldItem)=>{
    //         if(oldItem.id === newItem.id){
    //             oldItem.amount = oldItem.amount + newItem.amount
    //         }
    //         return oldItem
    //     })
    //     return updatedItems
    //     // return [...prevState,item]
    // })
  };

  const updateBasketItem = async ({ id, amount }) => {

    try {
      const { data } = await fetchApi(`basketItem/${id}/update`, {
        method: "PUT",
        body: { amount },
      });

      setItems(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBasketItem = async (id) => {

    try {
      const { data } = await fetchApi(`basketItem/${id}/delete`, {
        method: "DELETE",
      });

      setItems(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  // const incrementAmountHandler = (id) =>{
  //     console.log(id);
  //     const updatedItem = items.map((item) => {
  //         if(item.id=== id){
  //         return {...item, amount: ++ item.amount}
  //         }
  //         return item
  //      })
  //      return setItems(updatedItem)
  // }

  // const decrementAmountHandler = (id,amount) =>{
  //     console.log(id);

  //     if(amount < 2){
  //         console.log("filterItem");
  //         const filteredItems = items.filter((item) => item.id !== id)
  //         return setItems(filteredItems)
  //    }

  //     const updatedItems = items.map((item) => {

  //     if(amount <= 0){
  //         return {...item, amount: item.amount}
  //     }

  //         if(item.id=== id){
  //         return {...item, amount: --item.amount}
  //         }
  //         return item
  //      })
  //      return setItems(updatedItems)
  // }

  const [showBasket, setShowBasket] = useState(false);

  const showBasketHandler = useCallback(() => {

    setShowBasket((prevState) => !prevState);
  }, []);

  const state = {
    items,
    addToBasket,
    // incrementAmountHandler,
    // decrementAmountHandler,
    updateBasketItem,
    deleteBasketItem,
    showBasket,
    showBasketHandler,
  };

  return (
    <BasketContext.Provider value={state}>{children}</BasketContext.Provider>
  );
};
