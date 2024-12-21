from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import uuid


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:5173/",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MODEL = tf.keras.models.load_model("../models/1")


CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]



@app.get("/")
async def ping():
   if MODEL: 
     return {"Message": "Hello world!"}





def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image





@app.post("/predict")
async def about(
    file : UploadFile = File(...)
):
    content = await file.read()
    # if content:
    #    print(content)
    image_array = read_file_as_image(content)
    image_batch = np.expand_dims(image_array,0)
    model_prediction = MODEL.predict(image_batch)
    
    predicted_class = CLASS_NAMES[np.argmax(model_prediction[0])]
    confidence = np.max(model_prediction[0])
    output=  {
        'msg':"File recieved",
        'class': predicted_class,
        'confidence': float(confidence),
    }
    print(output)

    return output



@app.post("/upload/")
async def upload_file(  file : UploadFile = File(...)  ):
    file.filename = f'{uuid.uuid4()}.jpg'
    content  = file.read()
    # with open("{file.filename}",'wb') as f:
    return file.filename









if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=3000)