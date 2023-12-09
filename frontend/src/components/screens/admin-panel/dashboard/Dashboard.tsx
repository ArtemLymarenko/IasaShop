import { FC } from 'react'
import styles from './Dashboard.module.scss'
import { formatToCurrency } from '@/utils/format-to-currency'

const Dashboard: FC = () => {
	const data: { name: string; value: number }[] = [
		{ name: 'Total users', value: 15 },
		{ name: 'Total orders', value: 150 },
		{ name: 'Total products', value: 12000 },
		{ name: 'Total income', value: 590000 }
	]

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
