class CalcController{
    constructor(){


        this._displayCalc_el = document.querySelector('.display')
        this._date_el = document.querySelector('.data')
        this._time_el = document.querySelector('.hora')


        this.setDisplayDateTime();
        this.initialize();
    }

    initialize(){

        setInterval(()=>{
            this.setDisplayDateTime()
        }, 1000)

    }

    setDisplayDateTime(){
        this._date_el.innerHTML = this.dateNow
        this._time_el.innerHTML = this.timeNow
    }

    get displayCalc(){
        return this._displayCalc_el.innerHTML;
    }

    set displayCalc(value){
        this._displayCalc_el.innerHTML = value;
    }

    get dateNow(){
        return new Date().toLocaleDateString('pt-br');
    }

    set dateNow(value){
        this._dateNow = value;
    }

    get timeNow(){
        return new Date().toLocaleTimeString('pt-br');
    }

    set timeNow(value){
        this._time_el.innerHTML = value;
    }
}