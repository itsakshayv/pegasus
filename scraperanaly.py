import sys
from crawler import *
from bs4 import BeautifulSoup
import requests

# a=sys.argv[1]
# b=sys.argv[2]
# print(a)
# print(b)
key_word= sys.argv[2]

site_= links()
#links_ = site_[1:-1]
links_ = site_[0:5]
# print(f'{len(links_)} Onion Links')
#print(links_)

if(site_!=0):
    for i in range(0,len(links_)):
        links_[i] = "http://" + links_[i]
    #print(links_)

    Browser="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.19577"
    user_agent = {'User-agent' : Browser}
    tunnel = {'http':'socks5h://127.0.0.1:9050','https': 'socks5h://127.0.0.1:9050'}

    key = sys.argv[1]


    # input(f"Enter {(key_word)} Name: ")

    for url in links_:

        response = requests.get(url,headers=user_agent,proxies=tunnel)
        soup = BeautifulSoup(response.content, 'html.parser')

        occurrences = soup.find_all(text=lambda text: text and key.lower() in text.lower())
        occ = len(occurrences)
        #print(len(occurrences))

        print(f'The {key} {key_word} appears {len(occurrences)} times on {url}.')
        #out =  [url]
        #print(out)
        # print(url)
        # sys.stdout.flush()
        # occurrences in a list
        # res = list(map(int, str(len(occurrences))))
        # print(res)
else:
    print("No Onion Links")
    sys.stdout.flush()
