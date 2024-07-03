import {Subscription} from 'rxjs';

export const addSubscriptionsToSubscription = (
  subscriptions: Subscription,
  arrayOfSubscriptions: Subscription[],
) => {
  arrayOfSubscriptions?.forEach((subscription) => subscriptions?.add(subscription));
};
