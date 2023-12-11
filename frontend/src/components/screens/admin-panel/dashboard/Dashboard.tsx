import { FC } from 'react'
import styles from './Dashboard.module.scss'
import { useStatistics } from '@/hooks/useStatistics'
import { formatToCurrency } from '@/utils/format-to-currency'

interface IStaticticData {
	name: string
	value: number
}

const Dashboard: FC = () => {
	const statistics = useStatistics()

	const data: IStaticticData[] = [
		{ name: 'Total users', value: statistics?.usersCount || 0 },
		{ name: 'Total orders', value: statistics?.ordersCount || 0 },
		{ name: 'Total products', value: statistics?.productsCount || 0 },
		{ name: 'Total income', value: statistics?.totalIncome || 0 }
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
