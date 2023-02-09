import requests
from os.path import join as path_join
from os import listdir, environ

from external_rooms_app.settings import BASE_DIR

from setup_env import OBTP_IP

def escape_xml(code):
	return code.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;').replace("'", '&apos;')

def create_macro(ip, name, code):
	""" Send and activate a macro on a CISCO device """
	url = f'http://{ip}/putxml'
	headers = {'Content-Type':'text/xml', 'Authorization':'Basic Y2VudHJhbGU6ZHR5Y2VudHJhbGVjaXNjbw=='}
	data = f'<Command><Macros><Macro><Save><Name>{name}</Name><OverWrite>True</OverWrite><body>{escape_xml(code)}</body></Save><Activate><Name>{name}</Name></Activate></Macro><Runtime><Restart command="True"/></Runtime></Macros></Command>'

	x = requests.post(url, headers=headers, data=data)
	if not x.ok:
		raise Exception('Could not save macro: ' + x.text)

def cisco_init(ip_terminal):
	""" Initialize cisco devices using 'create_macro' and JS files from the 'macros' folder """
	macros_folder = path_join(BASE_DIR, "cisco/","macros/")
	file_names = listdir(macros_folder)
	for file in file_names:
		with open(path_join(macros_folder,file), "rb") as f:
			file_content = f.read().decode("utf-8").replace("OBTP_IP",OBTP_IP)
		create_macro(ip_terminal, file, file_content)
