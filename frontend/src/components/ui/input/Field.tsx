import { FC, InputHTMLAttributes, forwardRef, useState } from 'react'
import styles from './Field.module.scss'
import { IconType } from 'react-icons'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import cn from 'clsx'

interface IField extends InputHTMLAttributes<HTMLInputElement> {
	placeholder: string
	Icon?: IconType
	error?: string
}

const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, Icon, error, type = 'text', ...rest }, ref) => {
		const [showPassword, setShowPassword] = useState(false)

		return (
			<div className={styles.customInput}>
				<label>
					{Icon && <Icon className={styles.icon} />}

					<div>
						<span>{placeholder}</span>
						{type === 'password' ? (
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
						type={type === 'text' ? 'text' : showPassword ? 'text' : 'password'}
						ref={ref}
						{...rest}
						className={cn(styles.input, {
							[styles.inputError]: !!error
						})}
					/>
				</label>

				{error && <div className={styles.error}>{error}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
