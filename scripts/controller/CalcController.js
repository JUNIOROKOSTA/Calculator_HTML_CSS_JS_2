class CalcController {
    constructor() {

            this._lc = 'pt-br';
            this._operation = [];
            this._displayCalc_el = document.querySelector('.display');
            this._date_el = document.querySelector('.data');
            this._time_el = document.querySelector('.hora');


            this.setDisplayDateTime();
            this.initialize();
            this.eventsInitButtons();
            this.eventsKeyBoard();
        }
        
    
        // Método para iniciar as operações de funcionamento da calculadora.

    initialize() {

        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000)
        this.setValueToDisplay();
    }

    // END ###################################################################

    // Métodos capitura e trata eventos de teclado.

    eventsKeyBoard(){

        document.addEventListener('keyup', e=>{

            switch (e.key){
                case 'Escape':
                    this.clearAll();
                    break;
    
                case 'Backspace':
                    this.clearEntry();
                    break;
    
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                case '.':
                    this.addOperation(e.key)
                    break;
    
                case '=':
                case 'Enter':
                    this.calcOperation()
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
                    this.addOperation(parseInt(e.key))
                    break;

            }
        })

    }

    // END ###################################################################

    // Métodos dos botões AC e CE, limpar ultimo caracter e Limpar Tudo.
    
    clearAll(){
        this._operation = [];
        this.setValueToDisplay();
    }

    clearEntry(){
        this._operation.pop();
        this.setValueToDisplay();
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

    // END ###################################################################

    // Método para adicionar elementos no array "_operation".

    addOperation(value){
        
        this.operation = value;

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
                this.calcOperation()
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

    // Método adicionar os valores no display da calculadora.

    setValueToDisplay(){
        
        let lastNumber;
        for(let i = this._operation.length-1; i >= 0; i--){
            if(!this.isOperator(this._operation[i])){
                lastNumber = this._operation[i]
                break;
            }
        }
        if(!lastNumber){
            lastNumber = 0;
        }
        this.displayCalc = lastNumber;

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
        if(value.toString().length > 13){
            this.setError();
            return false;
        }
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
                this.setLastOperation(value);

            } else if(!isNaN(value)){

                this.pushCalcOperation(value)
                this.setValueToDisplay();                

            } else {
                console.log('vazio')

            }
        } else if(this.isOperator(value)){ 
            this.pushCalcOperation(value)
            this.setValueToDisplay();

        }else{
            if(value === '.'){       
                this.ifDot();
                return;
            }else{
                this.setConct(value)
            }
            
        }


    }

    ifDot(){
       let lastOperation = this.getLastOperation()

       if(typeof(lastOperation) === 'string' && 
       lastOperation.split('').indexOf('.') > -1){       
        return;} 
       
       
       if(this.isOperator(lastOperation) || !lastOperation){
        this.pushCalcOperation('0.')
       } else{
        this.setLastOperation(lastOperation.toString()+ '.')
       }

       this.setValueToDisplay();
    }

    setConct(value){
        let concat = this.getLastOperation().toString() + value.toString();
        this.setLastOperation(concat)

        this.setValueToDisplay();
    }

    pushCalcOperation(value){
        this._operation.push(value)
        if(this._operation.length > 3 ){
            this.calcOperation();
        }
    }

    setLastOperation(value){
        this._operation[this._operation.length-1] = value

        this.setValueToDisplay();
    }

    calcOperation(){
        try{
            let lastItem = '';
            if (this._operation.length > 3){
                let lastItem = this._operation.pop();
            }
            let result = eval((this._operation).join(''))
    
            if (lastItem == '%'){
                result = result / 100;
                this._operation = [result.toString()]
    
            } else {
                this._operation = [result.toString()]
                if ( lastItem){
                    this._operation.push(lastItem.toString())
                }
            }
        } catch{
            this.setError()
        }
        
        this.setValueToDisplay();
    }

    // END ###################################################################
    









}   


