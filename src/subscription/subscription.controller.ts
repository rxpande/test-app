import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get(':userName')
  findByUserName(@Param('userName') userName: string) {
    return this.subscriptionService.findSubscriptionsByUserName(userName)
  }

  @Get(':userName/:subscriptionDate')
  findSubscriptionByUserNameByDate(@Param('userName') userName: string, @Param('subscriptionDate') subscriptionDate: string) {
    return this.subscriptionService.findSubscriptionsByUserNameByDate(userName, new Date(subscriptionDate))
  }

  @Post()
  create(@Body() subscription) {
    return this.subscriptionService.create(subscription);
  }

}
