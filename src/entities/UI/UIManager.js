import Component from '../../Component'

export default class UIManager extends Component{
    constructor(){
        super();
        this.name = 'UIManager';
    }

    SetAmmo(mag, rest){
        document.getElementById("current_ammo").innerText = mag;
        document.getElementById("max_ammo").innerText = rest;
    }

    
    setHitBlood(s){
      document.getElementById("hit_blood").classList.add('visible')
        setTimeout(() => {
       document.getElementById("hit_blood").classList.remove('visible')

            
        }, 5000);
    }
    SetHitUi(health){
             
        document.getElementById("health_progress").style.width = `${health}%`;



    }

    Initialize(){
        document.getElementById("game_hud").style.visibility = 'visible';
    }
}