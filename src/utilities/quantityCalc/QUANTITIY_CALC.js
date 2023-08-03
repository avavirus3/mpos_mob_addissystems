
export const handleQuantityInput = (MainProduct, SaleProduct, setSaleProduct, input, id) => {
    const inputNum = parseInt(input);
    const Prev_Item_Qty = MainProduct.filter(item => item.id === id && item)[0]
      .qty;
    const Sale_Item = SaleProduct.filter(item => item.id == id)[0];

    if ((Prev_Item_Qty - (Sale_Item.qty + 1)) >= 0) {
      console.log('Can be Deducted!');
      Sale_Item.qty = inputNum;
    } else if (inputNum > Prev_Item_Qty) {
      console.log("Item Can't Set!");
      Sale_Item.qty = Prev_Item_Qty;
    } else {
      Sale_Item.qty = 0
    }

    setSaleProduct([...SaleProduct]);
}
