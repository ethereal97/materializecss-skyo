(function () {
  let lists = document.querySelectorAll('ul[list=nav]')
  
  let addList = (name, href, actived) => {
    let anchor = document.createElement('a')
    let li = document.createElement('li')
    
    anchor.textContent = name
    anchor.href = href
    
    actived && li.classList.add('active')
    
    li.appendChild(anchor)
    
    return li
  }

  fetch('/nav.json')
   .then(res => res.json())
   .then(items => {
     items.forEach(item => {
       let li = addList(item.name, item.link)
       
       lists.forEach(list => list.appendChild(li))
     })
   })
})();