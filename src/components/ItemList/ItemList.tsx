import React, { useContext } from "react";
import { ItemContext } from "../../context/ItemContext";
import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { vendingMachineStyles } from "../VendingMachineStyles";

const ItemList: React.FC = () => {
  const { items, denomination, selectedItem, handleSelectProduct } =
    useContext(ItemContext)!;

  return (
    <Grid2 container sx={vendingMachineStyles.itemList} spacing={2}>
      {items.map((item) => (
        <Grid2
          key={item.id}
          size={{ xs: 12, sm: 6, md: 3 }}
          sx={[
            vendingMachineStyles.itemCard,
            item.id === selectedItem?.id
              ? vendingMachineStyles.selectedItemCard
              : {},
          ]}
        >
          <Typography variant="body1">
            {item.name}
            <br />
            {item.price + " " + denomination}
            <br />
            {`(${item.quantity} left)`}
          </Typography>
          <Button
            disabled={item.quantity === 0}
            variant="contained"
            color="success"
            onClick={() => handleSelectProduct(item)}
          >
            {item.quantity === 0 ? "Out of stock" : "Select"}
          </Button>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default ItemList;
