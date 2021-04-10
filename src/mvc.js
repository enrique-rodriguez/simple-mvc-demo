(function(){
    "use-strict";

    class Model {

        constructor() {
            this.views = [];
        }
    
        register(view) {
            this.views.push(view);
            view.redisplay(this);
        }
    
        redisplay() {
            let _this = this;
            this.views.map(function(view){
                view.redisplay(_this);
            })
        }
    }
    
    
    class CounterModel extends Model {
        // Model handles data processing.
        constructor() {
            super();
            this.value = 0;
        }
    
        setValue(newValue) {
            this.value = newValue;
            this.redisplay();
        }
    
        increment() {
            this.setValue(this.value + 1);
        }
    
        decrement() {
            this.setValue(this.value - 1);
        }
        
    }
    
    class LabelView {
        // View handles output processing.
        constructor(id) {
            this.label = document.querySelector(id);
        }
    
        redisplay(model) {
            this.label.textContent = model.value;
        }
    }
    
    class CounterController {
        // Controller handles input processing
        constructor() {
            this.counter = new CounterModel();
            this.counter.register(new LabelView("#counter1"));
            this.counter.register(new LabelView("#counter2"));
            this.addEventListeners();
        }
    
        addEventListeners() {
            document.querySelector("#increment")
                    .addEventListener("click", this.handle_increment_button_click.bind(this));
            document.querySelector("#decrement")
                    .addEventListener("click", this.handle_decrement_button_click.bind(this));
        }
    
        handle_increment_button_click() {
            this.counter.increment();
        }
    
        handle_decrement_button_click() {
            this.counter.decrement();
        }
    }

    const controller = new CounterController();
    
})();