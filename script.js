//usando apenas arrow function para orgulhar Victor Lopes

const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input")



let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];


//função para adicionar dias

const initCalendar = () => {
    //Pega os dias e meses do ano atual, e seta os próximos dias e meses
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay()
    const nextDays = 7 - lastDay.getDay() - 1;

    //atualiza data no topo do calendário
    date.innerHTML = months[month] + " " + year;

    //adicionando os dias no DOM
    let days = "";

    //dias do mês passado
    for(let x = day; x > 0; x--){
        days += `<div class = "day prev-date">${prevDays -x + 1}</div>`
    }

    //dias do mês atual
    for(let i = 1; i <= lastDate; i++){
        //se for o dia atual vai adicionar a class today
        if(
         i === today.getDate() &&
         year === today.getFullYear() &&
         month === today.getMonth()
         ){
            days += `<div class = "day today">${i}</div>`;
        }
        //adicionar restante dos dias
        else{
            days += `<div class = "day ">${i}</div>`;
        }
    }

    //próximos dias do mês
    for(let j = 1; j <= nextDays; j++){
        days += `<div class = "day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
}

initCalendar();

//mêses anteriores

const prevMonth = () =>{
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    initCalendar();
}

//mêses posteriores

const nextMonth = () =>{
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

//eventListener para mês anterior e posterior

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

//ir para o dia atual e data inserida

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    //apenas números
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if(dateInput.value.length === 2){
        //adiciona a / para cada dois números adicionados
        dateInput.value += "/";
    }
    if(dateInput.value.length > 7){
        //não permite mais que 7 caracteres
        dateInput.value = dateInput.value.slice(0, 7);
    }


    //
    if(e.inputType === "deleteContentBackward"){
        if(dateInput.value.length === 3){
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

const gotoDate = () => {
    const dateArr = dateInput.value.split("/");
    //validação da data
    if(dateArr.length === 2){
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4){
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    //if data inválida
    alert("data inválida");

}

gotoBtn.addEventListener("click", gotoDate);

