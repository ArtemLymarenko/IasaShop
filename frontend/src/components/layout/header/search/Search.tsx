import { FC, useState } from 'react'
import styles from './Search.module.scss'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const Search: FC = () => {
	const [searchValue, setSearchValue] = useState('')

	return (
		<div className={styles.search}>
			<InputGroup>
				<InputLeftElement
					pointerEvents='none'
					children={<SearchIcon color='white' />}
				/>
				<Input
					variant='flushed'
					type='search'
					onChange={e => setSearchValue(e.target.value)}
					value={searchValue}
					placeholder='Search'
					_placeholder={{ color: 'white' }}
					_focus={{
						boxShadow: 'none'
					}}
					_focusVisible={{
						borderColor: 'white'
					}}
				/>
			</InputGroup>
		</div>
	)
}

export default Search
