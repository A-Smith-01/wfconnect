import requests
from bs4 import BeautifulSoup
import csv

EXCLUDE_LIST = ["Kuva","Tenet","Mara","Prisma","Vandal","Carmine","Prime","Wraith","MK1","Secura","Synoid","Sancti","Vaykor","Rakta","Telos"]
PAGES = ["https://overframe.gg/?category=primary-weapons","https://overframe.gg/?category=secondary-weapons"]

csv_file = open('items.csv','w',encoding='utf-8',newline='')
writer = csv.writer(csv_file)
id = 0

for p in PAGES:
    page = requests.get(p)
    print(page)

    soup = BeautifulSoup(page.text, 'html.parser')

    article = soup.find('article')
    items = article.findAll('a')

    for item in items:
        name = item['aria-label']
        cont = True
        for i in EXCLUDE_LIST:
            if i in name:
                cont = False
        if not cont: continue

        imageSet = item.find('img')
        image = imageSet['srcset'].split(',')[0]

        link = "https://wiki.warframe.com/w/"+(name.replace(" ","_"))
        
        writer.writerow([id,name,image,link])
        id += 1

csv_file.close()