import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovimientoInventario, TipoMovimiento } from '../models/movimiento.model';

interface MovimientoRequest {
  productoId: number;
  tipoMovimiento: TipoMovimiento;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class MovimientoService {
  private readonly api = `${environment.apiUrl}/movimientos`;

  constructor(private readonly http: HttpClient) {}

  registrar(request: MovimientoRequest): Observable<MovimientoInventario> {
    return this.http.post<MovimientoInventario>(this.api, request);
  }

  historial(productoId: number): Observable<MovimientoInventario[]> {
    return this.http.get<MovimientoInventario[]>(`${this.api}/producto/${productoId}`);
  }
}
