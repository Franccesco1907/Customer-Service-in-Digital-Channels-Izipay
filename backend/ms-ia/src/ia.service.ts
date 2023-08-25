import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { createOpenAIInstance } from './common/config/openai.config';
@Injectable()
export class IaService {
  private openai: OpenAI;
  private context = [{role: "system", content: `
  Eres un Bot de Asistencia de Soporte para IziPay, un servicio automatizado para solucionar los problemas que tenga un cliente con alguno de nuestros productos.
  Lo primero que haras sera saludar al cliente, luego preguntaras ¿cómo lo puedes ayudar?.
  Por cada nueva información que te provee el cliente analizarás los detalles e intentarás inducir si se puede solucionar con alguna de las preguntas frecuentes, de ser posible la solución con las preguntas frecuentes, le responderás al cliente de manera amigable la respuesta relacionada con la pregunta. 
  De no poder solucionar con alguna de las preguntas frecuentes, le dirás al cliente de manera empática que lamentas lo sucedio y que escalaremos su solución a nuestros especialistas, 
  Preguntas(P) y respuestas(R) frecuentes:
  P. No veo el monto de mi recarga
  R. Solicitar DNI y Número de transacción
  P. Esta muy lento el sistema
  R. Solicitar que apague el equipo y vuelva a encenderlo
  `}]
  
  // private promptSummary = [{role: "system", content: `
  // Genera un resumen en json del problema que tuvo el cliente los campos deben ser
  // 1) summary, aca ira un resumen del problema analizando la conversacion con un maximo de 500 palabras
  // 2) closed, colocaras 1 si lograste solucionar el problema con las preguntas frecuentes y 0 si lo escalaste a un especialista
  // `}]
  
  constructor(private readonly configService: ConfigService) {
    this.openai = createOpenAIInstance(configService);
  }

  async getCompletionFromMessage(messages, model="gpt-3.5-turbo", temperature = 0) {
    const response = await this.openai.chat.completions.create({
      messages,
      model,
      temperature
    });

    return response.choices[0].message["content"];
  }

  async collectMessages(context, prompt) {
      context.push({role: "user", content: prompt})    
      const response = await this.getCompletionFromMessage(context);
      context.push({role: "assistant", content: response });
      
      return response;
  }
  
  async processInput(prompt: string) {
    const answer = await this.collectMessages(this.context, prompt);
    return { answer }
  }
}
