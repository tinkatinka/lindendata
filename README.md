## LindenDataVisualizer 0.0.1

### LindenData grabs data from a Google Doc Spreadsheet and visualizes it in Virtual Reality.

No coding skills needed: Just put your numbers in a spreadsheet and you're all set.

![Screenshot](http://keno.w359.de/LindenDataVisualizer/Screenshot_20160922-151239.png)

Some examples:
-	You can visualize the sales of pineapples in 2015 with pineapple in different heights
-	You can visualize election results with solid blocks (bar graphs) in different colors. When users glance at one bar graph, it changes to a different one (for example: SPD @ Kommunalwahl 2016 vs. 2012
-	You can create beautiful VR worlds just by typing numbers in a spreadsheet

**How to use LindenDataVisualizer**

Every cell in the spreadsheet denotes the position in the VR space (like on a chess board). Sheet 1 is "unglanced", sheet 2 is "glanced". Please use the following format: VALUE:DESCRIPTION TEXT:OBJECTTYPE:COLOR. (Example: "1500:Bananas sold in 2015:box:yellow").

![Spreadsheet](http://keno.w359.de/LindenDataVisualizer/spreadsheet.png)

Possible object types:
- box
- cone
- dodecahedron
- octahedron
- pineapple
- sphere
- tetrahedron
- torus

Possible colors:
- red
- green
- blue
- yellow
- black
- HTML color codes (e.g. #8E1C1C)

**Google Spreadsheet URL:** https://docs.google.com/spreadsheets/d/1pFShLzpmFxu7IYH6mmk-EnXFluWZ02WC1oEC0RXhglk/edit#gid=0

**LindenDataVisualizer URL:**
http://lindendata.tinkatinka.com

LindenDataVisualizer uses WebVR via A-Frame (https://aframe.io), so it should run on mobile devices with Cardboard viewers and with PC headsets like Oculus Rift and HTC Vive.

The data from the Google Docs spreadsheet is parsed via node.js (https://nodejs.org).

**Credits**

Alexander Matschke, http://twitter.com/alexmatschke

Fiona Valentine Thomann, http://fionavalentinethomann.com

Florian Gmeiner, https://tinkatinka.com

Jan-Keno Janssen, http://twitter.com/elektroelvis

Ronny Esterluss, http://vragments.com

This project was made @ VR Journalism Hackathon in Berlin (September 21./22. 2016 / http://vrhackathon.tumblr.com) and is licensed under The MIT License.

Copyright (c) 2016 LindenDataVisualizer team @ VR Journalism Hackathon Berlin.
