//---------------------добавление стран в селект--------------------------------------------
const Countries = () => fetch("https://covid-193.p.rapidapi.com/countries", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "91a822e3a9msh54b9ecff6aabb61p148a79jsnb30e66a66fc5"
	}
})
.then(response => {
	return response.json();
  
})
.then(res => {
  // console.log(res.response[1]);
  const sel = document.querySelector("select");
  let str = "";
  res.response.forEach(element => {
     // console.log(element);
     str+= `<option class='choice' value = '${element}' >${element}</option>`;
  });
  sel.innerHTML+=str;
})
.catch(err => {
	console.log(err);
});


Countries();
//----------------------------------------------------------------------------------------------


const Button = document.querySelector("button");

//добавляем слушателя на кнопку
Button.addEventListener("click", ()=>{
    Get_Cases();
});

//Взять информацию с сервара
const Get_Cases = () => {
    let country = document.querySelector("select");
    console.log(country.value);
    fetch(`https://covid-193.p.rapidapi.com/statistics?country=${country.value}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "91a822e3a9msh54b9ecff6aabb61p148a79jsnb30e66a66fc5"
	}
})
.then(response => {
	return response.json();
}).then(res =>{
   // отображаем информацию
    PrintCases(res);
})
.catch(err => {
	console.log(err);
});
};


//заболняем 2 блока (вывод полученных данных)
const PrintCases =(data) =>{
    
    const res_of_cases = document.getElementById("results");
    console.log("res - " , res_of_cases);
    console.log(data);
    res_of_cases.innerHTML = "";
    let str = `
    <div class = "today">
        <p>CASES</p>
        <p class = "numb">${data.response[0].cases.new}</p>
        <p>Active</p>
        <p class = "numb">${data.response[0].cases.active}</p>
        <p>Deaths:</p>
        <p class = "numb">${data.response[0].deaths.new}</p>
    </div>
    <div class = "total">
        <p>CASES</p>
        <p class = "numb">${data.response[0].cases.total}</p>
        <p>Recovered</p>
        <p class = "numb">${data.response[0].cases.recovered}</p>
        <p>Deaths:</p>
        <p class = "numb">${data.response[0].deaths.total}</p>
    </div>
    `;
 
    res_of_cases.innerHTML+= str;
};