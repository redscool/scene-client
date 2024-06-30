#!/bin/sh

echo "===== Installling CocoaPods ====="
export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods
echo "===== Installing NVM ====="
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
source ~/.bash_profile
echo "===== Installing Node ====="
nvm install 20.13.1

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
