#!/usr/bin/python
#-*- coding: UTF-8 -*-
import os, time
import usb.core
import usb.util
from sys import exit

#DYMO M5
VENDOR_ID = 0x0922
PRODUCT_ID = 0x8005

def connect():
    # find the USB device
    dev = usb.core.find(idVendor=VENDOR_ID, idProduct=PRODUCT_ID)
    if dev is None:
        # print "device not found"
        return dev
    else:
        devmanufacturer = usb.util.get_string(dev, 256, 1)
        devname = usb.util.get_string(dev, 256, 2)
        # print "device found: " + devmanufacturer + " " + devname

        interface = 0
        if dev.is_kernel_driver_active(interface) is True:
            # print "but we need to detach kernel driver"
            dev.detach_kernel_driver(interface)
            # use the first/default configuration
            dev.set_configuration()
            # print "claiming device"
            usb.util.claim_interface(dev, interface)
    return dev

def disconnect(dev):
    interface = 0
    # print 'release claimed interface'
    usb.util.release_interface(dev, interface)
    #print 'now attaching the kerneal driver again'
    #dev.attach_kernal_driver(interface)
    # print 'device disconnected'
          
def analyzeData(data):
    DATA_MODE_GRAMS = 2
    DATA_MODE_OUNCES = 11
    grams = 0
    if data != None:
        raw_weight = data[4] + data[5] * 256

    if raw_weight > 0:
        if data[2] == DATA_MODE_OUNCES:
            ounces = raw_weight * 0.1
            grams = round(ounces * 28.3495, 2)
        elif data[2] == DATA_MODE_GRAMS:
            grams = raw_weight

        print grams
    if raw_weight == 0:
        print 0


def grabData(dev):
    try:
        # first endpoint
        endpoint = dev[0][(0,0)][0]

        # read a data packet
        attempts = 10
        data = None
        while data is None and attempts > 0:
            try:
                data = dev.read(endpoint.bEndpointAddress,
                                   endpoint.wMaxPacketSize)
                print data
            except usb.core.USBError as e:
                data = None
                if e.args == ('Operation timed out',):
                    attempts -= 1
                    # print "timed out... trying again"
                    continue

        return data
    except usb.core.USBError as e:
        pass
        # print "USBError: " + str(e.args)
    except IndexError as e:
        pass
        # print "IndexError: " + str(e.args)

#############main################
while True:
    dev = connect()
    if dev is not None:
        data = grabData(dev)
        analyzeData(data)
        disconnect(dev)