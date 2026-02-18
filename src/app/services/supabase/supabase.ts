import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { MProduct } from '../../models/Product';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private supabase : SupabaseClient;

  constructor(){
    this.supabase = new SupabaseClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);
  }

  async obtenerPorductos() : Promise<MProduct[]> {
    const { data, error } = await this.supabase.from("GrupoEquipos").select('*');
    if (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
    console.log('Productos obtenidos:', data);
    return data as MProduct[];
  }

  async obtenerProductoPorId(id: number) : Promise<MProduct> {
    const { data, error } = await this.supabase.from("GrupoEquipos").select('*').eq('id', id).single();
    if (error) {
      console.error('Error al obtener producto por ID:', error);
      throw error;
    }
    return data as MProduct;

  }

}
