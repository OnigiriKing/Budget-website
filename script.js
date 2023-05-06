// ?start of the project
var getSign = (function () {
  let signValue = document.getElementById("selectSign").value;
  var cRed = "rgba(245, 72, 72, 0.85)";
  var cGreen = "rgba(39, 195, 128, 0.85)";
  function getSelValue() {
    signValue = document.getElementById("selectSign").value;
    if (signValue == "exp") {
      document.querySelector(".amountInput").style.outlineColor = cRed;
      document.querySelector(".nameInput").style.outlineColor = cRed;
      document.querySelector("#selectSign").style.outlineColor = cRed;
    }
    if (signValue == "inc") {
      document.querySelector(".amountInput").style.outlineColor = cGreen;
      document.querySelector(".nameInput").style.outlineColor = cGreen;
      document.querySelector("#selectSign").style.outlineColor = cGreen;
    }
  }
  return {
    get: function () {
      return getSelValue();
    },
    signValue: function () {
      return signValue;
    },
  };
})();

var budgetControll = (function () {
  const date = new Date().toLocaleDateString("fr-FR");
  var time = (document.querySelector(
    ".date"
  ).textContent = `Avalable budget on ${date}`);

  //? data object
  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    total: {
      inc: 0,
      exp: 0,
    },
  };

  var budget = data.total.inc - data.total.exp;
  var Income = function (id, des, val) {
    this.id = id;
    this.des = des;
    this.val = val;
  };
  var Expenses = function (id, des, val) {
    this.id = id;
    this.des = des;
    this.val = val;
  };

  // ? new item
  function addItem(signtType, nameValue, amountValue) {
    if (
      nameValue !== "" &&
      amountValue !== "" &&
      typeof amountValue === "number"
    ) {
      let newItem, ID;
      if (data.allItems[signtType].length == 0) {
        ID = 0;
      } else {
        ID =
          data.allItems[signtType][data.allItems[signtType].length - 1].id + 1;
      }

      if (signtType == "inc") {
        newItem = new Income(ID, nameValue, amountValue);
      } else if (signtType == "exp") {
        newItem = new Expenses(ID, nameValue, amountValue);
      }
      data.allItems[signtType].push(newItem);
      return newItem;
    }
  }
  // ? clean unput
  function inputNull() {
    var field, fieldArr;

    field = document.querySelectorAll(".amountInput, .nameInput");
    fieldArr = Array.prototype.slice.call(field);
    fieldArr.forEach((element) => {
      element.value = "";
    });

    // document.querySelector(".amountInput").value = "";
    // document.querySelector(".nameInput").value = "";
  }

  //? Upodate budget HTML
  function updateHTML() {
    budget = data.total.inc - data.total.exp;
    if (budget >= 0) {
      document.querySelector(
        ".budgetSumm"
      ).textContent = `+${budget.toLocaleString()}`;
    }
    if (budget < 0) {
      document.querySelector(".budgetSumm").textContent =
        budget.toLocaleString();
    }
    document.querySelector(".incomeAmount").textContent =
      data.total.inc.toLocaleString();
    document.querySelector(".expensesAmount").textContent =
      data.total.exp.toLocaleString();
    if (data.total.inc > 0 && data.total.exp > 0) {
      var persentage = Math.floor(
        (data.total.exp * 100) / data.total.inc
      );
    }
      else {
        document.querySelector("#percentege").textContent = "%";
      }
      if (persentage > 998) {
        document.querySelector("#percentege").textContent = `>999%`;
      } else if (persentage < 998) {
        document.querySelector("#percentege").textContent = `-${persentage}%`;
      }
    }

  function addDOM(obj) {
    var newHtml;
    if (getSign.signValue() === "inc") {
      newHtml = `<div class="incomeItem allNewItem" ID = "inc${obj.id}div">
            <div class="incomeItemDescription allDescription">${obj.des}</div>
            <div class="incomeItemSumm allItemSumm">+ ${obj.val}</div>
            <button class="deleteIncomeItem allItemDelete" ID = "inc-${obj.id}")"><img src="https://icons.veryicon.com/png/o/commerce-shopping/small-icons-with-highlights/delete-184.png" alt="deletePic" class="deleteButtonImg"></button></div>`;
      return document
        .getElementById("incomeList")
        .insertAdjacentHTML("beforeend", newHtml);
    } else {
      newHtml = `<div class="expenseItem allNewItem" ID = "exp${obj.id}div">
            <div class="expenseItemDescription allDescription">${obj.des}</div>
            <div class="expenseItemSumm allItemSumm">- ${obj.val}</div>
            <button class="deleteExpenseItem allItemDelete" ID = "exp-${obj.id}"><img src="https://icons.veryicon.com/png/o/commerce-shopping/small-icons-with-highlights/delete-184.png" alt="deletePic" class="deleteButtonImg"></button></div>`;
      return document
        .getElementById("expensesList")
        .insertAdjacentHTML("beforeend", newHtml);
    }
  }

  // ? main budget function
  function budgetFun() {
    var amountValue = document.querySelector(".amountInput").value;
    var nameValue = document.querySelector(".nameInput").value;
    amountValue = parseInt(amountValue.match(/\d+/));
    var signtType = getSign.signValue();

    //? Add value to exp and inc
    if (
      typeof amountValue === "number" &&
      !isNaN(amountValue) &&
      nameValue !== ""
    ) {
      if (signtType == "inc") {
        data.total.inc += amountValue;
        inputNull();
      }
      if (signtType == "exp") {
        data.total.exp += amountValue;
        inputNull();
      }
    }

    if (!isNaN(amountValue) && nameValue !== "") {
      let newItem = addItem(signtType, nameValue, amountValue);
      addDOM(newItem);
    }

    //? Update HTML
    updateHTML();
  }

  // ? delete income/expense
  function deleteItem(event) {
    if (event.target.nodeName === "IMG") {
    let split, type, id, index;
    split = event.target.parentNode.id.split("-");
    type = split[0];
    id = parseInt(split[1]);
    index = data.allItems[type].findIndex((obj) => obj.id === id);
    data.total[type] -= data.allItems[type][index].val;
    data.allItems[type].splice(index, 1);
    document
      .getElementById(`${event.target.parentNode.parentNode.id}`)
      .remove();
    updateHTML();
    }
    }

  return {
    budget: function () {
      return budgetFun();
    },
    cleanInput: function () {
      return inputNull();
    },
    updateHTML: function () {
      return updateHTML();
    },
    deleteItem: function () {
      return deleteItem(event);
    },
  };
})();

document
  .querySelector(".outputMenu")
  .addEventListener("click", budgetControll.deleteItem);

document
  .querySelector(".imgBtn")
  .addEventListener("click", budgetControll.budget);
document.addEventListener("keypress", function (e) {
  if (e.keyCode == 13 || e.which == 13) {
    budgetControll.budget();
  }
});
