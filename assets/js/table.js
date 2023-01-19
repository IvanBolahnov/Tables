class Table {
  constructor (parent, tableClassName, headerContent) {
    this.parent = parent
    this.className = tableClassName
    this.headerContent = headerContent

    this.table = this.createTable()
    this.table.classList.add(this.className)
      this.caption = this.createCaption()
      this.tbody = this.createTbody()
        this.header = this.createHeader(this.headerContent)
    
    this.times = []
    this.activeRow = false
  }

  createTable () {
    let table = document.createElement("table")
    this.parent.appendChild(table)
    return table
  }

  createCaption () {
    let caption = document.createElement("caption")
    this.table.appendChild(caption)
    return caption
  }

  editCaption (captionContent) {
    let node = document.createTextNode(captionContent)
    let lastNode = this.caption.childNodes[0]
    lastNode != undefined ? this.caption.removeChild(lastNode) : undefined
    this.caption.appendChild(node)
    return this.caption
  }

  createTbody () {
    let tbody = document.createElement("tbody")
    this.table.appendChild(tbody)
    return tbody
  }

  createHeader (data) {
    let tr =  document.createElement("tr")
    for(let content of data) {
      let th = document.createElement("th")
      let node = document.createTextNode(content)
      th.appendChild(node)
      tr.appendChild(th)
    }
    this.tbody.appendChild(tr)
    return tr
  }

  createTr (data) {
    let tr =  document.createElement("tr")
    for(let content of data) {
      let td = document.createElement("td")
      let node = document.createTextNode(content)
      td.appendChild(node)
      tr.appendChild(td)
    }
    this.tbody.appendChild(tr)
    return tr
  }

  removeContent () {
    this.times = []
    for (let tr of this.table.querySelectorAll("tr")) {
      tr != this.header ? tr.remove() : undefined
    }
  }

  addContent (data) {
    for (const tr of data) {
      this.times.push(tr[1])
      this.createTr(Table.lessonDataConverter(tr))
    }
  }

  setActiveRow (rowNumber) {
    if (!Number.isInteger(rowNumber)) {
      return
    }
    if (this.activeRow) {
      this.activeRow.classList.remove('active')
    }
    let rows = this.table.querySelectorAll("tr")
    rows[rowNumber].classList.add("active")
    this.activeRow = rows[rowNumber]
    return rows[rowNumber]
  }

  render (Day) {
    this.removeContent()
    this.addContent(Day.table)
    this.editCaption(Day.info.name)    
  }

  static minutesToHour (minutes) {
    if (minutes % 60 < 10) {
      return Math.trunc(minutes / 60) + ":0" + minutes % 60
    }
    return Math.trunc(minutes / 60) + ":" + minutes % 60
  }

  static lessonDataConverter (lesson) {
    let data = JSON.parse(JSON.stringify(lesson))
    let time = this.minutesToHour(data[1][0]) + "-" + this.minutesToHour(data[1][1])
    data[1] = time
    data[4] = "№" + data[4]
    return data
  }

  static checkTimes (times, nowMinutes) {
    for (let i = 0; i < times.length; i++) {
      if (nowMinutes >= times[i][0] && nowMinutes <= times[i][1]) {
        return i + 1
      }
    }
    return
  }
}