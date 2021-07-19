import { ISubscriptionPlan } from ".";
import SubscriptionPlanIds from "./subscription-plan-ids.enum";

const SubscriptionPlans: Map<string, ISubscriptionPlan> = new Map();

SubscriptionPlans.set( SubscriptionPlanIds.FREE, {
    Validity: 'Infinite',
    Cost: 0.0
});

SubscriptionPlans.set( SubscriptionPlanIds.TRIAL, {
    Validity: 7,
    Cost: 0.0
});

SubscriptionPlans.set( SubscriptionPlanIds.LITE_1M, {
    Validity: 30,
    Cost: 100.0
});

SubscriptionPlans.set( SubscriptionPlanIds.PRO_1M, {
    Validity: 30,
    Cost: 200.0
});

SubscriptionPlans.set( SubscriptionPlanIds.LITE_1M, {
    Validity: 180,
    Cost: 500.0
});

SubscriptionPlans.set( SubscriptionPlanIds.PRO_6M, {
    Validity: 180,
    Cost: 900.0
});

export default SubscriptionPlans;