import { FC, useState } from 'react'
import styles from '../ProductCard.module.scss'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

const Slider: FC<{ images: string[] }> = ({ images }) => {
	const [activeId, setActiveId] = useState(0)

	const prev = () => {
		setActiveId(activeId > 0 ? activeId - 1 : activeId)
	}

	const next = () => {
		setActiveId(activeId < images.length - 1 ? activeId + 1 : activeId)
	}

	const updateIndex = (newIndex: number) => {
		if (newIndex < 0) {
			newIndex = 0
		} else if (newIndex >= images.length) {
			newIndex = images.length - 1
		}

		setActiveId(newIndex)
	}

	return (
		<div className={styles.slider}>
			<button onClick={prev}>
				<ArrowBackIcon boxSize={8} />
			</button>
			<div className={styles.carousel}>
				<div
					className={styles.slides}
					style={{ transform: `translate(-${activeId * 100}%)` }}
				>
					{images.map(image => (
						<div className={styles.slide} style={{ width: '100%' }}>
							<img src={image} alt={''} />
						</div>
					))}
				</div>
				<div className={styles.indicators}>
					{images.map((_, index) => {
						return (
							<button
								key={index}
								className={styles['indicator-buttons']}
								onClick={() => {
									updateIndex(index)
								}}
							>
								<span
									className={
										styles[
											`${
												index === activeId
													? 'indicator-symbol-active'
													: 'indicator-symbol'
											}`
										]
									}
								></span>
							</button>
						)
					})}
				</div>
			</div>
			<button onClick={next}>
				<ArrowForwardIcon boxSize={8} />
			</button>
		</div>
	)
}

export default Slider
