# import joblib
# import pandas as pd

# # model = joblib.load("../models/yield_prediction_model.pkl")



# def predict_yield(data: dict):

#     df = pd.DataFrame([data])

#     prediction = model.predict(df)

#     return round(float(prediction[0]), 2)  

import joblib
import pandas as pd

model = joblib.load("models/yield_prediction_model.pkl")


def predict_yield(data: dict):

    df = pd.DataFrame([data])

    prediction = model.predict(df)

    return round(float(prediction[0]), 2)