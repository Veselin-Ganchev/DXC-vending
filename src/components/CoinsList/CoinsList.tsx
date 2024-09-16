import React, { useContext } from "react";
import { Button, Grid2 } from "@mui/material";
import { ItemContext } from "../../context/ItemContext";
import { vendingMachineStyles } from "../VendingMachineStyles";

const CoinsList: React.FC = () => {
  const { coins, denomination, handleInsertCoin } = useContext(ItemContext)!;

  return (
    <Grid2 container>
      {coins &&
        coins.map((amount) => (
          <Grid2 key={amount.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              sx={vendingMachineStyles.coinButton}
              onClick={() => handleInsertCoin(amount.value)}
            >
              {amount.value.toFixed(2) + " " + denomination}
            </Button>
          </Grid2>
        ))}
    </Grid2>
  );
};

export default CoinsList;
