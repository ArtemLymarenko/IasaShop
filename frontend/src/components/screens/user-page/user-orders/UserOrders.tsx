import React from 'react';
import { formatDate } from '@/utils/format-date';
import styles from './UserOrder.module.scss';
import { IOrder } from '@/types/order.interface';

interface OrderInfoProps {
	data?: IOrder[]; // Make data optional
  }
  
  const OrderInfo: React.FC<OrderInfoProps> = ({ data }) => {
	return (
	  <div className={styles.orderInfo}>
		{data &&
		  data.map(order => (
			<div key={order.id}>
			  <p>{order.id}</p>
			  <p>{formatDate(order.orderDate)}</p>
			  <p>{order.status}</p>
			</div>
		  ))}
	  </div>
	);
  };
  

export default OrderInfo;
