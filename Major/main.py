from src.routes import get_chat
from flask_cors import CORS
from flask import Flask, request, jsonify
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import FunctionTransformer
import pickle

neigh = pickle.load(open('model.pkl', 'rb'))
scaler = pickle.load(open('scaler.pkl', 'rb'))
dataset = pd.read_csv('recipes.csv')

app = Flask(__name__)
CORS(app)

def scaling(dataframe):
    # Check if dataframe is empty
    if dataframe.empty:
        raise ValueError("DataFrame is empty. Cannot scale empty data.")

    scaler = StandardScaler()
    # Drop rows with missing values (NaN) before scaling
    dataframe = dataframe.dropna()

    prep_data = scaler.fit_transform(dataframe.iloc[:, 16:25].to_numpy())
    return prep_data, scaler


def nn_predictor(prep_data):
    neigh_model = NearestNeighbors(metric='cosine', algorithm='brute')
    neigh_model.fit(prep_data)
    return neigh_model


def build_pipeline(neigh_model, scaler, params):
    transformer = FunctionTransformer(neigh_model.kneighbors, kw_args=params)
    pipeline = Pipeline([('std_scaler', scaler), ('NN', transformer)])
    return pipeline

def extract_data(dataframe, ingredient_filter, max_nutritional_values):
    extracted_data = dataframe.copy()
    #print(extracted_data.info())
    # print(extracted_data)
    for column, maximum in zip(extracted_data.columns[16:25], max_nutritional_values):
       # print(extracted_data[column]);
        extracted_data[column] = pd.to_numeric(extracted_data[column])
        #print(type(extracted_data[column]))
        # print(type(maximum))
        extracted_data = extracted_data[extracted_data[column] < maximum]
        # print(extracted_data)
    if ingredient_filter != None:
        for ingredient in ingredient_filter:
            extracted_data = extracted_data[
                extracted_data['RecipeIngredientParts'].str.contains(ingredient, regex=False)]
   # print(extracted_data.info())
    return extracted_data

def apply_pipeline(pipeline, _input, extracted_data):
    return extracted_data.iloc[pipeline.transform(_input)[0]]


def recommend(dataframe, _input, max_nutritional_values, ingredient_filter=None, params={'return_distance': False}):
    extracted_data = extract_data(dataframe, ingredient_filter, max_nutritional_values)
    # print(dataframe)
    prep_data, scaler = scaling(extracted_data)
    neigh_model = nn_predictor(prep_data)
    pipeline = build_pipeline(neigh_model, scaler, params)
    return apply_pipeline(pipeline, _input, extracted_data)
# Define Flask routes
@app.route('/')
def index():
    return "Welcome to Recipe Recommender!"


@app.route('/recommend', methods=['POST'])
def make_recommendation():
    data = request.json
    input_data = pd.DataFrame(data['input_data'], index=[0])
    max_nutritional_values = data['max_nutritional_values']
    ingredient_filter = data.get('ingredient_filter', None)
    
    recommended_recipes = recommend(dataset, input_data, max_nutritional_values, ingredient_filter)
    
    # Drop columns that you want to exclude from the response
    columns_to_exclude = ['AggregatedRating', 'ReviewCount','RecipeYield','CookTime']
    recommended_recipes = recommended_recipes.drop(columns=columns_to_exclude)
    
    return jsonify(recommended_recipes.to_dict(orient='records'))






@app.route('/WorkoutS')
def chatbot():
    question = request.args.get('question')
    question = question.replace("+", " ")
    result = get_chat(question)
    return result
    
if __name__ == "__main__":
    app.run()