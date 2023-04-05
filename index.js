let myLeads = []
let oldLeads =[]
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
let ulEl = document.getElementById('ul-el')
inputBtn.addEventListener("click", clicked)
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
let tabBtn = document.getElementById("tab-btn")



if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function() {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
     
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

  })
})

function render(leads) {
    let listItems = ""
       for(i = 0; i < leads.length; i++){
            listItems +=  `
              <li>
              <a target = '_blank' href = '${leads[i]}'>
               ${leads[i]}
               </a>
              </li>`
            ulEl.innerHTML = listItems
       }
    }
    

deleteBtn.addEventListener("dblclick",clear)
function clear() {
    localStorage.clear()
    myLeads = [""]
    render(myLeads)
}




function clicked() {
    myLeads.push(inputEl.value)
   inputEl.value = ""
   localStorage.setItem("myLeads", JSON.stringify(myLeads))
   render(myLeads)
}





