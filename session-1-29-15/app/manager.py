import csv, sys
import json
import pandas as pd

# Opens csv file and stores reference in exports_data
exports_data = open('mfpanimalfeedtradeexports.csv', 'r')
arr = []
dataset = []
key_array = ['COUNTRY', 'QUANTITY_KG', 'Year']



def csv_headers():
	headers = []	
	# for each header in the csv file we want to store it
	for header in exports_data.readline().split(','):	
		headers.append(header)
	return headers		

def csv_to_json():
	arr = []
	# getting the headers for each column
	headers = csv_headers()	
	for line in exports_data.readlines():
		i = 0	
		lineItems = {}
		for item in line.split(','):	
			if i < len(headers):			
				lineItems[headers[i]] = item
				i += 1
		arr.append(lineItems)
		exports_data.close()
	return arr
		
arr = csv_to_json()

def create_datasets(key_array):
	exports = pd.DataFrame()
	for key in key_array:
		exports[key] = map(lambda export: export[key], arr)
	return exports


exports = create_datasets(key_array)

def datafram_to_json(dataframe):
	d = [ 
	    dict([
	        (subset, row[i]) 
	        for i,subset in enumerate(dataframe.columns)
	    ])
	    for row in dataframe.values
	]

	return json.dumps(d)

def group_items(groups):
	grouped = exports.groupby(groups)
	return grouped

grouped = group_items(['COUNTRY','Year'])

def dataset_to_json():
	dataset = []
	for name, group in grouped:				
		data_json = datafram_to_json(group)
		dataset.append(data_json)
	print json.dumps(dataset)
	return dataset


def get_countries():
	temp = exports.drop_duplicates(cols='COUNTRY', take_last=True)[['COUNTRY']].sort(['COUNTRY'],ascending=[1])
	try:
		return datafram_to_json(temp)
	except Exception, e:
		return None
	

# print get_countries()

	