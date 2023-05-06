let type = event.target.parentNode.id.split("-");
let id = type[1];
index = data.allItems[type].findIndex((obj) => obj.id === id);
data.total.income -= data.allItems[type][index].val;
data.allItems[type].splice(index, 1);
document.getElementById(`${event.target.parentNode.parentNode.id}`).remove();
updateHTML();
