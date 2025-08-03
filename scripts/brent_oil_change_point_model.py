import pandas as pd
import numpy as np
import pymc as pm
import matplotlib.pyplot as plt
import arviz as az
from datetime import datetime

# Load and preprocess data
df = pd.read_csv('../data/BrentOilPrices.csv')  # Assumes CSV with 'Date' and 'Price' columns
df['Date'] = pd.to_datetime(df['Date'], format='%d-%b-%y')
df = df.sort_values('Date')
prices = df['Price'].values
dates = df['Date'].values
time_idx = np.arange(len(prices))

# Compute log returns for stationarity
log_returns = np.diff(np.log(prices))

# Bayesian Change Point Model
with pm.Model() as model:
    # Prior for the switch point (tau)
    tau = pm.DiscreteUniform("tau", lower=0, upper=len(log_returns)-1)
    
    # Priors for mean log returns before and after the change point
    mu_1 = pm.Normal("mu_1", mu=0, sd=0.1)
    mu_2 = pm.Normal("mu_2", mu=0, sd=0.1)
    
    # Prior for standard deviation (volatility)
    sigma = pm.HalfNormal("sigma", sd=0.1)
    
    # Switch function to model change in mean
    mu = pm.math.switch(tau >= time_idx[:-1], mu_1, mu_2)
    
    # Likelihood
    likelihood = pm.Normal("likelihood", mu=mu, sd=sigma, observed=log_returns)
    
    # MCMC sampling
    trace = pm.sample(2000, tune=1000, return_inferencedata=True)

# Model diagnostics
print(az.summary(trace, var_names=["tau", "mu_1", "mu_2", "sigma"]))
az.plot_trace(trace, var_names=["tau", "mu_1", "mu_2", "sigma"])
plt.show()

# Extract change point date
tau_posterior = trace.posterior["tau"].values.flatten()
tau_mode = int(np.bincount(tau_posterior).argmax())
change_point_date = dates[tau_mode + 1]  # Adjust for log returns offset
print(f"Most probable change point: {change_point_date}")

# Quantify impact
mu_1_mean = trace.posterior["mu_1"].mean().values
mu_2_mean = trace.posterior["mu_2"].mean().values
price_change_percent = (np.exp(mu_2_mean) - np.exp(mu_1_mean)) / np.exp(mu_1_mean) * 100
print(f"Mean log return before: {mu_1_mean:.4f}, after: {mu_2_mean:.4f}")
print(f"Estimated price change: {price_change_percent:.2f}%")

# Load event data and associate with change point
events = pd.read_csv('events.csv')  # Assumes CSV with 'Event_Date', 'Event_Description'
events['Event_Date'] = pd.to_datetime(events['Event_Date'])
closest_event = events.iloc[(events['Event_Date'] - change_point_date).abs().argsort()[:1]]
print(f"Closest event: {closest_event['Event_Description'].values[0]} on {closest_event['Event_Date'].values[0]}")

# Plot price series with change point
plt.figure(figsize=(10, 6))
plt.plot(dates, prices, label="Brent Oil Price")
plt.axvline(change_point_date, color='r', linestyle='--', label=f"Change Point: {change_point_date.strftime('%Y-%m-%d')}")
plt.title("Brent Oil Prices with Detected Change Point")
plt.xlabel("Date")
plt.ylabel("Price (USD/barrel)")
plt.legend()
plt.show()