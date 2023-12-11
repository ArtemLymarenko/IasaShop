import { FC } from 'react'
import styles from './Dashboard.module.scss'
import {  useTotalOrders, useTotalProducts, useTotalIncome, useTotalUsers } from '@/hooks/useStatistics';
import { formatToCurrency } from '@/utils/format-to-currency'

const Dashboard: FC = () => {

  const { data: totalUsers } = useTotalUsers();
  const { data: totalOrders } = useTotalOrders();
  const { data: totalProducts } = useTotalProducts();
  const { data: totalIncome } = useTotalIncome();

  const data: { name: string; value: number }[] = [
    { name: 'Total users', value: totalUsers || 0 },
    { name: 'Total orders', value: totalOrders || 0 },
    { name: 'Total products', value: totalProducts || 0 },
    { name: 'Total income', value: totalIncome || 0 },
  ];

	return (
		<div className={styles.wrapper}>
			{data.length ? (
				data.map((item, index) => (
					<div key={item.name} className={styles.item}>
						<div>{item.name}</div>
						<div>
							{index === data.length - 1
								? formatToCurrency(item.value) || 0
								: item.value}
						</div>
					</div>
				))
			) : (
				<div>Statistic not loaded</div>
			)}
		</div>
	)
}

export default Dashboard
