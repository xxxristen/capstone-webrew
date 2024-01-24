// Assign to cardWrappr, the element with class 'card-wrapper'
const cardWrapper = document.querySelector('.card-wrapper')
// Assign to cardWrapperChildren array, the child elements of card-wrapper
const cardWrapperChildren = Array.from(cardWrapper.children)
// Assign to widthToScroll, the offsetWidth (width + padding) of first child
const widthToScroll = cardWrapper.children[0].offsetWidth
// Assign to arrowPrev and arrowNext, the elements with class 'arrow.prev' and 'arrow.next' respectively
const arrowPrev = document.querySelector('.arrow.prev')
const arrowNext = document.querySelector('.arrow.next')

// Assign to cardBounding, information about the size (dimensions) of cardWrapper and its position relative to the viewport.
const cardBounding = cardWrapper.getBoundingClientRect()
// Assign and caclculate the number of columns that fit within the carousel's visible area
const column = Math.floor(cardWrapper.offsetWidth / (widthToScroll + 24))

// Manage carousell's scroll position and mouse interactions
let currScroll = 0
let initPos = 0
let clicked = false

// Looping
// Duplicate the last column cards from cardWrapperChildren and add them to the beginning of cardWrapper
cardWrapperChildren.slice(-column).reverse().forEach(item => {
  cardWrapper.insertAdjacentHTML('afterbegin', item.outerHTML)
})
// Duplicate the first column cards from cardWrapperChildren and add them to the end of cardWrapper
cardWrapperChildren.slice(0, column).forEach(item => {
  cardWrapper.insertAdjacentHTML('beforeend', item.outerHTML)
})
// Clear the autoScroll timeout when the mouse enters the carousel
cardWrapper.onmouseenter = function (e) {
  clearTimeout(autoScroll)
}
// Set images and links within the carousel not draggable
const cardImageAndLink = cardWrapper.querySelectorAll('img, a')
cardImageAndLink.forEach(item => {
  item.setAttribute('draggable', false)
})
// Set the initial scroll position of the carousel
cardWrapper.classList.add('no-smooth')
cardWrapper.scrollLeft = cardWrapper.offsetWidth
cardWrapper.classList.remove('no-smooth')

// Handle arrow clicks to scroll the carousel
arrowPrev.onclick = function () {
  cardWrapper.scrollLeft -= widthToScroll
}
arrowNext.onclick = function () {
  cardWrapper.scrollLeft += widthToScroll
}

// Handle mousedown events to initiate carousel dragging
cardWrapper.onmousedown = function (e) {
  cardWrapper.classList.add('grab')
  initPos = e.clientX - cardBounding.left
  currScroll = cardWrapper.scrollLeft
  clicked = true
}
// Handle mousemove events to update the carousel scroll position while dragging
cardWrapper.onmousemove = function (e) {
  if (clicked) {
    const xPos = e.clientX - cardBounding.left
    cardWrapper.scrollLeft = currScroll + -(xPos - initPos)
  }
}

// Handle mouseup and mouseleave events to end carousel dragging
cardWrapper.onmouseup = mouseUpAndLeave
cardWrapper.onmouseleave = mouseUpAndLeave

function mouseUpAndLeave() {
  cardWrapper.classList.remove('grab')
  clicked = false
  // Start auto-scrolling the carousel after a delay
  autoScroll = setTimeout(() => {
    cardWrapper.classList.remove('no-smooth')
    cardWrapper.scrollLeft += widthToScroll
  }, 4000)

}
// Define a variable to store the autoScroll timeout
let autoScroll

cardWrapper.onscroll = function () {
  // Check if the carousel has reached the beginning
  if (cardWrapper.scrollLeft === 0) {
    // Disable smooth scrolling temporarily
    cardWrapper.classList.add('no-smooth')
    // Set the scroll position to the end of the carousel, including the duplicated cards
    cardWrapper.scrollLeft = cardWrapper.scrollWidth - (2 * cardWrapper.offsetWidth)
    // Re-enable smooth scrolling
    cardWrapper.classList.remove('no-smooth')
    // Check if the carousel has reached the end
  } else if (cardWrapper.scrollLeft === cardWrapper.scrollWidth - cardWrapper.offsetWidth) {
    cardWrapper.classList.add('no-smooth')
    // Set the scroll position to the beginning of the carousel, including the duplicated cards
    cardWrapper.scrollLeft = cardWrapper.offsetWidth
    cardWrapper.classList.remove('no-smooth')
  }
  // Clear any existing autoScroll timeout
  if (autoScroll) {
    clearTimeout(autoScroll)
  }
  // Set a new autoScroll timeout to scroll the carousel automatically after a 4-second delay
  autoScroll = setTimeout(() => {
    cardWrapper.classList.remove('no-smooth')
    // Scroll the carousel to the next position
    cardWrapper.scrollLeft += widthToScroll
  }, 4000)
}