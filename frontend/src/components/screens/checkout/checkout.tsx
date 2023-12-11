import React, { useState } from "react";
import { FC } from "react";
import Heading from "@/components/ui/heading/Heading";
import { useCart } from "@/hooks/useCart";
import DeliveryForm from "./deliveryForm";

import styles from "./checkout.module.scss";

const CheckoutPage: FC = () => {
  const { cart, totalSum } = useCart();
  const [deliveryData, setDeliveryData] = useState({
    country: "",
    address: "",
    region: "",
    postalCode: "",
  });

  // Обработчик изменения значений в полях ввода
  const handleDeliveryChange = (name: string, value: string) => {
    setDeliveryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeliverySubmit = () => {
    // Здесь вы можете использовать данные о доставке
    console.log("Данные о доставке:", deliveryData);
  };

  return (
    <div className={styles.checkoutPage}>
      <Heading >Оформление заказа</Heading>
      <DeliveryForm
        deliveryData={deliveryData}
        onChange={handleDeliveryChange}
        onSubmit={handleDeliverySubmit}
      />
         <h2>Your Cart:</h2>
         <ul className={styles.cartList}>
          {cart.map((item) => (
            <li key={item.product.id} className={styles.cartItem}>
              <img
                src={item.product.images[0]} // Предполагается, что это ссылка на изображение
                alt="Image" // Замените на подходящий текст
                width={100}
                height={100}
              />
              <div className={styles.itemDetails}>
                <div>{item.product.productName}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Price: {item.product.price}</div>
              </div>
            </li>
          ))}
        </ul>
        <div>Total: {totalSum}</div>

    </div>
  );
};

export default CheckoutPage;
