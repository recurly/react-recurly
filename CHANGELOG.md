## react-recurly CHANGELOG

### Version 1.2.1

-Fixes "types" directory in package.json

### Version 1.2.0

- Fixes currency input for useCheckoutPricing [#57][57]
- Updates useCheckoutPricing to allow subscriptions with plan as an empty string [#59][59]
- Updates useCheckoutPricing to allow adjustments with itemCode as an empty string [#59][59]
- Adds TypeScript support [#60][60]
- Adds RiskDataCollector component [#61][61]

### Version 1.1.2

- Fixes references from useRecurly [#46][46]
- Fixes currency in useCheckoutPricing to throw error when using a currency not configured with a plan [#49][49]

### Version 1.1.1

- Fixes missing lodash dependency [#40][40]

### Version 1.1.0

- Adds useCheckoutPricing hook [#28][28]
- Adds onError prop to <ThreeDSecureAction /> [#22][22]
- Adds exception to <Element /> when it is instantiated outside of an <Elements /> tree [#22][22]

### Version 1.0.2

- Fixes distribution transpiler pipeline [#11][11]
- Restructures demo [#10][10]

### Version 1.0.1

- Fixes dependency chart [34fbbf7a][34fbbf7a]

### Version 1.0.0

- Initial Release [ecd70331][ecd70331]

[61]: https://github.com/recurly/react-recurly/pull/61/commits/05c4d739d5b577084fcc8ec43e4e5989ef37c5a2
[60]: https://github.com/recurly/react-recurly/pull/60/commits/5425f5f2f90e40a1e6585e74cd0e0b57e72a6057
[59]: https://github.com/recurly/react-recurly/pull/59/commits/09b8a23a3f4e7e8608bee4f7fb4583a3a5d7e42f
[57]: https://github.com/recurly/react-recurly/pull/57/commits/26e33efc7bf926205eab6f7bcaad69a4036b3cc8
[49]: https://github.com/recurly/react-recurly/commit/6ae4129b8ccc3d9df68e759cb67098667537ad03
[46]: https://github.com/recurly/react-recurly/commit/3bf0d5349a325993b4ae2b7dfde8ab0fbe2a1085
[40]: https://github.com/recurly/react-recurly/commit/0bba8f01d7e6a7ec0877ecbbc30e3a4627bbc501
[28]: https://github.com/recurly/react-recurly/commit/7c467341d2571d2d26f59621af30cd8c598e726b
[22]: https://github.com/recurly/react-recurly/commit/afb8a4ef665bf5ed6ab3ef8945e299619f769504
[11]: https://github.com/recurly/react-recurly/commit/46f892b18323166d14572347b2194096300f6c62
[10]: https://github.com/recurly/react-recurly/commit/00258f746ad57ea77078f7ceb037608787e2e8ef
[34fbbf7a]: https://github.com/recurly/react-recurly/commit/34fbbf7ac7bac95b480680d2d89d95cc11eddfdf
[ecd70331]: https://github.com/recurly/react-recurly/commit/ecd7033104e4889fea867b4a41c59a96b3b6b519
