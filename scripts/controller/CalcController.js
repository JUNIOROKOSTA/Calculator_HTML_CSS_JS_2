class CalcController {
    constructor() {

            this._lc = 'pt-br';

            this._displayCalc_el = document.querySelector('.display')
            this._date_el = document.querySelector('.data')
            this._time_el = document.querySelector('.hora')


            this.setDisplayDateTime();
            this.initialize();
            this.eventsInitButtons()
        }
        // Método para iniciar as operações de funcionamento da calculadora.

    initialize() {

        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000)

    }

    // END #######################################################################

    // Método para gerenciar os eventos dos botões.

    eventsInitButtons() {
        let buttons = document.querySelectorAll('.buttons > button')
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click mousedown', e => {
                let current_btn = btn.className.replace('btn-', '')
                console.log(current_btn)
            })
        })
    }

    addEventListenerAll(element, events, func) {
        
        events.split(" ").forEach(event=>{
            element.addEventListener(event, func, false)
        })
    }

    // END #######################################################################

    // Métodos que inserir os valores de Data e hora no display
    setDisplayDateTime() {
            this._date_el.innerHTML = this.dateNow
            this._time_el.innerHTML = this.timeNow
        }
    
    // END #######################################################################

    // Métodos de inserir e pegar valores do display da calculadora

    get displayCalc() {
        return this._displayCalc_el.innerHTML;
    }

    set displayCalc(value) {
            this._displayCalc_el.innerHTML = value;
        }
    
    // END #######################################################################

    // Métodos de inserir e pegar valores do do campo Data da calculadora

    get dateNow() {
        return new Date().toLocaleDateString(this._lc, {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }

    set dateNow(value) {
            this._dateNow = value;
        }
        
    // END #######################################################################

    // Métodos de inserir e pegar valores do do campo Hora da calculadora

    get timeNow() {
        return new Date().toLocaleTimeString(this._lc);
    }

    set timeNow(value) {
            this._time_el.innerHTML = value;
        }
    
    // END #######################################################################

}