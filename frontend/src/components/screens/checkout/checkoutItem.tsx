import { FC } from 'react';
import { IProduct } from '@/types/product.interface';
import styles from './checkout.module.scss';

interface CheckoutItemProps {
  product: IProduct;
}

const CheckoutItem: FC<CheckoutItemProps> = ({ product }) => {
  return (
    <div className={styles.item}>
      <img src={product.images[0]} alt={product.productName} width={100} height={100} />
      <div className={styles.row}>
        <div className={styles.information}>
          <div>{product.productName}</div>
          <div>{product.categoryId}</div>
        </div>
        <div className={styles.price}>{product.price}</div>
      </div>
    </div>
  );
};

export default CheckoutItem;
