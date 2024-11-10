import pandas as pd
from openpyxl import load_workbook
import joblib
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
import zipfile

# Load the workbook
file_path = 'WaitData.Published.xlsx'
data = pd.read_excel(file_path, sheet_name='F4')

# Define target variable and features
target = 'Wait'  # Replace with your target column
features = data.drop(columns=[target, 'x_ArrivalDTTM', 'x_ScheduledDTTM', 'x_BeginDTTM', ]) # Drop irrelevant columns if needed
target_data = data[target]
data = data[["NumCustomersInLastW1", "NumCustomersInLastW2", "NumCustomersInLastW3", "FlowCount2"]]

X_train, X_test, y_train, y_test = train_test_split(features, target_data, test_size=0.2, random_state=42)
from sklearn.ensemble import RandomForestRegressor  # Use RandomForestClassifier if your target is categorical
# Initialize the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
# Train the model
model.fit(X_train, y_train)
# Make predictions on the test set
y_pred = model.predict(X_test)
# Evaluate the model
print("Mean Absolute Error:", mean_absolute_error(y_test, y_pred))
print("Mean Squared Error:", mean_squared_error(y_test, y_pred))
print("R2 Score:", r2_score(y_test, y_pred))
joblib.dump(model, "wait_model_final.pkl")

with zipfile.ZipFile("wait_model_final.zip", "w") as zipf:
    zipf.write("wait_model_final.pkl")
