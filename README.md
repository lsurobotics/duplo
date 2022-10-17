# Duplo :mechanical_arm:
A prototype of a programming language for two-armed robots.

## Warning
The organization and authors of this repository are not liable for any consequential damage or injury that any code or information available in this repository may produce to you or others. The code available in this repository should be used only for reading purposes as different robots may act different during execution. Use the code and information available here at your own risk, and always make sure you are following all the safety procedures recommended by your robot manufacturer.

## 📘 About the language
Duplo is a block-based programming language created to introduce non-experts to two-armed robots programming. The language is composed by two side by side canvases, used to accommodate instruction blocks from both robotic arms. A toolbox on the left side of the two canvases displays the instruction blocks available for use, and an execution button at the bottom runs the instructions from both canvases at the same time. In Duplo, the left canvas represents the instructions of the left arm in a two-armed robot, while the right canvas the instructions of the right arm. At the top of the page, a toolbar gives access to features that do not generate code, including buttons to run workspace commands (e.g., save the current workspace) and manual robot commands (e.g., move arms to home position). 

Each canvas starts with a green initialization block, where new blocks that should be executed can be attached. A new robot instruction is created when the user drags an instruction block from the toolbox and connects it to the existing blocks on one of the canvases. The order in which blocks are attached in a canvas defines the sequence in which instructions will be performed by the respective arm. If the user decides to delete a block, a trash can is available at the bottom right side of the two canvases where the instruction blocks can be disposed.

The toolbox provides instruction blocks for the two canvases in three different categories: one category to move the arms (in red), one to move the grippers (in blue), and another to synchronize the movements between arms (in yellow). In the arm movement category, all instruction blocks contain two input variables: arm movement speed and arm position. The arm movement speed is defined by three pre-defined options: quickly, moderately and slowly. Arm positions are taught by the user by manually moving a robotic arm to a new location. When a new arm position is created by the user, it stores the joints configuration of that respective arm.

Three types of blocks are available for use in the arm movement category. The first block, "Move arm to", moves an arm using a certain speed to a given location. The second block, "Move arm in a straight line to", can execute the same movement, but using linear movements. The third and last block, "Move and follow on the other side", moves both arms at the same time in a given direction. This direction is defined by the left arm position. For example, if a position moves the left arm three centimeters down from its current configuration, the right arm will also move three centimeters down.

In the gripper movement category, only two blocks with no input values are available for use. One block is used to open a gripper, and the other to close it. The canvas in which a block of is placed defines what gripper will be opened or closed. If an instruction block "Open gripper" is placed on the left canvas, for example, the gripper of the left arm will be opened. The same behavior applies for blocks in the arm movement category.

The last category in the toolbox is used to provide synchronization of instructions between the two canvases. The only block available in this category is the "Wait for each other". This is a two-canvases block, which means that when such block is placed, the user can see it in both canvases at the same time. This block doesn't contain any input value and it is used to synchronize the instructions of both arms. It can be understood as a traffic light in the execution order, that only allow blocks attached below it to be executed when all the blocks above it in both canvases were executed.

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

The first part is our [website](https://vcuse.github.io/duplo/), written in Javascript and using the Blockly client-side library, it provides all the necessary functionalities of our programming language, including the programming workspace, components and compiler.

The second part of our project is our desktop application, written in Windows Presentation Foundation (WPF) format and C#, it uses a Chromium webview to render our website (i.e. the programming language) and the [ABB PC SDK](https://developercenter.robotstudio.com/api/pcsdk/) to communicate with the YuMi's controller. The desktop application is responsible for connecting the user to the controller, uploading code to the robot, executing RAPID programs, etc.

**Summary:** If you are interested only in the programming language, take a look at the files related to our website, such as index.html and the js/ folder. If you are interested in the application, start by taking a look at the app/ folder.

### Technologies

For the website, make sure you are familiar with [Javascript](https://www.javascript.com/) and [Blockly](https://developers.google.com/blockly). We use Blockly not only to create the programming environment but also to translate the Blockly components to RAPID code (i.e. YuMi's programming language). If you are not familiar with RAPID code, start by taking a look at its [manual](https://library.e.abb.com/public/b227fcd260204c4dbeb8a58f8002fe64/Rapid_instructions.pdf?x-sign=f79v/883X1nHGc8fqH+WAJ2F30y/M6TZfYUuPuQpP+jeMBygouyGg+WSj8A9Otry) provided by ABB.

For the desktop application, you will need to know C#, the ABB PC SDK and Windows Presentation Foundation (WPF). The [tutorials](https://docs.microsoft.com/en-us/visualstudio/designers/getting-started-with-wpf) provided by Microsoft for WPF development are awesome, and may be useful for you if you don't know how it works. If you are not familiar with the ABB PC SDK, start by reading their [manual](https://developercenter.robotstudio.com/api/pcsdk/) and watching the [videos](https://www.youtube.com/watch?v=8CZxQxSb5lk) provided by ABB employees on YouTube.

## :computer: Building your local workspace
First, download our repository using Git or use the "Code ↓" button at the top of this page to download it as a ZIP file. The website is static, so you don't need to install anything to make it work, just open the index.html file and have fun. To execute the code of our desktop application, open the VCUProject.sln that is inside the app/ folder using Visual Studio (not Visual Studio Code!), and let Visual Studio build your local workspace. If you are not familiar with Visual Studio, please take a look at the [Getting Started](https://developercenter.robotstudio.com/api/pcsdk/articles/Introduction/GettingStarted.html) section of ABB PC SDK website, and build a sample project on your computer to get a better comprehesion of it.

## :speech_balloon:	Contact the community

If you need our help or are interested in being part of our community, do not hesitate to send us a message:
- Discord: https://discord.gg/qcPey2jp2M
- Felipe Fronchetti: fronchettl@vcu.edu
- David Shepherd: shepherdd@vcu.edu
