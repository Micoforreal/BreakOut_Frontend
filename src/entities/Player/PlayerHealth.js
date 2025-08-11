import Component from "../../Component";

export default class PlayerHealth extends Component{
    constructor(){
        super();

        this.health = 100;
    }

    
    TakeHit = e =>{
        this.health = Math.max(0, this.health - 10);
        this.uimanager.SetHitUi(this.health);
        this.uimanager.setHitBlood()

        console.log("hit")
    }
    Initialize(){
        this.uimanager = this.FindEntity("UIManager").GetComponent("UIManager");
        this.parent.RegisterEventHandler(this.TakeHit, "hit");
        this.uimanager.SetHitUi(this.health);
    
        
    }
}