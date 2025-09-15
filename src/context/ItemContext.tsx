import React, { createContext, useState, useEffect, ReactNode } from "react";
import { VendingItem } from "../types/VendingItem";
import { CoinItem } from "../types/CoinItem";

interface VendingItemContextType {
  items: VendingItem[];
  coins: CoinItem[] | null;
  denomination: string | null;
  selectedItem: VendingItem | null;
  addVendingItem: (item: VendingItem) => void;
  updateVendingItem: (item: VendingItem) => void;
  deleteVendingItem: (id: number) => void;
  handleSelectProduct: (item: VendingItem | null) => void;
  handleInsertCoin: (amount: number) => void;
  insertedCoins: number;
  setInsertedCoins: (value: number) => void;
}

interface ItemProviderProps {
  children: ReactNode;
}

export const ItemContext = createContext<VendingItemContextType | undefined>(
  undefined
);

const ItemProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [items, setItems] = useState<VendingItem[]>([]);
  const [coins, setCoins] = useState<CoinItem[] | null>(null);
  const [insertedCoins, setInsertedCoins] = useState<number>(0);
  const [denomination, setDenomination] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<VendingItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/vendingData");
        const data = await res.json();
        const { products, coinValues, coinDenomination } = data;
        setItems(products);
        setCoins(coinValues);
        setDenomination(coinDenomination.denomination);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const addVendingItem = (item: VendingItem) => {
    setItems([...items, item]);
  };

  const updateVendingItem = (updatedItem: VendingItem) => {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const deleteVendingItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSelectProduct = (item: VendingItem | null) => {
    setSelectedItem(item);
  };

  const handleInsertCoin = (amount: number) => {
    setInsertedCoins((prev) => prev + amount);
  };

  return (
    <ItemContext.Provider
      value={{
        items,
        coins,
        denomination,
        selectedItem,
        addVendingItem,
        updateVendingItem,
        deleteVendingItem,
        handleSelectProduct,
        handleInsertCoin,
        insertedCoins,
        setInsertedCoins,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
