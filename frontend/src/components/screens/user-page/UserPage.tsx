import React, { FC } from 'react';
import Layout from '@/components/layout/Layout';
import styles from './UserPage.module.scss';
import Heading from '@/components/ui/heading/Heading';
import UserOrders, { IListItem } from './user-orders/UserOrders';
import { IOrder } from '@/types/order.interface';
import { useOrdersAll } from '@/hooks/useOrders';

const UserPage: FC<{ pageTitle: string }> = ({ pageTitle }) => {
  const { orders, isLoading, isError, error } = useOrdersAll();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout pageTitle={pageTitle}>
      <div className={styles.userPage}>
        <Heading>{pageTitle}</Heading>
        {orders && orders.length > 0 ? (
          orders.map((order: IOrder) => (
            <div key={order.orderDate}>
              <p>Order Date: {order.orderDate}</p>
        <p>Order adress: {order.shipAdress}</p>
        <p>Order city: {order.shipCity}</p>
        <p>Order userId: {order.userId}</p>
              {/* Display other order details as needed */}
            </div>
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </Layout>
  );
};

export default UserPage;