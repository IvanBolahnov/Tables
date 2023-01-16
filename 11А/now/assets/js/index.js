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
let currentRow = Table.checkTimes(nowTable.times, getMinutes())

nowTable.render(days[currentDay])
nowTable.setActiveRow(currentRow)
console.log(currentRow)

setInterval(() => {
  if (currentDay !== getDay()) {
    currentDay = getDay()
    nowTable.render(days[currentDay])
  }

  if (currentRow !== Table.checkTimes(nowTable.times, getMinutes())) {
    let currentRow = Table.checkTimes(nowTable.times, getMinutes())
    nowTable.setActiveRow(currentRow)
  }

}, 1000);