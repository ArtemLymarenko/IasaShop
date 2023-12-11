// DeliveryForm.tsx
import React from "react";

interface DeliveryFormProps {
  deliveryData: any;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({
  deliveryData,
  onChange,
  onSubmit,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="country">Страна:</label>
        <input
          type="text"
          id="country"
          name="country"
          value={deliveryData.country}
          onChange={handleChange}
          placeholder="Введите страну"
        />
      </div>
      <div>
        <label htmlFor="address">Адрес:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={deliveryData.address}
          onChange={handleChange}
          placeholder="Введите адрес"
        />
      </div>
      <div>
        <label htmlFor="region">Регион:</label>
        <input
          type="text"
          id="region"
          name="region"
          value={deliveryData.region}
          onChange={handleChange}
          placeholder="Введите регион"
        />
      </div>
      <div>
        <label htmlFor="postalCode">Почтовый индекс:</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={deliveryData.postalCode}
          onChange={handleChange}
          placeholder="Введите почтовый индекс"
        />
      </div>
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default DeliveryForm;
