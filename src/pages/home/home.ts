import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public list_bancos = [];
  public banco_selected;
  public tipo_operacion ;
  public resultado = 0;
  public numero_user ;
  public prefijo = "";

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              private storage : Storage
            ) {
              this.storage.get("datos")
              .then( (lista)=>{
                if(lista != null){
                  this.list_bancos = lista;
                  console.log("lista")
                }
              } )
  }

  

  guardar_localStorage(){
    this.storage.set("datos",this.list_bancos)
  }

  mostrar_modal() {
    let profileModal = this.modalCtrl.create( "ConfiguracionPage",{ info: this.list_bancos });
    profileModal.onDidDismiss(data => {
      this.list_bancos = data;
      this.guardar_localStorage();
      console.log("recib: ",data);
    });
    profileModal.present();
  }

  operar(){
    if( this.numero_user >= 0 ){
      let puntos_banco = this.list_bancos[this.banco_selected].punto_valor;
      if(this.tipo_operacion == "puntos_soles"){
        this.resultado = +this.numero_user / puntos_banco;
        this.prefijo = "S/ ";
      }else if(this.tipo_operacion == "soles_puntos"){
        this.resultado = this.numero_user * puntos_banco;
        this.prefijo = "Puntos: ";
      }
      console.log("test",this.banco_selected,this.tipo_operacion);
    }
  }
}
