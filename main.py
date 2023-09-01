#by running pip install beautifulsoup4 in your terminal u can 
#use beautifulsoup for scraping #import beautifulsoup
from bs4 import BeautifulSoup

#bcs we are working with an html file we will use python file's method to access to our index.html
#the open method takes two parameters the fiers is the name of the file and the second 
# is the method{'r' for reading from the file , and 'w' for writing in the file }
with open("index.html", "r") as index:
    content = index.read()
    #call the beautifulsoup method to read the html from the index file
    soup = BeautifulSoup(content,"lxml")
    #get all the dev element that have the css class of card from the index file 
    courses_card = soup.find_all('div',class_="card")
    #then implement some logic to get the h5 and a tags that are inside of the div
    for cours in courses_card:
        cours_name = cours.h5.text
        cours_price = cours.a.text.split()[-1]
        #then print the result
        print(f'{cours_name} is coust {cours_price}')