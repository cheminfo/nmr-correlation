# Changelog

## [1.3.0](https://www.github.com/cheminfo/nmr-correlation/compare/v1.1.6...v1.3.0) (2021-05-03)


### Features

* added and configured jest for testing ([c3344a0](https://www.github.com/cheminfo/nmr-correlation/commit/c3344a0ad2736bf5ea8f2e10e3c9729682729983))
* added method descriptions ([580af80](https://www.github.com/cheminfo/nmr-correlation/commit/580af80bec8a02f0a4c257bcd39b4392ea5fa090))
* added test case for getAtomCount and getAtomTypeFromNucleus ([a6bf82f](https://www.github.com/cheminfo/nmr-correlation/commit/a6bf82f83c8326c1cbac9a3124bdd0e3bc563cac))
* added test for buildState ([8990a47](https://www.github.com/cheminfo/nmr-correlation/commit/8990a475dc19f7b6c0aed3bf249a5e120247a514))
* added test for buildValues, added test dataset ([4346bdc](https://www.github.com/cheminfo/nmr-correlation/commit/4346bdcde3bb8573d88d963c962e58f8245677db))
* added test for getCorrelationIndex ([5948edf](https://www.github.com/cheminfo/nmr-correlation/commit/5948edff59ae761d75556a475dbffc0e24a1ae8c))
* added test for isEditedHSQC ([3c2b596](https://www.github.com/cheminfo/nmr-correlation/commit/3c2b5967d8220219e443bdf4f05c4abc67767201))
* added test for sortCorrelations ([2874d0c](https://www.github.com/cheminfo/nmr-correlation/commit/2874d0c884ea431668df883029a481536d707a89))
* added testing for checkMatch ([715ad9c](https://www.github.com/cheminfo/nmr-correlation/commit/715ad9c413f32bf321c1ed87be9315f9afb0230d))
* Added tests and method descriptions ([bbd1121](https://www.github.com/cheminfo/nmr-correlation/commit/bbd112187f8a0969c225a8b93e41138a12947c5d))
* added tests for buildCorrelationData ([3e424ad](https://www.github.com/cheminfo/nmr-correlation/commit/3e424adee194666213762215209a84667daf58c5))
* convert generateID to TypeScript ([dab2fa4](https://www.github.com/cheminfo/nmr-correlation/commit/dab2fa4b1838bff17e3f5540b04b8cc59efb04f0))
* improved test for sortCorrelations ([d4ffe86](https://www.github.com/cheminfo/nmr-correlation/commit/d4ffe8653a20d5ca55e5bff399f2625e6b6e7703))


### Bug Fixes

* added .eslintcache to .gitignore ([b203052](https://www.github.com/cheminfo/nmr-correlation/commit/b203052e8776237ff1bfbded20eea5295dd9c816))
* avoid test failures through checking files in lib-esm ([1dae371](https://www.github.com/cheminfo/nmr-correlation/commit/1dae371a69009587fdcf9398f024009aa93c4f88))
* changed signalKindsToInclude to allowedSignalKinds ([b50acf5](https://www.github.com/cheminfo/nmr-correlation/commit/b50acf53b9eae740d9b13e7b2cd54be68d490118))
* compiler errors of missing modules ([72f56d0](https://www.github.com/cheminfo/nmr-correlation/commit/72f56d0df230c8ff4c8466a176ba8d73b17acd25))
* ESlint fix ([677df62](https://www.github.com/cheminfo/nmr-correlation/commit/677df6250dacb630c7ebf8c27d3ca22afc195c0c))
* ESlint fixes ([18744f0](https://www.github.com/cheminfo/nmr-correlation/commit/18744f0c058e950b0cc60334dcf794888f20aee5))
* handle empty string in getAtomTypeFromNucleus ([d924514](https://www.github.com/cheminfo/nmr-correlation/commit/d9245148d898c5ebd318f4d698ab82efc61b94a7))
* improvement of package description ([ca8a685](https://www.github.com/cheminfo/nmr-correlation/commit/ca8a685b660a7a154e44543f33bd3e0fd40fc64d))
* invalid access to signal property in sortCorrelations method ([6e5a926](https://www.github.com/cheminfo/nmr-correlation/commit/6e5a926ea3284f50fcc50f369e22c29901620513))
* possible wrong order from sortCorrelations ([c82f858](https://www.github.com/cheminfo/nmr-correlation/commit/c82f858093d643c192b9f6a748dd3f434e933589))
* prevent from possible error through undefined value ([c52fb58](https://www.github.com/cheminfo/nmr-correlation/commit/c52fb58db91be8e910f0dcaa19525d230b727e39))
* remove remaining pseudo correlation when unsetting the mf ([0fcb478](https://www.github.com/cheminfo/nmr-correlation/commit/0fcb4783f7f12c11036a91652c32d1291111197d))
* removed default export ([262097a](https://www.github.com/cheminfo/nmr-correlation/commit/262097a0028e3ff3bcf6dd132cfabb6df9353f4e))
* renamed file ([e866b48](https://www.github.com/cheminfo/nmr-correlation/commit/e866b482bd0827b955e5d6961a733093cccbddb6))
* replace old tsconfig file by newer one from master branch ([2d83a61](https://www.github.com/cheminfo/nmr-correlation/commit/2d83a610231b9a9a8f75cbd17f3a007e091e7832))
* run of eslint-fix ([72b5631](https://www.github.com/cheminfo/nmr-correlation/commit/72b56317540c470db84d25a4f6675e3a9cb3bc34))
* spelling ([6ac1e91](https://www.github.com/cheminfo/nmr-correlation/commit/6ac1e91eb8dff67f2e8eb742773426faf68e3a5b))
* string as id instead of number ([8b31885](https://www.github.com/cheminfo/nmr-correlation/commit/8b31885e7173e911358e5e2994d33cada9b377aa))
* typo in file name ([67ea162](https://www.github.com/cheminfo/nmr-correlation/commit/67ea16257883e799e5d522f6742019ce676dc344))
* use CorrelationSignal format instead of Signal1D ([33b96a7](https://www.github.com/cheminfo/nmr-correlation/commit/33b96a767d18f6760ca9b2190ad14d7244ad3ea7))
* wrong folder to ignore in prettier ([7ec29bd](https://www.github.com/cheminfo/nmr-correlation/commit/7ec29bd45347c9a62ee28f74bf9255ab004fc8be))
