import cv2
import requests

API_URL = "http://localhost:5000/alert"

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    lower = (0, 120, 200)
    upper = (35, 255, 255)

    mask = cv2.inRange(hsv, lower, upper)

    if mask.sum() > 50000:
        print("🔥 Fire Detected!")
        requests.post(API_URL, json={
            "type": "Fire",
            "location": "Camera Area"
        })

    cv2.imshow("Camera", frame)

    if cv2.waitKey(1) == 27:
        break

cap.release()
cv2.destroyAllWindows()