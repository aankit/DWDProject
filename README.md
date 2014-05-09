DWDProject
===========

A simple Yun DataStore that can store input from multiple devices with multiple sensors. Work in progress.


SECURE YUN DATA LOGGING

=====LOGIN(MUST RUN FIRST TO LOGIN AND SAVE COOKIE============

curl --cookie-jar jarfile --data "username=dan&password=test" http://thawing-depths-8084.herokuapp.com/login

=====ADD DEVICE=======

curl --cookie jarfile --data "deviceName=yun2" http://thawing-depths-8084.herokuapp.com/newDevice

=====ADD SENSOR=======

curl --cookie jarfile --data "sensorName=Accelerometer&deviceId=536bd25dc0082d0200c04f8a" http://thawing-depths-8084.herokuapp.com/newSensor

====WRITE VALUE=======

curl --cookie jarfile --data "sensorId=536be01b634e5902008cdea4&deviceId=536bd25dc0082d0200c04f8a&sensorValue=400" http://thawing-depths-8084.herokuapp.com/writeValue


