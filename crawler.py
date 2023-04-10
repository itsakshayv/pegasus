import sys
import requests
import  re
from bs4 import BeautifulSoup
key_word=sys.argv[2]
# key_word=input("Enter Keyword : ")




if " " in key_word:
    yourquery = key_word.replace(" ","+")

#deep search = http://search7tdrcvri22rieiwgi5g46qnwsesvnubqav2xakhezv4hjzkkad.onion/result.php?search=
#ahmia = http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion/search/?q=

url="http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion/search/?q={}".format(key_word)

#print(url)

Browser="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19577"
user_agent = {'User-agent' : Browser}
tunnel = {'http':'socks5h://127.0.0.1:9050','https':'socks5h://127.0.0.1:9050'}
response = requests.get(url,headers=user_agent,proxies=tunnel)

#print(response)

def scrape(connection):
    content=connection.text
    return(content)

def links():
    res=scrape(response)
    Onion_Link = "\w+\.onion"
    links= re.findall(Onion_Link,res)
    Link_list = list(dict.fromkeys(links))
    return Link_list

#print(links())
