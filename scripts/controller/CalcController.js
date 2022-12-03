class CalcController{
    constructor(){
        this._displayCalc = '0';
        this._dateNow;



        this.initialize();
    }

    initialize(){
        let displayCalc_el = document.querySelector('.display')
        let date_el = document.querySelector('.data')
        let time_el = document.querySelector('.hora')

        date_el.innerHTML = '02/12/2022'
        time_el.innerHTML = '00:21'

    }

    get displayCalc(){
        return this._displayCalc;
    }

    set displayCalc(value){
        this._displayCalc = value;
    }

    get dateNow(){
        return this._dateNow;
    }

    set dateNow(value){
        this._dateNow = value;
    }
}