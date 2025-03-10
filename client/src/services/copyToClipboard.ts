export const copyTextToClipboard = async (text: string): Promise<boolean> => {
	try {
		await navigator.clipboard.writeText(text)
		return true
	} catch (_) {
		return false
	}
}
