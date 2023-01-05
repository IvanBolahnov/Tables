const list = document.querySelector(".list-main")

console.log(list)

let listTransform = (e) => {
  const x = e.type === "mousemove"?Number(e.clientX - list.offsetWidth/2):e.touches[0].clientX - list.offsetWidth/2
  const y = e.type === "mousemove"?Number(e.clientY - list.offsetHeight/2):e.touches[0].clientY - list.offsetHeight/2
  const xDecimal = x / window.innerWidth;
  const yDecimal = y / window.innerHeight;
  
  const xPan = list.offsetWidth * xDecimal * -0.1;
  const yPan = list.offsetHeight * yDecimal * -0.1;
  

  for (card of list.querySelectorAll(".card")) {
    card.style.transform = `translate(${xPan}px, ${yPan}px)`
  }
}

window.addEventListener("mousemove", e => listTransform(e))
window.addEventListener("touchmove", e => listTransform(e))

for (const card of document.querySelectorAll(".card")) {
  card.addEventListener("mousemove", e => {
    const {currentTarget: target} = e

    const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top


    target.style.setProperty('--mouse-x', `${x}px`)
    target.style.setProperty('--mouse-y', `${y}px`)
  })
}