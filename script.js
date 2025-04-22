const BASE_URL = "https://open.er-api.com/v6/latest/";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }


    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal <= 0) {
        alert("Please enter a valid amount");
        
        amtVal = 1;
        amount.value = 1;
        return;
    }


 const apiUrl = `https://open.er-api.com/v6/latest/${fromCurr.value}`;
   let responce = await fetch(apiUrl);
   let data = await responce.json();
   let rates = data.rates[`${toCurr.value}`];
   let finalAmount = `${amtVal}` * rates;
    //    msg.classList.remove("fade");
    // void msg.offsetWidth;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    // msg.classList.add("fade");


};

    const updateflag = (element) => {
        let currCode = element.value;
        let countryCode = countryList[currCode];
        let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newsrc;
    };



 btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
}); 

window.addEventListener("load", () => {
    updateExchangeRate();
});