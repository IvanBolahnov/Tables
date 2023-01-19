const days = {
  monday: Monday,
  tuesday: Tuesday,
  wednesday: Wednesday,
  thursday: Thursday,
  friday: Friday,
  saturday: Saturday,
  sunday: Sunday
}

let tables = {
  monday: new Table(document.querySelector(".table__wrapper--monday"), "table--monday", ["№", "Время", "Урок", "Преподаватель", "Кабинет"]),
  tuesday: new Table(document.querySelector(".table__wrapper--tuesday"), "table--tuesday", ["№", "Время", "Урок", "Преподаватель", "Кабинет"]),
  wednesday: new Table(document.querySelector(".table__wrapper--wednesday"), "table--wednesday", ["№", "Время", "Урок", "Преподаватель", "Кабинет"]),
  thursday: new Table(document.querySelector(".table__wrapper--thursday"), "table--thursday", ["№", "Время", "Урок", "Преподаватель", "Кабинет"]),
  friday: new Table(document.querySelector(".table__wrapper--friday"), "table--friday", ["№", "Время", "Урок", "Преподаватель", "Кабинет"]),
  saturday: new Table(document.querySelector(".table__wrapper--saturday"), "table--saturday", ["№", "Время", "Урок", "Преподаватель", "Кабинет"]),
  sunday: new Table(document.querySelector(".table__wrapper--sunday"), "table--sunday", ["№", "Время", "Урок", "Преподаватель", "Кабинет"]),
}


for (day in tables) {
  console.log(days[day])
  tables[day].render(days[day])
}

let getMinutes = () => {
  let date = new Date()
  return date.getHours() * 60 + date.getMinutes()
}

let getDay = () => {
  let date = new Date()
  return date.getDay()
}

let currentDay = getDay()
let currentRow = tables[day]

// setInterval(() => {
//   if (currentDay !== getDay()) { // Reload day
//     currentDay = getDay()
//     nowTable.render(days[currentDay])
//   }
  
//   console.log(currentRow)

//   if (currentRow !== Table.checkTimes(nowTable.times, getMinutes())) { // Reload row
//     currentRow = Table.checkTimes(nowTable.times, getMinutes())
//     nowTable.setActiveRow(currentRow)
//   }

// }, 1000);