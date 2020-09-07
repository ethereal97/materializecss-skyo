(function(){
  let modal = document.createElement('div')
  modal.className = "modal bottom-sheet"
  modal.id = "tickets-modal"
  
  document.body.appendChild(modal)
  M.Modal.init(modal)
  
  modal.clear = function () {
    this.childNodes.forEach(child => child.remove())
  }
  
  let viewDetailModal = (tickets) => {
    if (typeof tickets !== "object") {
      return console.warn('tickets type invalid', tickets)
    }
    
    modal.clear()
    
    let createTicket = ({name, price, currency}) => {
      let ticket = document.createElement('li')
      ticket.className = 'modal-content'
      
      let m = M.Modal.getInstance(modal)
      
      ticket.textContent = name
      ticket.textContent += " - " + currency + " " + price.toFixed(2)
     
      m.open()
      return ticket 
    }
    
    tickets.forEach(ticket => modal.appendChild(
      createTicket(ticket)
    ))
  }
  
  let lists = document.querySelectorAll('[list=explore]')
  
  let addCard = (name, image, description, attr) => {
    let card = document.createElement('div')
    card.className = "card"

    let title = document.createElement('span')
    title.className = "card-title"
    title.textContent = name
        
    let content = document.createElement('div')
    content.className = "card-content"
    
    if (typeof image === "string") {
      let header = document.createElement('div')
      header.className = "card-image"
      
      let img = document.createElement('img')
      img.src = image
      img.alt = name
      
      header.appendChild(img)
      header.appendChild(title)
      card.appendChild(header)
    } else {
      content.appendChild(title)
    }
   
    let para = document.createElement('p')
    para.textContent = description

    content.appendChild(para)
    card.appendChild(content)
    
    if (typeof attr === "object") {
      let action = document.createElement('div')
      action.className = "card-action"
      
      let anchor = document.createElement('a')
      anchor.textContent = attr.name
      // anchor.href        = attr.link
      anchor.addEventListener('click', () => viewDetailModal(attr.tickets))
      
      action.appendChild(anchor)
      card.appendChild(action)
    }
    
    return card
  }

  fetch('/explore.json')
   .then(res => res.json())
   .then(items => {
     items.forEach(item => {
       let card = addCard(item.name, item.image, item.description, item.action)
       lists.forEach(list => list.appendChild(card))
     })
   })
})();