# Duplo :mechanical_arm:	
A prototype of a programming language for two-armed robots.

## :card_index_dividers:	 Code Structure
- index.html: The HTML file where the prototype is loaded.
- css: Folder containing the stylesheets of index.html.
- js: Folder containing the javascript code of index.html.
- mockups: Folder containing the mockups of our prototype.
- bootstrap: Folder containing files from the bootstrap front-end framework.
- app: The source code of our WPF application.
- mockups: Folder containing mockups of our application.
- blockly: A fork of the blockly programming editor.

## Technologies
Our project is divided in two parts: 

The first part is our [website](https://vcuse.github.io/duplo/), written in Javascript and using the Blockly client-side library, our website provides all the necessary functionalities of our programming language, including the programming workspace, components and compiler.

The second part of our project is our desktop application, written in Windows Presentation Foundation (WPF), it uses a webview to render our website (i.e. programming language). Our desktop application also uses the [ABB PC SDK](https://developercenter.robotstudio.com/api/pcsdk/) to communicate with the YuMi's controller, and is responsible for uploading code to the robot. 

## :speech_balloon:	Slack
https://vcuse.slack.com/
