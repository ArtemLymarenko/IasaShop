export const ADMIN_PANEL = '/admin-panel'
export const USER_PANEL = '/my-cabinet'

export const getAdminUrl = (path = '') => `${ADMIN_PANEL}${path}`
