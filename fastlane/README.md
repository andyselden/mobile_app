fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
### test
```
fastlane test
```


----

## iOS
### ios beta
```
fastlane ios beta
```
Submit a new Beta Build to Apple TestFlight

This will also make sure the profile is up to date
### ios release
```
fastlane ios release
```


----

## Android
### android local_apk
```
fastlane android local_apk
```
Build a local apk
### android beta_internal
```
fastlane android beta_internal
```
This will distribute a build to the internal track of the play store

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
