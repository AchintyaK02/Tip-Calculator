// Running the main fn every second to constantly calculate tip
var intervalId = window.setInterval(function(){
    mainFunction();
  }, 1000);

//Event Listeners for Tip Percentage Buttons
var selectedButton = -1;
for(var i = 0 ; i < 5 ; i++){
    document.querySelectorAll(".tip-percentage")[i].addEventListener("click" , function(){
        document.querySelector(".inp-custom").value = "";
        
        if(selectedButton == -1){
            this.classList.add("selected");
            selectedButton = this.name;
        } else if (selectedButton == this.name) {
            this.classList.remove("selected");
            selectedButton = -1;
        } else { 
            document.querySelectorAll(".tip-percentage")[selectedButton].classList.remove("selected");
            this.classList.add("selected");
            selectedButton = this.name;
        }
    });
}
  

// Main function that finally calculates the tip and total 
function mainFunction(){
    var tipPercentage = getTipPercentage();
    var numberOfPeople = getNumberOfPeople();
    var billAmount = getBillAmount();

    if(tipPercentage >= 0 && numberOfPeople > 0 && billAmount >= 0){
        var totalTip = billAmount * (tipPercentage/100);
        var tipAmountPP = totalTip/numberOfPeople;

        var totalAmount = Number(billAmount) + Number(totalTip);
        var totalPP = totalAmount / numberOfPeople;

        document.querySelector(".tip-amount-pp").innerHTML = "$" + tipAmountPP.toFixed(2);
        document.querySelector(".total-pp").innerHTML = "$" + totalPP.toFixed(2);
    }
}

// Get bill amount from input 1
function getBillAmount(){
    var billAmount = 0;
    billAmount = document.querySelector(".bill-amount").value;
    return billAmount;
}

// Get number of people from input 2
function getNumberOfPeople(){
    if(validateNumberOfPeople()){
        return document.querySelector(".number-of-people").value;
    }
    return 0;

}

// Check that the number of people is >= 0 and if not, add classes of wrong
function validateNumberOfPeople(){
    var numOfPeople = document.querySelector(".number-of-people").value;
    if(numOfPeople <= 0){
        document.querySelector(".number-of-people").classList.add("wrong");
        document.querySelector(".cant-be-zero").classList.remove("hidden");
        return false;
    } else {
        document.querySelector(".number-of-people").classList.remove("wrong");
        document.querySelector(".cant-be-zero").classList.add("hidden");
        return true;
    }
}

// See which type of input is given and get the percentage
var percentage = 0;
function getTipPercentage(){
     
    var customPercentage = document.querySelector(".inp-custom").value;
    
    if(customPercentage === "" && selectedButton >= 0){
        percentage = document.querySelectorAll(".tip-percentage")[selectedButton].innerHTML;
        return percentage;
    } else if(customPercentage !== ""){
        return customPercentage;
    } else {
        return 0;
    }
}

// If custom input is selected, deselect button
document.querySelector(".inp-custom").addEventListener("click", function() {
    document.querySelectorAll(".tip-percentage")[selectedButton].classList.remove("selected");
    selectedButton = -1;

});




// Resetting everything to 0
document.querySelector(".reset-btn").addEventListener("click" , function() {
    document.querySelector(".bill-amount").value = "";
    document.querySelector(".number-of-people").value = "";
    document.querySelector(".inp-custom").value = "";
    document.querySelector(".tip-amount-pp").innerHTML = "$0.00";
    document.querySelector(".total-pp").innerHTML = "$0.00";

    if(selectedButton >= 0){
        document.querySelectorAll(".tip-percentage")[selectedButton].classList.remove("selected");
        selectedButton = -1;
    }
});