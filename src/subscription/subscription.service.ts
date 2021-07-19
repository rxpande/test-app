import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionPlans } from './model';

@Injectable()
export class SubscriptionService {

  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  public async create(subscription: Subscription): Promise<any> {

    // Set created_at to current date
    const computedDate = new Date(subscription.start_date);
    subscription.created_at = new Date();
    const subscriptionPlan = SubscriptionPlans.get(subscription.plan_id);
    computedDate.setDate(computedDate.getDate() + Number(subscriptionPlan.Validity));
    subscription.valid_till = new Date(computedDate);
        
    const createdSubscription: Subscription = await this.subscriptionRepository.save(subscription);

    if(createdSubscription.id) {
      
      return {
        ...createdSubscription,
        status: 'SUCCESS',
        amount: `+ ${SubscriptionPlans.get(subscription.plan_id).Cost}`
      };
    }
  }

  public async findByUserName(userName: string) {
   return await this.subscriptionRepository.find({
      where: {
          user_name: userName 
      }
    });
  }

  public async findSubscriptionsByUserName(user_name: string) {
    const userSubscriptions = await this.findByUserName(user_name);

    userSubscriptions.forEach((subscription: Subscription) => {
      const subscriptionPlan = SubscriptionPlans.get(subscription.plan_id);
      const subscriptionStartDate = new Date(subscription.start_date);
      const subscriptionValidity = new Date(subscriptionStartDate)

      if(subscriptionPlan.Validity !== 'Infinite') {
        subscriptionValidity.setDate(subscriptionStartDate.getDate() + Number(subscriptionPlan.Validity));
        subscription.valid_till = new Date(subscriptionValidity);
      }
    });

    return userSubscriptions;
  }

  public async findSubscriptionsByUserNameByDate(user_name: string, subscription_check_date: Date) {

    const todaysDate: any = new Date();
    const userSubscriptions = await this.findSubscriptionsByUserName(user_name);
    
    let activeUserSubscription: any = userSubscriptions.find((subscription: Subscription) => {
      const subscriptionStartDate = new Date(subscription.start_date);
      const subscriptionValidTillDate = new Date(subscription.valid_till);
      return subscription_check_date > subscriptionStartDate && subscription_check_date < subscriptionValidTillDate;
    })

    const subscriptionTimeDiff = Math.ceil(activeUserSubscription.valid_till.getTime() - todaysDate.getTime())
    const subscriptionDaysLeft = Math.ceil( subscriptionTimeDiff / (1000 * 3600 * 24));

    activeUserSubscription = {
      ...activeUserSubscription,
      'days_left': subscriptionDaysLeft
    }

    return activeUserSubscription;
  }


}
