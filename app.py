#!/usr/bin/env python3


# --- Set up import path ---
import os
import sys


csfp = os.path.abspath(os.path.dirname(__file__)) + '/src'
if csfp not in sys.path:
    sys.path.insert(0, csfp)

# --- Entry Point ---
def main(*args: str):
    ...

if __name__ == '__main__':
    main(*sys.argv[1:])
