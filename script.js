// ?start of the project

var getSign = (function () {
  let signValue = document.getElementById("selectSign").value;
  var cRed = "rgba(245, 72, 72, 0.85)";
  var cGreen = "rgba(39, 195, 128, 0.85)";
  function getSelValue() {
    signValue = document.getElementById("selectSign").value;
    if (signValue == "-") {
      document.querySelector(".amountInput").style.outlineColor = cRed;
      document.querySelector(".nameInput").style.outlineColor = cRed;
      document.querySelector("#selectSign").style.outlineColor = cRed;
    }
    if (signValue == "+") {
      document.querySelector(".amountInput").style.outlineColor = cGreen;
      document.querySelector(".nameInput").style.outlineColor = cGreen;
      document.querySelector("#selectSign").style.outlineColor = cGreen;
    }
  }
  return {
    get: function () {
      return getSelValue();
    },
    getSignValue: function () {
      return signValue;
    },
  };
})();

var budgetControll = (function () {
  // var data = {
  //   allItems: {
  //     allIncome: [],
  //     allExpenses: [],
  //   },
  //   total: {
  //     budget : 0,
  //     income: 0,
  //     expenses: 0,
  //   },
  // };
  var budget = 0;
  var income = 0;
  var expenses = 0;
  const date = new Date().toLocaleDateString("fr-FR");
  var time = (document.querySelector(
    ".date"
  ).textContent = `Avalable budget on ${date}`);

  function inputNull() {
    document.querySelector(".amountInput").value = "";
    document.querySelector(".nameInput").value = "";
  }
  // ? budget function
  function budgetFun() {
    //! Value
    var amountValue = document.querySelector(".amountInput").value;
    var nameValue = document.querySelector(".nameInput").value;
    amountValue = parseInt(amountValue.match(/\d+/));
    // ! add income/expense, budget
    if (nameValue != "" && nameValue != "") {
      if (getSign.getSignValue() === "-") {
        budget -= amountValue;
        expenses += amountValue;
        inputNull();
      } else if (getSign.getSignValue() === "+" && nameValue != "") {
        budget += amountValue;
        income += amountValue;
        inputNull();
      }
    }
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
      income.toLocaleString();
    document.querySelector(".expensesAmount").textContent =
      expenses.toLocaleString();
    // ! persentage
    if (income > 0 && expenses > 0) {
      var persentage = Math.floor((expenses * 100) / income);
      if (persentage > 998) {
        document.querySelector("#percentege").textContent = `>999%`;
      } 
      else if (persentage < 998) {
        document.querySelector("#percentege").textContent = `-${persentage}%`;
      }
    }
  }
  return {
    budget: function () {
      return budgetFun();
    },
    cleanInput: function () {
      return inputNull();
    },
    //! funcrion for later 
    addItem: function(type, des, val) {
      let newItem, ID;
      //! test new ID
      ID = data.allItems[type][data.allItems[type].length-1].id+1
    }
  };
})();

// var nameValue = document.querySelector(".nameInput").value;
// var amountValue = document.querySelector(".amountInput").value;

document
  .querySelector(".imgBtn")
  .addEventListener("click", budgetControll.budget);
document.addEventListener("keypress", function (e) {
  if (e.keyCode == 13 || e.which == 13) {
    budgetControll.budget();
  }
});
