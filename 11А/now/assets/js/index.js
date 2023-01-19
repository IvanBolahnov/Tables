const days = [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]

let getMinutes = () => {
  let date = new Date()
  return date.getHours() * 60 + date.getMinutes()
}

let getDay = () => {
  let date = new Date()
  return date.getDay()
}

let nowTable = new Table(document.querySelector(".table__wrapper"), "table-now", ["№", "Время", "Урок", "Преподаватель", "Кабинет"])

let currentDay = getDay()
nowTable.render(days[currentDay])

let currentRow = Table.checkTimes(nowTable.times, getMinutes())
nowTable.setActiveRow(currentRow)

setInterval(() => {
  if (currentDay !== getDay()) { // Reload day
    currentDay = getDay()
    nowTable.render(days[currentDay])
  }
  

  if (currentRow !== Table.checkTimes(nowTable.times, getMinutes())) { // Reload row
    currentRow = Table.checkTimes(nowTable.times, getMinutes())
    nowTable.setActiveRow(currentRow)
  }

}, 1000);