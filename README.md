# Urgent Care Coordinator

## Overview
The **Urgent Care Coordinator** is a smart tool that helps users locate the nearest urgent care center with the shortest wait time. By leveraging machine learning and real-time data, our solution optimizes patient distribution across facilities, reducing congestion and improving care accessibility.

## Problem
Urgent care centers often face unpredictable patient inflow, leading to prolonged wait times and uneven distribution of patients. This inefficiency can cause delays in care and place strain on healthcare staff, impacting the quality of service.

## Solution
Our solution uses machine learning to predict patient demand at various urgent care locations, allowing for the redistribution of incoming patients to centers with lower wait times. By analyzing real-time data and predicting patient influx, our tool can direct users to the best urgent care center based on current and anticipated demand, enhancing patient experience and operational efficiency.

## Features
- **Nearest Urgent Care Finder**: Finds the nearest urgent care facilities to the user’s location.
- **Real-Time Wait Time Estimation**: Provides estimated wait times based on real-time patient data.
- **Smart Redistribution**: Suggests alternate urgent care locations with shorter wait times to balance patient load.
- **Demand Prediction**: Uses machine learning to forecast patient influx, allowing for dynamic adjustment of recommendations.
- **Urgent Care Info Cards**: Displays urgent care center information on interactive cards, including name, address, and estimated wait time.
- **Busy Times Data**: Uses the Google Maps Places API to gather data on peak times for each location, helping to improve wait time predictions.
- **Machine Learning Model for Wait Times**: Implements a predictive model to estimate wait times based on factors like location, historical data, and peak hours.

## Target Market
Our primary users are:
- Urban populations, particularly young adults and families.
- Individuals seeking efficient access to urgent care facilities.
- Healthcare providers looking to reduce congestion and improve patient flow.

## How It Works
1. **Data Collection**: The system gathers real-time data on patient count, wait times, and peak hours at nearby urgent care centers.
2. **Machine Learning Prediction Model**: A machine learning model analyzes current data and historical trends to predict patient influx and wait times.
3. **Recommendation Engine**: The tool recommends urgent care centers with minimal wait times and optimal capacity.
4. **User Notification**: Users receive instant recommendations via an intuitive interface with information cards.

## Tech Stack
- **Frontend**: React or Vue.js for the user interface.
- **Backend**: Node.js with Express for the server and API calls.
- **Machine Learning**: Python with Scikit-Learn or TensorFlow for demand and wait time prediction.
- **Database**: MongoDB or PostgreSQL for data storage.
- **APIs**: Google Maps API for location-based services and Maps integration, Places API for busy times data.

## Installation

To set up the project locally:

1. Clone the repository:

2. Install and unzip [pkl file](https://drive.google.com/file/d/1U2adNSopYDrypJxEITpl6h6FP2l3AvTK/view?usp=sharing)
