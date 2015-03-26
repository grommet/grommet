#!/bin/sh
echo "Installing dependencies"
cd examples/tour
npm install
echo "Building"
gulp dist
cd ../server
npm install
echo "Running"
echo "Point your web browser to: http://localhost:8000/"
node server.js
