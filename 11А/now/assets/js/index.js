let getMinutes = () => {
  let date = new Date()
  return date.getHours() * 60 + date.getMinutes()
}

let nowTable = new Table(document.querySelector(".table__wrapper"), "table-now", ["№", "Время", "Урок", "Преподаватель", "Кабинет"])
nowTable.render(Thursday)
nowTable.setActiveRow(Table.checkTimes(nowTable.times, 600))


// const days = [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
// createTable(table, days[getDay()])

// let currentDay = getDay()

// setInterval(() => {
//   if (currentDay !== getDay()) {
//     currentDay = getDay()
//     createTable(table, days[currentDay])
//   }

// }, 1000);