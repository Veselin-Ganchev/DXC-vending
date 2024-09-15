import React, { useState, useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Grid2 } from "@mui/material";
import { vendingMachineStyles } from "./VendingMachineStyles";
import ItemsList from "./ItemList/ItemList";

const VendingMachine: React.FC = () => {
  const {
    coins,
    denomination,
    selectedItem,
    updateVendingItem,
    handleSelectProduct,
  } = useContext(ItemContext)!;
  const [insertedCoins, setInsertedCoins] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleInsertCoin = (amount: number) => {
    setInsertedCoins(insertedCoins + amount);
  };

  const handleBuyProduct = () => {
    if (!selectedItem) {
      setMessage(`Please select product!`);
    } else if (selectedItem.quantity <= 0) {
      setMessage(
        `Out of stock, please select another product ot reset your purchase`
      );
    } else if (selectedItem && insertedCoins >= selectedItem.price) {
      const change = insertedCoins - selectedItem.price;
      setMessage(
        `You purchased ${selectedItem.name}! Change: ${
          change.toFixed(2) + denomination
        }`
      );
      updateVendingItem({
        ...selectedItem,
        quantity: selectedItem.quantity - 1,
      });

      setInsertedCoins(0);
      handleSelectProduct(null);
    } else {
      setMessage("The amount is not enough, insert more coins");
    }
  };

  const handleReset = () => {
    setInsertedCoins(0);
    handleSelectProduct(null);
    setMessage("Reset transaction");
  };

  return (
    <Box sx={vendingMachineStyles.vendingMachine}>
      <Typography variant="h3" component="h1" gutterBottom>
        Vending Machine
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 9 }}>
          <Box sx={vendingMachineStyles.sectionWrapper}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ marginBottom: "15px" }}
            >
              Inventar
            </Typography>
            <ItemsList />
          </Box>
          <Box sx={vendingMachineStyles.sectionWrapper}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ marginBottom: "15px" }}
            >
              Insert Coins
            </Typography>
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
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 3 }}>
          <Box sx={vendingMachineStyles.sectionWrapper}>
            <Typography variant="h4">
              Inserted Amount: {insertedCoins.toFixed(2) + " " + denomination}
            </Typography>
          </Box>
          <Box sx={vendingMachineStyles.sectionWrapper}>
            <Typography variant="h4" component="h2">
              Actions
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={vendingMachineStyles.actionButton}
              onClick={handleBuyProduct}
            >
              Buy
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ margin: "5px" }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Box>
          {message && (
            <Box sx={vendingMachineStyles.sectionWrapper}>
              <Typography variant="h5" sx={vendingMachineStyles.message}>
                {message}
              </Typography>
            </Box>
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default VendingMachine;
