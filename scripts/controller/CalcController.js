class CalcController {
    constructor() {

            this._lc = 'pt-br';
            this._operation = [];
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

    // END ###################################################################

    // Métodos dos botões AC e CE, limpar ultimo caracter e Limpar Tudo.
    
    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        this.operation;
    }

    // END ###################################################################

    // Método mostra mensagem de error no display.

    setError(){
        this.displayCalc = 'ERROR'
    }

    // END ###################################################################

    // Método retorna ultima valor da ultima posição do array "_operation".

    getLastOperation(){
        return this._operation[this._operation.length-1]
    }
    // END ###################################################################

    isOperator(value){
        if (['+','-','*','/','%',].indexOf(value) > -1){
            return true
        } else {
            return false
        }
        
    }


    // Método para adicionar elementos no array "_operation".

    // END ###################################################################

    // Método para adicionar elementos no array "_operation".

    addOperation(value){

        this.operation = value
        console.log(this._operation)

    }

    // END ###################################################################

    // Método para executar ações com os eventos dos botões.

    executBtn(action){
        switch (action){
            case 'ac':
                this.clearAll();
                break;

            case 'ec':
                this.clearEntry();
                break;

            case 'porcento':
                this.addOperation('%')
                break;

            case 'divisao':
                this.addOperation('/')
                break;

            case 'multiplicacao':
                this.addOperation('*')
                break;

            case 'subtracao':
                this.addOperation('-')
                break;

            case 'soma':
                this.addOperation('+')
                break;

            case 'igual':
                this.addOperation('=')
                break;

            case 'ponto':
                this.addOperation('.')
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(action))
                break;

            default:
                this.setError();
        }
    }

    // END ###################################################################


    // Método para gerenciar os eventos dos botões.

    eventsInitButtons() {
        let buttons = document.querySelectorAll('.buttons > button')
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'mousedown', e => {
                let current_btn = btn.className.replace('btn-', '')
                this.executBtn(current_btn)
            })
        })
    }

    addEventListenerAll(element, events, func) {
        
        events.split(" ").forEach(event=>{
            element.addEventListener(event, func, false)
        })
    }

    // END ###################################################################

    // Métodos que inserir os valores de Data e hora no display
    setDisplayDateTime() {
            this._date_el.innerHTML = this.dateNow
            this._time_el.innerHTML = this.timeNow
        }
    
    // END ###################################################################

    // Métodos de inserir e pegar valores do display da calculadora

    get displayCalc() {
        return this._displayCalc_el.innerHTML;
    }

    set displayCalc(value) {
            this._displayCalc_el.innerHTML = value;
        }
    
    // END ###################################################################

    // Métodos de inserir e pegar valores do campo Data da calculadora

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
        
    // END ###################################################################

    // Métodos de inserir e pegar valores do campo Hora da calculadora

    get timeNow() {
        return new Date().toLocaleTimeString(this._lc);
    }

    set timeNow(value) {
            this._time_el.innerHTML = value;
        }
    
    // END ###################################################################

    // Métodos de inserir e pegar valores na variavel auxiliar "_operation" 

    get operation() {
        this._operation.pop();
    }

    set operation(value) {
        
        if (isNaN(this.getLastOperation())){
            if(this.isOperator(value)){
                console.log(' o valor é um upera')
                this.setLastOperation(value);
            } else if(isNaN(value)){

            } else {
                this._operation.push(value)
            }
        } else if(this.isOperator(value)){ 
            if (['.','=',].indexOf(value) > -1){
                if(value === '.'){
                    this.setConct(value)
                }
                return true
            } else {
                this._operation.push(value)
            }
        }else{
            this.setConct(value)
        }
    }

    setConct(value){
        let concat = this.getLastOperation().toString() + value.toString();
        this.setLastOperation(concat)
    }

    setLastOperation(value){
        this._operation[this._operation.length-1] = value
    }
    // END ###################################################################
    









}   


