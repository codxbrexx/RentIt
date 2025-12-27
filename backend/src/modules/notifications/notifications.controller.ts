import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../../common/guards';
import { CurrentUser } from '../../common/decorators';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }


  @Get()
  async getAll(@CurrentUser('sub') userId: string) {
    return this.notificationsService.getAll(userId);
  }


  @Get('unread-count')
  async getUnreadCount(@CurrentUser('sub') userId: string) {
    const count = await this.notificationsService.getUnreadCount(userId);
    return { count };
  }


  @Post(':id/read')
  async markAsRead(
    @Param('id') id: string,
    @CurrentUser('sub') userId: string,
  ) {
    await this.notificationsService.markAsRead(id, userId);
    return { success: true };
  }


  @Post('read-all')
  async markAllAsRead(@CurrentUser('sub') userId: string) {
    await this.notificationsService.markAllAsRead(userId);
    return { success: true };
  }


  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser('sub') userId: string) {
    await this.notificationsService.delete(id, userId);
    return { success: true };
  }
}
