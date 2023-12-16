export const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	if (isNaN(date.getTime())) {
		return 'Invalid Date'
	}

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	} as Intl.DateTimeFormatOptions

	return date.toLocaleString('en-US', options)
}
