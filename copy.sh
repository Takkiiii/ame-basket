#!/bin/sh
if [ -d ~/Library/Application\ Support/Adobe/CEP/extensions/adobe-cep-sample-with-vue/ ]; then
	echo " found."
else
	echo " not found."
    mkdir ~/Library/Application\ Support/Adobe/CEP/extensions/adobe-cep-sample-with-vue/
    echo "created"
fi

cp -r -f -v ./dist/ ~/Library/Application\ Support/Adobe/CEP/extensions/adobe-cep-sample-with-vue/