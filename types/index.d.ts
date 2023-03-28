import {
  RecurlyOptions,
  CardElementOptions,
  IndividualElementOptions,
  Recurly,
  Address,
  TokenHandler,
  CheckoutPrice,
  CheckoutPricingInstance,
  Adjustment,
  RecurlyError,
  TokenPayload
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
  token: (form: HTMLFormElement | Address, done: TokenHandler) => void;
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

export type SetCheckoutPricing = (input: UseCheckoutPricingInput | ((prevState: UseCheckoutPricingInput) => UseCheckoutPricingInput)) => void;

export type UseCheckoutPricingReturn = [UseCheckoutPricingState, SetCheckoutPricing, CheckoutPricingInstance];

export type RiskStrategies = 'kount';

export type RiskDataCollectorProps = {
  id?: string;
  className?: string;
  strategy?: RiskStrategies;
  onError?: (e: RecurlyError) => void;
};

export type ThreeDSecureActionProps = {
  id?: string;
  className?: string;
  actionTokenId?: string;
  onToken?: (token: TokenPayload) => void;
  onError?: (e: RecurlyError) => void;
};

/**
 * {@link https://recurly.github.io/react-recurly/?path=/docs/components-recurlyprovider--page This component}
 * accepts your publicKey as a prop. It is responsible for creating a recurly
 * instance on which we will generate tokens. This should wrap any other
 * react-recurly component you will use.
 */
export const RecurlyProvider: React.FC<React.PropsWithChildren<RecurlyOptions>>;

/**
 * {@link https://recurly.github.io/react-recurly/?path=/docs/components-elements--page This component}
 * groups *Element components together. When generating tokens, it is used to
 * determine which values will be tokenized. This should wrap your checkout
 * form.
 *
 * The functionality of <Elements /> is largely behind the scenes. It takes one
 * onSubmit prop, and is used solely to designate which *Element components
 * belong together in your component heirarchy.
 */
export const Elements: React.FC<React.PropsWithChildren<ElementsProps>>;

/**
 * {@link https://recurly.github.io/react-recurly/?path=/docs/components-cardelement--default A card element component}
 * which wraps its Recurly.js analogue, passing configuration props to the
 * underlying Recurly.js CardElement and allowing event binding using props.
 */
export const CardElement: React.FC<CardElementProps>;

/**
 * {@link https://recurly.github.io/react-recurly/?path=/docs/components-individual-card-elements-cardnumberelement--default An Element component}
 * which wraps its Recurly.js analogue, passing configuration props to the
 * underlying Recurly.js Element and allowing event binding using props.
 */
export const CardNumberElement: React.FC<IndividualElementProps<CardNumberElementChangeEvent>>;

/**
 * {@link https://recurly.github.io/react-recurly/?path=/docs/components-individual-card-elements-cardmonthelement--default An Element component}
 * which wraps its Recurly.js analogue, passing configuration props to the
 * underlying Recurly.js Element and allowing event binding using props.
 */
export const CardMonthElement: React.FC<IndividualElementProps>;

/**
 * {@link https://recurly.github.io/react-recurly/?path=/docs/components-individual-card-elements-cardyearelement--default An Element component}
 * which wraps its Recurly.js analogue, passing configuration props to the
 * underlying Recurly.js Element and allowing event binding using props.
 */
export const CardYearElement: React.FC<IndividualElementProps>;

/**
 * {@link https://recurly.github.io/react-recurly/?path=/docs/components-individual-card-elements-cardcvvelement--default An Element component}
 * which wraps its Recurly.js analogue, passing configuration props to the
 * underlying Recurly.js Element and allowing event binding using props.
 */
export const CardCvvElement: React.FC<IndividualElementProps>;

/**
 * {@link https://recurly.github.io/react-recurly/?path=/docs/components-riskdatacollector--page This component}
 * adds fraud protection to your checkout
 */
export const RiskDataCollector: React.FC<RiskDataCollectorProps>;

/**
 * {@link https://recurly.github.io/react-recurly/?path=/docs/components-threedsecureaction--page This component}
 * renders a 3-D Secure authentication flow.
 */
export const ThreeDSecureAction: React.FC<ThreeDSecureActionProps>;

/**
 * {@link https://recurly.github.io/react-recurly/?path=/docs/hooks-userecurly--page Use this hook}
 * to access a Recurly instance.
 */
export function useRecurly(): UseRecurlyInstance;

/**
 * {@link https://recurly.github.io/react-recurly/?path=/docs/hooks-usecheckoutpricing--page Use this hook}
 * to interact with the Recurly.js pricing API and provide users with an
 * estimate of a purchase before they check out.
 */
export function useCheckoutPricing(input: UseCheckoutPricingInput, handleError?: (error: RecurlyError) => any): UseCheckoutPricingReturn;
