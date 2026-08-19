export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address'
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters'
  return null
}

export const validateRequired = (value: string, label: string): string | null => {
  if (!value || !value.trim()) return `${label} is required`
  return null
}

export const validateUrl = (url: string): string | null => {
  if (!url) return null
  try { new URL(url); return null }
  catch { return 'Invalid URL' }
}
