                                                                                                                                        
#!/bin/bash
dirname=${PWD}
echo "==================================="
echo "INSTALL MODULES - at " $dirname
echo "==================================="

echo "1. Install Dashboard ..."
cd Portal-Customer && yarn install
echo "Install completed \n"

echo "Go back to root \n"
cd $dirname

echo "2. Install Frontend ..."
cd Web-Customer && yarn install
echo "Install completed \n"
