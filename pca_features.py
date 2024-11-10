import sklearn as sk
import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

# Load your dataset
df = pd.read_excel("WaitData.Published.xlsx",sheet_name='F4')

df = df.drop(columns=["x_ArrivalDTTM", "x_ScheduledDTTM", "x_BeginDTTM"])
df.dropna(axis=1, inplace=True)

# df = df[0,-5]

# Separate features and labels (if applicable)
y = df["Wait"]  # Keep target label for future use
X = df.drop(columns=["Wait"])  # Exclude the target label if there's any


# imputer = SimpleImputer(strategy='mean')
# X = imputer.fit_transform(X)

# Standardize the features (important for PCA)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)



# Assuming X_scaled is your scaled DataFrame
pca = PCA(n_components=3)  # Or whatever number of components you want
pca.fit(X_scaled)
X_pca = pca.transform(X_scaled)

# Now X_pca should have the correct shape
components_df = pd.DataFrame(
    pca.components_,  # Shape should be (3, number of original features)
    columns=X.columns,  # Ensure columns match the original DataFrame's features
    index=[f"PC{i+1}" for i in range(pca.n_components_)]  # Create an index for each component
)


# Get the PCA component loadings (feature contributions)
# components_df = pd.DataFrame(pca.components_, columns=X_scaled.columns, index=[f"PC{i+1}" for i in range(pca.components_.shape[0])])

# Sum the absolute contributions for each feature across all components
importance = components_df.abs().sum(axis=0)

# Sort the features by their total importance across all principal components
sorted_importance = importance.sort_values(ascending=False)

# Print the top features that contribute most to the dataset's variance
print("Most important columns based on PCA:")
print(sorted_importance.head())