import Component from "../../Component";

export default class PlayerHealth extends Component{
    constructor(){
        super();

        this.health = 100;
    }

    Death(){

    }


    TakeHit = e =>{
        this.health = Math.max(0, this.health - 10);
        this.uimanager.SetHitUi(this.health);
        
        this.uimanager.setHitBlood()

        if (this.health === 0) {

          this.uimanager.SetDeathUi()
            
        }

     
    }

 
    
    Initialize(){
        this.uimanager = this.FindEntity("UIManager").GetComponent("UIManager");
        this.parent.RegisterEventHandler(this.TakeHit, "hit");

    
        
    }
}