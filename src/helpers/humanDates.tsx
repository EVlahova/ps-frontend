const months = [
   "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
]

export const getHumanMonth = (month: number) => {
  return months[month]
}

export const getHumanRecipeDate = (date: Date): string => {
  return `${getHumanMonth(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
}