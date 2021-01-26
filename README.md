# Duplo :mechanical_arm:
A prototype of a programming language for two-armed robots.

<img src="https://i.imgur.com/vgvoQ4d.gif" alt="alt text" width="600" height="350">

## :card_index_dividers:	Files
- index.html: The HTML file where the programming language is loaded.
- css: Folder containing the stylesheets of index.html.
- js: Folder containing the javascript code of index.html.
- mockups: Folder containing the mockups of our prototype.
- bootstrap: Folder containing files from the bootstrap front-end framework.
- app: The source code of our WPF application.
- mockups: Folder containing mockups of our application.
- blockly: A fork of the blockly programming editor.

## :nut_and_bolt: Dealing with the code

### Structure

Our project is divided in two parts: 

The first part is our [website](https://vcuse.github.io/duplo/), written in Javascript and using the Blockly client-side library, our website provides all the necessary functionalities of our programming language, including the programming workspace, components and compiler.

The second part of our project is our desktop application, written in Windows Presentation Foundation (WPF) format and C#, it uses a Chromium webview to render our website (i.e. the programming language) and the [ABB PC SDK](https://developercenter.robotstudio.com/api/pcsdk/) to communicate with the YuMi's controller. The desktop application is responsible for connecting the user to the controller, uploading code to the robot, executing RAPID programs, etc.

**Summary:** If you are interested only in the programming language, take a look at the files related to our website, such as index.html and the js/ folder. If you are interested in the application, start by taking a look at the app/ folder.

### Technologies

For the website, make sure you are familiar with [Javascript](https://www.javascript.com/) and [Blockly](https://developers.google.com/blockly). We use Blockly not only to create the programming environment but also to translate the Blockly components to RAPID code (i.e. YuMi's programming language). If you are not familiar with RAPID code, start by taking a look at its [manual](https://library.e.abb.com/public/b227fcd260204c4dbeb8a58f8002fe64/Rapid_instructions.pdf?x-sign=f79v/883X1nHGc8fqH+WAJ2F30y/M6TZfYUuPuQpP+jeMBygouyGg+WSj8A9Otry) provided by ABB.

For the desktop application, you will need to know C#, the ABB PC SDK and Windows Presentation Foundation (WPF). The [tutorials](https://docs.microsoft.com/en-us/visualstudio/designers/getting-started-with-wpf) provided by Microsoft for WPF development are awesome, and may be useful for you if you don't know how it works. If you are not familiar with the ABB PC SDK, start by reading their [manual](https://developercenter.robotstudio.com/api/pcsdk/) and watching the [videos](https://www.youtube.com/watch?v=8CZxQxSb5lk) provided by ABB employees on YouTube.

## :computer: Building your local workspace
First, download our repository using Git or use the "Code ↓" button at the top of this page to download it as a ZIP file. The website is static, so you don't need to install anything to make it work, just open the index.html file and have fun. To execute the code of our desktop application, open the VCUProject.sln that is inside the app/ folder using Visual Studio (not Visual Studio Code!), and let Visual Studio build your local workspace. If you are not familiar with Visual Studio, please take a look at the ["Getting Started"](https://developercenter.robotstudio.com/api/pcsdk/articles/Introduction/GettingStarted.html) section of ABB PC SDK website, and build a sample project on your computer to get a better comprehesion of it.

## :speech_balloon:	Contact the community

If you need our help or are interested in being part of our community, do not hesitate to send us a message:
- Discord: https://discord.gg/qcPey2jp2M
- Felipe Fronchetti: fronchettl@vcu.edu
- David Shepherd: shepherdd@vcu.edu
