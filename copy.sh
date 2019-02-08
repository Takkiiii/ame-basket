#!/bin/sh
if [ -d ~/Library/Application\ Support/Adobe/CEP/extensions/ame-basket ]; then
	echo " found."
else
	echo " not found."
    mkdir ~/Library/Application\ Support/Adobe/CEP/extensions/ame-basket
    echo "created"
fi

cp -r -f -v ./dist/ ~/Library/Application\ Support/Adobe/CEP/extensions/ame-basket