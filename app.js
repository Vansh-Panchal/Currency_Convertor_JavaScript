// const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

// const base_url = "https://cdn.jsdelivr.net/gh@fawazahmed0/currency-api@latest/currencies";
const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
//console.log(dropdowns);

let msg = document.querySelector(".msg");

let btn = document.querySelector("form .submit");
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")
let res = document.querySelector(".res");
for(let select of dropdowns){
    for(let curcode in countryList){
        let newOption = document.createElement("Option");
        newOption.innerText = curcode;
        newOption.value = curcode;
        if(select.value === "from" && curcode === "USD"){
            newOption.selected;
        }
        else if(select.value === "to" && curcode === "INR"){
            newOption.selected;
        }
        select.append(newOption);

        select.addEventListener("change", (evt) =>{
            update_img(evt.target);
        });
    }
}

const update_img = (element)=>{
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click" , async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amt = amount.value;
    if(amt === '' || amt <= 0){
        amt = 1;
        amount.value = "1";
    }
    // Get Excahnge Rate
    const url = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    //console.log(response);
    let data = await response.json();
    var from = `${fromCurr.value.toLowerCase()}`;
    var to = `${toCurr.value.toLowerCase()}`;
    console.log(data);
    console.log(typeof(from),"from"); // print usd
    console.log(typeof(from),"from");   // print inr
    // console.log(data.{fromCurr.value.toLowerCase()}[`${toCurr.value.toLowerCase()}`]);
    // console.log(data.from[to]);
    // let rate = data.from[`${toCurr.value.toLowerCase()}`];
    //console.log(data.usd[to]); // print value
    let rate = data?.[from]?.[to];
    console.log(rate);
    let actv8al = amt * rate;
    msg.innerText = `1 ${fromCurr.value.toLowerCase()} = ${rate} ${toCurr.value.toLowerCase()}`;
    res.innerText = `Result is ${actv8al}`;
    msg.style.fontWeight = "bold";
    res.style.fontWeight = "bold"; 
});
