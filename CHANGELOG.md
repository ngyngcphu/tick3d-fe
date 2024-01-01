# Changelog

## [1.3.0](https://github.com/ngyngcphu/tick3d-fe/compare/v1.2.0...v1.3.0) (2024-01-01)


### Features

* **add-model:** add Add model dialog ([ccdf95a](https://github.com/ngyngcphu/tick3d-fe/commit/ccdf95a172c88180c59797670380c2514058f6eb))
* **add-model:** add button Add model of manager ([70e8453](https://github.com/ngyngcphu/tick3d-fe/commit/70e845334804351a9ff57a02f9f3ba0537d54aa4))
* **admin:** add menu option Dashboard for admin ([a5a9e69](https://github.com/ngyngcphu/tick3d-fe/commit/a5a9e6952a320f750c0ea88b9d8906a1360da3b1))
* **cart:** add api for user cart ([a2be195](https://github.com/ngyngcphu/tick3d-fe/commit/a2be195c137b2c351ea7129a1be5782c97d73865))
* **cart:** avoid duplicate mutation ([e006bb8](https://github.com/ngyngcphu/tick3d-fe/commit/e006bb8489e3118e819013d3a05815a7525fcece))
* **cart:** complete api for user cart ([85d536e](https://github.com/ngyngcphu/tick3d-fe/commit/85d536ed23b20256ef0ea0f01844c7ac2e8f2317))
* **cart:** resolve by check model in cart ([24f6f43](https://github.com/ngyngcphu/tick3d-fe/commit/24f6f4395d461d5fbc253844034ccf26fabaa095))
* **checkout:** add successful notification model for PayPal checkout ([2d57351](https://github.com/ngyngcphu/tick3d-fe/commit/2d573519b44fb2067bb3b0c69eb600927551519c))
* **checkout:** integrate PayPal ([1414f89](https://github.com/ngyngcphu/tick3d-fe/commit/1414f899c86f490adbdf50d3e52b24eac3611311))
* **manage-order:** resolve conflict manageOrder branch ([ab108e2](https://github.com/ngyngcphu/tick3d-fe/commit/ab108e2c60591452ee270eb34ff7505f1918eb11))
* **search bar:** implement search bar ([0e2c606](https://github.com/ngyngcphu/tick3d-fe/commit/0e2c6065e61c0d7a127562a339445681301fea6e))
* **search bar:** implement search page for mobile view ([7807ab8](https://github.com/ngyngcphu/tick3d-fe/commit/7807ab8b8e484f1e01e0aaaf28f350880cc750b6))


### Bug Fixes

* **add-model:** fix bug and add validation ([2882703](https://github.com/ngyngcphu/tick3d-fe/commit/28827035641d9f24b7b10cd00c4f02117198014f))
* **cart:** reset cart after user logged out ([c61923c](https://github.com/ngyngcphu/tick3d-fe/commit/c61923c829b48919e6f004aa64a5958f728ff77c))
* **env:** remove redundancy library and add paypal id into env-example ([6a1080a](https://github.com/ngyngcphu/tick3d-fe/commit/6a1080a4224788404d751a9fea5a097d6cc78f1e))
* **layout:** spread sub-image of detail model page in view admin ([83be349](https://github.com/ngyngcphu/tick3d-fe/commit/83be3498207475018bd63b7faac9f088e6d881fc))
* **menu-bar:** rename item cart ([dc6166f](https://github.com/ngyngcphu/tick3d-fe/commit/dc6166f0aeb4c15683f914e3f68f1b26683f5667))
* **menu-bar:** rename item cart on app layout ([88aab02](https://github.com/ngyngcphu/tick3d-fe/commit/88aab0213d71dbaa74a52ea824068dd4064392dc))
* **menu-bar:** rename item cart on desktop navigation bar ([8fe0793](https://github.com/ngyngcphu/tick3d-fe/commit/8fe079312b81f4ef3b2833d69ba24dee6aa0a205))
* **payment:** remove payload redundancy when calling api ([0d0db9f](https://github.com/ngyngcphu/tick3d-fe/commit/0d0db9f16a34a2766974dd25427f2949bf2a0b45))
* **search bar:** call service directly to resolve search result delay ([3fd8998](https://github.com/ngyngcphu/tick3d-fe/commit/3fd899873ac7f3f0538d2936f84e1bdc956ca512))
* **searchmobile:** add missing placeholder on Dialog and DialogBody ([a88917c](https://github.com/ngyngcphu/tick3d-fe/commit/a88917cb6c1b28cbf368b67ee2fa1d2fbbb0cc73))
* **UI:** add missing property placeholder ([b89e36b](https://github.com/ngyngcphu/tick3d-fe/commit/b89e36b0d720c2148de6eba70295923de95a8304))

## [1.2.0](https://github.com/ngyngcphu/tick3d-fe/compare/v1.1.1...v1.2.0) (2023-12-30)


### Features

* **api:** connect api for homepage and detail model page ([b367bc8](https://github.com/ngyngcphu/tick3d-fe/commit/b367bc8bddae8880dcb7c7318c7aebeacefbbe38))
* **api:** fix Items component ([3a420e6](https://github.com/ngyngcphu/tick3d-fe/commit/3a420e603def0b76f82f0b077038fb59c5cf02b3))
* **api:** fix items for shopping cart page ([b9f7b18](https://github.com/ngyngcphu/tick3d-fe/commit/b9f7b18d6f60b93f8b18310b43a881eff952201c))
* **app-navigation:** config navbar and sidebar suitably with user role ([6d7eb6f](https://github.com/ngyngcphu/tick3d-fe/commit/6d7eb6f2dda1382d3ae1ce3a9774f7338a515651))
* **auth:** enable sign up using otp email verification ([d288fa5](https://github.com/ngyngcphu/tick3d-fe/commit/d288fa55caba530c8871df5f5676d31c2065785b))
* **cart-api:** merge all of models in localStorage into user's cart when user loged in ([3fcf01c](https://github.com/ngyngcphu/tick3d-fe/commit/3fcf01c20488335645f98929acf7f737e3578e8e))
* **category:** enable sorting and clearing filters ([5ee5712](https://github.com/ngyngcphu/tick3d-fe/commit/5ee5712b723fabf598da340e8d4156770e375b5e))
* **category:** get list categories from api ([ddae609](https://github.com/ngyngcphu/tick3d-fe/commit/ddae6095dfa2db234d6980f7e2f30b3f94056787))
* **filter:** create calendar picker for criteria Upload date ([3a12662](https://github.com/ngyngcphu/tick3d-fe/commit/3a12662036d7ac4c4c43e3f44378f56c73e7ce6a))
* **logout:** add api for logout ([3755525](https://github.com/ngyngcphu/tick3d-fe/commit/375552584fc23ed1f027753fb45572ebeee47452))
* **logout:** complete merge for desktop navbar ([df493ff](https://github.com/ngyngcphu/tick3d-fe/commit/df493ffd9e13e598fd3baf7c3581de52a1bcdc08))
* **logout:** finally add logout api ([b384ce0](https://github.com/ngyngcphu/tick3d-fe/commit/b384ce05d0f6bdb219355b36f7500235c5cd9d26))
* **logout:** fix logout api ([a6d54a6](https://github.com/ngyngcphu/tick3d-fe/commit/a6d54a6f88e05d468a3dbdf157ff8e3bcc6d4e09))
* **main:** no change ([383b1db](https://github.com/ngyngcphu/tick3d-fe/commit/383b1db267e9e9865882a3f0b982278d850f9cf9))
* **pagination:** create pagination for Category Page ([ddf1621](https://github.com/ngyngcphu/tick3d-fe/commit/ddf16214add392533dc7cdf571e609fbd4aa7f6a))
* **protected-route:** protected resource of customer and admin ([a93c505](https://github.com/ngyngcphu/tick3d-fe/commit/a93c505c096190b0d758476225d199cc279363c3))
* **services:** add services ([55bf7f7](https://github.com/ngyngcphu/tick3d-fe/commit/55bf7f7840dd998e6b032c673acb32d0e6cb3521))


### Bug Fixes

* **cart-localStorage:** add functions: create, update, delete. ([1cdd42c](https://github.com/ngyngcphu/tick3d-fe/commit/1cdd42c04363f01a1d7f3a9fa72d168a66ca3439))
* **checkout:** remove payment options and fixed online payment ([6d851d8](https://github.com/ngyngcphu/tick3d-fe/commit/6d851d8a4fa2e072fea35bb868e110cf36d910c6))
* **logout:** robust logout and re-config route ([828e9b1](https://github.com/ngyngcphu/tick3d-fe/commit/828e9b18fc8eeda7e499cbbf78c64ddaa310cc2f))
* **navigate:** prevent navigating to detail model when clicking Cart button ([ae7e54b](https://github.com/ngyngcphu/tick3d-fe/commit/ae7e54b47c4ffde74d90179b1e60e87a3df08a1c))
* **pagination:** set default active page to 1 when switching category ([47ef80c](https://github.com/ngyngcphu/tick3d-fe/commit/47ef80c8aebb06c6f4d9ef6abe56be89c2ad6fd9))
* **states:** remove server states ([f297980](https://github.com/ngyngcphu/tick3d-fe/commit/f29798042c51ade8000b3bede2c5bb9653322e1a))
* **type:** add type for home component ([6e6b1a2](https://github.com/ngyngcphu/tick3d-fe/commit/6e6b1a292f4a56575fa81a26ce5a3232d8e96d9a))

## [1.1.1](https://github.com/ngyngcphu/tick3d-fe/compare/v1.1.0...v1.1.1) (2023-11-26)


### Bug Fixes

* **package:** add is-ci devDependencies ([9901155](https://github.com/ngyngcphu/tick3d-fe/commit/9901155dc523fbe29e3501b2a924e8ca851e8482))
* **vars:** add mock backend url into env in production ([e2ff0a1](https://github.com/ngyngcphu/tick3d-fe/commit/e2ff0a118db3d0d8bde01880e4174cc1b671a9d5))

## [1.1.0](https://github.com/ngyngcphu/tick3d-fe/compare/v1.0.1...v1.1.0) (2023-11-26)


### Features

* **auth:** add submit and error handle for login ([d36f6dd](https://github.com/ngyngcphu/tick3d-fe/commit/d36f6ddb2e5e74764c22c98c176768508548e021))
* **auth:** implement ui for login ([fee313c](https://github.com/ngyngcphu/tick3d-fe/commit/fee313cca392a296cb28de43a4013dd067dc2a99))
* **category:** Basic category page ([fff4ccf](https://github.com/ngyngcphu/tick3d-fe/commit/fff4ccfee0dcfac4d771b93ce04a0007daa6f71c))
* **checkout:** Basic checkout page ([035fb7a](https://github.com/ngyngcphu/tick3d-fe/commit/035fb7af8efe197e22632d2849a64a9fd73814f0))
* complete cart ([ba1d2db](https://github.com/ngyngcphu/tick3d-fe/commit/ba1d2db0d6084e653bd447e521d8408205281abc))
* **default-model:** add component and responsive ([5df99dd](https://github.com/ngyngcphu/tick3d-fe/commit/5df99ddce80417504578f264249ee8139f88d106))
* **default-model:** add sub image, routing to default model, not yet design ([2315703](https://github.com/ngyngcphu/tick3d-fe/commit/231570352d2e77ec793d382d0b1a707f9b747f7e))
* **footer:** add footer components ([410a8a6](https://github.com/ngyngcphu/tick3d-fe/commit/410a8a6f84192679cbf4bab1e8b3f58adbc21bf1))
* **home_page:** edit homepage and responsive ([d383496](https://github.com/ngyngcphu/tick3d-fe/commit/d3834967bd5a86e21d43b6057338bf3f4ab5f10e))
* implement sign up page ([6ec6747](https://github.com/ngyngcphu/tick3d-fe/commit/6ec67475106e05138efc0981419783af781f3b7e))
* **shopping card:** implement items list of shopping card ([c1750a3](https://github.com/ngyngcphu/tick3d-fe/commit/c1750a3d60995789b7d9e1ca0700508e01bd4685))
* **shopping card:** implement recommend items list ([b98ee54](https://github.com/ngyngcphu/tick3d-fe/commit/b98ee542c4940fc41785fe72ef45d61085f5c702))
* **shopping card:** implement shopping card reponsive for mobile device ([e0b3f5a](https://github.com/ngyngcphu/tick3d-fe/commit/e0b3f5a82a8ed211347c4abf6de213e717e9a864))
* **slide:** no changes ([e3100af](https://github.com/ngyngcphu/tick3d-fe/commit/e3100af82368baa6a988550b1d44b951be1ad82c))


### Bug Fixes

* add tel input in signup form ([1c900a6](https://github.com/ngyngcphu/tick3d-fe/commit/1c900a699798f9a53b174776710d738d514791cd))
* **auth:** add autofill css instead of setTimeout ([17f4a00](https://github.com/ngyngcphu/tick3d-fe/commit/17f4a003b4fabeec0f4726e3c7da06f2c4ff1b39))
* **checkout:** product imgs appear nicer on mobile ([417ed1f](https://github.com/ngyngcphu/tick3d-fe/commit/417ed1fd09f1fe9e916889e7825d2b3b776e4824))
* **type:** fix return type of user data ([839caf7](https://github.com/ngyngcphu/tick3d-fe/commit/839caf7e566ba8a82bd28bf81017e4d2ecf14455))

## [1.0.1](https://github.com/ngyngcphu/tick3d-fe/compare/v1.0.0...v1.0.1) (2023-10-07)


### Bug Fixes

* **desktop-navbar:** custom styles for navigation bar ([279ab15](https://github.com/ngyngcphu/tick3d-fe/commit/279ab1529504934bf8e6e3d78c28ca6bd30a46cf))
* **navigation:** change layout of navigation bar ([237b627](https://github.com/ngyngcphu/tick3d-fe/commit/237b627551cde693c8c7e49efd0c96f0ccb977c8))
* **route:** custom route for layout ([d29f4a7](https://github.com/ngyngcphu/tick3d-fe/commit/d29f4a77c5566c98e3cd2fa84a3390a10c7b24b3))
* **sidebar-menu:** add category list on sidebar ([c82e5d7](https://github.com/ngyngcphu/tick3d-fe/commit/c82e5d7faad70932ef17518b775f065169266d9f))

## 1.0.0 (2023-09-29)


### Features

* **github-action:** add ci and release workflows, enable dependabot ([1c87a03](https://github.com/ngyngcphu/tick3d-fe/commit/1c87a03dfd759e832d1bd53acb3e55147d8a3aa6))
