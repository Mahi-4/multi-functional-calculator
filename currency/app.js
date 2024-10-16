const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".drop-down select");
const btn=document.querySelector("form button");
const from=document.querySelector(".from select")
const to=document.querySelector(".to select")
const msg=document.querySelector(".msg");
const curInput=document.querySelector(".amount input");

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
 select.addEventListener("change", (e) => {
  updateFlag(e.target);
 })
}

const updateFlag = (element) => {
 let currCode = element.value;
 let countryCode = countryList[currCode];
 let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
 let img = element.parentElement.querySelector("img");
 img.src = newSrc;
}

const updateRate = async()=>{
 let amount=document.querySelector(".amount input");
 let amountValue=amount.value;
 if(amountValue==="" || amountValue<1){
  amountValue="1";
  amount.value="1";
 }

 const URL=`${BASE_URL}/${from.value.toLowerCase()}.json`;
 let response=await fetch(URL);
 let data=await response.json();
 let rate=data[from.value.toLowerCase()][to.value.toLowerCase()];
 let finalAmount=amountValue*rate;
 msg.innerText=`${amountValue} ${from.value} = ${finalAmount.toFixed(2)} ${to.value}`;
}

window.addEventListener("load", ()=>{
 updateRate();
})

btn.addEventListener("click", (evt)=>{
 evt.preventDefault();
 updateRate();
})


