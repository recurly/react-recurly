import { RecurlyProvider, Elements } from '../../lib';

export function withRecurlyProvider (storyFn) {
  return (
    <RecurlyProvider publicKey="MY_PUBLIC_KEY">
      {storyFn()}
    </RecurlyProvider>
  );
}

export function withElements (storyFn) {
  return withRecurlyProvider(() =>
    <Elements>
      {storyFn()}
    </Elements>
  );
}
