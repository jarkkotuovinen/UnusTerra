# UnusTerra

API used https://api.covid19api.com/

# How to run 🏃
```sh
cd UnusTerra
npm install
```
## iOS

if you don't have pods already
```sh
sudo gem install cocoapods
```

```sh
cd ios
pod install
```

```sh
cd ..
npx react-native run-ios
```
## Quick start

1.  Clone the repository `git clone https://github.com/jarkkotuovinen/UnusTerra/`
2.  Run initial install `npm install`
3.  Build iOS
    - Install Cocoapods if not yet installed (MacOS) `brew install cocoapods`
    - Run pod install `cd ios && pod install`
    - Build iOS `cd .. && react-native run-ios`
    - You can specify the device the simulator should run with the --simulator flag, followed by the device name as a string. The default is "iPhone X". If you wish to run your app on an iPhone 5s, run react-native run-ios --simulator="iPhone 5s". The device names correspond to the list of devices available in Xcode. You can check your available devices by running xcrun simctl list devices from the console.