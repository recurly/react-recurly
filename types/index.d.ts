import {
  RecurlyOptions,
  CardElementOptions,
  IndividualElementOptions,
  Recurly,
  Address,
  TokenHandler,
  CheckoutPrice,
  Adjustment
} from '@recurly/recurly-js';

export type ElementsProps = {
  onSubmit?: VoidFunction;
};

export type CommonElementProps<ChangeEvent> = {
  onChange?: (event: ChangeEvent) => void;
  onBlur?: VoidFunction;
  onFocus?: VoidFunction;
  onReady?: VoidFunction;
  onSubmit?: VoidFunction;
  id?: string;
  className?: string;
};

export type CardElementState = {
  empty: boolean;
  focus: boolean;
  valid: boolean;
};

export type CardElementChangeEvent = {
  valid: boolean;
  firstSix: string;
  lastFour: string;
  brand: string;
  empty: boolean;
  focus: boolean;
  number: {
    number: CardElementState;
    expiry: CardElementState;
    valid: CardElementState;
  };
};

export type CardElementProps = CardElementOptions & CommonElementProps<CardElementChangeEvent>;

export type IndividualElementChangeEvent = {
  empty: boolean;
  length: number;
  focus: boolean;
  valid: boolean;
};

export type IndividualElementProps<ChangeEvent = IndividualElementChangeEvent> = IndividualElementOptions &
  CommonElementProps<ChangeEvent>;

export type CardNumberElementChangeEvent = {
  valid: boolean;
  firstSix: string;
  lastFour: string;
  brand: string;
  length: number;
  empty: boolean;
  focus: boolean;
};

export type UseRecurlyInstance = Recurly & {
  token: (form: HTMLFormElement | Address, second: TokenHandler) => void;
};

export type Addon = {
  code: string;
  quantity?: number;
};

export type Subscription = {
  plan: string;
  quantity?: number;
  addons?: Addon[];
};

export type UseCheckoutPricingInput = {
  subscriptions?: Subscription[];
  adjustments?: Adjustment[];
  currency?: string;
  address?: Address;
  shippingAddress?: Address;
  coupon?: string;
  giftCard?: {
    code: string;
  };
};

export type UseCheckoutPricingState = {
  price: CheckoutPrice;
  loading: boolean;
};

export type SetCheckoutPricing = (input: UseCheckoutPricingInput) => void;

export type UseCheckoutPricingReturn = [UseCheckoutPricingState, SetCheckoutPricing];

export const RecurlyProvider: React.FC<RecurlyOptions>;
export const Elements: React.FC<ElementsProps>;
export const CardElement: React.FC<CardElementProps>;
export const CardNumberElement: React.FC<IndividualElementProps<CardNumberElementChangeEvent>>;
export const CardMonthElement: React.FC<IndividualElementProps>;
export const CardYearElement: React.FC<IndividualElementProps>;
export const CardCvvElement: React.FC<IndividualElementProps>;
export function useRecurly(): UseRecurlyInstance;
export function useCheckoutPricing(input: UseCheckoutPricingInput): UseCheckoutPricingReturn;
