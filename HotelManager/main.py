import cv2
import pickle
import face_recognition
import numpy as np
from threading import Thread
#from tkinter import messagebox,simpledialog
class WebcamVideoStream:
    def __init__(self, src=-1):
        self.stream = cv2.VideoCapture(src)
        (self.grabbed, self.frame) = self.stream.read()

        self.stopped = False

    def start(self):
        Thread(target=self.update, args=()).start()
        return self

    def update(self):
        while True:
            if self.stopped:
                return

            (self.grabbed, self.frame) = self.stream.read()

    def read(self):
        return self.frame

    def stop(self):
        self.stopped = True
#thread process
class FaceRecognitionProcess:
    def __init__(self,data,capture=None):
        self.capture = capture
        self.stopped = False
        #self.face_locations = []
        self.face_names = None
        self.data=data
        self.sign_face=False
        self.have_face=False
    def start(self):
        Thread(target=self.process, args=()).start()
        return self

    def process(self):
        while not self.stopped:

            # Grab a single frame from live video stream
            _frame = self.capture.read()

            sign_face=False
            have_face=False
            small_frame = cv2.resize(_frame, (0, 0), fx=0.25, fy=0.25)
            # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
            rgb_small_frame = small_frame[:, :, ::-1]
            # Find all the faces and face encodings in the current frame of video
            name = "Unknown"
            face_locations =face_recognition .face_locations(rgb_small_frame,model="cnn")
            if len(face_locations)!=0:
                have_face=True
                face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
                # face_names = []
                for face_encoding in face_encodings:
                    face_distances = face_recognition.face_distance(self.data["encodings"], face_encoding)
                    best_match_index = np.argmin(face_distances)
                    if face_distances[best_match_index]<=0.6:
                        name=self.data["names"][best_match_index]
            if name!="Unknown":
                sign_face=True

            self.face_names = name
            self.sign_face=sign_face
            self.have_face=have_face

    def stop(self):
        self.stopped = True

def main():

    video_capture = WebcamVideoStream(src=-1).start()
    data = pickle.loads(open("encodings.pickle", "rb").read())

    # If you want to detect face without identifying from known faces, remove known_encodings & known_names parameters
    # when you initialize the class
    video_process = FaceRecognitionProcess(data,capture=video_capture).start()

    # Process the video rendering in Main thread due to opencv bug for Mac platform
    while True:

        if video_capture.stopped:
            video_capture.stop()
            break

        frame = video_capture.read()

        # Display the results
        if video_process.have_face:
            name = video_process.face_names
            sig_face=video_process.sign_face
            print(name,sig_face)


        # Display the resulting image
        cv2.imshow('Video', frame)

        # Hit 'q' on the keyboard to quit!
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release handle to the webcam
    video_capture.stop()
    video_process.stop()

    cv2.destroyAllWindows()

main()



