# Changelog

This file documents project changes.

Document format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/). This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2020-02-10

### Added

- return early if no `autonav_disabled` in local storage
- display conditional in `hideElement`
- util factory
  - `util.getHref()`
  - `util.getDisplay()`
  - `util.debounce()`

### Changed

- Exchange URL polling and burst for mutation observer
- Refactor get current page implementation
- Hide browse by element tags instead of primary id
- Rename component[s] to element[s]

### Removed

- handle common elements
- url factory
  - `url.get()`
  - `url.onChange()`
- hide notifications

## [0.1.5] - 2020-12-08

### Changed

- encapsulate url methods

## [0.1.4] - 2020-11-15

### Changed

- Assign HTML collection to array variable
- Move HTML collection iterator into `hideComponentsByTagName`

## [0.1.3] - 2020-11-13

### Removed

- unnecessary permissions in manifest

## [0.1.2] - 2020-11-12

### Added

- url change handling

## [0.1.1] - 2020-11-02

initial commit
