export const getInitials = (description: string) => {
  const secondInitial = description.charAt(description.indexOf(' ') + 1)
  return `${description[0]}${secondInitial}`
}
