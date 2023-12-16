import { Dispatch, FC, SetStateAction } from 'react';
import Field from '@/components/ui/input/Field';
import styles from './DeliveryForm.module.scss';
import { IOrder } from '@/types/order.interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/ui/button/Button';

interface DeliveryFormProps {
	setDeliveryInfo: Dispatch<
	  SetStateAction<{
		shipCountry: string;
		shipCity: string;
		shipRegion: string;
		shipPostalCode: string;
		shipAdress: string;
	  }>
	>;
  }

const DeliveryForm: FC<DeliveryFormProps> = ({ setDeliveryInfo }) => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Partial<IOrder>>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Partial<IOrder>> = (data) => {
    // Ensure that properties are not undefined before setting the state
    const sanitizedData: {
      shipCountry: string;
      shipCity: string;
      shipRegion: string;
      shipPostalCode: string;
      shipAdress: string;
    } = {
      shipCountry: data.shipCountry || '', // Default to empty string if undefined
      shipCity: data.shipCity || '',
      shipRegion: data.shipRegion || '',
      shipPostalCode: data.shipPostalCode || '',
      shipAdress: data.shipAdress || '',
    };

    setDeliveryInfo(sanitizedData);
    reset();
  };

  return (
    <div className={styles.formContainer}>
      <p>Fill in your personal information</p>
      <div className={styles.errorMessage}>
        {errors.shipCity && <p>{errors.shipCity.message}</p>}
        {errors.shipCountry && <p>{errors.shipCountry.message}</p>}
        {errors.shipRegion && <p>{errors.shipRegion.message}</p>}
        {errors.shipPostalCode && <p>{errors.shipPostalCode.message}</p>}
        {errors.shipAdress && <p>{errors.shipAdress.message}</p>}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Field
          {...formRegister('shipCity', {
            required: 'City is required'
          })}
          placeholder='Ship city'
          error={errors.shipCity?.message}
        />
        <Field
          {...formRegister('shipCountry', {
            required: 'Coutry is required'
          })}
          placeholder='Ship country'
          error={errors.shipCountry?.message}
        />
        <Field
          {...formRegister('shipRegion', {
            required: 'Region is required'
          })}
          placeholder='Ship region'
          error={errors.shipRegion?.message}
        />
        <Field
          {...formRegister('shipPostalCode', {
            required: 'Postal code is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Postal code must contain only digits'
            }
          })}
          placeholder='Postal Code'
          error={errors.shipPostalCode?.message}
        />
        <Field
          {...formRegister('shipAdress', {
            required: 'Address is required'
          })}
          placeholder='Your address'
          error={errors.shipAdress?.message}
        />

        <Button type='submit'>Save</Button>
      </form>
    </div>
  );
};

export default DeliveryForm;
