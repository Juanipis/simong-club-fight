import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {} // Inyecta ConfigService

  getHello(): string {
    const helloValue = this.configService.get<string>('HELLO'); // Usa ConfigService para obtener la variable HELLO
    return helloValue || 'Hello World!'; // Retorna el valor de HELLO o 'Hello World!' si HELLO no está definido
  }
}
