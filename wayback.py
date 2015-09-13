#https://archive.org/help/wayback_api.php
#8jnhn7qa87btp7h78ds7drcq

from lxml import html
import requests, json
import base64

# compareUrl = "http://www.walmart.com/ip/Apple-iPad-mini-16GB-Wi-Fi/22081453"
# compareUrl = "http://www.walmart.com/ip/Apple-iPod-shuffle-2GB-Space-Gray/46088119"
compareUrl = "http://www.walmart.com/ip/HP-Flyer-Red-15.6-15-R132WM-Laptop-PC-with-Intel-Pentium-N3540-Processor-4GB-Memory-500GB-Hard-Drive-and-Windows-8.1/41122950"
memento = "http://web.archive.org/web/"
wayback = "http://archive.org/wayback/available?url="

#date is only year and month, date will be decremented for however long of a period needed
year = "2015"
month = "01"
day = "11"
results_list = []

#check if snapshot exists
wayback_check = wayback + compareUrl
x = requests.get(wayback_check).json()

#autoset the most recent snapshot
if x['archived_snapshots']['closest']['available']:
	year = x['archived_snapshots']['closest']['timestamp'][:4]
	month = x['archived_snapshots']['closest']['timestamp'][4:6]
	day = x['archived_snapshots']['closest']['timestamp'][6:8]


print ("API DATE: " + str(year) + str(month) + str(day))

for i in range(200): #arbitrary, just using a week for now


	try:
		#if it does exist, you can use the wayback
		if x['archived_snapshots']['closest']['available']:
			results = []
			#in the case of new month
			if day == 0:
				#reset to previous month
				month = int(month) - 1
				if month is 1 or month is 3 or month is 5 or month is 7 or month is 8 or month is 10 or month is 12:
					day = 31
				elif month is 4 or month is 6 or month is 9 or month is 11:
					day = 30
				elif month is 2:
					if int(year) % 4 == 0:
						day = 29
					else:
						day = 28
			#in the case of a new year
			if month == 0:
				month = 12
				year = int(year) - 1
				day = 31

			if len(str(day)) == 1:
				#if 1 digit, prepend 0
				day = "0" + str(day)

			if len(str(month)) == 1:
				#if 1 digit, prepend 0
				month = "0" + str(month)

			#get webpage
			request = memento + str(year) + str(month) + str(day) + "/" + compareUrl 
			date = []
			date.append(int(year))
			date.append(int(month))
			date.append(int(day))
			# print("date requested (yyyy/mm/dd): " + date)
			y = requests.get(request)

			#scrape data
			tree = html.fromstring(y.text)
			price_list = tree.xpath('//div[@class="js-price-display price price-display"]/text()')

			#remove slashes (/n, /t, etc)
			price = price_list[1] 
			# print(price)

			day = int(day) - 1
			results.append(date)
			results.append(int(price))

			results_list.append(results)

	except KeyError:
		print ("Cant fetch data!")

#wolfram formatting
new_form = str(results_list).replace("[", "{")
wolfram_input = str(new_form).replace("]", "}")
# print(str(wolfram_input))
encoded = base64.b64encode(bytes(wolfram_input, "UTF-8"))
print(encoded)
wolfram = "https://www.wolframcloud.com/objects/665af020-cc1a-411f-a538-ccd2173ad1b5?input="
wolfram_api = wolfram + encoded.decode('utf-8')
# print(wolfram_api)
z = requests.get(wolfram_api, stream=True)
image = z.raw.read(1000000)

with open("wayback.jpg", "wb+") as f:
	f.write(image)
