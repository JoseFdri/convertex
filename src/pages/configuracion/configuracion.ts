import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  public txtInstruccion = "Agrega un nuevo banco";
  public txtBtn = "Guardar";
  public lista_bancos ;
  public nombre_banco = null ;
  public valor_banco = null;
  public valor_sol = null;
  public editar_banco = false;
  public indice_editar ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.lista_bancos = this.navParams.get("info");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');
  }

  public cerrar_modal(){
    this.viewCtrl.dismiss(this.lista_bancos);
  }

  guardar(nombre,valor){
    if( this.nombre_banco != null && this.nombre_banco.length > 0 && this.valor_banco > 0 ){
      let modelo = { nombre: this.nombre_banco, punto_valor: this.valor_banco, valor_sol : this.valor_sol };
      if(this.editar_banco == false){
        this.lista_bancos.push(modelo);
      }else{
        this.lista_bancos[this.indice_editar] = modelo;
      }
      this.nombre_banco = null;
      this.valor_banco = null;
      this.valor_sol = null;
    }
  }

  editar(item,indice){
    this.nombre_banco = item.nombre;
    this.valor_banco = item.punto_valor;
    this.valor_sol = item.valor_sol;
    this.txtInstruccion = "Editar banco";
    this.editar_banco = true;
    this.indice_editar = indice;
    console.log("test",item,this.nombre_banco);
  }

  cancelar(){
    this.editar_banco = false;
    this.nombre_banco = null;
    this.valor_banco = null;
    this.valor_sol = null;
  }

  borrar_banco(indice){
    this.lista_bancos.splice(indice,1)
  }
}
