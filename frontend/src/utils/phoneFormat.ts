export const phoneFormat = (s: string | undefined) => {
  if (!s) return s
  if (s.replace(/[^0-9]/g, '').length == 11) {
    let phone = s.replace(/[^+0-9]/g, '')
    if (phone.startsWith('+')) {
      phone = phone.substring(1)
    }
    if (phone.startsWith('7')) {
      phone = phone.substring(1)
    } else if (phone.startsWith('8')) {
      phone = phone.substring(1)
    }
    return phone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/g, `+7 ($1) $2-$3-$4`)
  } else {
    return s
  }
}
