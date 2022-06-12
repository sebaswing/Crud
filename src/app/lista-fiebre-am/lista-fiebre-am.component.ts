import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TurnoFiebreA } from '../Modelo/TurnoFiebreA';
import { VacunatorioService } from '../services/vacunatorio.service';

@Component({
  selector: 'app-lista-fiebre-am',
  templateUrl: './lista-fiebre-am.component.html',
  styleUrls: ['./lista-fiebre-am.component.css']
})
export class ListaFiebreAmComponent implements OnInit {

  listaPacTFA: TurnoFiebreA[] = [];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['nombre', 'apellido','aprobada', 'Acciones'];


  constructor(private _usuarioService: VacunatorioService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarTFA();
  }

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarTFA(){
    this.listaPacTFA = this._usuarioService.getListTFA()
    this.dataSource = new MatTableDataSource(this.listaPacTFA)
  }

  asignarFecha(turno : any,i : any){
    console.log(turno)
    const dialogRef = this.dialog.open(AsigFechaTurno, {data: turno});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listaPacTFA[i] = result
        this._usuarioService.updateListTFA( this.listaPacTFA )
        this.cargarTFA();

      }
    })

  }

  cancelarTurno( turno: any ){
    console.log(turno)
    
    const dialogRef = this.dialog.open(DialogConfirm);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if( result){
      
      this._usuarioService.updateListTFA(this.listaPacTFA.filter( (item) => turno.id !== item.id  ) )
      this.cargarTFA();

      this._snackBar.open('El turno ha sido cancelado con éxito', '', {
        duration: 2500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      }
    });


  }

  mostrarFecha(){
    return "se muestraa"
  }

}







@Component({
  selector: 'dialog-Confirm',
  templateUrl: 'ConfCancelarTurno.html',
})
export class DialogConfirm {
  constructor(private dialogRef: MatDialogRef<DialogConfirm>,) {  }

  confirmar(){
    this.dialogRef.close(true);
  }

  cancelar(){
    this.dialogRef.close(false);
  }
}

////////////////////////////////////////////////

@Component({
  selector: 'asig-fecha-turno',
  templateUrl: 'AsignarFechaTurno.html',
})
export class AsigFechaTurno {
  minDate: Date;
  maxDate: Date;
  guardado: boolean= false;
  editarFecha : boolean = false;
  guardarFecha: boolean = false;
  dateForm = new FormControl("");

  constructor(private dialogRef: MatDialogRef<AsigFechaTurno>,@Inject(MAT_DIALOG_DATA) public data: TurnoFiebreA,private _snackBar: MatSnackBar,private _usuarioService: VacunatorioService) {
      console.log(data)

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const currentDay = new Date().getDate()

      // this.dateForm.setValue(data.fechaAsig)
      
      this.minDate = new Date(currentYear, currentMonth, currentDay + 10);
      this.maxDate = new Date(currentYear, currentMonth, currentDay + 40);

   }

  guardar(){
    this.guardarFecha = true
  }

  actualizarFecha(){
    this.guardarFecha = false
    this.editarFecha = true
    this.data.aprobada = true
    this.data.fechaAsig= new Date(this.dateForm.value)

    this._snackBar.open('Se a guardado la fecha del turno', '', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

  this.dialogRef.close(this.data);


  }
  
}