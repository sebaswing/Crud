import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import * as _moment from 'moment';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
  
})
export class EstadisticasComponent implements OnInit {
  
  single: any[];
  view: [number,number] = [700, 400];
  
  // opciones Grafico
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendTitle: string = "Zonas"
  legendPosition: LegendPosition = LegendPosition.Right
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Time,
    domain: ['#f00', '#0f0', '#0ff'],
  };
  
  //Panel
  step = 9999;
  minDate: Date;
  maxDate: Date;
  dateForm = new FormControl("");
  dateForm2 = new FormControl("");
  dateForm3 = new FormControl("");
  dateForm4 = new FormControl("");
  dateForm5 = new FormControl("");
  zonaFormControl= new FormControl;
  zonaFormControl1 = new FormControl;
  mostrarGraf : Boolean[] = [false,false,false,false,false]
  //////////////////////
  
  /////////////////////



  constructor() {
    
   
  }
  
  ngOnInit(): void {

    this.dateForm = new FormControl( '', [Validators.required])
    this.dateForm2 = new FormControl( '', [Validators.required])
    this.dateForm3 = new FormControl( '', [Validators.required])
    this.dateForm4 = new FormControl( '', [Validators.required])
    this.dateForm5 = new FormControl( '', [Validators.required])
    this.zonaFormControl = new FormControl( '', [Validators.required])
    this.zonaFormControl1 = new FormControl( '', [Validators.required])

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate()
  

    console.log( new Date().getMonth() )
    this.minDate = new Date(currentYear, 3, 1);
    this.maxDate = new Date(currentYear , currentMonth, 31);
    console.log(this.minDate)
    console.log(this.maxDate)
    // this.dateForm.setValue(new Date(currentYear, 5, 23))
    
  }



  setStep(index: number) {
    this.step = index;
  }

  close(){
    this.step = 9999
  }

  closeDatePicker(eventData: any, dp?:any, Dform?: FormControl) {
  
    const ctrlValue = new Date(eventData.getFullYear(),eventData.getMonth(), 1);
    Dform?.setValue(ctrlValue)
    dp.close();
  }

  buscar(posGraf: number, dform?: FormControl){
    console.log(posGraf,this.mostrarGraf[posGraf])
    if (dform?.valid) {
      this.mostrarGraf[posGraf]=true

      ///Envio al servicio por los datos y cargar grafico
      Object.assign(this, { single });

    }

  }







  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


}












export var single = [
  {
    "name": "Zona 1",
    "value": 23
  },
  {
    "name": "Zona 2",
    "value": 11
  },
  {
    "name": "Zona 3",
    "value": 12
  }
];