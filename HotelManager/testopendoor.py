import cv2
import pickle
import face_recognition
import numpy as np
#from tkinter import messagebox,simpledialog
import pygame
import RPi.GPIO as GPIO
import time
# chose pin
GPIO.setmode(GPIO.BOARD)
# for keypad
L1 = 10
L2 = 12
L3 = 16
L4 = 18

C1 = 7
C2 = 11
C3 = 13
C4 = 15
# for relay
LD=29
# for buttom
# 1 chan nối vao 3.3V(pin 1) 1 chan ni voi GPIO(pin 8)
PB=8
# sensor
SR=31
# door unlock 
def capture(e,q,src=0):
    # Get a reference to webcam #0 (the default one)
    video_capture = cv2.VideoCapture(src)
    # print("Width: %d, Height: %d, FPS: %d" % (video_capture.get(3), video_capture.get(4), video_capture.get(5)))
    count=0
    while True:
        e.wait()
        ret, frame = video_capture.read()
        count+=1
        if count%60==0:
            q.put(frame)
        cv2.imshow("test",frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    # Release webcam
    video_capture.release()
    cv2.destroyAllWindows()
# Get a reference to webcam #0 (the default one)#-1 for pi
def process(Global,q,e):
    import face_recognition 
    import pickle
    data=pickle.loads(open("end.pickle", "rb").read())
    while True:
        name = "Unknown"
        if not q.empty():
            t2=time.ctime()
            print(f'get frame at time:{t2}')
            frame_process = q.get()
            if frame_process is None:
                print("None")
                break
            small_frame = cv2.resize(frame_process, (0, 0), fx=0.25, fy=0.25)
            rgb_small_frame = small_frame[:, :, ::-1]
            face_locations =face_recognition.face_locations(rgb_small_frame,model="cnn")
            if len(face_locations)>0:
                face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
                for face_encoding in face_encodings:
                    face_distances = face_recognition.face_distance(data["encodings"], face_encoding)
                    best_match_index = np.argmin(face_distances)
                    if face_distances[best_match_index]<=0.6:
                            name=data["names"][best_match_index]
                            Global.name=name
def sensor():
    # lock
    GPIO.setup(SR,GPIO.IN,pull_up_down=GPIO.PUD_UP)
    if GPIO.input(SR) == GPIO.LOW:
        return False
    # unlock
    else:
        return True
    
def speaker(path_file_sound):
    # change output default from HDMI to audio jack to use jack 3.5 on raspi
    pygame.mixer.init()
    pygame.mixer.music.load(path_file_sound)
    pygame.mixer.music.play()
    while pygame.mixer.music.get_busy() == True:
        continue

def open_door(sound_fg,sound_op):
    print("Opening door.....")
    GPIO.output(LD,0)
    speaker(sound_op)
    time.sleep(5)
    GPIO.output(LD,1)
    time.sleep(5)
    if sensor():
        # play sound for not open door
        speaker(sound_fg)

GPIO.setup(PB, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(LD,GPIO.OUT)
sound_fg="/home/pi/fg.wav"
sound_op="/home/pi/Desktop/DATN/door.wav"
sound_wrg="/home/pi/wrong_face.wav"
video_capture = cv2.VideoCapture(0)
width  =video_capture.get(3) 
height = video_capture.get(4)  
y_start=int(1/2*(height-300))
x_start=int(1/2*(width-300))
data = pickle.loads(open("encodings.pickle", "rb").read())
count=0
no=0
psw=12345

try:
    while True:
    #door alway lock
        GPIO.output(LD,1)
        if GPIO.input(PB) == GPIO.LOW:
            open_door(sound_fg,sound_op)
    # Grab a single frame of video
        ret, frame = video_capture.read()
        cv2.rectangle(frame,(x_start,y_start), (x_start+300,y_start+300), (0, 0, 255),2)
        cv2.putText(frame,'Put your face in retangle',(x_start-30,y_start-30),cv2.FONT_HERSHEY_DUPLEX,1.0,(255,255,0),1)
        img1=cv2.resize(frame, (0,0), fx=0.5, fy=0.5)
        cv2.imshow('Video', img1)
        count=count+1
    # print(count)
        if count%30==0:
            #img=frame[y_start:y_start+300,x_start:x_start+300]
            # name,sig_face=Recog_face(img,data)
            name,sig_face,hv_face=Recog_face(frame,data)
            if hv_face:
                if sig_face:
                    open_door(sound_fg,sound_op)
                else:
                    speaker(sound_wrg)
            count=0

            # print(integer_value)
            #check password

    # Hit 'q' on the keyboard to quit!
        '''if cv2.waitKey(1) & 0xFF == ord('q'):
            break'''
except KeyboardInterrupt:
    #rint("nothing")
    #GPIO.cleanup()
    video_capture.release()
    cv2.destroyAllWindows()
GPIO.cleanup()
# Release handle to the webcam

