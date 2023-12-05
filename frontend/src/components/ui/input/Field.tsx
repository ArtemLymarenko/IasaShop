import { FC, InputHTMLAttributes, forwardRef, useState } from 'react'
import styles from './Field.module.scss'
import { IconType } from 'react-icons'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'

interface IField extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
	isPassword?: boolean
	Icon?: IconType
	error?: string
}

const Field = forwardRef<HTMLInputElement, IField>(
	(
		{ placeholder, Icon, error, type = 'text', isPassword = false, ...rest },
		ref
	) => {
		const [showPassword, setShowPassword] = useState(false)

		return (
			<div className={styles.customInput}>
				<label>
					{Icon && <Icon className={styles.icon} />}

					<div>
						<span>{placeholder}</span>
						{isPassword ? (
							showPassword ? (
								<ViewIcon
									onClick={() => {
										setShowPassword(!showPassword)
									}}
								/>
							) : (
								<ViewOffIcon
									onClick={() => {
										setShowPassword(!showPassword)
									}}
								/>
							)
						) : (
							''
						)}
					</div>
					<input
						type={!isPassword ? 'text' : showPassword ? 'text' : 'password'}
						ref={ref}
						{...rest}
					/>
				</label>

				{error && <div className={styles.error}>{error}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
