import sounddevice as sd
import numpy as np
import requests

API_URL = "http://localhost:5000/alert"

def callback(indata, frames, time, status):
    volume = np.linalg.norm(indata) * 10
    
    if volume > 20:
        print("🔊 Loud Sound!")
        requests.post(API_URL, json={
            "type": "Sound",
            "location": "Hall"
        })

with sd.InputStream(callback=callback):
    print("Listening...")
    while True:
        pass