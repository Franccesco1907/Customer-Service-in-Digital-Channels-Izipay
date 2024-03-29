import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notify_email')
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    console.log('Notify Email', data)
    this.notificationsService.notifyEmail(data);
  }
}
