# Changelog

## [2.3.3](https://github.com/cheminfo/nmr-correlation/compare/v2.3.2...v2.3.3) (2022-08-03)


### Bug Fixes

* update dependencies ([#36](https://github.com/cheminfo/nmr-correlation/issues/36)) ([38fa6ce](https://github.com/cheminfo/nmr-correlation/commit/38fa6ceb6edf728d7224202a9b2699450bc0ab3b))

### [2.3.2](https://www.github.com/cheminfo/nmr-correlation/compare/v2.3.1...v2.3.2) (2022-05-13)


### Bug Fixes

* update tsconfig.json ([#42](https://www.github.com/cheminfo/nmr-correlation/issues/42)) ([46669e0](https://www.github.com/cheminfo/nmr-correlation/commit/46669e0620447bc900f5bb2203a707393e795da2))

### [2.3.1](https://www.github.com/cheminfo/nmr-correlation/compare/v2.3.0...v2.3.1) (2022-05-12)


### Bug Fixes

* added jsdocs ([#40](https://www.github.com/cheminfo/nmr-correlation/issues/40)) ([c9b631c](https://www.github.com/cheminfo/nmr-correlation/commit/c9b631c8bc436032bdf5b28c9549d1675ef038c9))

## [2.3.0](https://www.github.com/cheminfo/nmr-correlation/compare/v2.2.5...v2.3.0) (2022-05-11)


### Features

* allow setting of hetero atom equivalence ([#37](https://www.github.com/cheminfo/nmr-correlation/issues/37)) ([5f9cae2](https://www.github.com/cheminfo/nmr-correlation/commit/5f9cae2c6464901603450ec3eb35544bc0446579))

### [2.2.5](https://www.github.com/cheminfo/nmr-correlation/compare/v2.2.4...v2.2.5) (2022-02-25)


### Bug Fixes

* update dependencies and workflows ([9a61e43](https://www.github.com/cheminfo/nmr-correlation/commit/9a61e43bb702cd5a38daa520c2b5178ead326ebd))

### [2.2.4](https://www.github.com/cheminfo/nmr-correlation/compare/v2.2.3...v2.2.4) (2022-02-25)


### Bug Fixes

* update dependencies ([12404df](https://www.github.com/cheminfo/nmr-correlation/commit/12404dff6170c7d6a68b8a8b11f82d4b926e01ef))

### [2.2.3](https://www.github.com/cheminfo/nmr-correlation/compare/v2.2.2...v2.2.3) (2022-02-25)


### Bug Fixes

* update dependencies ([0f2a973](https://www.github.com/cheminfo/nmr-correlation/commit/0f2a97367ce520f071cccdc2a32b5981285e510b))

### [2.2.2](https://www.github.com/cheminfo/nmr-correlation/compare/v2.2.1...v2.2.2) (2022-02-17)


### Bug Fixes

* imports in test files ([c92b11a](https://www.github.com/cheminfo/nmr-correlation/commit/c92b11a8dfc74f4ae953fa17bab25610b5993be0))

### [2.2.1](https://www.github.com/cheminfo/nmr-correlation/compare/v2.2.0...v2.2.1) (2022-02-17)


### Bug Fixes

* added eslint-plugin-import package ([e5b134c](https://www.github.com/cheminfo/nmr-correlation/commit/e5b134ca98efa556349f0a7aabcbbe4aa2376b85))
* use eslint-plugin-jest package ([c25730c](https://www.github.com/cheminfo/nmr-correlation/commit/c25730c5c253dece2da53029e619bfaf9e0a89a2))

## [2.2.0](https://www.github.com/cheminfo/nmr-correlation/compare/v2.1.4...v2.2.0) (2021-11-23)


### Features

* introduction of pathLength in 2D signals ([33c7c46](https://www.github.com/cheminfo/nmr-correlation/commit/33c7c46d6561d9e54c29e57f410721bd0d32bbd2))


### Bug Fixes

* let pathLength.source be a flexible string ([1eff24a](https://www.github.com/cheminfo/nmr-correlation/commit/1eff24aedadc4e0c9565493182a9f03933276cd5))

### [2.1.4](https://www.github.com/cheminfo/nmr-correlation/compare/v2.1.3...v2.1.4) (2021-11-19)


### Bug Fixes

* set "no-unresolved" to off in eslint ([9b14c0d](https://www.github.com/cheminfo/nmr-correlation/commit/9b14c0dc8da2438c22bc926962cf696b7c1c2c44))

### [2.1.3](https://www.github.com/cheminfo/nmr-correlation/compare/v2.1.2...v2.1.3) (2021-10-22)


### Bug Fixes

* wrong proton equivalence count when it is multiple assigned ([c10fb31](https://www.github.com/cheminfo/nmr-correlation/commit/c10fb31374b805f5529a11dcbc1e0282f62f8373))

### [2.1.2](https://www.github.com/cheminfo/nmr-correlation/compare/v2.1.1...v2.1.2) (2021-10-15)


### Bug Fixes

* delete correlations with empty link array after external movements ([a5d6e9a](https://www.github.com/cheminfo/nmr-correlation/commit/a5d6e9aed8c76c886324f0641c116d374f888906))

### [2.1.1](https://www.github.com/cheminfo/nmr-correlation/compare/v2.1.0...v2.1.1) (2021-10-15)


### Bug Fixes

* deletion of obsolete links in 1D too ([da60776](https://www.github.com/cheminfo/nmr-correlation/commit/da607765b03ffd5a8197e8bdf38e30701f84690a))
* deletion of obsolete links to non-existing signals ([c173249](https://www.github.com/cheminfo/nmr-correlation/commit/c1732495a31abd0ff5ee3478f0bbd0e0c87861a6))
* do not delete moved link with empty match array ([aa7c8c5](https://www.github.com/cheminfo/nmr-correlation/commit/aa7c8c506a2315c87601661a470397ad0b310450))
* missing consideration of moved signals in addFromData1D ([5986216](https://www.github.com/cheminfo/nmr-correlation/commit/5986216b0b141bc4ad2701e4ac0ba156f92fc21a))
* remove correlations without any link ([e8d5e6a](https://www.github.com/cheminfo/nmr-correlation/commit/e8d5e6ab87b446f4c87a51a0646175706f5fb97e))
* removed unnecessary experiment type and id from correlation options ([28ed3c4](https://www.github.com/cheminfo/nmr-correlation/commit/28ed3c4c23ef79ed10d77cfba332859c7b327322))
* restorage of previously set correlation properties and possibilty to skip the addFromData method ([3d3b81b](https://www.github.com/cheminfo/nmr-correlation/commit/3d3b81b8e1aefa15ac0fa3259b3e85d5f916f79c))
* using wrong index in atom types array  in removeDeletedAndNotLinkedCorrelations ([658cbe2](https://www.github.com/cheminfo/nmr-correlation/commit/658cbe2af647cc0720b41056cb56dfce953b67b5))

## [2.1.0](https://www.github.com/cheminfo/nmr-correlation/compare/v2.0.3...v2.1.0) (2021-09-10)


### Features

* invoke on NPM ([beb2c3b](https://www.github.com/cheminfo/nmr-correlation/commit/beb2c3be06fb32160358b25687c124165d6cb11d))

### [2.0.3](https://www.github.com/cheminfo/nmr-correlation/compare/v2.0.2...v2.0.3) (2021-09-10)


### Bug Fixes

* do not export input values ([95b5c98](https://www.github.com/cheminfo/nmr-correlation/commit/95b5c987eb8dde3cd1b21ea35ce663d339f93102))

### [2.0.2](https://www.github.com/cheminfo/nmr-correlation/compare/v2.0.1...v2.0.2) (2021-09-10)


### Bug Fixes

* eslint error ([57cd626](https://www.github.com/cheminfo/nmr-correlation/commit/57cd626b1652011c560d08b50ac73de0fada8ccb))
* use plural name for peak ([28241c1](https://www.github.com/cheminfo/nmr-correlation/commit/28241c1978c81a8b686ddffc06ede5ce4e72f199))

### [2.0.1](https://www.github.com/cheminfo/nmr-correlation/compare/v2.0.0...v2.0.1) (2021-07-28)


### Bug Fixes

* missing plural names changes ([#10](https://www.github.com/cheminfo/nmr-correlation/issues/10)) ([4e1b40e](https://www.github.com/cheminfo/nmr-correlation/commit/4e1b40e530cca4738d89aa7a1780db180035e72b))

## [2.0.0](https://www.github.com/cheminfo/nmr-correlation/compare/v1.3.3...v2.0.0) (2021-07-26)


### ⚠ BREAKING CHANGES

* use plural - signals instead of signal ranges instead range (#8)

### Features

* use plural - signals instead of signal ranges instead range ([#8](https://www.github.com/cheminfo/nmr-correlation/issues/8)) ([9424408](https://www.github.com/cheminfo/nmr-correlation/commit/9424408ff44c7637e882136178cec658c2c59d29))

### [1.3.3](https://www.github.com/cheminfo/nmr-correlation/compare/v1.3.2...v1.3.3) (2021-06-02)


### Bug Fixes

* update of obsolete description ([57d6a08](https://www.github.com/cheminfo/nmr-correlation/commit/57d6a08d9f25b70b692f8fd44b33903efebc5884))
* wrong order of pseudo correlations ([95af02a](https://www.github.com/cheminfo/nmr-correlation/commit/95af02a39ee82fde5d3190b83c6b0d649f7a3c09))

### [1.3.2](https://www.github.com/cheminfo/nmr-correlation/compare/v1.3.1...v1.3.2) (2021-05-06)


### Bug Fixes

* add prepack ([b5e3a7b](https://www.github.com/cheminfo/nmr-correlation/commit/b5e3a7bccc9de303117f3dfa0a8d6ceebd1011ce))

### [1.3.1](https://www.github.com/cheminfo/nmr-correlation/compare/v1.3.0...v1.3.1) (2021-05-03)


### Bug Fixes

* cheminfo-bot npm access ([d6b5a1c](https://www.github.com/cheminfo/nmr-correlation/commit/d6b5a1c3da89b1fceb9fba3116fc356c64b138d2))

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
