import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
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
}

export const ItemContext = createContext<VendingItemContextType | undefined>(
  undefined
);

interface ItemProviderProps {
  children: ReactNode;
}

const ItemProvider: React.FC<ItemProviderProps> = ({ children }) => {
  const [items, setItems] = useState<VendingItem[]>([]);
  const [coins, setCoins] = useState<CoinItem[] | null>(null);
  const [denomination, setDenomination] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<VendingItem | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/vendingData")
      .then((response) => {
        const { products, coinValues, coinDenomination } = response.data;
        setItems(products);
        setCoins(coinValues);
        setDenomination(coinDenomination.denomination);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
