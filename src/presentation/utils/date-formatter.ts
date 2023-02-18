export const dateFormatter = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}
