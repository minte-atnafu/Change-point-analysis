Brent Oil Price Analysis Project
Overview
This project, conducted by Mintesinot Atnafu at Birhan Energies, aims to analyze the impact of significant geopolitical, economic, and OPEC-related events on Brent oil prices. The primary objective is to identify structural breaks in the price series using a Bayesian Change Point model and provide actionable insights for investors, policymakers, and energy companies. This repository contains the interim submission for Task 1, focusing on defining the data analysis workflow and compiling a structured event dataset.
The project leverages historical Brent oil price data (May 20, 1987, to September 30, 2022) and a curated dataset of key events to detect and quantify price changes associated with major events. Future tasks will include implementing a Bayesian Change Point model using PyMC3 and developing an interactive dashboard with Flask and React.
Repository Structure

Interim_Report_Task1.tex: A LaTeX document outlining the planned data analysis workflow, time series properties, change point model purpose, and communication strategy for Task 1.
events.csv: A structured dataset containing 10 key events impacting Brent oil prices, with columns for Event_Date, Event_Description, and Event_Type.

Task 1: Laying the Foundation for Analysis
Task 1 focuses on establishing the groundwork for the analysis:

Data Analysis Workflow: Defines steps for data collection, preprocessing, exploratory data analysis (EDA), event compilation, Bayesian modeling, insight generation, and dashboard development.
Time Series Properties: Analyzes the non-stationary nature of Brent oil prices, using log returns to achieve stationarity for modeling.
Change Point Model: Explains the use of Bayesian Change Point models to detect structural breaks in price behavior, with limitations such as the assumption of discrete changes.
Event Dataset: Compiles 10 major events (e.g., Libyan Civil War, OPEC production cuts, COVID-19 demand collapse) for association with detected change points.
Communication Strategy: Outlines delivery through a PDF report, interactive dashboard, and presentation for stakeholders.

Setup Instructions
Prerequisites

LaTeX Environment: Install a LaTeX distribution (e.g., TeX Live) to compile the interim report.
CSV Viewer: Any spreadsheet software (e.g., Excel) or Python with pandas to view events.csv.

Steps

Clone the Repository:git clone <repository-url>
cd brent-oil-price-analysis


Compile the Interim Report:
Ensure latexmk and PDFLaTeX are installed.
Run:latexmk -pdf Interim_Report_Task1.tex


Output: Interim_Report_Task1.pdf (a 1-2 page report).


View the Event Dataset:
Open events.csv in a spreadsheet application or load it in Python:import pandas as pd
events = pd.read_csv('events.csv')
print(events)




Dependencies for Future Tasks:
Install Python packages for Task 2 (Bayesian modeling): pandas, numpy, pymc3, arviz, matplotlib.
Install Flask and React dependencies for Task 3 (dashboard).



Artifacts Description

Interim_Report_Task1.tex:
A LaTeX document detailing the planned workflow, including data preprocessing, EDA, event compilation, modeling, and communication.
Discusses time series properties (non-stationarity, log returns) and the purpose of change point models.
Prepared by Mintesinot Atnafu, formatted for PDFLaTeX compilation.


events.csv:
A CSV file with 10 key events (2011–2022), including geopolitical conflicts (e.g., Russia-Ukraine conflict), OPEC policies, economic sanctions, and shocks.
Columns: Event_Date (datetime), Event_Description (text), Event_Type (category).
Example: 2014-11-27,OPEC maintains production levels, leading to price drop,OPEC Policy.



Next Steps

Task 2: Implement a Bayesian Change Point model using PyMC3 to detect structural breaks in Brent oil prices and associate them with events from events.csv.
Task 3: Develop an interactive dashboard using Flask (backend) and React with Recharts (frontend) to visualize price trends, change points, and event impacts.
Final Submission: Integrate all components into a comprehensive report and dashboard by August 5, 2025, 20:00 UTC.

Contact
For questions or clarifications, contact Mintesinot Atnafu at Birhan Energies or use the project discussion channel with #all-week10 (by July 30, 2025).
License
This project is for internal use at Birhan Energies and is not licensed for public distribution.