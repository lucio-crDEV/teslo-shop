import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage',
})

export class ProductImagePipe implements PipeTransform {

  transform(value: string | string[]): string {
    // si solo devuelve 1 imagen es string y se retorna directamente
    if (typeof value === 'string') { return `${baseUrl}/files/product/${value}`; }

    // si devuelve un array de imagenes, se toma la primera imagen y se guarda en la variable
    const image = value.at(0);

    // si no es texto (1 imagen) o no hay array de imagenes, se retorna una imagen por defecto
    if (!image) { return './assets/images/no-image.jpg'; }

    // si el producto traia varias imagenes en un array, se devuelve la primera imagen del array, previamente almacenada en la variable image
    return `${baseUrl}/files/product/${image}`;
  }

}
