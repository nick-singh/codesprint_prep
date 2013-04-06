http = require("http");
GLOBAL.data = "";
GLOBAL.csv = "";

function handle_response( res )
{
 res.on("data",handle_data);
 res.on("end",print_data);
}

function handle_data( chunk )
{
	GLOBAL.data += String(chunk);
}

function print_data()
{
	download_url = JSON.parse(GLOBAL.data).download_url;
	http.get(download_url,csv_response);
}


function csv_response(res)
{
  res.on("data",append_csv);
  res.on("end",print_csv);	
}

function append_csv(chunk)
{
	GLOBAL.csv += String(chunk);
}

function print_csv()
{
	csv  = GLOBAL.csv;
	lines = csv.split("\r\n");
	
	headers = lines[0].split(",");

	for( i = 1; i < lines.length; ++i)
	{
		fields = lines[i].split(",");
		for( j = 0; j < headers.length; ++j ) console.log(headers[j]+":"+fields[j]+"\n");
	}
}

http.get("http://devca.ciudadanointeligente.org/api/rest/dataset/namdevco", handle_response);

