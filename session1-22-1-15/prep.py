import csv
import json
import pandas as pd
import matplotlib.pyplot as plt

exports_data = open('mfpanimalfeedtradeexports.csv', 'r')
# imports_data = open('mfpanimalfeedtradeimports.csv', 'r')
arr = []
headers = []


for header in exports_data.readline().split(','):	
	headers.append(header)

for line in exports_data.readlines():

	i = 0	
	lineItems = {}
	for item in line.split(','):	
		if i < len(headers):			
			lineItems[headers[i]] = item
			i += 1
	arr.append(lineItems)
		

exports_data.close()

# exports_data_json = json.dumps(arr)

exports = pd.DataFrame()

exports['COUNTRY'] = map(lambda export: export['COUNTRY'], arr)
exports['QUANTITY_KG'] = map(lambda export: export['QUANTITY_KG'], arr)

exports_by_country = exports['COUNTRY'].value_counts()

fig, ax = plt.subplots()
ax.tick_params(axis='x', labelsize=15)
ax.tick_params(axis='y', labelsize=10)
ax.set_xlabel('Countries', fontsize=15)
ax.set_ylabel('Quantity' , fontsize=15)
ax.set_title('Quantities by Countries', fontsize=15, fontweight='bold')
exports_by_country.plot(ax=ax, kind='bar', color='red')

fig.savefig('Top 5 Countries.png')