export const formatDate = (dateString: string) => {
	const date = new Date(dateString)
	if (isNaN(date.getTime())) {
		return 'Invalid Date'
	}

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZoneName: 'short'
	} as Intl.DateTimeFormatOptions

	return date.toLocaleString('en-US', options)
}
