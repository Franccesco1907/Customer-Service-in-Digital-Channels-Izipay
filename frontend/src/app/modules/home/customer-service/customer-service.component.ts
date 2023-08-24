import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.component.html',
  styleUrls: ['./customer-service.component.scss']
})
export class CustomerServiceComponent {
  features= [
    {
      title: 'Atención Personalizada y Eficiente',
      description: 'La aplicación permitiría a los usuarios registrar sus consultas automáticamente mediante su número de identificación o DNI.',
      img:'../../../../assets/atention.jpg'
    },
    {
      title: 'Asistencia Continua y Contextual',
      description: ' Mantenemos a los usuarios informados sobre el estado de sus consultas en tiempo real. Si la respuesta del chatbot no es suficiente, nuestra inteligencia artificial se conecta al caso en curso para brindar respuestas más detalladas y contextuales.',
      img:'../../../../assets/support.jpg'
    },
    {
      title: 'Inteligencia Artificial Mejorada',
      description: 'Nuestra aplicación utiliza una IA avanzada que se nutre de las consultas y respuestas de los usuarios para categorizar automáticamente los problemas comunes. ',
      img:'../../../../assets/AI.jpg'
    },
    {
      title: 'Gestión Multicanal y Registro Integral',
      description: ' Además de las consultas por chat, nuestra aplicación agrega un registro de consultas por audio para ofrecer una visión completa de la interacción del cliente. Los usuarios pueden cambiar sin problemas entre diferentes canales, como chat o audio, sin perder el contexto. ',
      img:'../../../../assets/canal.jpg'
    },
    {
      title: 'Participación Activa en Redes Sociales',
      description: ' Facilitamos la participación en redes sociales al permitir respuestas automáticas a comentarios en plataformas como LinkedIn, Facebook, Twitter, YouTube e Instagram. ',
      img:'../../../../assets/social-media.jpg'
    },
  ]
}
