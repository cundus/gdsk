export const urlValidator = url => {
  const regex = RegExp('^(https?://)?[a-z0-9-]+(.[a-z0-9-]+)*.[a-z]{2,}(/.*)?$')
  return regex.test(url)
}

export const emailValidator = email => {
  const regex = RegExp(/^[^s@]+@[^s@]+.[^s@]+$/)
  return regex.test(email)
}
