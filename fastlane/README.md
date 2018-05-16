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
### ios_beta
```
fastlane ios_beta
```

### test
```
fastlane test
```


----

## iOS
### ios certificates
```
fastlane ios certificates
```
Fetch certificates and provisioning profiles
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
Deploy a new version to the App Store

----

## Android
### android certificates
```
fastlane android certificates
```
Fetch certificates and provisioning profiles
### android beta
```
fastlane android beta
```
Submit a new Beta Build to Apple TestFlight

This will also make sure the profile is up to date
### android release
```
fastlane android release
```
Deploy a new version to the App Store

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
