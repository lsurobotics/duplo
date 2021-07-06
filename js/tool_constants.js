/* Smart Grippers for YuMi IRB 14000 may have different configurations depending on 
   their features (e.g. Camera, Vacuum and Suction tools)
   
   We define below the constants that we use for the tools of our YuMi.
   If your robot has a different configuration, please follow values defined
   in the following documentation file:
   
   Product manual - Grippers for IRB 14000
   https://us.v-cdn.net/5020483/uploads/editor/bb/f5yys154a3eo.pdf  */

/* Default gripper. No modules, only the servo. */
const ServoGripper = "PERS tooldata Servo:=[TRUE,[[0,0,114.2],[1,0,0,0]],[0.215,[8.7,12.3,49.2],[1,0,0,0],0.00021,0.00024,0.00009]];\n";
/* Gripper with servo and camera and/or vision module. */
const CameraServoGripper = "PERS tooldata Servo:=[TRUE,[[0,0,114.2],[1,0,0,0]],[0.229,[7.9,12.4,48.7],[1,0,0,0],0.00021,0.00023,0.00008]];\n"; 
const Camera = "PERS tooldata Camera:=[TRUE,[[-7.3,28.3,35.1],[0.5,-0.5,0.5,0.5]],[0.229,[7.9,12.4,48.7],[1,0,0,0],0.00021,0.00023,0.00008]];\n"; 