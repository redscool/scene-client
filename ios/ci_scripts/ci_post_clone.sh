#!/bin/sh

echo "===== Installling CocoaPods ====="
export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods
echo "===== Installing Node.js ====="
brew install node@20

# Install dependencies
echo "===== Running npm install ====="
npm install
echo "===== Running pod install ====="
cd ios
pod install

#  ci_post_clone.sh
#  ProjectW
#
#  Created by Vineet Oli on 30/06/24.
#  
