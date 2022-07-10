import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Vacunador } from '../Modelo/Vacunador';
import { VacunatorioService } from '../services/vacunatorio.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AgregarVacunadorComponent } from '../agregar-vacunador/agregar-vacunador.component'
import { DetalleVacunadorComponent } from '../detalle-vacunador/detalle-vacunador.component';

@Component({
  selector: 'app-listo-vacunadores',
  templateUrl: './listo-vacunadores.component.html',
  styleUrls: ['./listo-vacunadores.component.css']
})
export class ListoVacunadoresComponent implements OnInit {

  listVacunadores: Vacunador[] = []; 
  
  //Datos a mostrar
  displayedColumns: string[] = ['nombre', 'apellido', 'acciones'];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _usuarioService: VacunatorioService,private _snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarVacunadores();
    
  }

 

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
   }

  cargarVacunadores(){
    this._usuarioService.getVacunadores().subscribe( vacunadores => {
      this.listVacunadores = vacunadores
      this.dataSource = new MatTableDataSource(this.listVacunadores)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  eliminarUsuario(index: number){
    //Confirmar si desea eliminar
    let confirmacion : Boolean = false;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if( result){
        //MOMENTANEO::: eliminar usuario de este lado no tiene id, entonces se usan las posiciones del arregla para poder hacerlo
        //en todo caso, en el servicio para el backend, ya podemos insertar todo para que lo haga de ese lado
      this._usuarioService.eliminarVacunador(index);
      this.cargarVacunadores();
      this._snackBar.open('El Vacunador ha sido eliminado con éxito', '', {
        duration: 2500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      }
    });

   
  }

  detalleVacunador(data:any){
    const dialogRef = this.dialog.open(DetalleVacunadorComponent,{
      data: data
    } );
  }

  agregarVacunador(){
    const dialogRef = this.dialog.open(AgregarVacunadorComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.cargarVacunadores();
        this._snackBar.open('Se a creado con exito un vacunador', '', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    })
  }




}


// MODAL DE CONFIRMACION
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'confirmacion.html',
})
export class DialogOverviewExampleDialog {
  constructor(private dialogRef: MatDialogRef<DialogOverviewExampleDialog>,) {  }

  confirmar(){
    this.dialogRef.close(true);
  }

  cancelar(){
    this.dialogRef.close(false);
  }
}
