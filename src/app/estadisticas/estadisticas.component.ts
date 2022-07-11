import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import * as _moment from 'moment';
import { Zona } from '../Modelo/Zona';
import { VacunatorioService } from '../services/vacunatorio.service';

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
  zonas : Zona[]
  /////////////////////



  constructor( private vacunatorioService: VacunatorioService) {
    
   
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
    this.vacunatorioService.getZonas().subscribe( resp => {
      this.zonas = resp
      this.zonasGrafico()
    })

    
  }

  zonasGrafico(){
    
    single[0].name = this.zonas[0].nombre
    single[1].name = this.zonas[1].nombre
    single[2].name = this.zonas[2].nombre

    single1[0].name = this.zonas[0].nombre
    single1[1].name = this.zonas[1].nombre
    single1[2].name = this.zonas[2].nombre

    single2[0].name = this.zonas[0].nombre
    single2[1].name = this.zonas[1].nombre
    single2[2].name = this.zonas[2].nombre

    single3[0].name = this.zonas[0].nombre
    single3[1].name = this.zonas[1].nombre
    single3[2].name = this.zonas[2].nombre

    single4[0].name = this.zonas[0].nombre
    single4[1].name = this.zonas[1].nombre
    single4[2].name = this.zonas[2].nombre

    single5[0].name = this.zonas[0].nombre
    single5[1].name = this.zonas[1].nombre
    single5[2].name = this.zonas[2].nombre
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

      // if (posGraf=0) {
        
      //   Object.assign(this, { single1 });
      // }
      // if (posGraf=1) {
        
      //   Object.assign(this, { single2 });
      // }
      // if (posGraf=2) {
        
      //   Object.assign(this, { single3 });
      // }
      // if (posGraf=3) {
        
      //   Object.assign(this, { single4 });
      // }
      // if (posGraf=4) {
        
      //   Object.assign(this, { single5 });
      // }

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











export var single= [
  {
    "name": "Zona 1",
    "value": 6
  },
  {
    "name": "Zona 2",
    "value": 6
  },
  {
    "name": "Zona 3",
    "value": 4
  }
];


export var single1 = [
  {
    "name": "Zona 1",
    "value": 6
  },
  {
    "name": "Zona 2",
    "value": 6
  },
  {
    "name": "Zona 3",
    "value": 4
  }
];
export var single2 = [
  {
    "name": "Zona 1",
    "value": 5
  },
  {
    "name": "Zona 2",
    "value": 3
  },
  {
    "name": "Zona 3",
    "value": 4
  }
];
export var single3 = [
  {
    "name": "Zona 1",
    "value": 1
  },
  {
    "name": "Zona 2",
    "value": 2
  },
  {
    "name": "Zona 3",
    "value": 3
  }
];
export var single4 = [
  {
    "name": "Zona 1",
    "value": 3
  },
  {
    "name": "Zona 2",
    "value": 2
  },
  {
    "name": "Zona 3",
    "value": 4
  }
];
export var single5 = [
  {
    "name": "Zona 1",
    "value": 1
  },
  {
    "name": "Zona 2",
    "value": 3
  },
  {
    "name": "Zona 3",
    "value": 3
  }
];